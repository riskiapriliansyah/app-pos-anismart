<?php

namespace App\Http\Controllers;

use App\Models\Kbara;
use App\Models\Rjl;
use App\Models\Rtjl;
use App\Models\Sisj;
use App\Models\Tbara;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReturPenjualanController extends BaseController
{
    public function returPenjualanNota()
    {
        $datas = Rjl::with(['cust', "user"])->latest()->paginate(10);
        return Inertia::render("Backend/Transaksi/Penjualan/ReturPenjualan/Index", [
            "datas" => $datas,
        ]);
    }

    public function returPenjualanNotaShow($nota)
    {
        $data = Rjl::where("nota", $nota)->with(['cust', 'rtjl', 'user'])->first();
        return Inertia::render("Backend/Transaksi/Penjualan/ReturPenjualan/Show", [
            "data" => $data,
        ]);
    }

    public function returPenjualanNotaAdd()
    {
        return Inertia::render("Backend/Transaksi/Penjualan/ReturPenjualan/Add");
    }

    public function returPenjualanNotaStore(Request $request)
    {
        $header = $request->header;
        $body = $request->body;
        try {
            DB::beginTransaction();
            $sisj = Sisj::first();

            $rbeli = new Rjl;
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
            // $rbeli->notar = $header['notar'];
            $rbeli->notar = "-";
            $rbeli->created_by = Auth::user()->userid;
            $rbeli->save();

            foreach ($body as $b) {
                $rtbeli = new Rtjl;
                $rtbeli->nota = $rbeli->nota;
                $rtbeli->tgl = $rbeli->tgl;
                $rtbeli->bara = $b['bara'];
                $rtbeli->bara1 = $b['bara1'];
                $rtbeli->qty = $b['qty'];
                $rtbeli->harga = $b['hjual'];
                $rtbeli->disc = $b['disc'];
                $rtbeli->ndisc = $b['ndisc'];
                $rtbeli->total = $b['total'];
                $rtbeli->nama = $b['nama'];
                $rtbeli->satuan = $b['satuan'];
                $rtbeli->zqty = $b['zqty'];
                $rtbeli->zharga = $b['hjual'];
                $rtbeli->zsatuan = $b['satuan'];
                $rtbeli->save();

                $tbara = Tbara::where("bara", $b['bara'])->first();
                if (isset($tbara)) {
                    $tbara->masuk = $tbara->masuk + $b['zqty'];
                    $tbara->saldo = $tbara->awal + $tbara->masuk - $tbara->keluar;
                    $tbara->save();
                } else {
                    $tbara = new Tbara;
                    $tbara->bara = $b['bara'];
                    $tbara->lok = $header['lok'];
                    $tbara->awal = 0;
                    $tbara->masuk = $b['zqty'];
                    $tbara->keluar = 0;
                    $tbara->saldo = $tbara->awal + $tbara->masuk - $tbara->keluar;
                    $tbara->opname = 0;
                    $tbara->save();
                }

                $kbara = new Kbara;
                $kbara->nota = $rbeli->nota;
                $kbara->tgl = $rbeli->tgl;
                $kbara->bara = $rtbeli->bara;
                $kbara->bara1 = $rtbeli->bara1;
                $kbara->qty = $rtbeli->qty;
                $kbara->lok = $rbeli->lok;
                $kbara->tipe = "C";
                $kbara->kode = $rbeli->kode;
                $kbara->zqty = $rtbeli->zqty;
                $kbara->sat = $rtbeli->satuan;
                $kbara->ntag = $rtbeli->zqty * 1;
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
