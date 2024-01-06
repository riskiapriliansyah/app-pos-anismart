<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Cust;
use App\Models\Sdep;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LanggananController extends BaseController
{
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
}
