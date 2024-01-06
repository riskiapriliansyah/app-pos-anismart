<?php

namespace App\Http\Controllers;

use App\Models\Sdep;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SdepController extends BaseController
{
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
}
