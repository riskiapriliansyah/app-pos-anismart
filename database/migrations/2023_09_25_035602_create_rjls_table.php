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
        Schema::create('rjls', function (Blueprint $table) {
            $table->id();
            $table->string("nota")->unique();
            $table->date("tgl");
            $table->string("kode",20);
            $table->string("lok", 20);
            $table->string("ket")->default("-");
            $table->float("nilai", 20,2);
            $table->float("disc");
            $table->float("ndisc", 20,2);
            $table->float("pph");
            $table->float("npph", 20, 2);
            $table->float("netto", 20,2);
            $table->string("notar");
            $table->string("created_by", 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rjls');
    }
};
