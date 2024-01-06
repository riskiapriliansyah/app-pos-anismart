<?php

namespace App\Http\Controllers;

use App\Models\Satuan;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SatuanController extends BaseController
{
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
}
