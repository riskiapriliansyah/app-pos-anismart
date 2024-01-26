<?php

namespace App\Http\Controllers;

use App\Models\Drawer;
use App\Models\Notaj;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ApiTransaksiController extends BaseController
{
    public function getNotaBaru(Request $request)
    {
        $drawer = Drawer::where("userid", $request->userid)->where("tgl", date('ymd', strtotime(Carbon::now(+8))))->first();
        if (isset($drawer)) {
            $nota = Notaj::where("tgl", date("Y-m-d"))->first();
            if (isset($nota)) {
                $count = $nota->nota + 1;
                $xNota = date("Ymd") . "-" . $count;
                $nota->nota = $count;
                $nota->save();
                return $this->sendResponse($xNota, "nota");
            } else {
                $nota = new Notaj;
                $nota->tgl = Carbon::now(+8);
                $nota->nota = 1;
                $nota->save();

                $xNota = date("Ymd") . "-1";
                return $this->sendResponse($xNota, "nota");
            }
        } else {
            return $this->sendResponse("", "Kasir belum buka kas awal");
        }
    }
}
