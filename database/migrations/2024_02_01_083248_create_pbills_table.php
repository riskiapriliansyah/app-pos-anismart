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
        Schema::create('pbills', function (Blueprint $table) {
            $table->id();
            $table->string("notap", 40);
            $table->string("bara", 50);
            $table->string("bara1", 50);
            $table->string("nama", 50);
            $table->float("qty", 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pbills');
    }
};
