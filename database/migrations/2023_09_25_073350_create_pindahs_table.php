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
        Schema::create('pindahs', function (Blueprint $table) {
            $table->id();
            $table->string("nota")->unique();
            $table->date("tgl");
            $table->string("dari", 20);
            $table->string("ke", 20);
            $table->string("ket");
            $table->float("nilai", 20,2);
            $table->string("created_by");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pindahs');
    }
};
