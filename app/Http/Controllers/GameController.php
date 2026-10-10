<?php

namespace App\Http\Controllers;

use App\Models\GameProgress;
use App\Models\Question;
use App\Models\QuizAttempt;
use App\Models\Topic;
use App\Models\UserProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    private const STAGE_COUNT = 5;

    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        // Ensure game stages are initialized
        $this->initializeGameStages($userId);

        // Update unlock status based on Topic completion (Quiz level 3 passed)
        $topics = Topic::orderBy('order')->get();
        foreach ($topics as $index => $topic) {
            $stage = $index + 1;

            $passedLevels = QuizAttempt::where('user_id', $userId)
                ->where('topic_id', $topic->id)
                ->where('is_passed', true)
                ->pluck('quiz_level')
                ->toArray();

            $availableLevels = $topic->questions()
                ->where('type', 'multiple_choice')
                ->select('quiz_level')
                ->distinct()
                ->pluck('quiz_level')
                ->toArray();

            $maxAvailableLevel = count($availableLevels) > 0 ? max($availableLevels) : 0;

            if ($maxAvailableLevel > 0) {
                // Unlocked if they passed the highest available quiz level for this topic
                $isUnlocked = in_array($maxAvailableLevel, $passedLevels);
            } else {
                // If no quizzes exist, unlock if they completed all sections
                $sectionsCount = $topic->sections()->count();
                $completedCount = UserProgress::where('user_id', $userId)
                    ->where('topic_id', $topic->id)
                    ->where('is_completed', true)
                    ->count();
                $isUnlocked = $sectionsCount > 0 && $completedCount >= $sectionsCount;
            }

            GameProgress::where('user_id', $userId)
                ->where('stage', $stage)
                ->update(['is_unlocked' => $isUnlocked]);
        }

        $stages = GameProgress::where('user_id', $userId)
            ->orderBy('stage')
            ->get()
            ->map(fn (GameProgress $gp) => [
                'stage' => $gp->stage,
                'isUnlocked' => $gp->is_unlocked,
                'isCompleted' => $gp->is_completed,
                'stars' => $gp->stars,
                'bestScore' => $gp->best_score,
                'label' => $this->getStageLabel($gp->stage),
                'description' => $this->getStageDescription($gp->stage),
            ]);

        return Inertia::render('Game/Index', [
            'stages' => $stages,
        ]);
    }

    public function play(Request $request, int $stage): Response
    {
        $userId = $request->user()->id;
        $gameProgress = GameProgress::where('user_id', $userId)
            ->where('stage', $stage)
            ->firstOrFail();

        if (! $gameProgress->is_unlocked) {
            return redirect()->route('game.index');
        }

        $topicForStage = Topic::where('order', $stage)->where('is_published', true)->first()
            ?? Topic::where('is_published', true)->first();

        $questions = collect();
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
        }

        // If no game questions, use multiple choice questions instead
        if ($questions->isEmpty() && $topicForStage) {
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

        return Inertia::render('Game/Play', [
            'stage' => $stage,
            'stageLabel' => $this->getStageLabel($stage),
            'questions' => $questions,
            'currentStars' => $gameProgress->stars,
            'playerPosition' => [
                'x' => $gameProgress->player_x ?? 50,
                'y' => $gameProgress->player_y ?? 50,
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

        $progress = GameProgress::where('user_id', $userId)->where('stage', $stage)->first();
        if ($progress) {
            $progress->update([
                'is_completed' => true,
                'stars' => max($progress->stars, $stars),
                'best_score' => max($progress->best_score, $correctCount),
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
