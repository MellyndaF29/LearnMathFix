<?php

namespace App\Http\Controllers;

use App\Models\QuizAttempt;
use App\Models\Section;
use App\Models\Topic;
use App\Models\UserProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MateriController extends Controller
{
    public function index(Request $request): Response
    {
        $topics = Topic::where('is_published', true)
            ->orderBy('order')
            ->get()
            ->map(function (Topic $topic) use ($request) {
                $progress = UserProgress::where('user_id', $request->user()->id)
                    ->where('topic_id', $topic->id)
                    ->where('is_completed', true)
                    ->count();

                return [
                    'id' => $topic->id,
                    'title' => $topic->title,
                    'slug' => $topic->slug,
                    'icon' => $topic->icon,
                    'category' => $topic->category,
                    'description' => $topic->description,
                    'color' => $topic->color,
                    'difficulty' => $topic->difficulty,
                    'totalMateri' => $topic->total_materi,
                    'totalKuis' => $topic->total_kuis,
                    'progress' => $progress,
                ];
            });

        $categories = $topics->pluck('category')->unique()->values();

        return Inertia::render('Materi/Index', [
            'topics' => $topics,
            'categories' => $categories,
        ]);
    }

    public function show(Request $request, Topic $topic): Response
    {
        $sections = $topic->sections()->get(['id', 'title', 'content', 'order', 'type']);

        $completedSections = UserProgress::where('user_id', $request->user()->id)
            ->where('topic_id', $topic->id)
            ->where('is_completed', true)
            ->pluck('section_id')
            ->toArray();

        $passedLevels = QuizAttempt::where('user_id', $request->user()->id)
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

        return Inertia::render('Materi/Show', [
            'topic' => $topic->only(['id', 'title', 'slug', 'icon', 'description', 'color', 'difficulty']),
            'sections' => $sections,
            'completedSections' => $completedSections,
            'passedLevels' => $passedLevels,
            'availableLevels' => $availableLevels,
        ]);
    }

    public function completeSection(Request $request, Topic $topic, Section $section)
    {
        UserProgress::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'topic_id' => $topic->id,
                'section_id' => $section->id,
            ],
            [
                'is_completed' => true,
                'completed_at' => now(),
            ]
        );

        return back();
    }
}
