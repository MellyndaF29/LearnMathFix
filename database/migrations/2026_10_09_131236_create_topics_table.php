<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('topics', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('icon')->default('📚');
            $table->string('category')->default('Bilangan'); // e.g. Bilangan, Geometri, etc.
            $table->text('description')->nullable();
            $table->string('color')->default('#1768bd');
            $table->string('difficulty')->default('mudah'); // mudah, sedang, susah
            $table->unsignedInteger('total_materi')->default(0);
            $table->unsignedInteger('total_kuis')->default(0);
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('topics');
    }
};
