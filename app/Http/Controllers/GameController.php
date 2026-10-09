<?php

namespace App\Http\Controllers;

use App\Models\GameProgress;
use App\Models\Question;
use App\Models\Topic;
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

        return Inertia::render('Game/Play', [
            'stage' => $stage,
            'stageLabel' => $this->getStageLabel($stage),
            'questions' => $questions,
            'currentStars' => $gameProgress->stars,
        ]);
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
            ]);

            // Unlock next stage
            GameProgress::where('user_id', $userId)
                ->where('stage', $stage + 1)
                ->update(['is_unlocked' => true]);
        }

        return redirect()->route('game.index')->with('success', "Stage selesai! Kamu mendapat {$stars} bintang.");
    }

    private function initializeGameStages(int $userId): void
    {
        for ($i = 1; $i <= self::STAGE_COUNT; $i++) {
            GameProgress::firstOrCreate(
                ['user_id' => $userId, 'stage' => $i],
                ['is_unlocked' => $i === 1, 'is_completed' => false, 'stars' => 0, 'best_score' => 0]
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
