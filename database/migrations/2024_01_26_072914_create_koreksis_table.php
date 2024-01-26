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
        Schema::create('koreksis', function (Blueprint $table) {
            $table->id();
            $table->string("bara", 40);
            $table->string("bara1", 40);
            $table->float("bruto", 20, 2);
            $table->float("netto", 20, 2);
            $table->string("userid", 20);
            $table->date("tgl");
            $table->float("zqty", 10, 2);
            $table->string("lok", 10);
            $table->string("nama", 50);
            $table->string("jenis", 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('koreksis');
    }
};
