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
        Schema::create('tsatuans', function (Blueprint $table) {
            $table->id();
            $table->string("bara", 20);
            $table->string("satuan");
            $table->float("qty");
            $table->float("hjual", 20,2);
            $table->float("hjualg", 20,2);
            $table->float("hjualm", 20,2);
            $table->float("hjualk1", 20,2);
            $table->float("hjualk2", 20,2);
            $table->string("bara1", 20);
            $table->date("best1")->nullable();
            $table->date("best2")->nullable();
            $table->float("hbest", 20,2)->default(0);
            $table->float("dbest")->default(0);
            $table->float("dbest1")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tsatuans');
    }
};
