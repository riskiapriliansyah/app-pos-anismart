<?php

namespace App\Http\Controllers;

use App\Models\Cust;
use App\Models\Gjual;
use App\Models\Gtjual;
use App\Models\Kbara;
use App\Models\Sisj;
use App\Models\Tbara;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PenjualanController extends BaseController
{
    public function penjualanNota()
    {
        $datas = Gjual::with(['cust', "user"])->latest()->paginate(10);
        return Inertia::render("Backend/Transaksi/Penjualan/PenjualanNota/Index", [
            "datas" => $datas,
        ]);
    }

    public function penjualanNotaShow($nota)
    {
        $data = Gjual::where("nota", $nota)->with(['cust', 'gtjual', 'user'])->first();
        return Inertia::render("Backend/Transaksi/Penjualan/PenjualanNota/Show", [
            "data" => $data,
        ]);
    }

    public function penjualanNotaAdd()
    {
        return Inertia::render("Backend/Transaksi/Penjualan/PenjualanNota/Add");
    }

    public function penjualanNotaStore(Request $request)
    {
        $header = $request->header;
        $body = $request->body;
        try {
            DB::beginTransaction();
            $sisj = Sisj::first();

            $gjual = new Gjual;
            $gjual->nota = "FJ-" . date("Ymd") . "-" . $sisj->gjual + 1;;
            $gjual->tgl = $header['tgl'];
            $gjual->jatuh = $header['tglJatuh'];
            $gjual->kode = $header['kode'];
            $gjual->lok = $header['lok'];
            $gjual->ket = $header['ket'];
            $gjual->nilai = $header['nilai'];
            $gjual->disc = $header['disc'];
            $gjual->ndisc = $header['ndisc'];
            $gjual->pph = $header['pph'];
            $gjual->npph = $header['npph'];
            $gjual->netto = $header['netto'];
            $gjual->aver = 0;
            $gjual->bayar = 0;
            $gjual->lunas = $header['lunas'];
            $gjual->tgll = $header['lunas'] == "1" ? Carbon::now(+8) : null;
            $gjual->jbayar = $header['jbayar'];
            $gjual->jkembali = $header['lunas'] == "1" ? 0 : $header['jkembali'];
            $gjual->created_by = Auth::user()->userid;
            $gjual->save();

            $cust = Cust::where("kode", $header['kode'])->first();
            $cust->masuk = $cust->masuk + $header['netto'];
            $cust->save();

            foreach ($body as $b) {
                $gtjual = new Gtjual;
                $gtjual->nota = $gjual->nota;
                $gtjual->tgl = $gjual->tgl;
                $gtjual->bara = $b['bara'];
                $gtjual->bara1 = $b['bara1'];
                $gtjual->qty = $b['qty'];
                $gtjual->harga = $b['hjual'];
                $gtjual->disc = $b['disc'];
                $gtjual->ndisc = $b['ndisc'];
                $gtjual->disc1 = $b['disc1'];
                $gtjual->ndisc1 = $b['ndisc1'];
                $gtjual->total = $b['total'];
                $gtjual->nama = $b['nama'];
                $gtjual->satuan = $b['satuan'];
                $gtjual->zqty = $b['zqty'];
                $gtjual->zharga = $b['hjual'];
                $gtjual->zsatuan = $b['satuan'];
                $gtjual->save();

                $tbara = Tbara::where("bara", $b['bara'])->first();
                if (isset($tbara)) {
                    $tbara->keluar = $tbara->keluar + $b['zqty'];
                    $tbara->saldo = $tbara->awal + $tbara->masuk - $tbara->keluar;
                    $tbara->save();
                } else {
                    $tbara = new Tbara;
                    $tbara->bara = $b['bara'];
                    $tbara->lok = $header['lok'];
                    $tbara->awal = 0;
                    $tbara->masuk = 0;
                    $tbara->keluar = $b['zqty'];
                    $tbara->saldo = 0;
                    $tbara->opname = 0;
                    $tbara->save();
                }

                $kbara = new Kbara();
                $kbara->nota = $gjual->nota;
                $kbara->tgl = $gjual->tgl;
                $kbara->bara = $gtjual->bara;
                $kbara->bara1 = $gtjual->bara1;
                $kbara->qty = $gtjual->qty;
                $kbara->lok = $gjual->lok;
                $kbara->tipe = "J";
                $kbara->kode = $gjual->kode;
                $kbara->zqty = $gtjual->zqty;
                $kbara->sat = $gtjual->satuan;
                $kbara->ntag = $gtjual->zqty * -1;
                $kbara->save();
            }

            $sisj->gjual = $sisj->gjual + 1;
            $sisj->save();

            DB::commit();

            $data = [
                "gjual" => $gjual,
                "gtjual" => $gtjual,
            ];

            return $this->sendResponse($data, "data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data gagal disimpan", $ex->getMessage());
        }
    }
}
