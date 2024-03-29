<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supp extends Model
{
    use HasFactory;

    public function area_supp()
    {
        return $this->belongsTo(Area::class, "area", "area");
    }

}
