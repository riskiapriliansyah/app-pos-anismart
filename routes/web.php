<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BackendController;
use App\Http\Controllers\BestBuyController;
use App\Http\Controllers\DepController;
use App\Http\Controllers\GudangController;
use App\Http\Controllers\KasirController;
use App\Http\Controllers\LanggananController;
use App\Http\Controllers\MasterStockController;
use App\Http\Controllers\PembelianController;
use App\Http\Controllers\PenjualanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReturPembelianController;
use App\Http\Controllers\ReturPenjualanController;
use App\Http\Controllers\SamplingOpnameController;
use App\Http\Controllers\SatuanController;
use App\Http\Controllers\SdepController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\TransferBarangController;
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

Route::get("/", function () {
    return Inertia::render("Login");
});

Route::get("/login", [AuthController::class, 'login'])->name("login");
Route::post("/postLogin", [AuthController::class, 'postLogin'])->name("postLogin");
Route::get("/logout", [AuthController::class, 'logout'])->name("logout");

Route::group(['middleware' => ['auth:web', 'checkRole:super_admin']], function () {
    // =============================Transaksi===============
    Route::get("/transaksi/pembelian/pr/approve", [TransaksiController::class, "purchaseRequestApprove"])->name("transaksi.pembelian.pr.approve");
    Route::post("/transaksi/pembelian/pr/approved", [TransaksiController::class, "purchaseRequestApproved"])->name("transaksi.pembelian.pr.approved");
    Route::get("/transaksi/pembelian/pr/approve/{nota}", [TransaksiController::class, "purchaseRequestApproveShow"])->name("transaksi.pembelian.pr.approve.show");
});

Route::group(['middleware' => ['auth:web', 'checkRole:super_admin,admin']], function () {
    Route::get("/admin/dashboard", [BackendController::class, "dashboard"])->name("admin.dashboard");

    // =====================FILE====================================================
    Route::get("/dep", [DepController::class, 'dep'])->name('dep');
    Route::post("/dep", [DepController::class, 'storeDep'])->name('dep.store');
    Route::post("/dep/update", [DepController::class, 'updateDep'])->name('dep.update');

    Route::get("/sdep", [SdepController::class, 'sdep'])->name('sdep');
    Route::post("/sdep", [SdepController::class, 'storeSdep'])->name('sdep.store');
    Route::post("/sdep/update", [SdepController::class, 'updateSdep'])->name('sdep.update');

    Route::get("/area", [AreaController::class, 'area'])->name('area');
    Route::post("/area", [AreaController::class, 'storeArea'])->name('area.store');
    Route::post("/area/update", [AreaController::class, 'updateArea'])->name('area.update');

    Route::get("/gudang", [GudangController::class, 'gudang'])->name('gudang');
    Route::post("/gudang", [GudangController::class, 'storeGudang'])->name('gudang.store');
    Route::post("/gudang/update", [GudangController::class, 'updateGudang'])->name('gudang.update');

    Route::get("/satuan", [SatuanController::class, 'satuan'])->name('satuan');
    Route::post("/satuan", [SatuanController::class, 'storeSatuan'])->name('satuan.store');
    Route::post("/satuan/update", [SatuanController::class, 'updateSatuan'])->name('satuan.update');

    Route::get("/master-stock", [MasterStockController::class, 'masterStock'])->name('masterStock');
    Route::post("/master-stock", [MasterStockController::class, 'storeStock'])->name('masterStock.store');
    Route::post("/master-stock/tsatuan", [MasterStockController::class, 'storeTsatuanStock'])->name('masterStock.tsatuan.store');
    Route::get("/getStockByBara", [MasterStockController::class, 'getStockByBara'])->name('getStockByBara');

    Route::get("/supplier", [SupplierController::class, 'supplier'])->name('supplier');
    Route::post("/supplier", [SupplierController::class, 'supplierStore'])->name('supplier.store');

    Route::get("/langganan", [LanggananController::class, 'langganan'])->name('langganan');
    Route::post("/langganan", [LanggananController::class, 'langgananStore'])->name('langganan.store');

    Route::get("/formula-paket", [BackendController::class, 'formulaPaket'])->name('formulaPaket');

    Route::get("/best-buy", [BestBuyController::class, 'bestBuy'])->name('bestBuy');
    Route::get("/best-buy/item", [BestBuyController::class, "getBestBuyItem"])->name("getBestBuyItem");
    Route::post("/best-buy/store/item", [BestBuyController::class, 'storeBestBuyItem'])->name('storeBestBuyItem');
    Route::get("/best-buy/get/sdepBydep", [BestBuyController::class, 'getSdepByDep'])->name("getSdepByDep");
    Route::post("/best-buy/store/departemen", [BestBuyController::class, 'storeBestBuyDep'])->name('storeBestBuyDep');

    // =============================Transaksi===============
    Route::get("/transaksi/pembelian/pr", [TransaksiController::class, "purchaseRequest"])->name("transaksi.pembelian.pr");
    Route::get("/transaksi/pembelian/pr/tambah", [TransaksiController::class, "purchaseRequestAdd"])->name("transaksi.pembelian.pr.add");
    Route::post("/transaksi/pembelian/pr/tambah", [TransaksiController::class, "purchaseRequestStore"])->name("transaksi.pembelian.pr.store");
    Route::get("/transaksi/pembelian/pr/show/{nota}", [TransaksiController::class, "purchaseRequestShow"])->name("transaksi.pembelian.pr.show");

    Route::get("/transaksi/pembelian/po", [TransaksiController::class, "purchaseOrder"])->name("transaksi.pembelian.po");
    Route::get("/transaksi/pembelian/po/tambah", [TransaksiController::class, "purchaseOrderAdd"])->name("transaksi.pembelian.po.add");
    Route::post("/transaksi/pembelian/po/tambah", [TransaksiController::class, "purchaseOrderStore"])->name("transaksi.pembelian.po.store");
    Route::get("/transaksi/pembelian/po/show/{nota}", [TransaksiController::class, "purchaseOrderShow"])->name("transaksi.pembelian.po.show");

    Route::get("/transaksi/pembelian/beli", [PembelianController::class, "pembelian"])->name("transaksi.pembelian.beli");
    Route::get("/transaksi/pembelian/beli/tambah", [PembelianController::class, "pembelianAdd"])->name("transaksi.pembelian.beli.add");
    Route::post("/transaksi/pembelian/beli/tambah", [PembelianController::class, "pembelianStore"])->name("transaksi.pembelian.beli.store");
    Route::get("/transaksi/pembelian/beli/show/{nota}", [PembelianController::class, "pembelianShow"])->name("transaksi.pembelian.beli.show");

    Route::get("/transaksi/pembelian/retur", [ReturPembelianController::class, "returPembelian"])->name("transaksi.pembelian.returPembelian");
    Route::get("/transaksi/pembelian/retur/tambah", [ReturPembelianController::class, "returPembelianAdd"])->name("transaksi.pembelian.retur.add");
    Route::post("/transaksi/pembelian/retur/tambah", [ReturPembelianController::class, "returPembelianStore"])->name("transaksi.pembelian.retur.store");
    Route::get("/transaksi/pembelian/retur/show/{nota}", [ReturPembelianController::class, "returPembelianShow"])->name("transaksi.pembelian.retur.show");

    Route::get("/transaksi/penjualan/penjualan-nota", [PenjualanController::class, "penjualanNota"])->name("transaksi.penjualan.penjualanNota");
    Route::get("/transaksi/penjualan/penjualan-nota/tambah", [PenjualanController::class, "penjualanNotaAdd"])->name("transaksi.penjualan.penjualanNota.add");
    Route::post("/transaksi/penjualan/penjualan-nota/tambah", [PenjualanController::class, "penjualanNotaStore"])->name("transaksi.penjualan.penjualanNota.store");
    Route::get("/transaksi/penjualan/penjualan-nota/show/{nota}", [PenjualanController::class, "penjualanNotaShow"])->name("transaksi.penjualan.penjualanNota.show");

    Route::get("/transaksi/penjualan/retur-penjualan", [ReturPenjualanController::class, "returPenjualanNota"])->name("transaksi.penjualan.returPenjualanNota");
    Route::get("/transaksi/penjualan/retur-penjualan/tambah", [ReturPenjualanController::class, "returPenjualanNotaAdd"])->name("transaksi.penjualan.returPenjualanNota.add");
    Route::post("/transaksi/penjualan/retur-penjualan/tambah", [ReturPenjualanController::class, "returPenjualanNotaStore"])->name("transaksi.penjualan.returPenjualanNota.store");
    Route::get("/transaksi/penjualan/retur-penjualan/show/{nota}", [ReturPenjualanController::class, "returPenjualanNotaShow"])->name("transaksi.penjualan.returPenjualanNota.show");

    Route::get("/transaksi/transfer-barang", [TransferBarangController::class, "transferBarang"])->name("transaksi.penjualan.transferBarang");
    Route::get("/transaksi/transfer-barang/tambah", [TransferBarangController::class, "transferBarangAdd"])->name("transaksi.penjualan.transferBarang.add");
    Route::post("/transaksi/transfer-barang/tambah", [TransferBarangController::class, "transferBarangStore"])->name("transaksi.penjualan.transferBarang.store");
    Route::get("/transaksi/transfer-barang/show/{nota}", [TransferBarangController::class, "transferBarangShow"])->name("transaksi.penjualan.transferBarang.show");

    Route::get("/transaksi/penyesuaian-stock/sampling-opname", [SamplingOpnameController::class, "index"])->name("transaksi.penyesuaianStock.samplingOpname");
    Route::post("/transaksi/penyesuaian-stock/sampling-opname", [SamplingOpnameController::class, "store"])->name("transaksi.penyesuaianStock.samplingOpname.store");
});
