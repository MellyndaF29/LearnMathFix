<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Topic;
use App\Models\UserProgress;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        // Stars from quiz + game
        $quizStars = $user->quizAttempts()->sum('correct_answers');
        $gameStars = $user->gameProgresses()->sum('stars');
        $totalStars = $quizStars + $gameStars;

        $completedTopics = UserProgress::where('user_id', $user->id)
            ->where('is_completed', true)
            ->count();

        $totalTopics = Topic::where('is_published', true)->count();

        // XP = stars * 5 (same as AchievementController)
        $totalXp = $totalStars * 5;

        // Level = floor(totalXp / 50) + 1, capped at 10
        $level = max(1, min(10, (int) floor($totalXp / 50) + 1));

        // Same titles as Pencapaian page
        $levelTitles = [
            1 => 'Pemula',
            2 => 'Pelajar Matematika',
            3 => 'Petualang Matematika',
            5 => 'Penyihir Angka',
            7 => 'Ahli Matematika',
        ];
        $levelTitle = 'Pemula';
        foreach ($levelTitles as $threshold => $title) {
            if ($level >= $threshold) {
                $levelTitle = $title;
            }
        }

        // XP within current level (for bar display)
        $currentLevelFloor = ($level - 1) * 50;
        $xpIntoLevel = $totalXp - $currentLevelFloor;

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'stats' => [
                'totalStars' => $totalStars,
                'completedTopics' => $completedTopics,
                'totalTopics' => $totalTopics,
                'totalXp' => $totalXp,
                'xpIntoLevel' => $xpIntoLevel,
                'level' => $level,
                'levelTitle' => $levelTitle,
            ],
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
