<?php

namespace App\Http\Controllers;
use App\Models\Deposit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        return inertia('dashboard/transaction/transactions');
    }
    public function deposit()
    {
        return inertia('dashboard/transaction/deposit');
    }

    public function depositSubmit(Request $request)
    {
        $request->validate([
            'phoneNumber' => 'required|string',
            'amount' => 'required|numeric|min:10',
        ]);

        // Create a new deposit record
        $deposit = Deposit::create([
            'user_id' => Auth::id(),
            'phoneNumber' => $request->phoneNumber,
            'amount' => $request->amount,
            'payment_method' => 'mobile_money',
            'status' => 'pending',
        ]);

        return redirect()->route('deposit')->with('success', 'Deposit request submitted successfully.');
    }


    public function withdraw()
    {
        return inertia('dashboard/transaction/withdraw');
    }
}
