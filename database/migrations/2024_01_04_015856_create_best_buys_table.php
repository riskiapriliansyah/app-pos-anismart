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
        Schema::create('best_buys', function (Blueprint $table) {
            $table->id();
            $table->string("bara", 50);
            $table->string("bara1", 50);
            $table->float("hbest", 20, 2)->default(0);
            $table->float("dbest", 20, 2)->default(0);
            $table->float("dbest1", 20, 2)->default(0);
            $table->date("best1");
            $table->date("best2");
            $table->string("tipe", 1)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('best_buys');
    }
};
