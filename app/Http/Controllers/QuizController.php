<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Question;
use App\Models\QuizAttempt;
use App\Models\Topic;
use App\Models\UserAchievement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    public function show(Topic $topic): Response
    {
        $questions = $topic->questions()
            ->where('type', 'multiple_choice')
            ->inRandomOrder()
            ->take(5)
            ->get()
            ->map(fn (Question $q) => [
                'id' => $q->id,
                'questionText' => $q->question_text,
                'imageUrl' => $q->image_url,
                'options' => $q->options,
                'type' => $q->type,
                // Don't expose correct_answer to client
            ]);

        return Inertia::render('Quiz/Show', [
            'topic' => $topic->only(['id', 'title', 'slug', 'icon', 'color']),
            'questions' => $questions,
        ]);
    }

    public function submit(Request $request, Topic $topic)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
        ]);

        $questions = $topic->questions()->whereIn('id', array_keys($validated['answers']))->get();

        $correctAnswers = 0;
        $totalQuestions = $questions->count();

        $review = [];
        foreach ($questions as $question) {
            $userAnswer = $validated['answers'][$question->id] ?? null;
            $isCorrect = $userAnswer === $question->correct_answer;
            if ($isCorrect) {
                $correctAnswers++;
            }

            $review[] = [
                'id' => $question->id,
                'questionText' => $question->question_text,
                'userAnswer' => $userAnswer,
                'userAnswerText' => $question->options[$userAnswer] ?? '-',
                'correctAnswer' => $question->correct_answer,
                'correctAnswerText' => $question->options[$question->correct_answer] ?? '-',
                'isCorrect' => $isCorrect,
                'explanation' => $question->explanation,
            ];
        }

        $score = $totalQuestions > 0 ? (int) round(($correctAnswers / $totalQuestions) * 100) : 0;
        $isPassed = $score >= 60;

        $attempt = QuizAttempt::create([
            'user_id' => $request->user()->id,
            'topic_id' => $topic->id,
            'score' => $score,
            'total_questions' => $totalQuestions,
            'correct_answers' => $correctAnswers,
            'answers' => $validated['answers'],
            'is_passed' => $isPassed,
        ]);

        // Check for achievements
        $this->checkAchievements($request->user()->id);

        return Inertia::render('Quiz/Result', [
            'topic' => $topic->only(['id', 'title', 'slug', 'icon']),
            'score' => $score,
            'correctAnswers' => $correctAnswers,
            'totalQuestions' => $totalQuestions,
            'isPassed' => $isPassed,
            'review' => $review,
        ]);
    }

    private function checkAchievements(int $userId): void
    {
        $quizCount = QuizAttempt::where('user_id', $userId)->where('is_passed', true)->count();

        $achievements = Achievement::where('condition_type', 'quiz_passed')
            ->where('condition_value', '<=', $quizCount)
            ->where('is_active', true)
            ->get();

        foreach ($achievements as $achievement) {
            UserAchievement::firstOrCreate(
                ['user_id' => $userId, 'achievement_id' => $achievement->id],
                ['unlocked_at' => now()]
            );
        }
    }
}
