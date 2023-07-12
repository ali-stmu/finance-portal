<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class UploadController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        $count = 0;
        $insert = 0;
       // Log::debug($data);
       foreach ($data as $item) {
     // log::debug(  $challanNo = $item['Challan_No.'] ?? null);
      $challanNo = $item['Challan_No.'] ?? null ;
      $studentId = $item['Student_I.D'] ?? null;
      $studentName = $item['Student_Name'] ?? null;
      $semester = $item['Semester'] ?? null;
     $tuitionFee = $item['Tuition_fee'] ?? null;
    $tuitionFeeDiscount = $item['Tuition_fee_Discount'] ?? null;
      $admissionFee = $item['Admission_fee'] ?? null;
      $universityRegFee = $item['University_Reg.fee'] ?? null;
      $securityDeposit = $item['Security_Deposit_(Refundable)'] ?? null;
      $medicalCheckup = $item['Medical_Checkup'] ?? null;
      $semesterEnrollmentFee = $item['Semester_Enrollment_Fee'] ?? null;
      $examinationFee = $item['Examination_Fee'] ?? null;
      $coCurricularActivitiesFee = $item['Co-Curricular_activities_fee'] ?? null;
      $hostelFee = $item['Hostel_Fee'] ?? null;
      $pmcRegistration = $item['PMC_Registration'] ?? null;
      $pharmacyCouncilRegFee = $item['Pharmacy_Council_Reg._Fee'] ?? null;
      $clinicalCharges = $item['Clinical_Charges'] ?? null;
      $libraryFee = $item['Library_Fee'] ?? null;
      $migrationFee = $item['Migration_Fee'] ?? null;
      $documentVerificationFee = $item['Document_Verification_Fee'] ?? null;
      $applicationProspectusFee = $item['Application/Prospectus_Fee'] ?? null;
      $degreeConvocationFee = $item['Degree_and_Convocation_Fee'] ?? null;
      $advanceTax = $item['Advance_Tax'] ?? null;
      $othersSpecify = $item['Others_(Specify)'] ?? null;
      $lateFee = $item['Late_fee'] ?? null;
      $transportCharges = $item['Transport_Charges'] ?? null;
      $specialDiscount = $item['Special_Discount'] ?? null;
      $department = $item['Department'] ?? null;
      $dueDate = $item['Due_Date'] ?? null;
      $othersNarration = $item['Others_(Narration)'] ?? null;
      $campusDevelopmentCharges = $item['Campus_Development_Charges'] ?? null;
      $totalAmount = $item['Total_Amount'] ?? null;
      $hostelFeeMonth = $item['Hostel_Fee_Month'] ?? null;
      $finePerDay = $item['Fine_Per_Day'] ?? null;
      $cutOffDate = $item['Cut_Off_Date'] ?? null;
      $fineNarration = $item['Fine_Narration'] ?? null;
      $documentVerificationNarration = $item['Document_Verification_Narration'] ?? null;
      $glNarration = $item['GL_Narration'] ?? null;
      $issue_date = $item['issue_date'] ?? null;
      $installment = $item['Installment(yes/no)'] ?? null;
      $inst_due_date = $item['inst_due_date'] ?? null;
      $inst_issue_date = $item['inst_issue_date'] ?? null;
      $email = $item['Email'] ?? null;
      $session = $item['Session'] ?? null;
        // ... assign other variables as needed
        $existingUpload = Upload::where('Email', $email)
        ->where('Semester', $semester)
        ->where('Student_ID', $studentId)
        ->first();
    
    if ($existingUpload) {
        $count++;
        continue; // Skip inserting duplicate records
    }

        $upload = new Upload([
            'Challan_No' => $challanNo,
            'Student_ID' => $studentId,
            'Student_Name' => $studentName,
            'Semester' => $semester,
            'Tuition_fee' => $tuitionFee,
            'Tuition_fee_Discount' => $tuitionFeeDiscount,
            'Admission_fee' => $admissionFee,
            'University_Reg_fee' => $universityRegFee,
            'Security_Deposit_Refundable' => $securityDeposit,
            'Medical_Checkup' => $medicalCheckup,
            'Semester_Enrollment_Fee' => $semesterEnrollmentFee,
            'Examination_Fee' => $examinationFee,
            'Co_Curricular_activities_fee' => $coCurricularActivitiesFee,
            'Hostel_Fee' => $hostelFee,
            'PMC_Registration' => $pmcRegistration,
            'Pharmacy_Council_Reg_Fee' => $pharmacyCouncilRegFee,
            'Clinical_Charges' => $clinicalCharges,
            'Library_Fee' => $libraryFee,
            'Migration_Fee' => $migrationFee,
            'Document_Verification_Fee' => $documentVerificationFee,
            'Application_Prospectus_Fee' => $applicationProspectusFee,
            'Degree_and_Convocation_Fee' => $degreeConvocationFee,
            'Advance_Tax' => $advanceTax,
            'Others_Specify' => $othersSpecify,
            'Late_fee' => $lateFee,
            'Transport_Charges' => $transportCharges,
            'Special_Discount' => $specialDiscount,
            'Department' => $department,
            'Due_Date' => $dueDate,
            'Others_Narration' => $othersNarration,
            'Campus_Development_Charges' => $campusDevelopmentCharges,
            'Total_Amount' => $totalAmount,
            'Hostel_Fee_Month' => $hostelFeeMonth,
            'Fine_Per_Day' => $finePerDay,
            'Cut_Off_Date' => $cutOffDate,
            'Fine_Narration' => $fineNarration,
            'Document_Verification_Narration' => $documentVerificationNarration,
            'GL_Narration' => $glNarration,
            'email' => $email,
            'issue_date' => $issue_date,
            'installment' => $installment,
            'inst_issue_date' => $inst_issue_date,
            'inst_due_date' => $inst_due_date,
            'session' => $session,
        ]);
        $upload->save();
        $insert++;



        // Use the variables however you like
        // For example, you can store them in a database, perform calculations, or print them
  
      }
      return response()->json(['message' => $insert.' Records inserted ' . $count . ' Duplicate Records Found','duplicate' => $count,
      'insert' => $insert]);


    }
    public function update(Request $request, $primaryKey)
    {
        // Get the data from the request
        $editedData = $request->all();


        // Update the column in the database
        try {
            // Assuming you have a model called Challan and the column you want to update is 'column_name'
            $challan = Upload::where('challan_generation_id', $primaryKey)->first();
            if ($challan) {
                $challan->Due_Date = $editedData['Due_Date'];
                $challan->Student_ID = $editedData['Student_ID'];
                $challan->Student_Name = $editedData['Student_Name'];
                $challan->Total_Amount = $editedData['Total_Amount'];
                $challan->Tuition_fee = $editedData['Tuition_fee'];
                $challan->email = $editedData['email'];

                $challan->save();
                
                // Return a success response
                return response()->json(['message' => 'Column updated successfully']);
            } else {
                // Return an error response if the record is not found
                return response()->json(['message' => 'Record not found'], 404);
            }
        } catch (\Exception $e) {
            // Return an error response if an exception occurs
            return response()->json(['message' => 'Error updating column'], 500);
        }
    }
}
