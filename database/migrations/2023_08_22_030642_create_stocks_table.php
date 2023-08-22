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
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            $table->string("bara", 50);
            $table->string("bara1", 50);
            $table->string("nama");
            $table->string("dep", 10);
            $table->string("sdep", 10);
            $table->string("satuan", 10);
            $table->string("kode", 10);
            $table->float("hbeli", 20,2);
            $table->float("haver", 20,2);
            $table->float("hjual", 20,2);
            $table->float("margin", 20,2);
            $table->float("hjualg", 20,2);
            $table->float("marging", 20,2);
            $table->float("hjualm", 20,2);
            $table->float("marginm", 20,2);
            $table->float("smin");
            $table->float("smax");
            $table->string("aktif", 1);
            $table->string("konsi", 1);
            $table->string("tetap", 1);
            $table->float("hbest", 20,2);
            $table->float("dbest", 20,2);
            $table->float("dbest1", 20,2);
            $table->date("best1");
            $table->date("best2");
            $table->float("saldo", 20,2);
            $table->string("gambar")->default("-");
            $table->string("stock", 1);
            $table->date("tglp")->nullable();
            $table->string("ltax", 1);
            $table->float("qorder");
            $table->float("hjualk1", 20,2);
            $table->float("hjualk2", 20,2);
            $table->string("timbang", 1)->default("F");
            $table->string("uharga", 1)->default("F");
            $table->string("lvoc", 1)->default("F");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};
