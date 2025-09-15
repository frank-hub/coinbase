<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Deposit;
use App\Models\Withdraw;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $totalDeposits = intval(Deposit::where('user_id', $user->id)
                                // ->where('status', 'completed')
                               ->sum('amount'));
        $totalWithdraws = intval(Withdraw::where('user_id', $user->id)
                                // ->where('status', 'completed')
                               ->sum('amount'));
        
        $availableBalance = $totalDeposits - $totalWithdraws;

        return Inertia::render('dashboard/index', [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'totalWithdraws' => $totalWithdraws,
            'availableBalance' => $availableBalance,
        ]);
    }

    public function referrals()
    {
        return inertia('dashboard/referrals');
    }
}
