<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Upload;

class fetchForChallan extends Controller
{
    public function feeChallanData(){

          
      log::debug(  $fields = Upload::select('challan_generation_id','Challan_No', 'issue_date', 'inst_issue_date', 'inst_due_date', 'challan_status', 'Due_Date', 'installment', 'Student_ID', 'Admission_fee', 'Tuition_fee', 'Tuition_fee_Discount', 'Total_Amount', 'Student_Name', 'Semester', 'session')
        ->get());

    return response()->json([
        'fields' => $fields
    ]);


    }


}
