<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rbeli extends Model
{
    use HasFactory;

    public function tbeli()
    {
        return $this->hasMany(Tbeli::class, "nota", "nota");
    }

    public function supplier()
    {
        return $this->belongsTo(Supp::class, "kode", "kode");
    }

    public function user()
    {
        return $this->belongsTo(User::class, "created_by", "userid");
    }
}
