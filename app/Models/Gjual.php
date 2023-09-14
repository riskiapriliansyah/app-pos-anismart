<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gjual extends Model
{
    use HasFactory;

    public function cust()
    {
        return $this->belongsTo(Cust::class, "kode", "kode");
    }

    public function gtjual()
    {
        return $this->hasMany(Gtjual::class, "nota", "nota");    
    }

    public function user()
    {
        return $this->belongsTo(User::class, "created_by", "userid");
    }
}
