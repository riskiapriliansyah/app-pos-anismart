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
        Schema::create('sisjs', function (Blueprint $table) {
            $table->id();
            $table->string("lokj", 10);
            $table->string("nama");
            $table->string("alamat1", 40);
            $table->string("alamat2", 40);
            $table->string("alamat3", 40);
            $table->string("foot1", 40);
            $table->string("foot2", 40);
            $table->string("foot3", 40);
            $table->string("foot4", 40);
            $table->string("fmemo", 100);
            $table->string("norek");
            $table->string("namarek");
            $table->string("namabank");
            $table->float("pr");
            $table->float("po");
            $table->float("beli");
            $table->float("rbeli");
            $table->float("tr");
            $table->float("gjual");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sisjs');
    }
};
