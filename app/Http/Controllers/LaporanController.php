<?php

namespace App\Http\Controllers;

use App\Models\Beli;
use App\Models\Dep;
use App\Models\Hari;
use App\Models\Stock;
use App\Models\Supp;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanController extends BaseController
{
    public function pembelianIndex(Request $request)
    {
        $suppliers = Supp::orderBy("kode", "ASC")->get();
        return Inertia::render("Backend/Laporan/Pembelian", [
            "suppliers" => $suppliers,
        ]);
    }

    public function getLaporanPembelian(Request $request)
    {
        if ($request->kode == "*" || $request->kode == "") {
            $data = Beli::whereBetween("tgl", [$request->tglAwal, $request->tglAkhir])->orderBy("tgl", "ASC")->with(['supplier'])->get();
        } else {
            $data = Beli::whereBetween("tgl", [$request->tglAwal, $request->tglAkhir])->where("kode", $request->kode)->orderBy("tgl", "ASC")->with(['supplier'])->get();
        }
        return $this->sendResponse($data, "data pembelian");
    }

    public function daftarStockIndex()
    {
        $deps = Dep::orderBy("kode", "ASC")->get();
        $suppliers = Supp::orderBy("kode", "ASC")->get();
        return Inertia::render("Backend/Laporan/Stock/DaftarStock", [
            "deps" => $deps,
            "suppliers" => $suppliers
        ]);
    }

    public function getDaftarStock(Request $request)
    {
        if ($request->dep == "" && $request->sdep == "" && $request->kode == "") {
            return $this->sendError("", "Masukkan minimal departemen");
        }
        if ($request->dep && $request->sdep) {
            if ($request->kode) {
                $data = Stock::where("dep", $request->dep)->where("sdep", $request->sdep)->where("kode", $request->kode)->orderBy("nama", "ASC")->get();
            } else {
                $data = Stock::where("dep", $request->dep)->where("sdep", $request->sdep)->orderBy("nama", "ASC")->get();
            }
        }
        if ($request->dep && $request->sdep == "") {
            $data = Stock::where("dep", $request->dep)->orderBy("nama", "ASC")->get();
        }
        return $this->sendResponse($data, "data daftar stock");
    }

    public function kartuStockIndex()
    {
        return Inertia::render("Backend/Laporan/Stock/KartuStock");
    }

    public function laporanPenjualanSummary()
    {
        $kasirs = User::all();
        return Inertia::render("Backend/Laporan/Penjualan/PenjualanSummary", [
            "kasirs" => $kasirs
        ]);
    }

    public function laporanRekapPenjualan()
    {
        $kasirs = User::all();
        return Inertia::render("Backend/Laporan/Penjualan/RekapPenjualan", [
            "kasirs" => $kasirs
        ]);
    }

    public function getLaporanRekapPenjualan(Request $request)
    {
        $data = Hari::where("userid", $request->userid)->whereBetween("tgl", [$request->tglAwal, $request->tglAkhir])->get();
        return $this->sendResponse($data, "data rekap penjualan");
    }
}
