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
use App\Models\Tbara;
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
}
