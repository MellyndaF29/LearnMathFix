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
            'name' => 'Alex',
            'email' => 'alex@example.com',
            'password' => bcrypt('password'), // password
        ]);

        $this->call([
            TopicSeeder::class,
            GameSeeder::class,
            AchievementSeeder::class,
        ]);
    }
}
