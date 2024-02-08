<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ApiTransaksiController;
use App\Http\Controllers\KasirController;
use App\Models\AuthApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get("getSisj", [ApiController::class, "getSisj"])->name("api.getSisj");
Route::get("getGudang", [ApiController::class, "getGudang"])->name("api.getGudang");
Route::get("getDepByDiv", [ApiController::class, "getDepByDiv"])->name("api.getDepByDiv");
Route::get("getSdepByDep", [ApiController::class, "getSdepByDep"])->name("api.getSdepByDep");
Route::get("getStock", [ApiController::class, "getStock"])->name("api.getStock");
Route::get("getStockByBara", [ApiController::class, "getStockByBara"])->name("api.getStockByBara");
Route::get("getSupplier", [ApiController::class, "getSupplier"])->name("api.getSupplier");
Route::get("getCust", [ApiController::class, "getCust"])->name("api.getCust");
Route::get("getPrSearch", [ApiController::class, "getPrSearch"])->name("api.getPrSearch");
Route::get("getPr", [ApiController::class, "getPurchaseRequest"])->name("api.getPr");
Route::get("getPrOpen", [ApiController::class, "getPurchaseRequestOpen"])->name("api.getPrOpen");
Route::get("getPoOpen", [ApiController::class, "getPurchaseOrderOpen"])->name("api.getPoOpen");
Route::get("getPenjualan", [ApiController::class, "getPenjualan"])->name("api.getPenjualan");
Route::get("getKartuStock", [ApiController::class, 'getKartuStock'])->name('api.getKartuStock');

// ============Transaksi API
Route::get("getNotaBaru", [ApiTransaksiController::class, "getNotaBaru"])->name("api.getNotaBaru");

// Route::group(['middleware' => 'auth:api', 'prefix' => 'auth'], function ($router) {
//     Route::post('login', [AuthApiController::class, "login"]);
//     Route::post('logout', [AuthApiController::class, "logout"]);
//     Route::post('refresh', [AuthApiController::class, "refresh"]);
//     Route::post('me', [AuthApiController::class, "me"]);
// });
Route::post("postLoginKasir", [KasirController::class, 'postLoginKasir'])->name("kasir.login");
Route::post("storeKasAwal", [KasirController::class, 'storeKasAwal'])->name("api.storeKasAwal");
Route::get("getUserKasir", [KasirController::class, "getUserKasir"])->name("api.getUserKasir");
Route::get("getUserKasirByUserId", [KasirController::class, "getUserKasirByUserId"])->name("api.getUserKasirByUserId");
Route::get("getDrawer", [KasirController::class, "getDrawer"])->name("api.getDrawer");
Route::post("storeKoreksi", [KasirController::class, "storeKoreksi"])->name("api.storeKoreksi");
Route::post("storePenjualanKasir", [KasirController::class, "storePenjualanKasir"])->name("api.storePenjualanKasir");
Route::post("storePenjualanKasirVoid", [KasirController::class, "storePenjualanKasirVoid"])->name("api.storePenjualanKasirVoid");
Route::post("storePending", [KasirController::class, "storePending"])->name("api.storePending");
Route::get("getPendingBill", [KasirController::class, "getPendingBill"])->name("api.getPendingBill");
Route::get("getPendingByNota", [KasirController::class, "getPendingByNota"])->name("api.getPendingByNota");
Route::get("getBillByNota", [KasirController::class, "getBillByNota"])->name("api.getBillByNota");
Route::get("getBillByUserId", [KasirController::class, "getBillByUserId"])->name("api.getBillByUserId");
Route::get("getDataTutupKasir", [KasirController::class, "getDataTutupKasir"])->name("api.getDataTutupKasir");
Route::get("updateDrawerByUserid", [KasirController::class, "updateDrawerByUserid"])->name("api.updateDrawerByUserid");
