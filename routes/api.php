<?php

use App\Http\Controllers\ApiController;
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

Route::get("getStock", [ApiController::class, "getStock"])->name("api.getStock");
Route::get("getStockByBara", [ApiController::class, "getStockByBara"])->name("api.getStockByBara");
Route::get("getSupplier", [ApiController::class, "getSupplier"])->name("api.getSupplier");
Route::get("getPrSearch", [ApiController::class, "getPrSearch"])->name("api.getPrSearch");
Route::get("getPr", [ApiController::class, "getPurchaseRequest"])->name("api.getPr");
Route::get("getPrOpen", [ApiController::class, "getPurchaseRequestOpen"])->name("api.getPrOpen");