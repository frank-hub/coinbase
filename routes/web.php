<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PhpParser\Node\Stmt\Return_;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\MiningController;

use App\Http\Controllers\WithdrawController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions');
    Route::get('/deposit', [TransactionController::class, 'deposit'])->name('deposit');
    // Route::get('/withdraw', [TransactionController::class, 'withdraw'])->name('withdraw');
    Route::get('/mining_engines', [MiningController::class, 'engines'])->name('mining_engines');
    Route::get('/active-engine', [MiningController::class, 'active'])->name('active_engine');
    Route::get('/earnings', [MiningController::class, 'earnings'])->name('earnings');
    Route::get('/network', [DashboardController::class, 'referrals'])->name('referrals');
    Route::get('/help', function () {
        return inertia('dashboard/help');
    })->name('help');
    Route::get('submit-ticket', function () {
        return inertia('dashboard/ticket_form');
    })->name('submit_ticket');
    Route::get('/faq', function () {
        return inertia('dashboard/faq');
    })->name('faq');
    Route::get('/profile', [DashboardController::class, 'profile'])->name('profile');

    Route::post('/deposit-submit', [TransactionController::class, 'depositSubmit'])->name('deposit_submit');
});




// Withdrawal Routes
Route::middleware(['auth'])->group(function () {

    // Withdraw form page
    Route::get('/withdraw', [WithdrawController::class, 'index'])->name('withdraw');

    // Submit withdraw request
    Route::post('/withdraw-submit', [WithdrawController::class, 'withdrawSubmit'])->name('withdraw.submit');

    // Get withdraw history
    Route::get('/withdraw/history', [WithdrawController::class, 'history'])->name('withdraw.history');

    // Cancel pending withdraw
    Route::post('/withdraw/{withdraw}/cancel', [WithdrawController::class, 'cancel'])->name('withdraw.cancel');
});

// Admin withdraw routes (protected by admin middleware)
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {

    // Admin dashboard for withdrawals
    Route::get('/withdrawals', [WithdrawController::class, 'adminIndex'])->name('admin.withdrawals');

    // Approve withdrawal
    Route::post('/withdrawals/{withdraw}/approve', [WithdrawController::class, 'approve'])->name('admin.withdrawals.approve');

    // Reject withdrawal
    Route::post('/withdrawals/{withdraw}/reject', [WithdrawController::class, 'reject'])->name('admin.withdrawals.reject');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
