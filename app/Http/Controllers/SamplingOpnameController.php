<?php

namespace App\Http\Controllers;

use App\Models\Gudang;
use App\Models\Tbara;
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

    public function store(Request $request)
    {
        $header = $request->header;
        $body = $request->body;
        foreach ($body as $b) {
            $tbara = Tbara::where("bara", $b['bara'])->first();
            if (!isset($tbara)) {
                $tbara = new Tbara;
                $tbara->bara = $b['bara'];
                $tbara->lok = $header['lok'];
                $tbara->awal = 0;
                $tbara->masuk = 0;
                $tbara->keluar = $b['fisik'] * -1;
                $tbara->saldo = $b['fisik'];
                $tbara->opname = $b['fisik'];
                $tbara->save();
            } else {
            }
            return $tbara;
        }
    }
}
