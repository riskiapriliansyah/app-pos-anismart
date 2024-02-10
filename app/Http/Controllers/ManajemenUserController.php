<?php

namespace App\Http\Controllers;

use App\Models\Gudang;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ManajemenUserController extends BaseController
{
    public function index()
    {
        $data = User::all();
        return Inertia::render("Backend/Setting/ManajemenUser", [
            "data" => $data,
        ]);
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $user = new User;
            $user->role = $request->role;
            $user->userid = $request->userid;
            $user->name = $request->nama;
            $user->password = bcrypt($request->password);
            $user->lok = Auth::user()->lok;
            $user->save();
            DB::commit();
            return $this->sendResponse($user, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("", $ex->getMessage());
        }
    }

    public function update(Request $request)
    {
        try {
            DB::beginTransaction();
            $user = User::where("userid", $request->userid)->first();
            $user->role = $request->role;
            $user->userid = $request->userid;
            $user->name = $request->nama;
            if ($request->password) {
                $user->password = bcrypt($request->password);
            }
            $user->lok = Auth::user()->lok;
            $user->save();
            DB::commit();
            return $this->sendResponse($user, "Data berhasil disimpan");
        } catch (Exception $ex) {
            DB::rollBack();
            return $this->sendError("", $ex->getMessage());
        }
    }
}
