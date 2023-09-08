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
        Schema::create('kbaras', function (Blueprint $table) {
            $table->id();
            $table->string("nota");
            $table->date("tgl");
            $table->string("bara");
            $table->string("bara1");
            $table->float("qty");
            $table->string("lok", 10);
            $table->string("tipe",1);
            $table->string("kode");
            $table->float("zqty");
            $table->string('sat');
            $table->float("ntag");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kbaras');
    }
};
