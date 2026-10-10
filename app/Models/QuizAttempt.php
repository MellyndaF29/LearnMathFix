<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizAttempt extends Model
{
    protected $fillable = [
        'user_id',
        'topic_id',
        'quiz_level',
        'score',
        'total_questions',
        'correct_answers',
        'answers',
        'is_passed',
    ];

    protected $casts = [
        'answers' => 'array',
        'is_passed' => 'boolean',
        'quiz_level' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }
}
