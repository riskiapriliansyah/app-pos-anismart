<?php

namespace App\Http\Controllers;

use App\Models\Loginlog;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends BaseController
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

    public function login()
    {
        return Inertia::render("Login");
    }

    public function postLogin(Request $request)
    {
        $time = Carbon::now(+8);
        if (Auth::attempt($request->only("userid", "password"))) {
            if (Auth::user()->status === "0") {
                return $this->sendError("", "Akun anda tidak aktif");
            } else {
                if (auth()->user()->role == 'admin') {
                    $this->addLog(auth()->user()->id, auth()->user()->name, $time, $time);
                    return redirect()->route("admin.dashboard");
                };
                if (auth()->user()->role == 'super_admin') {
                    $this->addLog(auth()->user()->id, auth()->user()->name, $time, $time);
                    return redirect()->route("admin.dashboard");
                };
            }
        } else {
            return $this->sendError("", "Username atau Password salah");
        }
    }

    public function logout()
    {
        Auth::logout();
        return to_route("login");
    }
}
