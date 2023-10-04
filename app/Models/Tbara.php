<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tbara extends Model
{
    use HasFactory;
    
    public function gudang()
    {
        return $this->belongsTo(Gudang::class, 'lok','lok');
    }
}
