<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Cust;
use App\Models\Dep;
use App\Models\Div;
use App\Models\Gudang;
use App\Models\Satuan;
use App\Models\Sdep;
use App\Models\Stock;
use App\Models\Supp;
use App\Models\Tbara;
use App\Models\Tsatuan;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BackendController extends BaseController
{
    public function dashboard()
    {
        return Inertia::render("Backend/Dashboard");
    }

    public function formulaPaket()
    {
        $datas = Sdep::paginate(10);
        return Inertia::render("Backend/Xfile/FormulaPaket", [
            "datas" => $datas
        ]);
    }
}
