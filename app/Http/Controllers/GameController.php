<?php

namespace App\Http\Controllers;

use App\Models\GameProgress;
use App\Models\Question;
use App\Models\QuizAttempt;
use App\Models\Topic;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    private const STAGE_COUNT = 5;

    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        // Ensure game stages are initialized and unlock statuses are up to date
        $this->initializeGameStages($userId);
        $this->updateUnlockStatuses($userId);

        $topics = Topic::where('is_published', true)->orderBy('order')->get()->keyBy('order');

        $stages = GameProgress::where('user_id', $userId)
            ->orderBy('stage')
            ->get()
            ->map(function (GameProgress $gp) use ($topics) {
                $topic = $topics->get($gp->stage);

                return [
                    'stage' => $gp->stage,
                    'isUnlocked' => $gp->is_unlocked,
                    'isCompleted' => $gp->is_completed,
                    'stars' => $gp->stars,
                    'bestScore' => $gp->best_score,
                    'label' => $this->getStageLabel($gp->stage),
                    'description' => $this->getStageDescription($gp->stage),
                    'topicSlug' => $topic?->slug,
                    'topicTitle' => $topic?->title,
                ];
            });

        return Inertia::render('Game/Index', [
            'stages' => $stages,
        ]);
    }

    public function play(Request $request, int $stage): Response|RedirectResponse
    {
        $userId = $request->user()->id;

        // Always sync unlock status first
        $this->initializeGameStages($userId);
        $this->updateUnlockStatuses($userId);

        $gameProgress = GameProgress::where('user_id', $userId)
            ->where('stage', $stage)
            ->firstOrFail();

        if (! $gameProgress->is_unlocked) {
            return redirect()->route('game.index')->with('error', 'Selesaikan Kuis Level 3 untuk membuka peta ini!');
        }

        $questions = collect();

        if ($stage === 5) {
            // Stage 5 is the final mixed summit: pick 9 random questions from all topics
            $questions = Question::where('type', 'multiple_choice')
                ->inRandomOrder()
                ->take(9)
                ->get()
                ->map(fn (Question $q) => [
                    'id' => $q->id,
                    'questionText' => $q->question_text,
                    'options' => $q->options,
                    'correctAnswer' => $q->correct_answer,
                ]);
        } else {
            $topicForStage = Topic::where('order', $stage)->where('is_published', true)->first();

            if ($topicForStage) {
                $questions = $topicForStage->questions()
                    ->where('type', 'game')
                    ->inRandomOrder()
                    ->take(9)
                    ->get()
                    ->map(fn (Question $q) => [
                        'id' => $q->id,
                        'questionText' => $q->question_text,
                        'options' => $q->options,
                        'correctAnswer' => $q->correct_answer,
                    ]);

                // Fallback to multiple choice if no dedicated game questions
                if ($questions->isEmpty()) {
                    $questions = $topicForStage->questions()
                        ->where('type', 'multiple_choice')
                        ->inRandomOrder()
                        ->take(9)
                        ->get()
                        ->map(fn (Question $q) => [
                            'id' => $q->id,
                            'questionText' => $q->question_text,
                            'options' => $q->options,
                            'correctAnswer' => $q->correct_answer,
                        ]);
                }
            }
        }

        return Inertia::render('Game/Play', [
            'stage' => $stage,
            'stageLabel' => $this->getStageLabel($stage),
            'questions' => $questions,
            'currentStars' => $gameProgress->stars,
            'playerPosition' => [
                'x' => (float) ($gameProgress->player_x ?? 50),
                'y' => (float) ($gameProgress->player_y ?? 50),
            ],
            'activeCheckpoint' => $gameProgress->active_checkpoint,
            'completedCheckpoints' => $gameProgress->completed_checkpoints ?? [],
        ]);
    }

    public function saveProgress(Request $request, int $stage)
    {
        $validated = $request->validate([
            'player_x' => 'required|numeric|min:0|max:100',
            'player_y' => 'required|numeric|min:0|max:100',
            'active_checkpoint' => 'nullable|integer|min:0',
            'completed_checkpoints' => 'nullable|array',
            'completed_checkpoints.*' => 'integer',
        ]);

        $userId = $request->user()->id;

        $progress = GameProgress::where('user_id', $userId)->where('stage', $stage)->first();
        if ($progress) {
            $progress->update([
                'player_x' => $validated['player_x'],
                'player_y' => $validated['player_y'],
                'active_checkpoint' => $validated['active_checkpoint'],
                'completed_checkpoints' => $validated['completed_checkpoints'] ?? [],
            ]);
        }

        return response()->json(['success' => true]);
    }

    public function submitStage(Request $request, int $stage)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
            'totalCount' => 'required|integer|min:1',
            'score' => 'nullable|integer|min:0',
        ]);

        $userId = $request->user()->id;

        // Server-side validation of answers
        $correctCount = 0;
        foreach ($validated['answers'] as $questionId => $userAnswer) {
            $question = Question::find($questionId);
            if ($question && $question->correct_answer === $userAnswer) {
                $correctCount++;
            }
        }

        $stars = $this->calculateStars($correctCount, $validated['totalCount']);
        $finalScore = $validated['score'] ?? ($correctCount * 100);

        $progress = GameProgress::where('user_id', $userId)->where('stage', $stage)->first();
        if ($progress) {
            $progress->update([
                'is_completed' => true,
                'stars' => max($progress->stars, $stars),
                'best_score' => max($progress->best_score, $finalScore),
                'player_x' => 50,
                'player_y' => 50,
                'active_checkpoint' => null,
                'completed_checkpoints' => [],
            ]);
        }

        return redirect()->route('game.index')->with('success', "Stage selesai! Kamu mendapat {$stars} bintang.");
    }

    private function initializeGameStages(int $userId): void
    {
        for ($i = 1; $i <= self::STAGE_COUNT; $i++) {
            GameProgress::firstOrCreate(
                ['user_id' => $userId, 'stage' => $i],
                ['is_unlocked' => false, 'is_completed' => false, 'stars' => 0, 'best_score' => 0]
            );
        }
    }

    private function updateUnlockStatuses(int $userId): void
    {
        $topics = Topic::where('is_published', true)->orderBy('order')->get();
        $allQuizLevel3Passed = true;

        foreach ($topics as $index => $topic) {
            $stage = $index + 1;
            $hasPassedLevel3 = QuizAttempt::where('user_id', $userId)
                ->where('topic_id', $topic->id)
                ->where('quiz_level', 3)
                ->where('is_passed', true)
                ->exists();

            if (! $hasPassedLevel3) {
                $allQuizLevel3Passed = false;
            }

            GameProgress::where('user_id', $userId)
                ->where('stage', $stage)
                ->update(['is_unlocked' => $hasPassedLevel3]);
        }

        // Stage 5 is unlocked only if all published topics have passed quiz level 3
        GameProgress::where('user_id', $userId)
            ->where('stage', 5)
            ->update(['is_unlocked' => $allQuizLevel3Passed && $topics->count() > 0]);
    }

    private function calculateStars(int $correct, int $total): int
    {
        $ratio = $total > 0 ? $correct / $total : 0;

        return match (true) {
            $ratio >= 0.9 => 3,
            $ratio >= 0.7 => 2,
            $ratio >= 0.5 => 1,
            default => 0,
        };
    }

    private function getStageLabel(int $stage): string
    {
        return match ($stage) {
            1 => 'Hutan Matematika',
            2 => 'Kastil Pecahan',
            3 => 'Menara Geometri',
            4 => 'Labirin Pola',
            5 => 'Menara Angka',
            default => "Part $stage",
        };
    }

    private function getStageDescription(int $stage): string
    {
        return match ($stage) {
            1 => 'Operasi Hitung Dasar',
            2 => 'Pecahan & Desimal',
            3 => 'Bangun Datar & Ruang',
            4 => 'Pola Bilangan',
            5 => 'Campuran Soal',
            default => "Tahap $stage",
        };
    }
}
