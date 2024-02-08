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
        Schema::create('pbills', function (Blueprint $table) {
            $table->id();
            $table->string("nota", 50);
            $table->string("bara", 50);
            $table->string("bara1", 50);
            $table->string("nama", 50);
            $table->float("qty", 10, 2);
            $table->string("satuan", 50);
            $table->float("harga", 20, 2);
            $table->float("disc", 10, 2);
            $table->float("disc1", 10, 2);
            $table->float("total", 20, 2);
            $table->float("aver", 20, 2);
            $table->string("userid", 20);
            $table->float("zqty", 10, 2);
            $table->date("tgl");
            $table->float("hargae", 20, 2);
            $table->float("totale", 20, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pbills');
    }
};
