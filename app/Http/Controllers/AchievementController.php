<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\QuizAttempt;
use App\Models\UserAchievement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        $allAchievements = Achievement::where('is_active', true)->get();
        $unlockedIds = UserAchievement::where('user_id', $userId)->pluck('achievement_id')->toArray();

        $achievements = $allAchievements->map(fn (Achievement $a) => [
            'id' => $a->id,
            'title' => $a->title,
            'description' => $a->description,
            'icon' => $a->icon,
            'badgeColor' => $a->badge_color,
            'isUnlocked' => in_array($a->id, $unlockedIds, true),
            'unlockedAt' => UserAchievement::where('user_id', $userId)
                ->where('achievement_id', $a->id)
                ->value('unlocked_at'),
        ]);

        $user = $request->user();
        $totalStars = QuizAttempt::where('user_id', $userId)->sum('correct_answers');

        $totalXp = ($totalStars * 5) + ($achievements->where('isUnlocked', true)->count() * 10);
        $userLevel = max(1, min(10, (int) floor($totalXp / 50) + 1));

        return Inertia::render('Pencapaian', [
            'achievements' => $achievements,
            'totalStars' => $totalStars,
            'totalXp' => $totalXp,
            'userName' => $user->name,
            'userLevel' => $userLevel,
        ]);
    }
}
