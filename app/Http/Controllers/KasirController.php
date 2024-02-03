<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Drawer;
use App\Models\Kbara;
use App\Models\Koreksi;
use App\Models\Loginlog;
use App\Models\Sisj;
use App\Models\Stock;
use App\Models\Tbara;
use App\Models\Tbill;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class KasirController extends BaseController
{
    private function addLog($user_id, $name, $tgl, $jam)
    {
        Loginlog::create([
            'user_id' => $user_id,
            'name' => $name,
            'tgl' => $tgl,
            'jam' => $jam,
        ]);
        $user = User::where("id", $user_id)->first();
        $user->last_login = Carbon::now(+8);
        $user->save();
        return 1;
    }

    public function postLoginKasir(Request $request)
    {
        $time = Carbon::now(+8);
        if (Auth::attempt($request->only("userid", "password"))) {
            if (Auth::user()->status === "0") {
                return $this->sendError("", "Akun anda tidak aktif");
            } else {
                // if (auth()->user()->role == 'admin') {
                //     $this->addLog(auth()->user()->id, auth()->user()->name, $time, $time);
                //     return redirect()->route("admin.dashboard");
                // };
                // if (auth()->user()->role == 'super_admin') {
                //     $this->addLog(auth()->user()->id, auth()->user()->name, $time, $time);
                //     return redirect()->route("admin.dashboard");
                // };
                $this->addLog(auth()->user()->id, auth()->user()->name, $time, $time);
                $data = [
                    "userid" => Auth::user()->userid,
                    "role" => Auth::user()->role,
                    "name" => Auth::user()->name,
                ];
                return $this->sendResponse($data, "Data user");
            }
        } else {
            return $this->sendError("", "Username atau Password salah");
        }
    }

    public function logout()
    {
        Auth::guard('web')->logout();
        return to_route("login");
    }

    public function getUserKasir()
    {
        $data = User::where("role", "kasir")->get();
        return $this->sendResponse($data, "data user kasir");
    }

    public function getUserKasirByUserId(Request $request)
    {
        $data = User::where("userid", $request->userid)->first();
        return $this->sendResponse($data, "data user kasir");
    }

    public function storeKasAwal(Request $request)
    {
        if ($request->role != "kasir") {
            $cek = Drawer::where("userid", $request->userid)->where("tgl", date('ymd', strtotime(Carbon::now(+8))))->first();
            // return $cek;
            if (!isset($cek)) {
                $drawer = new Drawer;
                $drawer->tgl = Carbon::now(+8);
                $drawer->userid = $request->userid;
                $drawer->awal = $request->awal;
                $drawer->ambil = 0;
                $drawer->tutup = "F";
                $drawer->save();

                return $this->sendResponse($drawer, "Berhasil");
            } else {
                return $this->sendResponse($cek, "Kasir Sudah Ada");
            }
        } else {
            return $this->sendError("", "Anda bukan admin");
        }
    }

    public function getDrawer(Request $request)
    {
        $sisj = Sisj::first();
        $drawer = Drawer::where("userid", $request->userid)->where("tgl", date('ymd', strtotime(Carbon::now(+8))))->first();
        $data = [
            "sisj" => $sisj,
            "drawer" => $drawer
        ];
        return $this->sendResponse($data, 'data drawer');
    }

    public function storeKoreksi(Request $request)
    {
        $body = $request->body;
        try {
            DB::beginTransaction();
            foreach ($body as $b) {
                $koreksi = new Koreksi;
                $koreksi->bara = $b['bara'];
                $koreksi->bara1 = $b['bara1'];
                $koreksi->bruto = $b['bruto'];
                $koreksi->netto = $b['netto'];
                $koreksi->userid = $b['userid'];
                $koreksi->tgl = Carbon::now(+8);
                $koreksi->lok = $b['lok'];
                $koreksi->nama = $b['nama'];
                $koreksi->jenis = $b['jenis'];
                $koreksi->save();
            }
            DB::commit();
            return $this->sendResponse("Berhasil", "Data berhasil disimpan");
        } catch (\Exception $ex) {
            return $this->sendError("", $ex->getMessage());
        }
    }

    public function storePenjualanKasir(Request $request)
    {
        $header = $request->header;
        $body = $request->body;

        try {
            $bill = new Bill;
            $bill->nota = $header['nota'];
            $bill->tgl = $header['tgl'];
            $bill->jam = $header['jam'];
            $bill->userid = $header['userid'];
            $bill->nilai = $header['nilai'];
            $bill->disc = $header['disc'];
            $bill->ndisc = $header['ndisc'];
            $bill->voucher = $header['voucher'];
            $bill->total = $header['total'];
            $bill->tunai = $header['tunai'];
            $bill->kdebet = $header['kdebet'];
            $bill->kkrd = $header['kkrd'];
            $bill->kembali = $header['kembali'];
            $bill->nocard1 = $header['nocard1'];
            $bill->nmcard1 = $header['nmcard1'];
            $bill->jncard1 = $header['jncard1'];
            $bill->appr1 = $header['appr1'];
            $bill->nocard2 = $header['nocard2'];
            $bill->nmcard2 = $header['nmcard2'];
            $bill->jncard2 = $header['jncard2'];
            $bill->appr2 = $header['appr2'];
            $bill->piutang = $header['piutang'];
            $bill->kode = $header['kode'];
            $bill->point = $header['point'];
            $bill->save();

            foreach ($body as $b) {
                $tbill = new Tbill;
                $tbill->nota = $bill->nota;
                $tbill->tgl = $bill->tgl;
                $tbill->bara = $b['bara'];
                $tbill->bara1 = $b['bara1'];
                $tbill->nama = $b['nama'];
                $tbill->qty = $b['qty'];
                $tbill->satuan = $b['satuan'];
                $tbill->harga = $b['harga'];
                $tbill->disc = $b['disc'];
                $tbill->total = $b['total'];
                $tbill->hargae = $b['hargae'];
                $tbill->totale = $b['totale'];
                $tbill->bkp = "F";
                $tbill->lvoid = $b['lvoid'];
                $tbill->lvoc = "T";
                $tbill->disc1 = $b['disc1'];
                $tbill->bbh = "F";
                $tbill->save();

                $tbara = Tbara::where("bara", $tbill->bara)->first();
                $tbara->keluar = $tbara->keluar + $body['zqty'];
                $tbara->saldo = $tbara->masuk + $tbara->awal - $tbara->keluar;
                $tbara->save();

                $kbara = new Kbara;
                $kbara->nota = $bill->nota;
                $kbara->tgl = $bill->tgl;
                $kbara->bara = $tbill->bara;
                $kbara->bara1 = $tbill->bara1;
                $kbara->qty = $tbill->qty;
                $kbara->lok = $tbara->lok;
                $kbara->tipe = "J";
                $kbara->kode = "JUAL";
                $kbara->zqty = $body['zqty'];
                $kbara->ntag = $body['zqty'] * -1;
                $kbara->save();
            }
        } catch (\Exception $ex) {
            return $this->sendError("", $ex->getMessage());
        }
    }
}
