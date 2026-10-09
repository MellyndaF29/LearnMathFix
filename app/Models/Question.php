<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Question extends Model
{
    protected $fillable = [
        'topic_id',
        'question_text',
        'image_url',
        'options',
        'correct_answer',
        'explanation',
        'type',
        'difficulty',
        'order',
    ];

    protected $casts = [
        'options' => 'array',
    ];

    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }
}
