<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WithdrawController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware(['auth:sanctum'])->group(function () {

    // User API endpoints
    Route::prefix('withdraw')->group(function () {
        Route::post('/submit', [WithdrawController::class, 'withdrawSubmit']);
        Route::get('/history', [WithdrawController::class, 'history']);
        Route::post('/{withdraw}/cancel', [WithdrawController::class, 'cancel']);
        Route::get('/balance', [WithdrawController::class, 'getBalance']);
    });

    // Admin API endpoints
    Route::middleware(['admin'])->prefix('admin/withdrawals')->group(function () {
        Route::get('/', [WithdrawController::class, 'adminIndex']);
        Route::post('/{withdraw}/approve', [WithdrawController::class, 'approve']);
        Route::post('/{withdraw}/reject', [WithdrawController::class, 'reject']);
    });
});
