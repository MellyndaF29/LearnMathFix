<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        $achievements = [
            [
                'title' => 'Pecinta Matematika',
                'description' => 'Selesaikan 5 materi',
                'icon' => '🎓',
                'badge_color' => '#1768bd',
                'condition_type' => 'topic_completed',
                'condition_value' => 5,
            ],
            [
                'title' => 'Si Jago Kuis',
                'description' => 'Dapatkan skor 100% di 1 kuis',
                'icon' => '🎯',
                'badge_color' => '#c9a45c',
                'condition_type' => 'quiz_passed',
                'condition_value' => 1,
            ],
            [
                'title' => 'Penjelajah',
                'description' => 'Selesaikan 1 part game',
                'icon' => '🗺️',
                'badge_color' => '#2f9461',
                'condition_type' => 'game_completed',
                'condition_value' => 1,
            ],
            [
                'title' => 'Master Matematika',
                'description' => 'Selesaikan semua topik',
                'icon' => '👑',
                'badge_color' => '#d0553a',
                'condition_type' => 'topic_completed',
                'condition_value' => 6,
            ],
        ];

        foreach ($achievements as $achievement) {
            Achievement::create($achievement);
        }
    }
}
