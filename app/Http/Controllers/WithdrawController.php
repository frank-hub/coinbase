<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Withdraw;
use App\Models\User;
use App\Models\Deposit;
use Inertia\Inertia;
use Laravel\Pail\ValueObjects\Origin\Console;

class WithdrawController extends Controller
{
    /**
     * Display the withdraw form
     */
    public function index()
    {
        $user = Auth::user();
        $totalDeposits = intval(Deposit::where('user_id', $user->id)
                                // ->where('status', 'completed')
                               ->sum('amount'));

        $totalWithdraws = Withdraw::where('user_id', $user->id)
                                    // ->where('status', 'completed')
                                 ->sum('amount');

        $pendingWithdraws = Withdraw::where('user_id', $user->id)
                                  ->where('status', 'pending')
                                  ->sum('amount');

        $availableBalance = intval($totalDeposits) - $totalWithdraws - $pendingWithdraws;

        $recentWithdraws = Withdraw::where('user_id', $user->id)
                                 ->orderBy('created_at', 'desc')
                                 ->limit(10)
                                 ->get();

        // return response()->json([

        //     'availableBalance' => $availableBalance,
        //     'totalDeposits' => $totalDeposits,
        // ]);
            return Inertia::render('dashboard/transaction/withdraw', [
            'user' => $user,
            'availableBalance' => $availableBalance,
            'totalDeposits' => $totalDeposits,
            'totalWithdraws' => $totalWithdraws,
            'pendingWithdraws' => $pendingWithdraws,
            'recentWithdraws' => $recentWithdraws
        ]);
    }

    /**
     * Process withdraw request
     */
    public function withdrawSubmit(Request $request)
    {
        try {
            // Validate the request
            $validated = $request->validate([
                'phoneNumber' => 'required|string|min:10|max:15|regex:/^[0-9+\-\s()]+$/',
                'amount' => 'required|numeric|min:10|max:1000000',
                'withdraw_method' => 'required|in:mpesa,bank_transfer,crypto',
                'account_details' => 'required|string|max:255',
            ]);

            $user = Auth::user();
            $withdrawAmount = $validated['amount'];

            // Calculate available balance
            $availableBalance = $this->calculateAvailableBalance($user->id);

           
            // Check if user has sufficient balance
            if ($withdrawAmount > $availableBalance) {
                return response()->json([
                    'success' => false,
                    'message' => 'Insufficient balance. Available: KES ' . number_format($availableBalance, 2)
                ], 400);
            }

            // Check daily withdraw limit
            $dailyLimit = 50000; // KES 50,000 daily limit
            $todayWithdraws = Withdraw::where('user_id', $user->id)
                                    ->whereDate('created_at', today())
                                    ->where('status', '!=', 'rejected')
                                    ->sum('amount');

            if (($todayWithdraws + $withdrawAmount) > $dailyLimit) {
                return response()->json([
                    'success' => false,
                    'message' => 'Daily withdraw limit exceeded. Limit: KES ' . number_format($dailyLimit, 2) .
                               ', Used today: KES ' . number_format($todayWithdraws, 2)
                ], 400);
            }

            // Check for pending withdraws (optional - limit to 3 pending)
            $pendingCount = Withdraw::where('user_id', $user->id)
                                  ->where('status', 'pending')
                                  ->count();

            if ($pendingCount >= 3) {
                return response()->json([
                    'success' => false,
                    'message' => 'You have too many pending withdrawals. Please wait for them to be processed.'
                ], 400);
            }

            // Generate unique transaction reference
            $transactionRef = 'WTH' . time() . rand(1000, 9999);

            // Create withdraw record using database transaction
            DB::beginTransaction();

            $withdraw = Withdraw::create([
                'user_id' => $user->id,
                'phoneNumber' => $validated['phoneNumber'],
                'amount' => $withdrawAmount,
                'withdraw_method' => $validated['withdraw_method'],
                'account_details' => $validated['account_details'],
                'transaction_ref' => $transactionRef,
                'status' => 'pending',
                'requested_at' => now(),
            ]);

            // Log the withdrawal request
            Log::info('Withdrawal request created', [
                'user_id' => $user->id,
                'withdraw_id' => $withdraw->id,
                'amount' => $withdrawAmount,
                'method' => $validated['withdraw_method']
            ]);

            DB::commit();

            // Send notification (you can implement email/SMS here)
            $this->sendWithdrawNotification($withdraw);

            return response()->json([
                'success' => true,
                'message' => 'Withdrawal request submitted successfully',
                'withdraw' => [
                    'id' => $withdraw->id,
                    'transaction_ref' => $transactionRef,
                    'amount' => $withdrawAmount,
                    'status' => 'pending',
                    'created_at' => $withdraw->created_at->format('Y-m-d H:i:s')
                ]
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Withdrawal submission error', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your withdrawal request'
            ], 500);
        }
    }

    /**
     * Get user's withdraw history
     */
    public function history(Request $request)
    {
        $user = Auth::user();
        $perPage = $request->get('per_page', 15);

        $withdraws = Withdraw::where('user_id', $user->id)
                           ->orderBy('created_at', 'desc')
                           ->paginate($perPage);

        return response()->json([
            'success' => true,
            'withdraws' => $withdraws
        ]);
    }

    /**
     * Cancel pending withdrawal
     */
    public function cancel(Request $request, $withdrawId)
    {
        try {
            $user = Auth::user();

            $withdraw = Withdraw::where('id', $withdrawId)
                              ->where('user_id', $user->id)
                              ->where('status', 'pending')
                              ->first();

            if (!$withdraw) {
                return response()->json([
                    'success' => false,
                    'message' => 'Withdrawal not found or cannot be cancelled'
                ], 404);
            }

            $withdraw->update([
                'status' => 'cancelled',
                'cancelled_at' => now(),
                'cancellation_reason' => 'Cancelled by user'
            ]);

            Log::info('Withdrawal cancelled by user', [
                'user_id' => $user->id,
                'withdraw_id' => $withdraw->id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Withdrawal cancelled successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Withdrawal cancellation error', [
                'user_id' => Auth::id(),
                'withdraw_id' => $withdrawId,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while cancelling the withdrawal'
            ], 500);
        }
    }

    /**
     * Admin methods for processing withdrawals
     */

    /**
     * Approve withdrawal (Admin only)
     */
    public function approve(Request $request, $withdrawId)
    {
        // $this->authorize('admin'); // Make sure you have admin authorization

        try {
            $withdraw = Withdraw::findOrFail($withdrawId);

            if ($withdraw->status !== 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only pending withdrawals can be approved'
                ], 400);
            }

            // Check if user still has sufficient balance
            $availableBalance = $this->calculateAvailableBalance($withdraw->user_id);

            if ($withdraw->amount > $availableBalance) {
                $withdraw->update([
                    'status' => 'rejected',
                    'processed_at' => now(),
                    'rejection_reason' => 'Insufficient balance at processing time'
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Withdrawal rejected due to insufficient balance'
                ], 400);
            }

            $withdraw->update([
                'status' => 'completed',
                'processed_at' => now(),
                'processed_by' => Auth::id()
            ]);

            // Send success notification
            $this->sendWithdrawStatusNotification($withdraw, 'completed');

            Log::info('Withdrawal approved', [
                'admin_id' => Auth::id(),
                'withdraw_id' => $withdraw->id,
                'user_id' => $withdraw->user_id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Withdrawal approved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Withdrawal approval error', [
                'admin_id' => Auth::id(),
                'withdraw_id' => $withdrawId,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while approving the withdrawal'
            ], 500);
        }
    }

    /**
     * Reject withdrawal (Admin only)
     */
    public function reject(Request $request, $withdrawId)
    {
        // $this->authorize('admin');

        try {
            $validated = $request->validate([
                'rejection_reason' => 'required|string|max:500'
            ]);

            $withdraw = Withdraw::findOrFail($withdrawId);

            if ($withdraw->status !== 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only pending withdrawals can be rejected'
                ], 400);
            }

            $withdraw->update([
                'status' => 'rejected',
                'processed_at' => now(),
                'processed_by' => Auth::id(),
                'rejection_reason' => $validated['rejection_reason']
            ]);

            // Send rejection notification
            $this->sendWithdrawStatusNotification($withdraw, 'rejected');

            Log::info('Withdrawal rejected', [
                'admin_id' => Auth::id(),
                'withdraw_id' => $withdraw->id,
                'user_id' => $withdraw->user_id,
                'reason' => $validated['rejection_reason']
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Withdrawal rejected successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Withdrawal rejection error', [
                'admin_id' => Auth::id(),
                'withdraw_id' => $withdrawId,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while rejecting the withdrawal'
            ], 500);
        }
    }

    /**
     * Calculate available balance for user
     */
    private function calculateAvailableBalance($userId)
    {
        $totalDeposits = Deposit::where('user_id', $userId)
                            //    ->where('status', 'completed')
                               ->sum('amount');

        $totalWithdraws = Withdraw::where('user_id', $userId)
                                 ->where('status', 'completed')
                                 ->sum('amount');

        $pendingWithdraws = Withdraw::where('user_id', $userId)
                                  ->where('status', 'pending')
                                  ->sum('amount');

        return $totalDeposits - $totalWithdraws - $pendingWithdraws;
    }

    /**
     * Send withdrawal notification
     */
    private function sendWithdrawNotification($withdraw)
    {
        // Implement email/SMS notification here
        // Example: Mail::to($withdraw->user)->send(new WithdrawRequestMail($withdraw));
    }

    /**
     * Send withdrawal status notification
     */
    private function sendWithdrawStatusNotification($withdraw, $status)
    {
        // Implement email/SMS notification here
        // Example: Mail::to($withdraw->user)->send(new WithdrawStatusMail($withdraw, $status));
    }

    public function getBalance()
    {
        $user = Auth::user();
        $availableBalance = $this->calculateAvailableBalance($user->id);

        return response()->json([
            'success' => true,
            'balance' => $availableBalance,
            'formatted_balance' => 'KES ' . number_format($availableBalance, 2)
        ]);
    }

    public function adminIndex(Request $request)
    {
        $status = $request->get('status', 'pending');
        $perPage = $request->get('per_page', 20);

        $withdrawals = Withdraw::with(['user', 'processedBy'])
                            ->when($status !== 'all', function($query) use ($status) {
                                $query->where('status', $status);
                            })
                            ->orderBy('created_at', 'desc')
                            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'withdrawals' => $withdrawals
        ]);
    }
}
