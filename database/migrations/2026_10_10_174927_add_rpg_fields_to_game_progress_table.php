<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('game_progress', function (Blueprint $table) {
            $table->decimal('player_x', 5, 2)->default(50)->after('best_score');
            $table->decimal('player_y', 5, 2)->default(50)->after('player_x');
            $table->unsignedInteger('active_checkpoint')->nullable()->after('player_y');
            $table->json('completed_checkpoints')->nullable()->after('active_checkpoint');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('game_progress', function (Blueprint $table) {
            $table->dropColumn(['player_x', 'player_y', 'active_checkpoint', 'completed_checkpoints']);
        });
    }
};
