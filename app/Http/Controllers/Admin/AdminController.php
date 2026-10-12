<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\QuizAttempt;
use App\Models\Section;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    // ─── Dashboard ────────────────────────────────────────────────────

    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalUsers' => User::count(),
                'totalTopics' => Topic::count(),
                'totalSections' => Section::count(),
                'totalQuestions' => Question::count(),
                'quizQuestions' => Question::where('type', '!=', 'game')->count(),
                'gameQuestions' => Question::where('type', 'game')->count(),
                'publishedTopics' => Topic::where('is_published', true)->count(),
                'quizAttempts' => QuizAttempt::count(),
            ],
            'recentUsers' => User::latest()->take(5)->get(['id', 'name', 'email', 'is_admin', 'created_at']),
        ]);
    }

    // ─── Users ────────────────────────────────────────────────────────

    public function users(Request $request): Response
    {
        $users = User::query()
            ->when($request->search, fn ($q) => $q->where('name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%"))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only('search'),
        ]);
    }

    public function createUser(): Response
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function storeUser(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'is_admin' => 'nullable|boolean',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'email_verified_at' => now(),
            'is_admin' => $request->boolean('is_admin'),
        ]);

        return redirect()->route('admin.users')->with('success', "Akun untuk {$user->name} ({$user->email}) berhasil dibuat dan langsung aktif.");
    }

    public function toggleAdmin(User $user): RedirectResponse
    {
        $user->update(['is_admin' => ! $user->is_admin]);

        return back()->with('success', $user->is_admin
            ? "{$user->name} sekarang adalah admin."
            : "Hak admin {$user->name} telah dicabut.");
    }

    public function destroyUser(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Anda tidak bisa menghapus akun Anda sendiri.');
        }

        $user->delete();

        return back()->with('success', "Pengguna {$user->name} berhasil dihapus.");
    }

    // ─── Topics ───────────────────────────────────────────────────────

    public function topics(): Response
    {
        $topics = Topic::withCount(['sections', 'questions'])
            ->orderBy('order')
            ->get();

        return Inertia::render('Admin/Topics/Index', [
            'topics' => $topics,
        ]);
    }

    public function createTopic(): Response
    {
        return Inertia::render('Admin/Topics/Create');
    }

    public function storeTopic(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'difficulty' => ['required', Rule::in(['Mudah', 'Sedang', 'Sulit'])],
            'order' => 'nullable|integer|min:0',
            'is_published' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['total_materi'] = 0;
        $validated['total_kuis'] = 0;

        Topic::create($validated);

        return redirect()->route('admin.topics')->with('success', 'Topik berhasil ditambahkan.');
    }

    public function editTopic(Topic $topic): Response
    {
        return Inertia::render('Admin/Topics/Edit', [
            'topic' => $topic,
        ]);
    }

    public function updateTopic(Request $request, Topic $topic): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'difficulty' => ['required', Rule::in(['Mudah', 'Sedang', 'Sulit'])],
            'order' => 'nullable|integer|min:0',
            'is_published' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        $topic->update($validated);

        return redirect()->route('admin.topics')->with('success', 'Topik berhasil diperbarui.');
    }

    public function destroyTopic(Topic $topic): RedirectResponse
    {
        $topic->delete();

        return back()->with('success', 'Topik berhasil dihapus.');
    }

    // ─── Sections ─────────────────────────────────────────────────────

    public function sections(Topic $topic): Response
    {
        $sections = $topic->sections()->orderBy('order')->get();

        return Inertia::render('Admin/Sections/Index', [
            'topic' => $topic,
            'sections' => $sections,
        ]);
    }

    public function createSection(Topic $topic): Response
    {
        return Inertia::render('Admin/Sections/Create', [
            'topic' => $topic,
        ]);
    }

    public function storeSection(Request $request, Topic $topic): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => ['required', Rule::in(['text', 'video', 'interactive'])],
            'order' => 'nullable|integer|min:0',
        ]);

        $topic->sections()->create($validated);
        $topic->increment('total_materi');

        return redirect()->route('admin.sections', $topic)->with('success', 'Materi berhasil ditambahkan.');
    }

    public function editSection(Topic $topic, Section $section): Response
    {
        return Inertia::render('Admin/Sections/Edit', [
            'topic' => $topic,
            'section' => $section,
        ]);
    }

    public function updateSection(Request $request, Topic $topic, Section $section): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => ['required', Rule::in(['text', 'video', 'interactive'])],
            'order' => 'nullable|integer|min:0',
        ]);

        $section->update($validated);

        return redirect()->route('admin.sections', $topic)->with('success', 'Materi berhasil diperbarui.');
    }

    public function destroySection(Topic $topic, Section $section): RedirectResponse
    {
        $section->delete();
        $topic->decrement('total_materi');

        return back()->with('success', 'Materi berhasil dihapus.');
    }

    // ─── Questions ────────────────────────────────────────────────────

    // ─── Kuis 3 Tahap ──────────────────────────────────────────────────

    public function quizQuestions(Request $request): Response
    {
        $topics = Topic::with(['questions' => function ($q) {
            $q->where('type', '!=', 'game')->orderBy('quiz_level')->orderBy('order');
        }])->orderBy('order')->get();

        $selectedTopicId = $request->input('topic_id') ? (int) $request->input('topic_id') : ($topics->first()?->id ?? 0);
        $selectedTopic = $topics->firstWhere('id', $selectedTopicId) ?? $topics->first();

        $selectedLevel = (int) $request->input('level', 1);
        if ($selectedLevel < 1 || $selectedLevel > 3) {
            $selectedLevel = 1;
        }

        return Inertia::render('Admin/Quiz/Index', [
            'topics' => $topics->map(fn ($t) => [
                'id' => $t->id,
                'title' => $t->title,
                'slug' => $t->slug,
                'order' => $t->order,
                'icon' => $t->icon,
                'color' => $t->color,
                'level1Count' => $t->questions->where('quiz_level', 1)->count(),
                'level2Count' => $t->questions->where('quiz_level', 2)->count(),
                'level3Count' => $t->questions->where('quiz_level', 3)->count(),
                'totalCount' => $t->questions->count(),
            ]),
            'selectedTopic' => $selectedTopic ? [
                'id' => $selectedTopic->id,
                'title' => $selectedTopic->title,
                'slug' => $selectedTopic->slug,
                'order' => $selectedTopic->order,
                'icon' => $selectedTopic->icon,
                'color' => $selectedTopic->color,
            ] : null,
            'selectedLevel' => $selectedLevel,
            'questions' => $selectedTopic ? $selectedTopic->questions->values() : [],
        ]);
    }

    // ─── Game Penjelajahan ─────────────────────────────────────────────

    private function getGameStages(): array
    {
        return [
            1 => [
                'stage' => 1,
                'name' => 'Hutan Matematika',
                'description' => 'Operasi Hitung Dasar',
                'icon' => '🌲',
                'color' => '#34d399',
            ],
            2 => [
                'stage' => 2,
                'name' => 'Kastil Pecahan',
                'description' => 'Pecahan & Desimal',
                'icon' => '🏰',
                'color' => '#60a5fa',
            ],
            3 => [
                'stage' => 3,
                'name' => 'Menara Geometri',
                'description' => 'Bangun Datar & Ruang',
                'icon' => '🗼',
                'color' => '#a78bfa',
            ],
            4 => [
                'stage' => 4,
                'name' => 'Labirin Pola',
                'description' => 'Pola Bilangan',
                'icon' => '🌀',
                'color' => '#f59e0b',
            ],
            5 => [
                'stage' => 5,
                'name' => 'Menara Angka',
                'description' => 'Campuran Soal & Tantangan Puncak',
                'icon' => '👑',
                'color' => '#ec4899',
            ],
        ];
    }

    public function gameQuestions(Request $request): Response
    {
        $selectedStage = (int) $request->input('stage', 1);
        if ($selectedStage < 1 || $selectedStage > 5) {
            $selectedStage = 1;
        }

        $stages = $this->getGameStages();
        $topics = Topic::orderBy('order')->get();

        $allGameQuestions = Question::where('type', 'game')
            ->with('topic')
            ->orderBy('order')
            ->get();

        foreach ($stages as $stageNum => &$stageInfo) {
            $stageQuestions = $allGameQuestions->filter(function (Question $q) use ($stageNum) {
                if ($stageNum === 5) {
                    return $q->quiz_level === 5 || ($q->topic && $q->topic->order === 5);
                }

                return ($q->topic && $q->topic->order === $stageNum) && $q->quiz_level !== 5;
            });
            $stageInfo['questionsCount'] = $stageQuestions->count();
        }
        unset($stageInfo);

        $questions = $allGameQuestions->filter(function (Question $q) use ($selectedStage) {
            if ($selectedStage === 5) {
                return $q->quiz_level === 5 || ($q->topic && $q->topic->order === 5);
            }

            return ($q->topic && $q->topic->order === $selectedStage) && $q->quiz_level !== 5;
        })->values();

        return Inertia::render('Admin/Game/Index', [
            'stages' => array_values($stages),
            'selectedStage' => $selectedStage,
            'questions' => $questions,
            'topics' => $topics,
        ]);
    }

    public function createGameQuestion(Request $request): Response
    {
        $stage = (int) $request->input('stage', 1);
        if ($stage < 1 || $stage > 5) {
            $stage = 1;
        }

        $stages = $this->getGameStages();
        $topics = Topic::orderBy('order')->get();

        return Inertia::render('Admin/Game/Create', [
            'stage' => $stage,
            'stages' => array_values($stages),
            'topics' => $topics,
        ]);
    }

    public function storeGameQuestion(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'stage' => 'required|integer|min:1|max:5',
            'question_text' => 'required|string',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string',
            'correct_answer' => 'required|string',
            'explanation' => 'nullable|string',
            'difficulty' => 'required|string',
            'order' => 'nullable|integer|min:0',
        ]);

        $stage = (int) $validated['stage'];
        $topic = Topic::where('order', $stage)->first()
            ?? Topic::where('order', 4)->first()
            ?? Topic::firstOrFail();

        $options = [];
        $correctAnswerKey = '';
        $labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        foreach (array_values($validated['options']) as $index => $opt) {
            $key = $labels[$index] ?? (string) $index;
            $options[$key] = $opt;
            if ((string) $opt === (string) $validated['correct_answer'] || $key === (string) $validated['correct_answer']) {
                $correctAnswerKey = $key;
            }
        }
        if ($correctAnswerKey === '' && isset($options[$validated['correct_answer']])) {
            $correctAnswerKey = $validated['correct_answer'];
        }
        if ($correctAnswerKey === '') {
            $correctAnswerKey = 'A';
        }

        $difficulty = match (strtolower($validated['difficulty'])) {
            'mudah', 'easy' => 'Mudah',
            'sulit', 'hard' => 'Sulit',
            default => 'Sedang',
        };

        Question::create([
            'topic_id' => $topic->id,
            'quiz_level' => $stage,
            'question_text' => $validated['question_text'],
            'options' => $options,
            'correct_answer' => $correctAnswerKey,
            'explanation' => $validated['explanation'] ?? null,
            'type' => 'game',
            'difficulty' => $difficulty,
            'order' => $validated['order'] ?? 0,
        ]);

        return redirect()->route('admin.game', ['stage' => $stage])
            ->with('success', "Soal game penjelajahan untuk Stage {$stage} berhasil ditambahkan.");
    }

    public function editGameQuestion(Question $question): Response
    {
        $question->load('topic');
        $stage = ($question->quiz_level === 5 || ($question->topic && $question->topic->order === 5))
            ? 5
            : ($question->topic?->order ?? $question->quiz_level ?? 1);

        $stages = $this->getGameStages();
        $topics = Topic::orderBy('order')->get();

        return Inertia::render('Admin/Game/Edit', [
            'question' => $question,
            'stage' => $stage,
            'stages' => array_values($stages),
            'topics' => $topics,
        ]);
    }

    public function updateGameQuestion(Request $request, Question $question): RedirectResponse
    {
        $validated = $request->validate([
            'stage' => 'required|integer|min:1|max:5',
            'question_text' => 'required|string',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string',
            'correct_answer' => 'required|string',
            'explanation' => 'nullable|string',
            'difficulty' => 'required|string',
            'order' => 'nullable|integer|min:0',
        ]);

        $stage = (int) $validated['stage'];
        $topic = Topic::where('order', $stage)->first()
            ?? Topic::where('order', 4)->first()
            ?? Topic::firstOrFail();

        $options = [];
        $correctAnswerKey = '';
        $labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        foreach (array_values($validated['options']) as $index => $opt) {
            $key = $labels[$index] ?? (string) $index;
            $options[$key] = $opt;
            if ((string) $opt === (string) $validated['correct_answer'] || $key === (string) $validated['correct_answer']) {
                $correctAnswerKey = $key;
            }
        }
        if ($correctAnswerKey === '' && isset($options[$validated['correct_answer']])) {
            $correctAnswerKey = $validated['correct_answer'];
        }
        if ($correctAnswerKey === '') {
            $correctAnswerKey = 'A';
        }

        $difficulty = match (strtolower($validated['difficulty'])) {
            'mudah', 'easy' => 'Mudah',
            'sulit', 'hard' => 'Sulit',
            default => 'Sedang',
        };

        $question->update([
            'topic_id' => $topic->id,
            'quiz_level' => $stage,
            'question_text' => $validated['question_text'],
            'options' => $options,
            'correct_answer' => $correctAnswerKey,
            'explanation' => $validated['explanation'] ?? null,
            'type' => 'game',
            'difficulty' => $difficulty,
            'order' => $validated['order'] ?? 0,
        ]);

        return redirect()->route('admin.game', ['stage' => $stage])
            ->with('success', "Soal game penjelajahan untuk Stage {$stage} berhasil diperbarui.");
    }

    public function destroyGameQuestion(Question $question): RedirectResponse
    {
        $stage = ($question->quiz_level === 5 || ($question->topic && $question->topic->order === 5))
            ? 5
            : ($question->topic?->order ?? $question->quiz_level ?? 1);

        $question->delete();

        return redirect()->route('admin.game', ['stage' => $stage])
            ->with('success', 'Soal game penjelajahan berhasil dihapus.');
    }

    // ─── Questions (Per Topic) ─────────────────────────────────────────

    public function questions(Topic $topic): Response
    {
        $questions = $topic->questions()->orderBy('quiz_level')->orderBy('order')->get();

        return Inertia::render('Admin/Questions/Index', [
            'topic' => $topic,
            'questions' => $questions,
        ]);
    }

    public function createQuestion(Topic $topic): Response
    {
        return Inertia::render('Admin/Questions/Create', [
            'topic' => $topic,
        ]);
    }

    public function storeQuestion(Request $request, Topic $topic): RedirectResponse
    {
        $validated = $request->validate([
            'question_text' => 'required|string',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string',
            'correct_answer' => 'required|string',
            'explanation' => 'nullable|string',
            'type' => ['required', Rule::in(['multiple_choice', 'true_false', 'game'])],
            'difficulty' => 'required|string',
            'quiz_level' => 'required|integer|min:1|max:5',
            'order' => 'nullable|integer|min:0',
        ]);

        $options = [];
        $correctAnswerKey = '';
        $labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        foreach (array_values($validated['options']) as $index => $opt) {
            $key = $labels[$index] ?? (string) $index;
            $options[$key] = $opt;
            if ((string) $opt === (string) $validated['correct_answer'] || $key === (string) $validated['correct_answer']) {
                $correctAnswerKey = $key;
            }
        }
        if ($correctAnswerKey === '' && isset($options[$validated['correct_answer']])) {
            $correctAnswerKey = $validated['correct_answer'];
        }
        if ($correctAnswerKey === '') {
            $correctAnswerKey = 'A';
        }

        $difficulty = match (strtolower($validated['difficulty'])) {
            'mudah', 'easy' => 'Mudah',
            'sulit', 'hard' => 'Sulit',
            default => 'Sedang',
        };

        $validated['options'] = $options;
        $validated['correct_answer'] = $correctAnswerKey;
        $validated['difficulty'] = $difficulty;
        $validated['topic_id'] = $topic->id;

        Question::create($validated);
        $topic->increment('total_kuis');

        return redirect()->route('admin.questions', $topic)->with('success', 'Soal berhasil ditambahkan.');
    }

    public function editQuestion(Topic $topic, Question $question): Response
    {
        return Inertia::render('Admin/Questions/Edit', [
            'topic' => $topic,
            'question' => $question,
        ]);
    }

    public function updateQuestion(Request $request, Topic $topic, Question $question): RedirectResponse
    {
        $validated = $request->validate([
            'question_text' => 'required|string',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string',
            'correct_answer' => 'required|string',
            'explanation' => 'nullable|string',
            'type' => ['required', Rule::in(['multiple_choice', 'true_false', 'game'])],
            'difficulty' => 'required|string',
            'quiz_level' => 'required|integer|min:1|max:5',
            'order' => 'nullable|integer|min:0',
        ]);

        $options = [];
        $correctAnswerKey = '';
        $labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        foreach (array_values($validated['options']) as $index => $opt) {
            $key = $labels[$index] ?? (string) $index;
            $options[$key] = $opt;
            if ((string) $opt === (string) $validated['correct_answer'] || $key === (string) $validated['correct_answer']) {
                $correctAnswerKey = $key;
            }
        }
        if ($correctAnswerKey === '' && isset($options[$validated['correct_answer']])) {
            $correctAnswerKey = $validated['correct_answer'];
        }
        if ($correctAnswerKey === '') {
            $correctAnswerKey = 'A';
        }

        $difficulty = match (strtolower($validated['difficulty'])) {
            'mudah', 'easy' => 'Mudah',
            'sulit', 'hard' => 'Sulit',
            default => 'Sedang',
        };

        $validated['options'] = $options;
        $validated['correct_answer'] = $correctAnswerKey;
        $validated['difficulty'] = $difficulty;

        $question->update($validated);

        return redirect()->route('admin.questions', $topic)->with('success', 'Soal berhasil diperbarui.');
    }

    public function destroyQuestion(Topic $topic, Question $question): RedirectResponse
    {
        $question->delete();
        $topic->decrement('total_kuis');

        return back()->with('success', 'Soal berhasil dihapus.');
    }
}
