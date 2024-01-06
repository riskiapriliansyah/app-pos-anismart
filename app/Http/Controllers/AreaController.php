<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AreaController extends BaseController
{
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
}
