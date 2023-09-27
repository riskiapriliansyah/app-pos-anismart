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
        Schema::create('tbaras', function (Blueprint $table) {
            $table->id();
            $table->string("bara", 20);
            $table->string("lok", 10);
            $table->float("awal", 20,2)->default(0);
            $table->float("masuk", 20,2)->default(0);
            $table->float("keluar", 20,2)->default(0);
            $table->float("saldo", 20,2)->default(0);
            $table->float("opname", 20,2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbaras');
    }
};
