<?php

namespace Tests\Feature;

use App\Models\QuizAttempt;
use App\Models\Topic;
use App\Models\User;
use Database\Seeders\TopicSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QuizAndGameProgressionTest extends TestCase
{
    use RefreshDatabase;

    public function test_game_stage_is_locked_until_quiz_level_three_is_passed(): void
    {
        $this->seed(TopicSeeder::class);

        $user = User::factory()->create();

        // Topic 1
        $topic = Topic::where('order', 1)->first();

        // 1. Without Quiz Level 3, Stage 1 must be locked and cannot be played
        $response = $this->actingAs($user)->get(route('game.play', 1));
        $response->assertRedirect(route('game.index'));

        // 2. Passing Quiz Level 1 still leaves Stage 1 locked
        QuizAttempt::create([
            'user_id' => $user->id,
            'topic_id' => $topic->id,
            'quiz_level' => 1,
            'score' => 100,
            'total_questions' => 5,
            'correct_answers' => 5,
            'answers' => [],
            'is_passed' => true,
        ]);

        $response = $this->actingAs($user)->get(route('game.play', 1));
        $response->assertRedirect(route('game.index'));

        // 3. Passing Quiz Level 2 still leaves Stage 1 locked
        QuizAttempt::create([
            'user_id' => $user->id,
            'topic_id' => $topic->id,
            'quiz_level' => 2,
            'score' => 100,
            'total_questions' => 5,
            'correct_answers' => 5,
            'answers' => [],
            'is_passed' => true,
        ]);

        $response = $this->actingAs($user)->get(route('game.play', 1));
        $response->assertRedirect(route('game.index'));

        // 4. Passing Quiz Level 3 unlocks Stage 1
        QuizAttempt::create([
            'user_id' => $user->id,
            'topic_id' => $topic->id,
            'quiz_level' => 3,
            'score' => 100,
            'total_questions' => 5,
            'correct_answers' => 5,
            'answers' => [],
            'is_passed' => true,
        ]);

        $response = $this->actingAs($user)->get(route('game.play', 1));
        $response->assertOk();
    }

    public function test_quiz_stages_advance_sequentially(): void
    {
        $this->seed(TopicSeeder::class);

        $user = User::factory()->create();
        $topic = Topic::where('order', 1)->first();

        // Level 1 by default
        $response = $this->actingAs($user)->get(route('quiz.show', $topic->slug));
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->where('currentLevel', 1));

        // Pass Level 1 -> now serves Level 2
        QuizAttempt::create([
            'user_id' => $user->id,
            'topic_id' => $topic->id,
            'quiz_level' => 1,
            'score' => 100,
            'total_questions' => 5,
            'correct_answers' => 5,
            'answers' => [],
            'is_passed' => true,
        ]);

        $response = $this->actingAs($user)->get(route('quiz.show', $topic->slug));
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->where('currentLevel', 2));

        // Pass Level 2 -> now serves Level 3
        QuizAttempt::create([
            'user_id' => $user->id,
            'topic_id' => $topic->id,
            'quiz_level' => 2,
            'score' => 100,
            'total_questions' => 5,
            'correct_answers' => 5,
            'answers' => [],
            'is_passed' => true,
        ]);

        $response = $this->actingAs($user)->get(route('quiz.show', $topic->slug));
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->where('currentLevel', 3));

        // Pass Level 3 -> all quizzes completed, redirects to materi
        QuizAttempt::create([
            'user_id' => $user->id,
            'topic_id' => $topic->id,
            'quiz_level' => 3,
            'score' => 100,
            'total_questions' => 5,
            'correct_answers' => 5,
            'answers' => [],
            'is_passed' => true,
        ]);

        $response = $this->actingAs($user)->get(route('quiz.show', $topic->slug));
        $response->assertRedirect(route('materi.show', $topic->slug));
    }

    public function test_stage_five_unlocks_only_after_all_topics_pass_level_three(): void
    {
        $this->seed(TopicSeeder::class);

        $user = User::factory()->create();
        $topics = Topic::where('is_published', true)->orderBy('order')->get();

        // Pass Level 3 for only the first 3 topics
        foreach ($topics->take(3) as $t) {
            QuizAttempt::create([
                'user_id' => $user->id,
                'topic_id' => $t->id,
                'quiz_level' => 3,
                'score' => 100,
                'total_questions' => 5,
                'correct_answers' => 5,
                'answers' => [],
                'is_passed' => true,
            ]);
        }

        // Stage 5 must still be locked
        $response = $this->actingAs($user)->get(route('game.play', 5));
        $response->assertRedirect(route('game.index'));

        // Pass Level 3 for the remaining 4th topic
        $lastTopic = $topics->get(3);
        QuizAttempt::create([
            'user_id' => $user->id,
            'topic_id' => $lastTopic->id,
            'quiz_level' => 3,
            'score' => 100,
            'total_questions' => 5,
            'correct_answers' => 5,
            'answers' => [],
            'is_passed' => true,
        ]);

        // Now Stage 5 must be unlocked!
        $response = $this->actingAs($user)->get(route('game.play', 5));
        $response->assertOk();
    }
}
