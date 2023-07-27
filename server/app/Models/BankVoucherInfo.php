<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankVoucherInfo extends Model
{
    protected $table = 'bank_voucher_info'; // Specify the table name if different from the model name
    protected $primaryKey = 'id'; // Specify the primary key column name if it's different from 'id'
    public $timestamps = false; // Set to true if the table has 'created_at' and 'updated_at' columns

    // Define the fillable columns to allow mass assignment
    protected $fillable = [
        'challan_generation_id',
        'inquiry_date',
        'receipt_date',
        'accountCode',
        'instrumentNo',
        'amount',
        'net_amount',
        'paid_status',
        'customer_id',
        'gateway',
        'fine',
    ];
}
