<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Cust;
use App\Models\Dep;
use App\Models\Div;
use App\Models\Gudang;
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

class BackendController extends BaseController
{
    public function dashboard()
    {
        return Inertia::render("Backend/Dashboard");
    }

    public function dep()
    {
        $datas = Dep::paginate(10);
        return Inertia::render("Backend/Xfile/Dep", [
            "datas" => $datas
        ]);
    }

    public function storeDep(Request $request)
    {
        try {
            DB::beginTransaction();
            $dep = new Dep;
            $dep->kode = $request->kode;
            $dep->ket = $request->ket;
            $dep->save();
            DB::commit();
            return $this->sendResponse($dep, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function updateDep(Request $request)
    {
        try {
            DB::beginTransaction();
            $dep = Dep::where("id", $request->dataId)->first();
            $dep->kode = $request->kode;
            $dep->ket = $request->ket;
            $dep->save();
            DB::commit();
            return $this->sendResponse($dep, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function sdep()
    {
        $datas = Sdep::paginate(10);
        return Inertia::render("Backend/Xfile/Sdep", [
            "datas" => $datas
        ]);
    }

    public function storeSdep(Request $request)
    {
        try {
            DB::beginTransaction();
            $sdep = new Sdep;
            $sdep->dep = $request->dep;
            $sdep->kode = $request->kode;
            $sdep->ket = $request->ket;
            $sdep->save();
            DB::commit();
            return $this->sendResponse($sdep, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function updateSdep(Request $request)
    {
        try {
            DB::beginTransaction();
            $sdep = Sdep::where("id", $request->dataId)->first();
            $sdep->dep = $request->dep;
            $sdep->kode = $request->kode;
            $sdep->ket = $request->ket;
            $sdep->save();
            DB::commit();
            return $this->sendResponse($sdep, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function area()
    {
        $datas = Area::paginate(10);
        return Inertia::render("Backend/Xfile/Area", [
            "datas" => $datas
        ]);
    }

    public function storeArea(Request $request)
    {
        try {
            DB::beginTransaction();
            $area = new Area;
            $area->area = $request->kode;
            $area->ket = $request->ket;
            $area->save();
            DB::commit();
            return $this->sendResponse($area, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function updateArea(Request $request)
    {
        try {
            DB::beginTransaction();
            $area = Area::where("id", $request->dataId)->first();
            $area->area = $request->kode;
            $area->ket = $request->ket;
            $area->save();
            DB::commit();
            return $this->sendResponse($area, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function gudang()
    {
        $datas = Gudang::paginate(10);
        return Inertia::render("Backend/Xfile/Gudang", [
            "datas" => $datas
        ]);
    }

    public function storeGudang(Request $request)
    {
        try {
            DB::beginTransaction();
            $gudang = new Gudang;
            $gudang->lok = $request->kode;
            $gudang->ket = $request->ket;
            $gudang->save();
            DB::commit();
            return $this->sendResponse($gudang, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function updateGudang(Request $request)
    {
        try {
            DB::beginTransaction();
            $gudang = Gudang::where("id", $request->dataId)->first();
            $gudang->lok = $request->kode;
            $gudang->ket = $request->ket;
            $gudang->save();
            DB::commit();
            return $this->sendResponse($gudang, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function satuan()
    {
        $datas = Satuan::paginate(10);
        return Inertia::render("Backend/Xfile/Satuan", [
            "datas" => $datas
        ]);
    }

    public function storesatuan(Request $request)
    {
        try {
            DB::beginTransaction();
            $satuan = new Satuan;
            $satuan->satuan = $request->ket;
            $satuan->save();
            DB::commit();
            return $this->sendResponse($satuan, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function updatesatuan(Request $request)
    {
        try {
            DB::beginTransaction();
            $satuan = satuan::where("id", $request->dataId)->first();
            $satuan->satuan = $request->ket;
            $satuan->save();
            DB::commit();
            return $this->sendResponse($satuan, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

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
                return $this->sendError("Data Gagal Disimpan", "Barang sudah ada");
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

    public function supplier()
    {
        $datas = Sdep::paginate(10);
        return Inertia::render("Backend/Xfile/Supplier", [
            "datas" => $datas
        ]);
    }

    public function supplierStore(Request $request)
    {
        try {
            DB::beginTransaction();
            $supplier = Supp::where("kode", $request->kode)->first();
            if (!isset($supplier)) {
                $supplier = new Supp;
                $supplier->kode = $request->kode;
                $supplier->nama = $request->nama;
                $supplier->alamat = $request->alamat;
                $supplier->telp = $request->telp;
                $supplier->fax = $request->fax;
                $supplier->email = $request->email;
                $supplier->kontak = $request->kontak;
                $supplier->area = $request->area;
                $supplier->kdue = $request->kdue;
                $supplier->kdisc = $request->kdisc;
                $supplier->awal = 0;
                $supplier->masuk = 0;
                $supplier->retur = 0;
                $supplier->keluar = 0;
                $supplier->debet = 0;
                $supplier->kredit = 0;
                $supplier->giro = 0;
                $supplier->save();
            } else {
                return $this->sendError("Kode Supplier sudah dipakai", "Kode supplier sudah dipakai");
            }

            DB::commit();
            return $this->sendResponse($supplier, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function langganan()
    {
        $datas = Sdep::paginate(10);
        $area = Area::all();
        $cust = Cust::paginate(15);
        return Inertia::render("Backend/Xfile/Langganan", [
            "datas" => $datas,
            "area" => $area,
            "cust" => $cust
        ]);
    }

    public function langgananStore(Request $request)
    {
        try {
            DB::beginTransaction();
            $langganan = Cust::where("kode", $request->kode)->first();
            if (!isset($langganan)) {
                $langganan = new Cust;
                $langganan->kode = $request->kode;
                $langganan->nama = $request->nama;
                $langganan->alamat = $request->alamat;
                $langganan->telp = $request->telp;
                $langganan->fax = $request->fax;
                $langganan->email = $request->email;
                $langganan->area = $request->area;
                $langganan->disc = $request->disc;
                $langganan->dlahir = $request->dlahir;
                $langganan->plafon = 0;
                $langganan->awal = 0;
                $langganan->masuk = 0;
                $langganan->keluar = 0;
                $langganan->tpoint = 0;
                $langganan->tambil = 0;
                $langganan->giro = 0;
                $langganan->jh = $request->jenisHarga;
                $langganan->save();
            } else {
                return $this->sendError("error", "Kode langganan sudah dipakai");
            }

            DB::commit();
            return $this->sendResponse($langganan, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data Gagal Disimpan", $ex->getMessage());
        }
    }

    public function formulaPaket()
    {
        $datas = Sdep::paginate(10);
        return Inertia::render("Backend/Xfile/FormulaPaket", [
            "datas" => $datas
        ]);
    }

    public function bestBuy()
    {
        $datas = Sdep::paginate(10);
        return Inertia::render("Backend/Xfile/BestBuy", [
            "datas" => $datas
        ]);
    }
}
