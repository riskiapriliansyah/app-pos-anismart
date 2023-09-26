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
        Schema::create('tjuals', function (Blueprint $table) {
            $table->id();
            $table->string("bara", 20);
            $table->string("bara1", 20);
            $table->float("qty");
            $table->float("bruto", 20,2);
            $table->float("netto", 20,2);
            $table->float("aver", 20,2);
            $table->string("userid", 20);
            $table->date("tgl");
            $table->float("zqty");
            $table->string("lok", 20);
            $table->string("nota", 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tjuals');
    }
};
