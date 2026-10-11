<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Question;
use App\Models\QuizAttempt;
use App\Models\Topic;
use App\Models\UserAchievement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function show(Request $request, Topic $topic)
    {
        $userId = $request->user()->id;
        $passedLevels = QuizAttempt::where('user_id', $userId)
            ->where('topic_id', $topic->id)
            ->where('is_passed', true)
            ->pluck('quiz_level')
            ->toArray();

        $currentLevel = 1;
        if (in_array(1, $passedLevels)) {
            $currentLevel = 2;
        }
        if (in_array(2, $passedLevels)) {
            $currentLevel = 3;
        }
        if (in_array(3, $passedLevels)) {
            return redirect()->route('materi.show', $topic->slug)->with('success', 'Anda sudah menyelesaikan semua kuis untuk materi ini.');
        }

        $questions = $topic->questions()
            ->where('type', 'multiple_choice')
            ->where('quiz_level', $currentLevel)
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

        if ($questions->isEmpty()) {
            return redirect()->route('materi.show', $topic->slug)->with('error', 'Kuis untuk level ini belum tersedia.');
        }

        return Inertia::render('Quiz/Show', [
            'topic' => $topic->only(['id', 'title', 'slug', 'icon', 'color']),
            'questions' => $questions,
            'currentLevel' => $currentLevel,
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

        $userId = $request->user()->id;
        $passedLevels = QuizAttempt::where('user_id', $userId)
            ->where('topic_id', $topic->id)
            ->where('is_passed', true)
            ->pluck('quiz_level')
            ->toArray();

        $currentLevel = 1;
        if (in_array(1, $passedLevels)) {
            $currentLevel = 2;
        }
        if (in_array(2, $passedLevels)) {
            $currentLevel = 3;
        }

        $attempt = QuizAttempt::create([
            'user_id' => $userId,
            'topic_id' => $topic->id,
            'quiz_level' => $currentLevel,
            'score' => $score,
            'total_questions' => $totalQuestions,
            'correct_answers' => $correctAnswers,
            'answers' => $validated['answers'],
            'is_passed' => $isPassed,
        ]);

        // Recalculate latest passed levels AFTER saving this attempt
        $updatedPassedLevels = QuizAttempt::where('user_id', $userId)
            ->where('topic_id', $topic->id)
            ->where('is_passed', true)
            ->pluck('quiz_level')
            ->toArray();

        $availableLevels = $topic->questions()
            ->reorder()
            ->where('type', 'multiple_choice')
            ->select('quiz_level')
            ->distinct()
            ->orderBy('quiz_level')
            ->pluck('quiz_level')
            ->toArray();

        $nextLevel = null;
        if ($isPassed) {
            if ($currentLevel === 1 && ! in_array(2, $updatedPassedLevels)) {
                $nextLevel = 2;
            } elseif ($currentLevel === 2 && ! in_array(3, $updatedPassedLevels)) {
                $nextLevel = 3;
            }

            if ($nextLevel && ! in_array($nextLevel, $availableLevels)) {
                $nextLevel = null;
            }
        }

        $allLevelsPassed = true;
        $requiredLevelsToPass = count($availableLevels) > 0 ? $availableLevels : [1];
        foreach ($requiredLevelsToPass as $lvl) {
            if (! in_array($lvl, $updatedPassedLevels)) {
                $allLevelsPassed = false;
                break;
            }
        }

        // Check for achievements
        $this->checkAchievements($request->user()->id);

        return Inertia::render('Quiz/Result', [
            'topic' => $topic->only(['id', 'title', 'slug', 'icon']),
            'score' => $score,
            'correctAnswers' => $correctAnswers,
            'totalQuestions' => $totalQuestions,
            'isPassed' => $isPassed,
            'currentLevel' => $currentLevel,
            'nextLevel' => $nextLevel,
            'allLevelsPassed' => $allLevelsPassed,
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
