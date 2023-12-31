<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\BankVoucherInfo;
use App\Models\Upload;

class ReceiveVoucherCallController extends Controller
{
    public function ReceiveFeeVoucher(Request $request)
    {
        // Check if the voucher ID exists in the upload table
        $uploadedVoucher = Upload::where('challan_generation_id', $request->voucher_id)->first();

        if (!$uploadedVoucher) {
            return response()->json(['code' => 5, 'message' => 'Invalid Voucher Number'], 400);
        }

        // Check if the voucher has been paid
        $bankVoucher = BankVoucherInfo::where('challan_generation_id', $request->voucher_id)->first();

        if ($bankVoucher) {
            if ($bankVoucher['paid_status'] == 1) {
                return response()->json([
                    'code' => 2,
                    'message' => 'Voucher is already Paid!',
                    'status' => 'P',
                    'voucher_info' => $bankVoucher, // Include voucher information here
                ], 400);
            }

            // Compare other fields to ensure correctness
            if (
                $bankVoucher['amount'] == $request->amount &&
                $bankVoucher['fine'] == $request->fine &&
                $bankVoucher['net_amount'] == $request->net_amount
            ) {
                if ($bankVoucher['customer_id'] == $request->customer_id) {
                    $bankVoucher->paid_status = 1;
                    $bankVoucher->instrumentNo = $request->instrument_no;
                    $bankVoucher->receipt_date = $request->receipt_date;
                    $bankVoucher->accountCode = $request->account_code;


                    $bankVoucher->save();

                    return response()->json(['code' => 1, 'message' => 'Voucher paid successfully!'], 201);
                } else {
                    return response()->json(['code' => 3, 'message' => 'Invalid Customer Id'], 401);
                }
            } else {
                return response()->json(['code' => 4, 'message' => 'Please Enter Correct Amounts Like Amount, Fine, and Net Amount'], 400);
            }
        } else {
            return response()->json(['code' => 5, 'message' => 'Fee Not paid yet'], 400);
        }
    }
}
