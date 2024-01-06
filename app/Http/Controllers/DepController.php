<?php

namespace App\Http\Controllers;

use App\Models\Dep;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DepController extends BaseController
{
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
}
