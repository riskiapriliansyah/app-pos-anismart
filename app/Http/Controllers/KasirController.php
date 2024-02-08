<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Bjual;
use App\Models\Drawer;
use App\Models\Hari;
use App\Models\Kbara;
use App\Models\Koreksi;
use App\Models\Loginlog;
use App\Models\Pbill;
use App\Models\Sisj;
use App\Models\Stock;
use App\Models\Tbara;
use App\Models\Tbill;
use App\Models\Tjual;
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
                    "lok" => Auth::user()->lok
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
            DB::beginTransaction();
            $bill = new Bill;
            $bill->nota = $header['nota'];
            $bill->tgl = Carbon::now(+8);
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

            if ($header['tunai'] > 0) {
                $hari = Hari::where("jenis", "TUNAI")->where("userid", $header['userid'])->where("tgl", date("ymd"))->first();
                if (isset($hari)) {
                    $hari->nilai = $hari->nilai + $header['tunai'];
                    $hari->save();
                } else {
                    $hari = new Hari;
                    $hari->tgl = Carbon::now(+8);
                    $hari->jenis = "TUNAI";
                    $hari->nilai = $header['total'];
                    $hari->userid = $header['userid'];
                    $hari->save();
                }
            }

            if ($header['kdebet'] > 0) {
                $hari = Hari::where("jenis", $header['jncard1'])->where("userid", $header['userid'])->where("tgl", date("ymd"))->first();
                if (isset($hari)) {
                    $hari->nilai = $hari->nilai + $header['kdebet'];
                    $hari->save();
                } else {
                    $hari = new Hari;
                    $hari->tgl = Carbon::now(+8);
                    $hari->jenis = $header['jncard1'];
                    $hari->nilai = $header['kdebet'];
                    $hari->userid = $header['userid'];
                    $hari->save();
                }
            }

            if ($header['kkrd'] > 0) {
                $hari = Hari::where("jenis", $header['jncard2'])->where("userid", $header['userid'])->where("tgl", date("ymd"))->first();
                if (isset($hari)) {
                    $hari->nilai = $hari->nilai + $header['kkrd'];
                    $hari->save();
                } else {
                    $hari = new Hari;
                    $hari->tgl = Carbon::now(+8);
                    $hari->jenis = $header['jncard1'];
                    $hari->nilai = $header['kkrd'];
                    $hari->userid = $header['userid'];
                    $hari->save();
                }
            }

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

                $tjual = new Tjual;
                $tjual->bara = $b['bara'];
                $tjual->bara1 = $b['bara1'];
                $tjual->qty = $b['qty'];
                $tjual->bruto = $b['bruto'];
                $tjual->netto = $b['netto'];
                $tjual->aver = $b['aver'];
                $tjual->userid = $header['userid'];
                $tjual->tgl = $bill->tgl;
                $tjual->zqty = $b['zqty'];
                $tjual->lok = $header['lok'];
                $tjual->nota = $bill->nota;
                $tjual->save();

                $tbara = Tbara::where("bara", $tbill->bara)->first();
                if (!isset($tbara)) {
                    $tbara = new Tbara;
                    $tbara->bara = $b['bara'];
                    $tbara->lok = $header['lok'];
                    $tbara->keluar = $b['zqty'];
                    $tbara->saldo = $tbara->masuk + $tbara->awal - $tbara->keluar;
                    $tbara->save();
                } else {
                    $tbara->keluar = $tbara->keluar + $b['zqty'];
                    $tbara->saldo = $tbara->masuk + $tbara->awal - $tbara->keluar;
                    $tbara->save();
                }


                $kbara = new Kbara;
                $kbara->nota = $bill->nota;
                $kbara->tgl = $bill->tgl;
                $kbara->bara = $tbill->bara;
                $kbara->bara1 = $tbill->bara1;
                $kbara->sat = $b['satuan'];
                $kbara->qty = $tbill->qty;
                $kbara->lok = $tbara->lok;
                $kbara->tipe = "J";
                $kbara->kode = "JUAL";
                $kbara->zqty = $b['zqty'];
                $kbara->ntag = $b['zqty'] * -1;
                $kbara->save();
            }

            DB::commit();
            return $this->sendResponse("", "data berhasil disimpan");
        } catch (\Exception $ex) {
            DB::rollBack();
            return $this->sendError("", $ex->getMessage());
        }
    }

    public function storePenjualanKasirVoid(Request $request)
    {
        $header = $request->header;
        $body = $request->body;

        try {
            DB::beginTransaction();
            $bill = new Bill;
            $bill->nota = $header['nota'];
            $bill->tgl = Carbon::now(+8);
            $bill->jam = $header['jam'];
            $bill->userid = $header['userid'];
            $bill->nilai = $header['nilai'] * -1;
            $bill->disc = $header['disc'];
            $bill->ndisc = $header['ndisc'];
            $bill->voucher = $header['voucher'];
            $bill->total = $header['total'] * -1;
            $bill->tunai = $header['tunai'] * -1;
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

            if ($bill->tunai < 0) {
                $hari = Hari::where("jenis", "BATAL")->where("userid", $header['userid'])->where("tgl", date("ymd"))->first();
                if (isset($hari)) {
                    $hari->nilai = $hari->nilai + $header['tunai'];
                    $hari->save();
                } else {
                    $hari = new Hari;
                    $hari->tgl = Carbon::now(+8);
                    $hari->jenis = "BATAL";
                    $hari->nilai = $header['total'];
                    $hari->userid = $header['userid'];
                    $hari->save();
                }
            }

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

                $tjual = new Tjual;
                $tjual->bara = $b['bara'];
                $tjual->bara1 = $b['bara1'];
                $tjual->qty = $b['qty'] * -1;
                $tjual->bruto = $b['bruto'] * -1;
                $tjual->netto = $b['netto'] * -1;
                $tjual->aver = $b['aver'] * -1;
                $tjual->userid = $header['userid'];
                $tjual->tgl = $bill->tgl;
                $tjual->zqty = $b['zqty'] * -1;
                $tjual->lok = $header['lok'];
                $tjual->nota = $bill->nota;
                $tjual->save();

                $bjual = new Bjual;
                $bjual->bara = $b['bara'];
                $bjual->bara1 = $b['bara1'];
                $bjual->qty = $b['qty'];
                $bjual->bruto = $b['bruto'];
                $bjual->netto = $b['netto'];
                $bjual->aver = $b['aver'];
                $bjual->userid = $header['userid'];
                $bjual->tgl = $bill->tgl;
                $bjual->zqty = $b['zqty'];
                $bjual->nota = $bill->nota;
                $bjual->save();

                $tbara = Tbara::where("bara", $tbill->bara)->first();
                if (!isset($tbara)) {
                    $tbara = new Tbara;
                    $tbara->bara = $b['bara'];
                    $tbara->lok = $header['lok'];
                    $tbara->keluar = $b['zqty'] * -1;
                    $tbara->saldo = $tbara->masuk + $tbara->awal - $tbara->keluar;
                    $tbara->save();
                } else {
                    $tbara->keluar = $tbara->keluar - $b['zqty'];
                    $tbara->saldo = $tbara->masuk + $tbara->awal - $tbara->keluar;
                    $tbara->save();
                }


                $kbara = new Kbara;
                $kbara->nota = $bill->nota;
                $kbara->tgl = $bill->tgl;
                $kbara->bara = $tbill->bara;
                $kbara->bara1 = $tbill->bara1;
                $kbara->sat = $b['satuan'];
                $kbara->qty = $tbill->qty * -1;
                $kbara->lok = $tbara->lok;
                $kbara->tipe = "J";
                $kbara->kode = "VOID";
                $kbara->zqty = $b['zqty'];
                $kbara->ntag = $b['zqty'] * -1;
                $kbara->save();
            }

            DB::commit();
            return $this->sendResponse("", "data berhasil disimpan");
        } catch (\Exception $ex) {
            DB::rollBack();
            return $this->sendError("", $ex->getMessage());
        }
    }

    public function storePending(Request $request)
    {
        $header = $request->header;
        $body = $request->body;

        try {
            DB::beginTransaction();
            foreach ($body as $b) {
                $pbill = new Pbill;
                $pbill->nota = $header['nota'];
                $pbill->bara = $b['bara'];
                $pbill->bara1 = $b['bara1'];
                $pbill->nama = $b['nama'];
                $pbill->qty = $b['qty'];
                $pbill->satuan = $b['satuan'];
                $pbill->harga = $b['harga'];
                $pbill->disc = $b['disc'];
                $pbill->disc1 = $b['disc1'];
                $pbill->total = $b['total'];
                $pbill->aver = $b['aver'];
                $pbill->userid = $header['userid'];
                $pbill->zqty = $b['zqty'];
                $pbill->tgl = Carbon::now(+8);
                $pbill->hargae = $b['hargae'];
                $pbill->totale = $b['totale'];
                $pbill->save();
            }
            DB::commit();
            return $this->sendResponse("", "data berhasil disimpan");
        } catch (\Exception $ex) {
            DB::rollBack();
            return $this->sendError("", $ex->getMessage());
        }
    }

    public function getPendingBill(Request $request)
    {
        $data = Pbill::where("userid", $request->userid)->where("tgl", date("ymd"))->get();
        return $this->sendResponse($data, "data pending bill");
    }

    public function getPendingByNota(Request $request)
    {
        $data = Pbill::where("nota", $request->nota)->where("userid", $request->userid)->where("tgl", date("ymd"))->get();
        $xdata = $data;
        foreach ($data as $d) {
            $d->delete();
        };

        return $this->sendResponse($xdata, "data pending by nota");
    }

    public function getBillByNota(Request $request)
    {
        $bill = Bill::where("nota", $request->nota)->where('tgl', date("ymd"))->with(['tbill'])->first();
        $sisj = Sisj::first();
        $data = [
            "bill" => $bill,
            "sisj" => $sisj
        ];
        return $this->sendResponse($data, "Data bill");
    }

    public function getBillByUserId(Request $request)
    {
        $data = Bill::where("userid", $request->userid)->where('tgl', date("ymd"))->orderBy("nota", "DESC")->with(['tbill'])->get();
        return $this->sendResponse($data, "Data bill");
    }

    public function getDataTutupKasir(Request $request)
    {
        $drawer = Drawer::where("tgl", $request->tgl)->where("userid", $request->userid)->first();
        if (isset($drawer)) {
            if ($drawer->tutup == "F") {
                $sumNetto = Tjual::where("tgl", $request->tgl)->where("userid", $request->userid)->sum("netto");
                if ($sumNetto == 0) {
                    return $this->sendError("", "Kasir tidak ada transaksi");
                }
                $hari = Hari::where("tgl", $request->tgl)->where("userid", $request->userid)->get();
                $tunai = Hari::where("tgl", $request->tgl)->where("userid", $request->userid)->where("jenis", "TUNAI")->sum("nilai");
                $batal = Hari::where("tgl", $request->tgl)->where("userid", $request->userid)->where("jenis", "BATAL")->sum("nilai");
                $data = [
                    "drawer" => $drawer,
                    "hari" => $hari,
                    "totalOmzet" => $sumNetto,
                    "tunai" => $tunai,
                    "batal" => $batal,
                    "awal" => $drawer->awal
                ];
                return $this->sendResponse($data, "data kasir");
            } else {
                $sumNetto = Tjual::where("tgl", $request->tgl)->where("userid", $request->userid)->sum("netto");
                if ($sumNetto == 0) {
                    return $this->sendError("", "Kasir tidak ada transaksi");
                }
                $hari = Hari::where("tgl", $request->tgl)->where("userid", $request->userid)->get();
                $tunai = Hari::where("tgl", $request->tgl)->where("userid", $request->userid)->where("jenis", "TUNAI")->sum("nilai");
                $batal = Hari::where("tgl", $request->tgl)->where("userid", $request->userid)->where("jenis", "BATAL")->sum("nilai");
                $data = [
                    "drawer" => $drawer,
                    "hari" => $hari,
                    "totalOmzet" => $sumNetto,
                    "tunai" => $tunai,
                    "batal" => $batal,
                    "awal" => $drawer->awal
                ];
                return $this->sendResponse($data, "Kasir Sudah Tutup Hari Ini", 404);
            }
        } else {
            return $this->sendError("", "Data tidak ada");
        }
    }

    public function updateDrawerByUserid(Request $request)
    {
        try {
            DB::beginTransaction();
            $drawer = Drawer::where("userid", $request->userid)->where("tgl", date("ymd"))->firstOrFail();
            $drawer->tutup = 'T';
            $drawer->save();
            DB::commit();
            return $this->sendResponse("", "Berhasil tutup kasir");
        } catch (\Exception $ex) {
            DB::rollBack();
            return $this->sendError("", $ex->getMessage());
        }
    }
}
