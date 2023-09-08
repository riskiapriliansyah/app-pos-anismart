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
        Schema::create('rtbelis', function (Blueprint $table) {
            $table->id();
            $table->string("nota");
            $table->date("tgl");
            $table->string("bara");
            $table->string("bara1");
            $table->float("qty");
            $table->float("harga", 20,2);
            $table->float('disc');
            $table->float("ndisc", 20,2);
            $table->float("total", 20,2);
            $table->string("nama");
            $table->string("satuan");
            $table->float("zqty");
            $table->float("zharga", 20,2);
            $table->string("zsatuan");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rtbelis');
    }
};
