<?php

namespace App\Http\Controllers;
use App\Models\Upload;
use App\Models\BankVoucherInfo;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class bankFetchDataController extends Controller
{
    //php =
    public function getVoucherDetail(Request $request)
    {

        //log::debug($request->all());
       // log::debug($request->voucher_id);
        //log::debug($request->Inquiry_Date);
        $netAmount=0;
        $fineInPositive=0;;

      //  $students_status = BankVoucherInfo::where('challan_generation_id', $challanGenerationId)
        //                   ->where('paid_status', 0)
          //                 ->get();


       // $student_info_from_
       $student_info_in_bank_voucher_table = BankVoucherInfo::where('challan_generation_id', $request->voucher_id)->get();

      
        //log::debug($student_info_in_bank_voucher_table->first()->paid_status);
        if (isset($student_info_in_bank_voucher_table->first()->paid_status) && $student_info_in_bank_voucher_table->first()->paid_status == 1) {

         log::debug( $student_info_in_bank_voucher_table->first()->inquiry_date);
          return response()->json(['Code:3 Message' => 'Voucher is already Paid!'], 500);
      }
      

        if($student_info_in_bank_voucher_table->isEmpty()){

        

        $student_info = Upload::where('challan_generation_id', $request->voucher_id)->get();
        $All_info = json_decode($student_info, true);

        //log::debug($All_info[0]);

        if(isset($All_info[0]['challan_generation_id'])){

               // log::debug("found");
          $studentId = $All_info[0]['challan_generation_id'];
          $studentName = $All_info[0]['Student_Name'];
          $totalAmount = $All_info[0]['Total_Amount'];
          $dueDate = $All_info[0]['Due_Date'];
          $fine_per_day=$All_info[0]['Fine_Per_Day'];
          $inqueryDate=$request->Inquiry_Date;
          $customer_id=$request->customer_id;
          $gateway=$request->gateway;

          $dueDateObj = Carbon::createFromFormat('l, F d, Y', $dueDate);
          $inquiryDateObj = Carbon::createFromFormat('d/M/Y', $inqueryDate);
    
          if (!$dueDateObj ||!$inquiryDateObj) {
            Log::error('Invalid due date format provided.');
            return;
        }
    
        
        $daysOverdue = $inquiryDateObj->diffInDays($dueDateObj, false);
          log::debug($daysOverdue);
          if ($daysOverdue < 0) {
              $fineAmount = $daysOverdue * $fine_per_day;
              $totalAmount += abs($fineAmount);
              $fineInPositive=abs($fineAmount);
             // Log::debug("Fine Amount:  $fineInPositive");
             // Log::debug("Due Date: " . $dueDateObj->format('Y-m-d'));
             // Log::debug("Inquiry Date: " . $inquiryDateObj->format('Y-m-d'));
           
              $netAmount=$totalAmount;
             // log::debug($netAmount);

          }
          $data = [
            'challan_generation_id' => $All_info[0]['challan_generation_id'],
            'inquiry_date' => $request->Inquiry_Date,
            'receipt_date' => '',
            'accountCode' => '',
            'instrumentNo' => '',
            'amount' => $All_info[0]['Total_Amount'],
            'net_amount' => $netAmount,
            'customer_id' => $request->customer_id,
            'gateway' => $request->gateway,
            'fine' =>  abs($fineAmount),
        ];
        // Save the data into the table
      BankVoucherInfo::create($data);

      $preparing_data_to_send=[
        'FeeVoucherId' => $All_info[0]['challan_generation_id'],
        'RegNo' => $All_info[0]['Student_ID'],
        'StudentName' => $All_info[0]['Student_Name'],
        'TotalAmount' => $All_info[0]['Tuition_fee'],
        'Fine' =>  abs($fineAmount),
        'NetAmount' =>  $netAmount,
        'DueDate' => $dueDateObj,       

      ];

      $response = [
        'Code' => 1,
        'Message' => 'Success!',
        'Data' => $preparing_data_to_send,
      ];

      // Return the JSON response
      return response()->json($response);
          

        }
        else {
            return response()->json(['Code:4 Message' => 'Voucher is Invalid!'], 500);
         
        }
       

      //  log::debug($student_info);
      //  $clientIP = $request->ip();
        //log::debug($clientIP);
        

      }
      else {

      return response()->json(['Code:2 Message' => 'Voucher is already processed! on '. $student_info_in_bank_voucher_table->first()->inquiry_date] , 500);
      }

    }

    public function fetchVoucherDetail(Request $request)
{
    try {
        // Retrieve records from Upload model where challan_generation_id matches voucher_id
        $uploadData = Upload::where('challan_generation_id', $request->voucher_id)
            ->select('Challan_No', 'Student_ID', 'Student_Name', 'Tuition_fee', 'Department', 'Due_Date', 'Fine_Per_Day', 'issue_date')
            ->get();

        // Retrieve records from BankVoucherInfo model where voucher_id matches challan_generation_id
        $bankVoucherInfoData = BankVoucherInfo::where('challan_generation_id', $request->voucher_id)->get();

        // Check if bankVoucherInfoData is empty
        if ($bankVoucherInfoData->isEmpty()) {
            return response()->json([
                'message' => 'Fees not paid',
                'customerData' => $uploadData,
                'feeClaimed' => $bankVoucherInfoData,
            ]);

        } else {
            // Check if there is any record with paid_status 1
            $hasPaidStatus1 = $bankVoucherInfoData->contains('paid_status', 1);

            if ($hasPaidStatus1) {
                return response()->json([
                    'message' => 'Fee is paid',
                    'customerData' => $uploadData,
                    'feeClaimed' => $bankVoucherInfoData,
                ]);

            } else {
                // If no record with paid_status 1, assume it's in process
                return response()->json([
                    'message' => 'Fee is in process',
                    'customerData' => $uploadData,
                    'feeClaimed' => $bankVoucherInfoData,
                ]);
            }
        }

    } catch (ModelNotFoundException $e) {
        // Handle the case where the model is not found (e.g., no records match the given criteria)
        Log::error('Model not found: ' . $e->getMessage());
        return response()->json(['error' => 'Model not found'], 404);

    } catch (\Exception $e) {
        // Handle other exceptions
        Log::error('An error occurred: ' . $e->getMessage());
        return response()->json(['error' => 'An error occurred'], 500);
    }
}


}
