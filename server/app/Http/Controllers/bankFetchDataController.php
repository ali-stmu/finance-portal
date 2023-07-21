<?php

namespace App\Http\Controllers;
use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class bankFetchDataController extends Controller
{
    //
    public function getVoucherDetail(Request $request){

        log::debug($request->all());
        log::debug($request->voucher_id);
        log::debug($request->Inquiry_Date);


      //  $students_status = BankVoucherInfo::where('challan_generation_id', $challanGenerationId)
        //                   ->where('paid_status', 0)
          //                 ->get();


       // $student_info_from_
        $student_info_excel = Upload::where('challan_generation_id', $request->voucher_id)->get();
        
        $All_info = json_decode($student_info_excel, true);

        if(isset($All_info[0]['challan_generation_id'])){

                log::debug("found");


          log::debug($studentId = $All_info[0]['Student_ID']);
          log::debug($studentName = $All_info[0]['Student_Name']);
          log::debug($totalAmount = $All_info[0]['Total_Amount']);
          log::debug($dueDate = $All_info[0]['Due_Date']);
          log::debug($fine_per_day=$All_info[0]['Fine_Per_Day']);

        }
        else {

            log::debug("notfound");
        }
       

      //  log::debug($student_info);
      //  $clientIP = $request->ip();
        //log::debug($clientIP);
        



    }



}
