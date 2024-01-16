<?php

namespace App\Http\Controllers;

use App\Models\Beli;
use App\Models\Cust;
use App\Models\Gjual;
use App\Models\Gtjual;
use App\Models\Kbara;
use App\Models\Pindah;
use App\Models\Po;
use App\Models\Pr;
use App\Models\Rbeli;
use App\Models\Rjl;
use App\Models\Rtbeli;
use App\Models\Rtjl;
use App\Models\Sisj;
use App\Models\Tbeli;
use App\Models\Tpindah;
use App\Models\Tpo;
use App\Models\Tpr;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransaksiController extends BaseController
{
    public function purchaseRequest()
    {
        $datas = Pr::with(['supplier'])->latest()->paginate(10);
        return Inertia::render("Backend/Transaksi/Pembelian/Pr/Index", [
            "datas" => $datas,
        ]);
    }

    public function purchaseRequestShow($nota)
    {
        $data = Pr::where("nota", $nota)->with(['supplier' => function ($q) {
            $q->with(['area_supp']);
        }, 'tpr'])->first();
        return Inertia::render("Backend/Transaksi/Pembelian/Pr/Show", [
            "data" => $data,
        ]);
    }

    public function purchaseRequestAdd()
    {
        return Inertia::render("Backend/Transaksi/Pembelian/Pr/Add");
    }

    public function purchaseRequestStore(Request $request)
    {
        $header = $request->header;
        $body = $request->body;
        $sisj = Sisj::first();
        try {
            DB::beginTransaction();
            $pr = new Pr;
            $pr->nota = "PR-" . date("Ymd") . "-" . $sisj->pr + 1;
            $pr->tgl = $header['tgl'];
            $pr->kode = $header['kode'];
            $pr->ket = $header['ket'];
            $pr->status = "1";
            $pr->created_by = Auth::user()->userid;
            $pr->save();

            foreach ($body as $b) {
                $tpr = new Tpr;
                $tpr->nota = $pr->nota;
                $tpr->tgl = $pr->tgl;
                $tpr->bara = $b['bara'];
                $tpr->bara1 = $b['bara1'];
                $tpr->nama = $b['nama'];
                $tpr->satuan = $b['satuan'];
                $tpr->hbeli = $b['hbeli'];
                $tpr->qtys = $b['qtys'];
                $tpr->qtyo = $b['qtyo'];
                $tpr->qtyj = $b['qtyo'];
                $tpr->save();
            }
            $sisj->pr = $sisj->pr + 1;
            $sisj->save();
            DB::commit();
            $data = [
                "pr" => $pr,
                "tpr" => $tpr,
            ];
            return $this->sendResponse($data, "data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("", $ex->getMessage());
        }
    }

    public function purchaseRequestApproved(Request $request)
    {
        $header = $request->header;
        $body = $request->body;
        try {
            DB::beginTransaction();
            $pr = Pr::where("nota", $header['nota'])->first();
            $pr->status = "2";
            $pr->approved_by = Auth::user()->userid;
            $pr->save();

            foreach ($body as $b) {
                $tpr = Tpr::where("nota", $header['nota'])->where("bara", $b['bara'])->first();
                $tpr->qtyj = $b['qtyj'];
                $tpr->save();
            }

            DB::commit();

            $data = [
                "pr" => $pr,
                "tpr" => $tpr,
            ];

            return $this->sendResponse($data, "data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("", $ex->getMessage());
        }
    }

    public function purchaseRequestApprove()
    {
        $datas = Pr::where("status", "1")->with(['supplier'])->latest()->paginate(10);
        return Inertia::render("Backend/Transaksi/Pembelian/Pr/Approve", [
            "datas" => $datas,
        ]);
    }

    public function purchaseRequestApproveShow($nota)
    {
        $data = Pr::where("status", "1")->where("nota", $nota)->with(['supplier', 'tpr'])->first();
        return Inertia::render("Backend/Transaksi/Pembelian/Pr/ApproveShow", [
            "data" => $data,
        ]);
    }

    public function purchaseOrder()
    {
        $datas = Po::with(['supplier', "user"])->latest()->paginate(10);
        return Inertia::render("Backend/Transaksi/Pembelian/Po/Index", [
            "datas" => $datas,
        ]);
    }

    public function purchaseOrderShow($nota)
    {
        $data = Po::where("nota", $nota)->with(['supplier' => function ($q) {
            $q->with(['area_supp']);
        }, 'tpo'])->first();
        return Inertia::render("Backend/Transaksi/Pembelian/Po/Show", [
            "data" => $data,
        ]);
    }

    public function purchaseOrderAdd()
    {
        return Inertia::render("Backend/Transaksi/Pembelian/Po/Add");
    }

    public function purchaseOrderStore(Request $request)
    {
        $header = $request->header;
        $body = $request->body;
        try {
            DB::beginTransaction();
            $sisj = Sisj::first();
            $po = new Po;
            $po->nota = "PO-" . date("Ymd") . "-" . $sisj->po + 1;
            $po->tgl = $header['tgl'];
            $po->etd = $header['tgl'];
            $po->kode = $header['kode'];
            $po->ket = $header['ket'];
            $po->nilai = $header['nilai'];
            $po->disc = $header['disc'];
            $po->ndisc = $header['ndisc'];
            $po->pph = $header['pph'];
            $po->npph = $header['npph'];
            $po->netto = $header['netto'];
            $po->nota_pr = $header['nota_pr'];
            $po->status_beli = 0;
            $po->audit = 0;
            $po->created_by = Auth::user()->userid;
            $po->save();

            foreach ($body as $b) {
                $tpo = new Tpo;
                $tpo->nota = $po->nota;
                $tpo->tgl = $po->tgl;
                $tpo->bara = $b['bara'];
                $tpo->bara1 = $b['bara1'];
                $tpo->qty = $b['qty'];
                $tpo->harga = $b['hbeli'];
                $tpo->disc = $b['disc'];
                $tpo->ndisc = $b['ndisc'];
                $tpo->total = $b['total'];
                $tpo->nama = $b['nama'];
                $tpo->satuan = $b['satuan'];
                $tpo->zqty = $b['qty'];
                $tpo->zharga = $b['hbeli'];
                $tpo->zsatuan = $b['satuan'];
                $tpo->save();
            }

            $sisj->po = $sisj->po + 1;
            $sisj->save();

            $pr = Pr::where("nota", $header['nota_pr'])->first();
            $pr->status_po = 1;
            $pr->save();

            DB::commit();

            $data = [
                "po" => $po,
                "tpo" => $tpo,
            ];

            return $this->sendResponse($data, "data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("Data gagal disimpan", $ex->getMessage());
        }
    }

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
                $gtjual->zqty = $b['qty'];
                $gtjual->zharga = $b['hjual'];
                $gtjual->zsatuan = $b['satuan'];
                $gtjual->save();

                $kbara = new Kbara;
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
            $rbeli->notar = $header['notar'];
            $rbeli->created_by = Auth::user()->userid;
            $rbeli->save();

            foreach ($body as $b) {
                $rtbeli = new Rtjl;
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
                $tpindah->zqty = $b['qty'];
                $tpindah->zharga = $b['hbeli'];
                $tpindah->zsatuan = $b['satuan'];
                $tpindah->save();

                if ($pindah->dari) {
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
