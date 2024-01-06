<?php

namespace App\Http\Controllers;

use App\Models\Sdep;
use App\Models\Supp;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SupplierController extends BaseController
{
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
}
