<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Supp;
use Illuminate\Http\Request;

class ApiController extends BaseController
{
    public function getStock(Request $request)
    {
        if($request->searchBy == "*"){
            $datas = Stock::take(10)->get();
            return $this->sendResponse($datas, "data stock");
        }
        if($request->searchBy == "nama"){
            $datas = Stock::where("nama", "LIKE", "%{$request->kode}%")->take(10)->get();
            return $this->sendResponse($datas, "data stock");
        }
        if($request->searchBy == "bara1"){
            $datas = Stock::where("bara1", "LIKE", "%{$request->kode}%")->take(10)->get();
            return $this->sendResponse($datas, "data stock");
        }
    }

    public function getSupplier(Request $request)
    {
        if($request->searchBy == "*"){
            $datas = Supp::take(10)->get();
            return $this->sendResponse($datas, "data supplier");
        }
        if($request->searchBy == "nama"){
            $datas = Supp::where("nama", "LIKE", "%{$request->kode}%")->take(10)->get();
            return $this->sendResponse($datas, "data supplier");
        }
    }
}
