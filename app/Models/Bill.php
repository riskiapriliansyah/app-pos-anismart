<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;

    public function tbill()
    {
        return $this->hasMany(Tbill::class, "nota", "nota");
    }
}
