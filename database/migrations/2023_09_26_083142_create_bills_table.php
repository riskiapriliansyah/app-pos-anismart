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
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->string("nota");
            $table->date("tgl");
            $table->string("jam", 8);
            $table->string("userid", 20);
            $table->float("nilai", 20,2);
            $table->float("disc");
            $table->float("ndisc", 20,2);
            $table->float("voucher", 20,2);
            $table->float("total", 20,2);
            $table->float("tunai", 20,2);
            $table->float("kdebet", 20,2);
            $table->float("kkrd", 20,2);
            $table->float("kembali", 20,2);
            $table->string("nocard1")->default("-");
            $table->string("nmcard1")->default("-");
            $table->string("jncard1")->default("-");
            $table->string("appr1")->default("-");
            $table->string("nocard2")->default("-");
            $table->string("nmcard2")->default("-");
            $table->string("jncard2")->default("-");
            $table->string("appr2")->default("-");
            $table->float("piutang" , 20,2)->default(0);
            $table->string("kode")->nullable();
            $table->string("point")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
