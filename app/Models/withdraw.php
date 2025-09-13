<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class withdraw extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'phoneNumber',
        'amount',
        'withdraw_method',
        'account_details',
        'transaction_ref',
        'status',
        'requested_at',
        'processed_at',
        'processed_by',
        'cancelled_at',
        'rejection_reason',
        'cancellation_reason',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'requested_at' => 'datetime',
        'processed_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    protected $appends = [
        'formatted_amount',
        'status_color',
        'can_cancel'
    ];

    /**
     * Get the user that owns the withdrawal
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the admin who processed the withdrawal
     */
    public function processedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    /**
     * Get formatted amount
     */
    public function getFormattedAmountAttribute(): string
    {
        return 'KES ' . number_format($this->amount, 2);
    }

    /**
     * Get status color for UI
     */
    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'orange',
            'completed' => 'green',
            'rejected' => 'red',
            'cancelled' => 'gray',
            default => 'gray'
        };
    }

    /**
     * Check if withdrawal can be cancelled
     */
    public function getCanCancelAttribute(): bool
    {
        return $this->status === 'pending' &&
               $this->requested_at->diffInHours(now()) < 24; // Can only cancel within 24 hours
    }

    /**
     * Scope for pending withdrawals
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for completed withdrawals
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope for rejected withdrawals
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Scope for user withdrawals
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope for today's withdrawals
     */
    public function scopeToday($query)
    {
        return $query->whereDate('created_at', today());
    }
}

