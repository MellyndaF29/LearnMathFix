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
        Schema::table('questions', function (Blueprint $table) {
            $table->unsignedInteger('quiz_level')->default(1)->after('topic_id');
        });

        Schema::table('quiz_attempts', function (Blueprint $table) {
            $table->unsignedInteger('quiz_level')->default(1)->after('topic_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn('quiz_level');
        });

        Schema::table('quiz_attempts', function (Blueprint $table) {
            $table->dropColumn('quiz_level');
        });
    }
};
