<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pr extends Model
{
    use HasFactory;

    public function supplier()
    {
        return $this->belongsTo(Supp::class, "kode", "kode");
    }
    
    public function tpr()
    {
        return $this->hasMany(Tpr::class, "nota", "nota");
    }
}
