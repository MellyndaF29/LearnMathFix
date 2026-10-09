<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GameProgress extends Model
{
    protected $fillable = [
        'user_id',
        'stage',
        'is_unlocked',
        'is_completed',
        'stars',
        'best_score',
    ];

    protected $casts = [
        'is_unlocked' => 'boolean',
        'is_completed' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
