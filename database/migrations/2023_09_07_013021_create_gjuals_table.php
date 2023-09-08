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
        Schema::create('gjuals', function (Blueprint $table) {
            $table->id();
            $table->string("nota")->unique();
            $table->date("tgl");
            $table->date("jatuh");
            $table->string("kode",20);
            $table->string("lok", 20);
            $table->string("ket");
            $table->float("nilai", 20,2);
            $table->float("disc");
            $table->float("ndisc", 20,2);
            $table->float("pph");
            $table->float("npph", 20,2);
            $table->float("netto",20,2);
            $table->float("aver",20,2);
            $table->float("bayar", 20,2)->default(0);
            $table->string("lunas", 1)->default(0);
            $table->date("tgll")->nullable();
            $table->float("jbayar", 20,2);
            $table->float("jkembali", 20,2);
            $table->string("created_by");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gjuals');
    }
};
