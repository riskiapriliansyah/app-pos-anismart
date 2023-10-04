<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    public function tsatuan()
    {
        return $this->hasMany(Tsatuan::class, "bara", "bara");
    }
    
    public function tbara()
    {
        return $this->hasMany(Tbara::class, 'bara', 'bara');
    }
}
