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
        Schema::create('drawers', function (Blueprint $table) {
            $table->id();
            $table->date("tgl");
            $table->string("userid", 20);
            $table->float("awal", 20,2);
            $table->float("ambil", 20,2);
            $table->string("tutup", 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drawers');
    }
};
