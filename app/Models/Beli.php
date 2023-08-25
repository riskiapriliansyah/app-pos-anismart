<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beli extends Model
{
    use HasFactory;

    public function supplier()
    {
        return $this->belongsTo(Supp::class, "kode", "kode");
    }

    public function tbeli()
    {
        return $this->hasMany(Tbeli::class, "nota", "nota");    
    }

    public function user()
    {
        return $this->belongsTo(User::class, "created_by", "userid");
    }

}
