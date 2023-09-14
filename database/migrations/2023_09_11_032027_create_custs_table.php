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
        Schema::create('custs', function (Blueprint $table) {
            $table->id();
            $table->string("kode", 20);
            $table->string("nama");
            $table->string("alamat");
            $table->string("telp", 20);
            $table->string("fax", 20);
            $table->string("email", 20);
            $table->string("area", 20);
            $table->float("disc");
            $table->date("dlahir");
            $table->float("plafon", 20,2);
            $table->float("awal", 20,2);
            $table->float("masuk", 20,2);
            $table->float("keluar", 20,2);
            $table->float("tpoint");
            $table->float("tambil");
            $table->float("giro");
            $table->string("jh", 10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custs');
    }
};
