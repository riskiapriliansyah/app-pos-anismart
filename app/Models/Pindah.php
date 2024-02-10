<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pindah extends Model
{
    use HasFactory;

    public function dari_toko()
    {
        return $this->belongsTo(Gudang::class, "dari", "lok");
    }
    public function ke_toko()
    {
        return $this->belongsTo(Gudang::class, "ke", "lok");
    }
    public function user()
    {
        return $this->belongsTo(User::class, "created_by", "userid");
    }
    public function tpindah()
    {
        return $this->hasMany(Tpindah::class, "nota", "nota");
    }
}
