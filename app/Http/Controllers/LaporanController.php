<?php

namespace App\Http\Controllers;

use App\Models\Beli;
use App\Models\Dep;
use App\Models\Hari;
use App\Models\Stock;
use App\Models\Supp;
use App\Models\Tjual;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

    public function saldoStockIndex()
    {
        $deps = Dep::orderBy("kode", "ASC")->get();
        $suppliers = Supp::orderBy("kode", "ASC")->get();
        return Inertia::render("Backend/Laporan/Stock/SaldoStock", [
            "deps" => $deps,
            "suppliers" => $suppliers
        ]);
    }
    public function daftarHargaIndex()
    {
        $deps = Dep::orderBy("kode", "ASC")->get();
        $suppliers = Supp::orderBy("kode", "ASC")->get();
        return Inertia::render("Backend/Laporan/Stock/DaftarHarga", [
            "deps" => $deps,
            "suppliers" => $suppliers
        ]);
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
                $data = Stock::where("dep", $request->dep['value'])->where("sdep", $request->sdep['value'])->where("kode", $request->kode['value'])->orderBy("nama", "ASC")->get();
            } else {
                $data = Stock::where("dep", $request->dep['value'])->where("sdep", $request->sdep['value'])->orderBy("nama", "ASC")->get();
            }
        }

        if ($request->dep == "" && $request->sdep == "" && $request->kode) {
            $data = Stock::where("kode", $request->kode['value'])->orderBy("nama", "ASC")->get();
        }

        if ($request->dep && $request->sdep == "") {
            $data = Stock::where("dep", $request->dep['value'])->orderBy("nama", "ASC")->get();
        }
        return $this->sendResponse($data, "data daftar stock");
    }

    public function getSaldoStock(Request $request)
    {
        $lok = Auth::user()->lok;
        if ($request->dep == "" && $request->sdep == "" && $request->kode == "") {
            return $this->sendError("", "Masukkan minimal departemen");
        }
        if ($request->tgl == "") {
            return $this->sendError("", "Masukkan tanggal");
        }
        if ($request->dep && $request->sdep) {
            if ($request->kode) {
                $data = DB::select("select a.bara, b.nama, b.satuan, sum(a.ntag) as stock from kbaras a left JOIN stocks b on a.bara = b.bara where a.bara in (select bara from stocks where dep='{$request->dep['value']}' and sdep='{$request->sdep['value']}' and kode='{$request->kode['value']}') and a.lok='{$lok}' and a.tgl <= '{$request->tgl}' GROUP BY a.bara, b.nama, b.satuan");
            } else {
                $data = DB::select("select a.bara, b.nama, b.satuan, sum(a.ntag) as stock from kbaras a left JOIN stocks b on a.bara = b.bara where a.bara in (select bara from stocks where dep='{$request->dep['value']}' and sdep='{$request->sdep['value']}') and a.lok='{$lok}' and a.tgl <= '{$request->tgl}' GROUP BY a.bara, b.nama, b.satuan");
            }
        }
        if ($request->dep == "" && $request->sdep == "" && $request->kode) {
            $data = DB::select("select a.bara, b.nama, b.satuan, sum(a.ntag) as stock from kbaras a left JOIN stocks b on a.bara = b.bara where a.bara in (select bara from stocks where kode='{$request->kode['value']}') and a.lok='{$lok}' and a.tgl <= '{$request->tgl}' GROUP BY a.bara, b.nama, b.satuan");
        }
        if ($request->dep && $request->sdep == "") {
            $data = DB::select("select a.bara, b.nama, b.satuan, sum(a.ntag) as stock from kbaras a left JOIN stocks b on a.bara = b.bara where a.bara in (select bara from stocks where dep='{$request->dep['value']}') and a.lok='{$lok}' and a.tgl <= '{$request->tgl}' GROUP BY a.bara, b.nama, b.satuan");
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

    public function getLaporanPenjualanSummary(Request $request)
    {
        $data = Tjual::where("userid", $request->userid)->whereBetween("tgl", [$request->tglAwal, $request->tglAkhir])->with(['stock'])->orderBy("tgl", "ASC")->get();
        return $this->sendResponse($data, "data penjualan");
    }
}
