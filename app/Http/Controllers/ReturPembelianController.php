<?php

namespace App\Http\Controllers;

use App\Models\Kbara;
use App\Models\Rbeli;
use App\Models\Rtbeli;
use App\Models\Sisj;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReturPembelianController extends BaseController
{
    public function returPembelian()
    {
        $datas = Rbeli::with(['supplier', "user"])->latest()->paginate(10);
        return Inertia::render("Backend/Transaksi/Pembelian/Retur/Index", [
            "datas" => $datas,
        ]);
    }

    public function returPembelianShow($nota)
    {
        $data = Rbeli::where("nota", $nota)->with(['supplier', 'rtbeli'])->first();
        return Inertia::render("Backend/Transaksi/Pembelian/Retur/Show", [
            "data" => $data,
        ]);
    }

    public function returPembelianAdd()
    {
        return Inertia::render("Backend/Transaksi/Pembelian/Retur/Add");
    }

    public function returPembelianStore(Request $request)
    {
        $header = $request->header;
        $body = $request->body;
        try {
            DB::beginTransaction();
            $sisj = Sisj::first();

            $rbeli = new Rbeli;
            $rbeli->nota = "RB-" . date("Ymd") . "-" . $sisj->rbeli + 1;;
            $rbeli->tgl = $header['tgl'];
            $rbeli->kode = $header['kode'];
            $rbeli->lok = $header['lok'];
            $rbeli->ket = $header['ket'];
            $rbeli->nilai = $header['nilai'];
            $rbeli->disc = $header['disc'];
            $rbeli->ndisc = $header['ndisc'];
            $rbeli->pph = $header['pph'];
            $rbeli->npph = $header['npph'];
            $rbeli->netto = $header['netto'];
            $rbeli->notar = $header['notar'];
            $rbeli->created_by = Auth::user()->userid;
            $rbeli->save();

            foreach ($body as $b) {
                $rtbeli = new Rtbeli;
                $rtbeli->nota = $rbeli->nota;
                $rtbeli->tgl = $rbeli->tgl;
                $rtbeli->bara = $b['bara'];
                $rtbeli->bara1 = $b['bara1'];
                $rtbeli->qty = $b['qty'];
                $rtbeli->harga = $b['hbeli'];
                $rtbeli->disc = $b['disc'];
                $rtbeli->ndisc = $b['ndisc'];
                $rtbeli->total = $b['total'];
                $rtbeli->nama = $b['nama'];
                $rtbeli->satuan = $b['satuan'];
                $rtbeli->zqty = $b['qty'];
                $rtbeli->zharga = $b['hbeli'];
                $rtbeli->zsatuan = $b['satuan'];
                $rtbeli->save();

                $kbara = new Kbara;
                $kbara->nota = $rbeli->nota;
                $kbara->tgl = $rbeli->tgl;
                $kbara->bara = $rtbeli->bara;
                $kbara->bara1 = $rtbeli->bara1;
                $kbara->qty = $rtbeli->qty;
                $kbara->lok = $rbeli->lok;
                $kbara->tipe = "R";
                $kbara->kode = $rbeli->kode;
                $kbara->zqty = $rtbeli->zqty;
                $kbara->sat = $rtbeli->satuan;
                $kbara->ntag = $rtbeli->zqty * -1;
                $kbara->save();
            }

            $sisj->rbeli = $sisj->rbeli + 1;
            $sisj->save();

            DB::commit();

            $data = [
                "rbeli" => $rbeli,
                "rtbeli" => $rtbeli,
            ];

            return $this->sendResponse($data, "data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data gagal disimpan", $ex->getMessage());
        }
    }
}
