<?php

namespace App\Http\Controllers;

use App\Models\Gudang;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GudangController extends BaseController
{
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
}
