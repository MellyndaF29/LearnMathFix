<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin Alex',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'), // password
            'is_admin' => true,
        ]);

        $this->call([
            TopicSeeder::class,
            QuizLevel2And3Seeder::class,
            GameSeeder::class,
            AchievementSeeder::class,
        ]);
    }
}
