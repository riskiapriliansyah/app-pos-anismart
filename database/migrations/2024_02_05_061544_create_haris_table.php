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
        Schema::create('haris', function (Blueprint $table) {
            $table->id();
            $table->date("tgl");
            $table->string("jenis", 20);
            $table->float("nilai", 20, 2);
            $table->string("userid");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('haris');
    }
};
