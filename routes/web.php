<?php

use App\Http\Controllers\AchievementController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\MateriController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Redirect root to dashboard if authenticated, else show BeliAkun landing page
Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }

    return Inertia::render('BeliAkun');
})->name('home');

// Informasi cara mendapatkan akun (publik)
Route::get('/beli-akun', function () {
    return redirect('/');
})->name('beli.akun');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard / Beranda
    Route::get('/beranda', [DashboardController::class, 'index'])->name('dashboard');

    // Materi
    Route::get('/materi', [MateriController::class, 'index'])->name('materi.index');
    Route::get('/materi/{topic:slug}', [MateriController::class, 'show'])->name('materi.show');
    Route::post('/materi/{topic:slug}/sections/{section}/complete', [MateriController::class, 'completeSection'])
        ->name('materi.section.complete');

    // Kuis / Latihan
    Route::get('/kuis/{topic:slug}', [QuizController::class, 'show'])->name('quiz.show');
    Route::post('/kuis/{topic:slug}/submit', [QuizController::class, 'submit'])->name('quiz.submit');

    // Game Jelajah
    Route::get('/game', [GameController::class, 'index'])->name('game.index');
    Route::get('/game/{stage}', [GameController::class, 'play'])->name('game.play')->where('stage', '[1-5]');
    Route::post('/game/{stage}/save', [GameController::class, 'saveProgress'])->name('game.save');
    Route::post('/game/{stage}/submit', [GameController::class, 'submitStage'])->name('game.submit');

    // Pencapaian
    Route::get('/pencapaian', [AchievementController::class, 'index'])->name('pencapaian');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::middleware(['auth', 'verified', 'is_admin'])->prefix('admin')->name('admin.')->group(function () {

    // Dashboard
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    // Users
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/users/create', [AdminController::class, 'createUser'])->name('users.create');
    Route::post('/users', [AdminController::class, 'storeUser'])->name('users.store');
    Route::patch('/users/{user}/toggle-admin', [AdminController::class, 'toggleAdmin'])->name('users.toggle-admin');
    Route::delete('/users/{user}', [AdminController::class, 'destroyUser'])->name('users.destroy');

    // Topics — bind by :id (Topic uses slug as route key by default)
    Route::get('/topics', [AdminController::class, 'topics'])->name('topics');
    Route::get('/topics/create', [AdminController::class, 'createTopic'])->name('topics.create');
    Route::post('/topics', [AdminController::class, 'storeTopic'])->name('topics.store');
    Route::get('/topics/{topic:id}/edit', [AdminController::class, 'editTopic'])->name('topics.edit');
    Route::put('/topics/{topic:id}', [AdminController::class, 'updateTopic'])->name('topics.update');
    Route::delete('/topics/{topic:id}', [AdminController::class, 'destroyTopic'])->name('topics.destroy');

    // Sections (per topic) — bind both topic and section by :id
    Route::get('/topics/{topic:id}/sections', [AdminController::class, 'sections'])->name('sections');
    Route::get('/topics/{topic:id}/sections/create', [AdminController::class, 'createSection'])->name('sections.create');
    Route::post('/topics/{topic:id}/sections', [AdminController::class, 'storeSection'])->name('sections.store');
    Route::get('/topics/{topic:id}/sections/{section:id}/edit', [AdminController::class, 'editSection'])->name('sections.edit');
    Route::put('/topics/{topic:id}/sections/{section:id}', [AdminController::class, 'updateSection'])->name('sections.update');
    Route::delete('/topics/{topic:id}/sections/{section:id}', [AdminController::class, 'destroySection'])->name('sections.destroy');

    // Questions (per topic) — bind both topic and question by :id
    Route::get('/topics/{topic:id}/questions', [AdminController::class, 'questions'])->name('questions');
    Route::get('/topics/{topic:id}/questions/create', [AdminController::class, 'createQuestion'])->name('questions.create');
    Route::post('/topics/{topic:id}/questions', [AdminController::class, 'storeQuestion'])->name('questions.store');
    Route::get('/topics/{topic:id}/questions/{question:id}/edit', [AdminController::class, 'editQuestion'])->name('questions.edit');
    Route::put('/topics/{topic:id}/questions/{question:id}', [AdminController::class, 'updateQuestion'])->name('questions.update');
    Route::delete('/topics/{topic:id}/questions/{question:id}', [AdminController::class, 'destroyQuestion'])->name('questions.destroy');
});

require __DIR__.'/auth.php';
