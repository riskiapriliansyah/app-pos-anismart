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
        Schema::create('pos', function (Blueprint $table) {
            $table->id();
            $table->string('nota');
            $table->date("tgl");
            $table->date("etd");
            $table->string('kode', 20);
            $table->string("ket");
            $table->float("nilai", 20,2);
            $table->float("disc");
            $table->float("ndisc", 20,2);
            $table->float("pph");
            $table->float("npph");
            $table->float("netto", 20,2);
            $table->string("nota_pr");
            $table->string("status_beli", 1);
            $table->string("audit", 1)->default("0");
            $table->string("created_by", 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pos');
    }
};
