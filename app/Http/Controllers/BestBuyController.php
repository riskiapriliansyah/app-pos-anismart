<?php

namespace App\Http\Controllers;

use App\Models\BestBuy;
use App\Models\Dep;
use App\Models\Sdep;
use App\Models\Stock;
use App\Models\Tsatuan;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BestBuyController extends BaseController
{
    public function bestBuy()
    {
        // $datas = Sdep::paginate(10);
        $deps = Dep::all();
        return Inertia::render("Backend/Xfile/BestBuy", [
            // "datas" => $datas,
            "deps" => $deps
        ]);
    }

    public function getBestBuyItem()
    {
        $data = BestBuy::where("best2", ">=", Carbon::now(+8))->with(['stock'])->get();
        return $this->sendResponse($data, "Data best buy aktif");
    }

    public function getSdepByDep(Request $request)
    {
        $data = Sdep::where("dep", $request->dep)->get();
        return $this->sendResponse($data, "data sdep");
    }

    public function storeBestBuyItem(Request $request)
    {
        $stock = Stock::where("bara1", $request->bara1)->first();
        $tsatuan = Tsatuan::where("bara1", $request->bara1)->first();

        try {
            DB::beginTransaction();
            $best = new BestBuy;
            $best->bara = $request->bara;
            $best->bara1 = $request->bara1;
            $best->hbest = $request->hbest;
            $best->dbest = $request->dbest;
            $best->dbest1 = $request->dbest1;
            $best->best1 = $request->best1;
            $best->best2 = $request->best2;
            $best->tipe = "1";
            $best->save();

            $stock->hbest = $request->hbest;
            $stock->dbest = $request->dbest;
            $stock->dbest1 = $request->dbest1;
            $stock->best1 = $request->best1;
            $stock->best2 = $request->best2;
            $stock->save();

            if (isset($tsatuan)) {
                $tsatuan->hbest = $request->hbest;
                $tsatuan->dbest = $request->dbest;
                $tsatuan->dbest1 = $request->dbest1;
                $tsatuan->best1 = $request->best1;
                $tsatuan->best2 = $request->best2;
                $tsatuan->save();
            }
            DB::commit();
            return $this->sendResponse($best, "Berhasil simpan best buy");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("", $ex->getMessage());
        }
    }

    public function storeBestBuyDep(Request $request)
    {
        $stocks = Stock::where("dep", $request->dep)->where("sdep", $request->sdep)->get();

        // $tsatuan = Tsatuan::where("bara1", $request->bara1)->first();

        try {
            DB::beginTransaction();
            foreach ($stocks as $stock) {
                $best = new BestBuy;
                $best->bara = $stock->bara;
                $best->bara1 = $stock->bara1;
                $best->dbest = $request->dbest;
                $best->dbest1 = $request->dbest1;
                $best->best1 = $request->best1;
                $best->best2 = $request->best2;
                $best->tipe = "2";
                $best->save();

                $stock->dbest = $request->dbest;
                $stock->dbest1 = $request->dbest1;
                $stock->best1 = $request->best1;
                $stock->best2 = $request->best2;
                $stock->save();

                $tsatuan = Tsatuan::where("bara1", $request->bara1)->first();

                if (isset($tsatuan)) {
                    $tsatuan->dbest = $request->dbest;
                    $tsatuan->dbest1 = $request->dbest1;
                    $tsatuan->best1 = $request->best1;
                    $tsatuan->best2 = $request->best2;
                    $tsatuan->save();
                }
            }
            DB::commit();
            return $this->sendResponse($best, "Berhasil simpan best buy");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("", $ex->getMessage());
        }
    }
}
