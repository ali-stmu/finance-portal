<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Upload;

class fetchForChallan extends Controller
{
    public function feeChallanData(){

          
    $fields = Upload::select('challan_generation_id','Challan_No', 'issue_date', 'inst_issue_date', 'inst_due_date', 'challan_status', 'Due_Date', 'installment', 'Student_ID', 'Admission_fee', 'Tuition_fee', 'Tuition_fee_Discount', 'Total_Amount', 'Student_Name', 'Semester', 'session','email')
    ->where('challan_status', 0)
    ->get();

    return response()->json([
        'fields' => $fields
    ]);


    }

    public function feeChallanGeneratedData(){
        $fields = Upload::select('challan_generation_id','Challan_No', 'issue_date', 'inst_issue_date', 'inst_due_date', 'challan_status', 'Due_Date', 'installment', 'Student_ID', 'Admission_fee', 'Tuition_fee', 'Tuition_fee_Discount', 'Total_Amount', 'Student_Name', 'Semester', 'session','email')
        ->where('challan_status', 1)
        ->get();
    
        return response()->json([
            'fields' => $fields
        ]);
    
    
        }
        public function updateGenrateChallan(Request $request, $id)
        {
            // Perform any necessary validation or checks
    
            // Update the genratechallan logic for the specified $id
            // Example:
            $upload = Upload::find($id);
            log::debug($upload);
            if ($upload) {
                $upload->challan_status = 1; // Set challan_status to 1 (generated)
                $upload->save();
    
                // Additional logic if needed
            } else {
                // Handle case when upload with $id is not found
            }
    
            return response()->json([
                'message' => 'Genratechallan updated successfully.'
            ]);
        }


}
