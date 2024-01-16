<?php

namespace App\Http\Controllers;

use App\Models\Gudang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SamplingOpnameController extends BaseController
{
    public function index()
    {
        $gudang = Gudang::all();
        return Inertia::render("Backend/Transaksi/Penyesuaian/SamplingOpname", [
            "gudang" => $gudang
        ]);
    }
}
