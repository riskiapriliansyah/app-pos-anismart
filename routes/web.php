<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BackendController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransaksiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", function() {
    return Inertia::render("Login");
});

Route::get("/login", [AuthController::class, 'login'])->name("login");
Route::post("/postLogin", [AuthController::class, 'postLogin'])->name("postLogin");
Route::get("/logout", [AuthController::class, 'logout'])->name("logout");

Route::group(['middleware' => ['auth', 'checkRole:admin']], function () {
    Route::get("/admin/dashboard", [BackendController::class, "dashboard"])->name("admin.dashboard");

// =====================FILE====================================================
    Route::get("/dep", [BackendController::class, 'dep'])->name('dep');
    Route::post("/dep", [BackendController::class, 'storeDep'])->name('dep.store');
    Route::post("/dep/update", [BackendController::class, 'updateDep'])->name('dep.update');

    Route::get("/sdep", [BackendController::class, 'sdep'])->name('sdep');
    Route::post("/sdep", [BackendController::class, 'storeSdep'])->name('sdep.store');
    Route::post("/sdep/update", [BackendController::class, 'updateSdep'])->name('sdep.update');

    Route::get("/area", [BackendController::class, 'area'])->name('area');
    Route::post("/area", [BackendController::class, 'storeArea'])->name('area.store');
    Route::post("/area/update", [BackendController::class, 'updateArea'])->name('area.update');

    Route::get("/gudang", [BackendController::class, 'gudang'])->name('gudang');
    Route::post("/gudang", [BackendController::class, 'storeGudang'])->name('gudang.store');
    Route::post("/gudang/update", [BackendController::class, 'updateGudang'])->name('gudang.update');

    Route::get("/satuan", [BackendController::class, 'satuan'])->name('satuan');
    Route::post("/satuan", [BackendController::class, 'storeSatuan'])->name('satuan.store');
    Route::post("/satuan/update", [BackendController::class, 'updateSatuan'])->name('satuan.update');

    Route::get("/master-stock", [BackendController::class, 'masterStock'])->name('masterStock');
    Route::get("/supplier", [BackendController::class, 'supplier'])->name('supplier');
    Route::get("/langganan", [BackendController::class, 'langganan'])->name('langganan');
    Route::get("/formula-paket", [BackendController::class, 'formulaPaket'])->name('formulaPaket');
    Route::get("/best-buy", [BackendController::class, 'bestBuy'])->name('bestBuy');

// =============================Transaksi===============
    Route::get("/transaksi/pembelian/pr", [TransaksiController::class, "purchaseRequest"])->name("transaksi.pembelian.pr");
    Route::get("/transaksi/pembelian/pr/tambah", [TransaksiController::class, "purchaseRequestAdd"])->name("transaksi.pembelian.pr.add");
    Route::post("/transaksi/pembelian/pr/tambah", [TransaksiController::class, "purchaseRequestStore"])->name("transaksi.pembelian.pr.store");
    Route::get("/transaksi/pembelian/pr/show/{nota}", [TransaksiController::class, "purchaseRequestShow"])->name("transaksi.pembelian.pr.show");

    Route::get("/transaksi/pembelian/po", [TransaksiController::class, "purchaseOrder"])->name("transaksi.pembelian.po");
    Route::get("/transaksi/pembelian/po/tambah", [TransaksiController::class, "purchaseOrderAdd"])->name("transaksi.pembelian.po.add");
    Route::post("/transaksi/pembelian/po/tambah", [TransaksiController::class, "purchaseOrderStore"])->name("transaksi.pembelian.po.store");
    Route::get("/transaksi/pembelian/po/show/{nota}", [TransaksiController::class, "purchaseOrderShow"])->name("transaksi.pembelian.po.show");

    Route::get("/transaksi/pembelian/beli", [TransaksiController::class, "pembelian"])->name("transaksi.pembelian.beli");
    Route::get("/transaksi/pembelian/retur", [TransaksiController::class, "retur"])->name("transaksi.pembelian.retur");
});
