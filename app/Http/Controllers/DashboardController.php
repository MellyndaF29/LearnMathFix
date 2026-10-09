<?php

namespace App\Http\Controllers;

use App\Models\QuizAttempt;
use App\Models\Topic;
use App\Models\UserAchievement;
use App\Models\UserProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $totalStars = QuizAttempt::where('user_id', $user->id)
            ->sum('correct_answers');

        $completedTopics = UserProgress::where('user_id', $user->id)
            ->where('is_completed', true)
            ->distinct('topic_id')
            ->count('topic_id');

        $totalTopics = Topic::where('is_published', true)->count();

        $recentQuiz = QuizAttempt::where('user_id', $user->id)
            ->with('topic:id,title,icon,slug')
            ->latest()
            ->first();

        $unlockedAchievements = UserAchievement::where('user_id', $user->id)
            ->with('achievement:id,title,icon,badge_color,description')
            ->latest('unlocked_at')
            ->take(3)
            ->get();

        $userLevel = max(1, (int) ($completedTopics / 2) + 1);

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalStars' => $totalStars,
                'completedTopics' => $completedTopics,
                'totalTopics' => $totalTopics,
                'userLevel' => $userLevel,
                'levelTitle' => $this->getLevelTitle($userLevel),
            ],
            'recentQuiz' => $recentQuiz,
            'recentAchievements' => $unlockedAchievements,
        ]);
    }

    private function getLevelTitle(int $level): string
    {
        return match (true) {
            $level >= 10 => 'Ahli Matematika',
            $level >= 7 => 'Penyihir Angka',
            $level >= 5 => 'Petualang Matematika',
            $level >= 3 => 'Pelajar Matematika',
            default => 'Pemula',
        };
    }
}
