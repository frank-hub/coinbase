<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('withdraws', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('phoneNumber');
            $table->decimal('amount', 15, 2);
            $table->enum('withdraw_method', ['mpesa', 'bank_transfer', 'crypto']);
            $table->string('account_details'); // Account number, wallet address, etc.
            $table->string('transaction_ref')->unique();
            $table->enum('status', ['pending', 'completed', 'rejected', 'cancelled'])->default('pending');
            $table->timestamp('requested_at');
            $table->timestamp('processed_at')->nullable();
            $table->foreignId('processed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('cancelled_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->text('notes')->nullable(); // Admin notes
            $table->timestamps();

            // Indexes for performance
            $table->index(['user_id', 'status']);
            $table->index(['status', 'created_at']);
            $table->index('transaction_ref');
        });
    }

    public function down()
    {
        Schema::dropIfExists('withdraws');
    }
};
