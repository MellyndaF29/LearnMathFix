<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('topic_id')->constrained()->cascadeOnDelete();
            $table->text('question_text');
            $table->string('image_url')->nullable();
            $table->json('options'); // [{"key":"A","text":"..."},...]
            $table->string('correct_answer'); // "A", "B", etc.
            $table->text('explanation')->nullable();
            $table->string('type')->default('multiple_choice'); // multiple_choice, fill
            $table->string('difficulty')->default('mudah');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
