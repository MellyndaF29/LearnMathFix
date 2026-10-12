<?php

namespace Tests\Feature;

use App\Models\Question;
use App\Models\Topic;
use App\Models\User;
use Database\Seeders\TopicSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminQuestionManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_cannot_access_quiz_and_game_management(): void
    {
        $this->seed(TopicSeeder::class);

        $regularUser = User::factory()->create(['is_admin' => false]);

        // Regular user cannot access /admin/kuis
        $this->actingAs($regularUser)
            ->get(route('admin.quiz'))
            ->assertStatus(403);

        // Regular user cannot access /admin/game
        $this->actingAs($regularUser)
            ->get(route('admin.game'))
            ->assertStatus(403);

        // Regular user cannot create game questions
        $this->actingAs($regularUser)
            ->get(route('admin.game.questions.create'))
            ->assertStatus(403);

        // Guest is redirected to login
        auth()->logout();
        $this->get(route('admin.quiz'))
            ->assertRedirect(route('login'));
        $this->get(route('admin.game'))
            ->assertRedirect(route('login'));
    }

    public function test_admin_can_view_quiz_3_tahap_and_game_management(): void
    {
        $this->seed(TopicSeeder::class);

        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)
            ->get(route('admin.quiz'))
            ->assertOk();

        $this->actingAs($admin)
            ->get(route('admin.game'))
            ->assertOk();
    }

    public function test_admin_can_create_and_edit_quiz_stage_questions(): void
    {
        $this->seed(TopicSeeder::class);

        $admin = User::factory()->create(['is_admin' => true]);
        $topic = Topic::where('order', 1)->firstOrFail();

        // 1. Create a quiz question for Tahap 2
        $response = $this->actingAs($admin)
            ->post(route('admin.questions.store', $topic->id), [
                'question_text' => 'Berapakah nilai dari 1/2 + 1/4?',
                'options' => ['1/4', '3/4', '2/4', '1'],
                'correct_answer' => '3/4',
                'explanation' => 'Samakan penyebut menjadi 2/4 + 1/4 = 3/4',
                'type' => 'multiple_choice',
                'difficulty' => 'Sedang',
                'quiz_level' => 2,
                'order' => 10,
            ]);

        $response->assertRedirect(route('admin.questions', $topic->id));

        $question = Question::where('question_text', 'Berapakah nilai dari 1/2 + 1/4?')->first();
        $this->assertNotNull($question);
        $this->assertEquals(2, $question->quiz_level);
        $this->assertEquals('B', $question->correct_answer);
        $this->assertEquals('multiple_choice', $question->type);

        // 2. Edit that quiz question to Tahap 3
        $editResponse = $this->actingAs($admin)
            ->put(route('admin.questions.update', [$topic->id, $question->id]), [
                'question_text' => 'Berapakah nilai dari 1/2 + 1/4? (Revisi)',
                'options' => ['1/4', '3/4', '2/4', '1'],
                'correct_answer' => '3/4',
                'explanation' => 'Penjelasan baru',
                'type' => 'multiple_choice',
                'difficulty' => 'Sulit',
                'quiz_level' => 3,
                'order' => 12,
            ]);

        $editResponse->assertRedirect(route('admin.questions', $topic->id));

        $question->refresh();
        $this->assertEquals('Berapakah nilai dari 1/2 + 1/4? (Revisi)', $question->question_text);
        $this->assertEquals(3, $question->quiz_level);
        $this->assertEquals('Sulit', $question->difficulty);
    }

    public function test_admin_can_create_and_edit_game_penjelajahan_questions(): void
    {
        $this->seed(TopicSeeder::class);

        $admin = User::factory()->create(['is_admin' => true]);

        // 1. Create a game question for Stage 1 (Hutan Matematika)
        $response = $this->actingAs($admin)
            ->post(route('admin.game.questions.store'), [
                'stage' => 1,
                'question_text' => 'Di hutan matematika, kamu menemukan 3 apel ajaib dan mendapat 4 lagi. Berapa total apelmu?',
                'options' => ['5', '6', '7', '8'],
                'correct_answer' => '7',
                'explanation' => '3 + 4 = 7 apel',
                'difficulty' => 'Mudah',
                'order' => 1,
            ]);

        $response->assertRedirect(route('admin.game', ['stage' => 1]));

        $gameQuestion = Question::where('question_text', 'like', '%Di hutan matematika, kamu menemukan 3 apel%')->first();
        $this->assertNotNull($gameQuestion);
        $this->assertEquals('game', $gameQuestion->type);
        $this->assertEquals('C', $gameQuestion->correct_answer);
        $this->assertEquals(1, $gameQuestion->quiz_level);

        // 2. Edit that game question to Stage 2
        $editResponse = $this->actingAs($admin)
            ->put(route('admin.game.questions.update', $gameQuestion->id), [
                'stage' => 2,
                'question_text' => 'Di kastil pecahan, kamu membelah 1 kristal menjadi 2 bagian sama besar...',
                'options' => ['1/2', '1/3', '1/4', '1'],
                'correct_answer' => '1/2',
                'explanation' => 'Setengah kristal adalah 1/2',
                'difficulty' => 'Sedang',
                'order' => 2,
            ]);

        $editResponse->assertRedirect(route('admin.game', ['stage' => 2]));

        $gameQuestion->refresh();
        $this->assertEquals('Di kastil pecahan, kamu membelah 1 kristal menjadi 2 bagian sama besar...', $gameQuestion->question_text);
        $this->assertEquals('A', $gameQuestion->correct_answer);
        $this->assertEquals(2, $gameQuestion->quiz_level);

        // 3. Delete game question
        $deleteResponse = $this->actingAs($admin)
            ->delete(route('admin.game.questions.destroy', $gameQuestion->id));

        $deleteResponse->assertRedirect(route('admin.game', ['stage' => 2]));
        $this->assertDatabaseMissing('questions', ['id' => $gameQuestion->id]);
    }
}
