<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deposit extends Model
{
    protected $fillable = [
        'user_id',
        'phoneNumber',
        'amount',
        'status',
        'payment_method',
    ];
}
