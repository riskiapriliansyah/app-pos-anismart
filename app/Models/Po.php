<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Po extends Model
{
    use HasFactory;

    public function supplier()
    {
        return $this->belongsTo(Supp::class, "kode", "kode");
    }

    public function tpo()
    {
        return $this->hasMany(Tpo::class, "nota", "nota");    
    }

    public function user()
    {
        return $this->belongsTo(User::class, "created_by", "userid");
    }
}
