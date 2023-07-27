<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\BankVoucherInfo;

class ReceiveVoucherCallController extends Controller
{
    //
    public function ReceiveFeeVoucher(Request $request){


        $student_info_in_bank_voucher_table = BankVoucherInfo::where('challan_generation_id', $request->voucher_id)->get();

        if (!$student_info_in_bank_voucher_table->isEmpty()) {
            $voucher = $student_info_in_bank_voucher_table->first(); // Retrieve the first model instance from the collection
        
            if ($voucher['paid_status'] == 1) {
                return response()->json(['Code:2 Message' => 'Voucher is already Paid!'], 500);
            }
        
            if ($voucher['paid_status'] == 0 && $voucher['challan_generation_id'] == $request->voucher_id) {
                if (
                    $voucher['amount'] == $request->amount &&
                    $voucher['fine'] == $request->fine &&
                    $voucher['net_amount'] == $request->net_amount
                ) {
                    if ($voucher['customer_id'] == $request->customer_id) {
                        $voucher->paid_status = 1;
                        $voucher->instrumentNo = $request->instrument_no;
                        $voucher->receipt_date = $request->receipt_date;
        
                        $voucher->save();
        
                        return response()->json(['Code:1 Message' => 'Voucher paid successfully!'], 500);
                    } else {
                        return response()->json(['Code:3 Message' => 'Invalid Customer Id'], 500);
                    }
                } else {
                    return response()->json(['Code:4 Message' => 'Please Enter Correct Amounts Like Amount, Fine, and Net Amount'], 500);
                }
            }
        } else {
            return response()->json(['Code:5 Message' => 'Invalid Voucher Number which you processed'], 500);
        }
        





    }
}
