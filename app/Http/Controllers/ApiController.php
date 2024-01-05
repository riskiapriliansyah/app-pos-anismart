<?php

namespace App\Http\Controllers;

use App\Models\Cust;
use App\Models\Dep;
use App\Models\Gjual;
use App\Models\Gudang;
use App\Models\Kbara;
use App\Models\Po;
use App\Models\Pr;
use App\Models\Sdep;
use App\Models\Sisj;
use App\Models\Stock;
use App\Models\Supp;
use App\Models\Tsatuan;
use Illuminate\Http\Request;

class ApiController extends BaseController
{
    public function getSisj()
    {
        $data = Sisj::first();
        return $this->sendResponse($data, "data sisj");
    }

    public function getDepByDiv(Request $request)
    {
        $datas = Dep::where("div", $request->div)->get();
        return $this->sendResponse($datas, "Data dep");
    }

    public function getSdepByDep(Request $request)
    {
        $datas = Sdep::where("dep", $request->dep)->get();
        return $this->sendResponse($datas, "Data sdep");
    }

    public function getStock(Request $request)
    {
        if ($request->searchBy == "*") {
            $datas = Stock::take(10)->get();
            return $this->sendResponse($datas, "data stock");
        }
        if ($request->searchBy == "nama") {
            $datas = Stock::where("nama", "LIKE", "%{$request->kode}%")->take(10)->get();
            return $this->sendResponse($datas, "data stock");
        }
        if ($request->searchBy == "bara1") {
            $datas = Stock::where("bara1", "LIKE", "%{$request->kode}%")->take(10)->get();
            return $this->sendResponse($datas, "data stock");
        }
        if ($request->searchBy == "bara") {
            $datas = Stock::where("bara", "LIKE", "%{$request->kode}%")->take(10)->get();
            return $this->sendResponse($datas, "data stock");
        }
    }

    public function getStockByBara(Request $request)
    {
        $datas = Stock::where("bara1", $request->kode)->first();
        return $this->sendResponse($datas, "data stock");
    }

    public function getSupplier(Request $request)
    {
        if ($request->searchBy == "*") {
            $datas = Supp::take(10)->get();
            return $this->sendResponse($datas, "data supplier");
        }
        if ($request->searchBy == "nama") {
            $datas = Supp::where("nama", "LIKE", "%{$request->kode}%")->take(10)->get();
            return $this->sendResponse($datas, "data supplier");
        }
    }

    public function getCust(Request $request)
    {
        if ($request->searchBy == "*") {
            $datas = Cust::take(10)->orderBy("kode", "ASC")->get();
            return $this->sendResponse($datas, "data supplier");
        }
        if ($request->searchBy == "nama") {
            $datas = Cust::where("nama", "LIKE", "%{$request->kode}%")->orderBy("kode", "ASC")->take(10)->get();
            return $this->sendResponse($datas, "data supplier");
        }
    }

    public function getPrSearch(Request $request)
    {
        $datas = Pr::where("nota", "LIKE", "%{$request->kode}%")->with(['supplier', 'tpr'])->latest()->paginate(10);
        return $this->sendResponse($datas, "data pr");
    }

    public function getPurchaseRequestOpen(Request $request)
    {
        $datas = Pr::where("nota", "LIKE", "%{$request->kode}%")->where("status_po", "0")->where("status", "2")->with(['supplier', 'tpr'])->latest()->paginate(10);
        return $this->sendResponse($datas, "data pr");
    }

    public function getPurchaseOrderOpen(Request $request)
    {
        $datas = Po::where("nota", "LIKE", "%{$request->kode}%")->where("status_beli", "0")->with(['supplier', 'tpo'])->latest()->paginate(10);
        return $this->sendResponse($datas, "data pr");
    }

    public function getPenjualan(Request $request)
    {
        $datas = Gjual::where("nota", "LIKE", "%{$request->kode}%")->with(['cust'])->latest()->paginate(10);
        return $this->sendResponse($datas, "data penjualan");
    }

    public function getGudang()
    {
        $datas = Gudang::get();
        return $this->sendResponse($datas, "data gudang");
    }

    public function getKartuStock(Request $request)
    {
        $saldoAwal = Kbara::where("lok", $request->lok)->where("bara", $request->bara)->where('tgl', "<", $request->tglAwal)->sum("ntag");
        $kbara = Kbara::where("lok", $request->lok)->where("bara", $request->bara)->whereBetween('tgl', [$request->tglAwal, $request->tglAkhir])->orderBy("tgl", 'ASC')->get();
        $awal = 0;
        $x = 0;
        if (count($kbara) > 0) {
            foreach ($kbara as $key => $kb) {
                $x = $key;
                $xAwal = 0;
                if ($x - 1 < 0) {
                    if ($kb->ntag < 0) {
                        $awal = $saldoAwal - $kbara[$key]->zqty;
                    } else {
                        $awal = $saldoAwal + $kbara[$key]->zqty;
                    }
                } else {
                    if ($kb->ntag < 0) {
                        $awal = $awal - $kbara[$key]->zqty;
                    } else {
                        $awal = $awal + $kbara[$key]->zqty;
                    }
                    $xAwal = $awal;
                }
                $xkbara[] = [
                    "tgl" => $kb->tgl,
                    "nota" => $kb->nota,
                    "bara" => $kb->bara,
                    "qty" => $kb->qty,
                    "lok" => $kb->lok,
                    "tipe" => $kb->tipe,
                    "kode" => $kb->kode,
                    "zqty" => $kb->zqty,
                    "sat" => $kb->sat,
                    "ntag" => $kb->ntag,
                    "saldo" => $awal,
                ];
            }
            $data = [
                "saldoAwal" => $saldoAwal,
                "kbara" => $xkbara
            ];
        } else {
            $xkbara = [];
            $data = [
                "saldoAwal" => $saldoAwal,
                "kbara" => $xkbara
            ];
        }
        return $this->sendResponse($data, 'kartu Stock');
    }
}
