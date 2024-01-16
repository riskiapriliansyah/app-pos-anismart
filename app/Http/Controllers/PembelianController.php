<?php

namespace App\Http\Controllers;

use App\Models\Beli;
use App\Models\Kbara;
use App\Models\Po;
use App\Models\Tbeli;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PembelianController extends BaseController
{
    public function pembelian()
    {
        $datas = Beli::with(['supplier', "user"])->latest()->paginate(10);
        return Inertia::render("Backend/Transaksi/Pembelian/Beli/Index", [
            "datas" => $datas,
        ]);
    }

    public function pembelianShow($nota)
    {
        $data = Beli::where("nota", $nota)->with(['supplier' => function ($q) {
            $q->with(['area_supp']);
        }, 'tbeli'])->first();
        return Inertia::render("Backend/Transaksi/Pembelian/Beli/Show", [
            "data" => $data,
        ]);
    }

    public function pembelianAdd()
    {
        return Inertia::render("Backend/Transaksi/Pembelian/Beli/Add");
    }

    public function pembelianStore(Request $request)
    {
        $header = $request->header;
        $body = $request->body;
        try {
            DB::beginTransaction();
            $beli = new Beli;
            $beli->nota = $header['nota'];
            $beli->tgl = $header['tglBeli'];
            $beli->jatuh = $header['tglJatuh'];
            $beli->kode = $header['kode'];
            $beli->lok = $header['lok'];
            $beli->ket = $header['ket'];
            $beli->nilai = $header['nilai'];
            $beli->disc = $header['disc'];
            $beli->ndisc = $header['ndisc'];
            $beli->pph = $header['pph'];
            $beli->npph = $header['npph'];
            $beli->netto = $header['netto'];
            $beli->bayar = $header['bayar'];
            $beli->lunas = $header['lunas'];
            $beli->nota_po = $header['nota_po'];
            $beli->tgll = $header['tgll'];
            $beli->tunai = $header['tunai'];
            $beli->created_by = Auth::user()->userid;
            $beli->save();

            foreach ($body as $b) {
                $tbeli = new Tbeli;
                $tbeli->nota = $beli->nota;
                $tbeli->tgl = $beli->tgl;
                $tbeli->bara = $b['bara'];
                $tbeli->bara1 = $b['bara1'];
                $tbeli->qty = $b['qty'];
                $tbeli->harga = $b['hbeli'];
                $tbeli->disc = $b['disc'];
                $tbeli->ndisc = $b['ndisc'];
                $tbeli->total = $b['total'];
                $tbeli->nama = $b['nama'];
                $tbeli->satuan = $b['satuan'];
                $tbeli->zqty = $b['qty'];
                $tbeli->zharga = $b['hbeli'];
                $tbeli->zsatuan = $b['satuan'];
                $tbeli->save();

                $kbara = new Kbara;
                $kbara->nota = $beli->nota;
                $kbara->tgl = $beli->tgl;
                $kbara->bara = $tbeli->bara;
                $kbara->bara1 = $tbeli->bara1;
                $kbara->qty = $tbeli->qty;
                $kbara->lok = $beli->lok;
                $kbara->tipe = "B";
                $kbara->kode = $beli->kode;
                $kbara->zqty = $tbeli->zqty;
                $kbara->sat = $tbeli->satuan;
                $kbara->ntag = $tbeli->zqty * 1;
                $kbara->save();
            }

            $po = Po::where("nota", $header['nota_po'])->first();
            if (isset($po)) {
                $po->status_beli = 1;
                $po->save();
            }

            DB::commit();

            $data = [
                "beli" => $beli,
                "tbeli" => $tbeli,
            ];

            return $this->sendResponse($data, "data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data gagal disimpan", $ex->getMessage());
        }
    }
}
