<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Withdraw;
use Inertia\Inertia;

class MiningController extends Controller
{
    public function engines()
    {
        return inertia('dashboard/mining_engines');
    }

    public function active()
    {
        return inertia('dashboard/active_engine');
    }

    public function earnings()
    {
        $user = Auth::user();

        $deposits = Deposit::where('user_id', $user->id)->sum('amount');
        $withdraws = Withdraw::where('user_id', $user->id)->sum('amount');

        return Inertia::render('dashboard/earnings', [
            'totalDeposits' => $deposits,
            'totalWithdraws' => $withdraws,
        ]);
    }
}
