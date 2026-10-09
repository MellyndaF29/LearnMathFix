<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('stage'); // part number 1-5
            $table->boolean('is_unlocked')->default(false);
            $table->boolean('is_completed')->default(false);
            $table->integer('stars')->default(0); // 0-3
            $table->integer('best_score')->default(0);
            $table->timestamps();

            $table->unique(['user_id', 'stage']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_progress');
    }
};
