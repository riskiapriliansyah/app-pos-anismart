<?php

namespace App\Http\Controllers;

use App\Models\Kbara;
use App\Models\Pindah;
use App\Models\Sisj;
use App\Models\Tbara;
use App\Models\Tpindah;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransferBarangController extends BaseController
{
    public function transferBarang()
    {
        $datas = Pindah::with(['dari_toko', 'ke_toko', "user"])->latest()->paginate(10);
        return Inertia::render("Backend/Transaksi/TransferBarang/Index", [
            "datas" => $datas,
        ]);
    }

    public function transferBarangShow($nota)
    {
        $data = Pindah::where("nota", $nota)->with(['dari_toko', 'ke_toko', 'tpindah', 'user'])->first();
        return Inertia::render("Backend/Transaksi/TransferBarang/Show", [
            "data" => $data,
        ]);
    }

    public function transferBarangAdd()
    {
        return Inertia::render("Backend/Transaksi/TransferBarang/Add");
    }

    public function transferBarangStore(Request $request)
    {
        $header = $request->header;
        $body = $request->body;
        try {
            DB::beginTransaction();
            $sisj = Sisj::first();

            $pindah = new Pindah;
            $pindah->nota = "TR-" . date("Ymd") . "-" . $sisj->tr + 1;;
            $pindah->tgl = $header['tgl'];
            $pindah->dari = $header['dari'];
            $pindah->ke = $header['ke'];
            $pindah->ket = $header['ket'];
            $pindah->nilai = $header['nilai'];
            $pindah->created_by = Auth::user()->userid;
            $pindah->save();

            foreach ($body as $b) {
                $tpindah = new Tpindah;
                $tpindah->nota = $pindah->nota;
                $tpindah->tgl = $pindah->tgl;
                $tpindah->bara = $b['bara'];
                $tpindah->bara1 = $b['bara1'];
                $tpindah->qty = $b['qty'];
                $tpindah->harga = $b['hbeli'];
                $tpindah->nama = $b['nama'];
                $tpindah->satuan = $b['satuan'];
                $tpindah->zqty = $b['zqty'];
                $tpindah->zharga = $b['hbeli'];
                $tpindah->zsatuan = $b['satuan'];
                $tpindah->save();

                if ($pindah->dari) {
                    $tbara = Tbara::where("bara", $b['bara'])->first();
                    if (isset($tbara)) {
                        $tbara->masuk = $tbara->masuk + $b['zqty'];
                        $tbara->saldo = $tbara->awal + $tbara->masuk - $tbara->keluar;
                        $tbara->save();
                    } else {
                        $tbara = new Tbara;
                        $tbara->bara = $b['bara'];
                        $tbara->lok = $pindah->dari;
                        $tbara->awal = 0;
                        $tbara->masuk = $b['zqty'];
                        $tbara->keluar = 0;
                        $tbara->saldo = $tbara->awal + $tbara->masuk - $tbara->keluar;
                        $tbara->opname = 0;
                        $tbara->save();
                    }
                    $kbara = new Kbara;
                    $kbara->nota = $pindah->nota;
                    $kbara->tgl = $pindah->tgl;
                    $kbara->bara = $tpindah->bara;
                    $kbara->bara1 = $tpindah->bara1;
                    $kbara->qty = $tpindah->qty;
                    $kbara->lok = $pindah->dari;
                    $kbara->tipe = "O";
                    $kbara->kode = "Stock Out";
                    $kbara->zqty = $tpindah->zqty;
                    $kbara->sat = $tpindah->satuan;
                    $kbara->ntag = $tpindah->zqty * -1;
                    $kbara->save();
                }

                if ($pindah->ke) {

                    $tbara = Tbara::where("bara", $b['bara'])->first();
                    if (isset($tbara)) {
                        $tbara->masuk = $tbara->masuk + $b['zqty'];
                        $tbara->saldo = $tbara->awal + $tbara->masuk - $tbara->keluar;
                        $tbara->save();
                    } else {
                        $tbara = new Tbara;
                        $tbara->bara = $b['bara'];
                        $tbara->lok = $pindah->ke;
                        $tbara->awal = 0;
                        $tbara->masuk = $b['zqty'];
                        $tbara->keluar = 0;
                        $tbara->saldo = $tbara->awal + $tbara->masuk - $tbara->keluar;
                        $tbara->opname = 0;
                        $tbara->save();
                    }

                    $kbara = new Kbara;
                    $kbara->nota = $pindah->nota;
                    $kbara->tgl = $pindah->tgl;
                    $kbara->bara = $tpindah->bara;
                    $kbara->bara1 = $tpindah->bara1;
                    $kbara->qty = $tpindah->qty;
                    $kbara->lok = $pindah->ke;
                    $kbara->tipe = "I";
                    $kbara->kode = "Stock In";
                    $kbara->zqty = $tpindah->zqty;
                    $kbara->sat = $tpindah->satuan;
                    $kbara->ntag = $tpindah->zqty * 1;
                    $kbara->save();
                }
            }

            $sisj->tr = $sisj->tr + 1;
            $sisj->save();

            DB::commit();

            $data = [
                "pindah" => $pindah,
                "tpindah" => $tpindah,
            ];

            return $this->sendResponse($data, "data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data gagal disimpan", $ex->getMessage());
        }
    }
}
