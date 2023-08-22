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
        Schema::create('supps', function (Blueprint $table) {
            $table->id();
            $table->string("kode", 10);
            $table->string("nama");
            $table->string("alamat");
            $table->string("telp", 50)->nullable();
            $table->string("fax", 20)->nullable();
            $table->string("email", 100)->nullable();
            $table->string("kontak", 100)->nullable();
            $table->string("area", 10)->nullable();
            $table->float("kdue")->nullable();
            $table->float("kdisc")->nullable();
            $table->float("awal", 20,2)->nullable();
            $table->float("masuk", 20,2)->nullable();
            $table->float("retur", 20,2)->nullable();
            $table->float("keluar", 20,2)->nullable();
            $table->float("debet", 20,2)->nullable();
            $table->float("kredit", 20,2)->nullable();
            $table->float("giro", 20,2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supps');
    }
};
