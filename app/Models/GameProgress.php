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
        'player_x',
        'player_y',
        'active_checkpoint',
        'completed_checkpoints',
    ];

    protected $casts = [
        'is_unlocked' => 'boolean',
        'is_completed' => 'boolean',
        'completed_checkpoints' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
