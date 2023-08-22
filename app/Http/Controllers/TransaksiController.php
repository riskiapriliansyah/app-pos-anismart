<?php

namespace App\Http\Controllers;

use App\Models\Pr;
use App\Models\Sisj;
use App\Models\Tpr;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransaksiController extends BaseController
{
    public function purchaseRequest()
    {
        $datas = Pr::with(['supplier'])->paginate(10);
        return Inertia::render("Backend/Transaksi/Pembelian/Pr/Index", [
            "datas" => $datas,
        ]);
    }

    public function purchaseRequestShow($nota)
    {
        $data = Pr::where("nota", $nota)->with(['supplier', 'tpr'])->first();
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
            $pr->nota = "PR-" . date("Ymd") . "-" . $sisj->po + 1;
            $pr->tgl = $header['tgl'];
            $pr->kode = $header['kode'];
            $pr->ket = $header['ket'];
            $pr->status = "1";
            $pr->created_by = Auth::user()->id;
            $pr->save();

            foreach ($body as $b) {
                $tpr = new Tpr;
                $tpr->nota = $pr->nota;
                $tpr->tgl = $pr->tgl;
                $tpr->bara = $b['bara'];
                $tpr->bara1 = $b['bara1'];
                $tpr->nama = $b['nama'];
                $tpr->satuan = $b['satuan'];
                $tpr->qtys = $b['qtys'];
                $tpr->qtyo = $b['qtyo'];
                $tpr->qtyj = 0;
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
}
