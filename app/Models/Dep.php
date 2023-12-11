<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dep extends Model
{
    use HasFactory;

    public function div()
    {
        return $this->belongsTo(Div::class, 'div', 'kode');
    }
}
