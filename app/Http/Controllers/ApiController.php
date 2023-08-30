<?php

namespace App\Http\Controllers;

use App\Models\Gudang;
use App\Models\Po;
use App\Models\Pr;
use App\Models\Stock;
use App\Models\Supp;
use Illuminate\Http\Request;

class ApiController extends BaseController
{
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
    
    public function getPrSearch(Request $request) {
        $datas = Pr::where("nota", "LIKE", "%{$request->kode}%")->with(['supplier', 'tpr'])->latest()->paginate(10);
        return $this->sendResponse($datas, "data pr");
    }

    public function getPurchaseRequestOpen(Request $request) {
        $datas = Pr::where("nota", "LIKE", "%{$request->kode}%")->where("status_po", "0")->where("status", "2")->with(['supplier', 'tpr'])->latest()->paginate(10);
        return $this->sendResponse($datas, "data pr");
    }

    public function getPurchaseOrderOpen(Request $request) {
        $datas = Po::where("nota", "LIKE", "%{$request->kode}%")->where("status_beli", "0")->with(['supplier', 'tpo'])->latest()->paginate(10);
        return $this->sendResponse($datas, "data pr");
    }

    public function getGudang()
    {
        $datas = Gudang::get();
        return $this->sendResponse($datas, "data gudang");
    }

}
