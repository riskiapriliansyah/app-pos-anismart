<?php

namespace App\Http\Controllers;

use App\Models\Dep;
use App\Models\Div;
use App\Models\Satuan;
use App\Models\Sdep;
use App\Models\Stock;
use App\Models\Supp;
use App\Models\Tbara;
use App\Models\Tsatuan;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MasterStockController extends BaseController
{
    public function masterStock()
    {
        $div = Div::orderBy("kode", "ASC")->get();
        $dep = Dep::orderBy("kode", "ASC")->get();
        $sdep = Sdep::orderBy("kode", "ASC")->get();
        $satuan = Satuan::all();
        $supp = Supp::all();
        return Inertia::render("Backend/Xfile/MasterStock", [
            "div" => $div,
            "dep" => $dep,
            "sdep" => $sdep,
            "satuan" => $satuan,
            "supp" => $supp,
        ]);
    }

    public function storeStock(Request $request)
    {
        try {
            DB::beginTransaction();
            $stock = Stock::where("bara", $request->bara)->first();
            if (!isset($stock)) {
                $stock = new Stock;
                $stock->bara = $request->bara;
                $stock->bara1 = $request->bara1;
                $stock->nama = $request->nama;
                $stock->dep = $request->dep;
                $stock->sdep = $request->sdep;
                $stock->satuan = $request->satuan;
                $stock->kode = $request->kode;
                $stock->hbeli = $request->hbeli;
                $stock->haver = $request->haver;
                $stock->hjual = $request->hjual;
                $stock->margin = $request->margin;
                $stock->hjualg = $request->hjualg;
                $stock->marging = $request->marging;
                $stock->hjualm = $request->hjualm;
                $stock->marginm = $request->marginm;
                $stock->smin = 0;
                $stock->smax = 0;
                $stock->aktif = $request->aktif;
                $stock->konsi = "F";
                $stock->tetap = "T";
                $stock->saldo = 0;
                $stock->gambar = "-";
                $stock->stock = "T";
                $stock->tglp = Carbon::now(+8);
                $stock->ltax = $request->ltax;
                $stock->qorder = 0;
                $stock->hjualk1 = $request->hjualk1;
                $stock->hjualk2 = $request->hjualk2;
                $stock->timbang = "F";
                $stock->uharga = "F";
                $stock->lvoc = "F";
                $stock->save();
            } else {
                $stock->bara = $request->bara;
                $stock->bara1 = $request->bara1;
                $stock->nama = $request->nama;
                $stock->dep = $request->dep;
                $stock->sdep = $request->sdep;
                $stock->satuan = $request->satuan;
                $stock->kode = $request->kode;
                $stock->hbeli = $request->hbeli;
                $stock->haver = $request->haver;
                $stock->hjual = $request->hjual;
                $stock->margin = $request->margin;
                $stock->hjualg = $request->hjualg;
                $stock->marging = $request->marging;
                $stock->hjualm = $request->hjualm;
                $stock->marginm = $request->marginm;
                $stock->smin = 0;
                $stock->smax = 0;
                $stock->aktif = $request->aktif;
                $stock->konsi = "F";
                $stock->tetap = "T";
                $stock->saldo = 0;
                $stock->gambar = "-";
                $stock->stock = "T";
                $stock->tglp = Carbon::now(+8);
                $stock->ltax = $request->ltax;
                $stock->qorder = 0;
                $stock->hjualk1 = $request->hjualk1;
                $stock->hjualk2 = $request->hjualk2;
                $stock->timbang = "F";
                $stock->uharga = "F";
                $stock->lvoc = "F";
                $stock->save();
                DB::commit();
                return $this->sendResponse($stock, "Data Berhasil Diupdate");
            }

            $tbara = Tbara::where("bara", $request->bara)->first();
            if (!isset($tbara)) {
                $tbara = new Tbara;
                $tbara->bara = $request->bara;
                $tbara->lok = "TK.APL";
                $tbara->save();
            }

            $tsatuan = Tsatuan::where("bara1", $request->bara1)->first();
            if (!isset($tsatuan)) {
                $tsatuan = new Tsatuan;
                $tsatuan->bara = $stock->bara;
                $tsatuan->satuan = $stock->satuan;
                $tsatuan->qty = "1";
                $tsatuan->hjual = $stock->hjual;
                $tsatuan->hjualg = $stock->hjualg;
                $tsatuan->hjualm = $stock->hjualm;
                $tsatuan->hjualk1 = $stock->hjualk1;
                $tsatuan->hjualk2 = $stock->hjualk2;
                $tsatuan->bara1 = $stock->bara1;
                $tsatuan->save();
            }

            DB::commit();
            return $this->sendResponse($stock, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function storeTsatuanStock(Request $request)
    {
        try {
            DB::beginTransaction();
            $tsatuan = Tsatuan::where("bara1", $request->bara1)->first();
            if (!isset($tsatuan)) {
                $tsatuan = new Tsatuan;
                $tsatuan->bara = $request->bara;
                $tsatuan->satuan = $request->satuan;
                $tsatuan->qty = "1";
                $tsatuan->hjual = $request->hjual;
                $tsatuan->hjualg = $request->hjualg;
                $tsatuan->hjualm = $request->hjualm;
                $tsatuan->hjualk1 = $request->hjualk1;
                $tsatuan->hjualk2 = $request->hjualk2;
                $tsatuan->bara1 = $request->bara1;
                $tsatuan->save();
            }

            DB::commit();
            return $this->sendResponse($tsatuan, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function getStockByBara(Request $request)
    {
        $data = Stock::where("bara", $request->bara)->with(['tsatuan', 'tbara' => function ($q) {
            $q->with(['gudang']);
        }, "dep" => function ($q) {
            $q->with("div");
        }])->first();
        return $this->sendResponse($data, "data stock");
    }
}
