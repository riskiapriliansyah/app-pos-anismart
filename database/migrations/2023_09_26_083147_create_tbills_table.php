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
        Schema::create('tbills', function (Blueprint $table) {
            $table->id();
            $table->string("nota");
            $table->date("tgl");
            $table->string("bara", 20);
            $table->string("bara1", 20);
            $table->string("nama");
            $table->float("qty");
            $table->string("satuan");
            $table->float("harga", 20,2);
            $table->float("disc");
            $table->float("total", 20,2);
            $table->float("hargae", 20,2);
            $table->float("totale", 20,2);
            $table->string("bkp", 1);
            $table->string("lvoid", 1);
            $table->string("lvoc", 1);
            $table->float("disc1");
            $table->string("bbh", 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbills');
    }
};
