<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Dep;
use App\Models\Gudang;
use App\Models\Satuan;
use App\Models\Sdep;
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
        $datas = Sdep::paginate(10);
        return Inertia::render("Backend/Xfile/MasterStock", [
            "datas" => $datas
        ]);
    }

    public function supplier()
    {
        $datas = Sdep::paginate(10);
        return Inertia::render("Backend/Xfile/Supplier", [
            "datas" => $datas
        ]);
    }

    public function langganan()
    {
        $datas = Sdep::paginate(10);
        return Inertia::render("Backend/Xfile/Langganan", [
            "datas" => $datas
        ]);
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
