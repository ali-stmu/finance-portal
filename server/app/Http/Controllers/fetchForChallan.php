<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Upload;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;
use Illuminate\Support\HtmlString;
use Symfony\Component\Mime\Part\Multipart;
use Symfony\Component\Mime\Part\TextPart;
use Symfony\Component\Mime\Part\MimePart;
use Illuminate\Support\Facades\DB;


class fetchForChallan extends Controller
{
    public function feeChallanData($email){
       // log::debug($email);
       $results = DB::table('user as u')
       ->join('department_mapping as dm', 'u.user_id', '=', 'dm.user_id')
       ->join('student_excel as se', 'dm.program_name', '=', 'se.Department')
       ->where('se.challan_status', '=', 0)
       ->where('se.delete_status', '=', 0)
       ->where('u.user_id', '=', $email)
       ->select('u.email', 'u.role', 'dm.program_name', 'dm.user_id', 'se.challan_generation_id', 'se.challan_generation_id','se.Challan_No','se.issue_date','se.inst_issue_date','se.inst_due_date','se.challan_status','se.Due_Date','se.installment','se.Student_ID','se.Admission_fee','se.Tuition_fee','se.Tuition_fee_Discount','se.Total_Amount','se.Student_Name','se.Semester','se.session','se.email')
       ->get();

   log::debug( $results);

       

   // $fields = Upload::select('challan_generation_id','Challan_No', 'issue_date', 'inst_issue_date', 'inst_due_date', 'challan_status', 'Due_Date', 'installment', 'Student_ID', 'Admission_fee', 'Tuition_fee', 'Tuition_fee_Discount', 'Total_Amount', 'Student_Name', 'Semester', 'session','email')
    //->where('challan_status', 0)
    //->get();

    return response()->json([
        'fields' => $results
    ]);
    }

    public function feeChallanGeneratedData($email){

        $results = DB::table('user as u')
       ->join('department_mapping as dm', 'u.user_id', '=', 'dm.user_id')
       ->join('student_excel as se', 'dm.program_name', '=', 'se.Department')
       ->where('se.challan_status', '=', 1)
       ->where('se.delete_status', '=', 0)
       ->where('u.user_id', '=', $email)
       ->select('u.email', 'u.role', 'dm.program_name', 'dm.user_id', 'se.challan_generation_id', 'se.challan_generation_id','se.Challan_No','se.issue_date','se.inst_issue_date','se.inst_due_date','se.challan_status','se.Due_Date','se.installment','se.Student_ID','se.Admission_fee','se.Tuition_fee','se.Tuition_fee_Discount','se.Total_Amount','se.Student_Name','se.Semester','se.session','se.email')
       ->get();
    
        return response()->json([
            'fields' => $results
        ]);
    
    
        }
        public function feeChallanEmailedData($email){
            log::debug($email);
            $results = DB::table('user as u')
            ->join('department_mapping as dm', 'u.user_id', '=', 'dm.user_id')
            ->join('student_excel as se', 'dm.program_name', '=', 'se.Department')
            ->where('se.email_status', '=', 1)
            ->where('se.delete_status', '=', 0)
            ->where('u.user_id', '=', $email)
            ->select('u.email', 'u.role', 'dm.program_name', 'dm.user_id', 'se.challan_generation_id', 'se.challan_generation_id','se.Challan_No','se.issue_date','se.inst_issue_date','se.inst_due_date','se.challan_status','se.Due_Date','se.installment','se.Student_ID','se.Admission_fee','se.Tuition_fee','se.Tuition_fee_Discount','se.Total_Amount','se.Student_Name','se.Semester','se.session','se.email')
            ->get();
        
            return response()->json([
                'fields' => $results
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
        public function deletechallan(Request $request, $id)
        {
            // Perform any necessary validation or checks
    
            // Update the genratechallan logic for the specified $id
            // Example:
            log::debug($id);
            $upload = Upload::find($id);
            log::debug($upload);
            if ($upload) {
                $upload->delete_status = 1; // Set challan_status to 1 (generated)
                $upload->save();
    
                // Additional logic if needed
            } else {
                // Handle case when upload with $id is not found
            }
    
            return response()->json([
                'message' => 'Challan Deleted successfully.'
            ]);
        }

        public function sendEmail(Request $request,$id,$email,$studentName,$programName){

            log::debug($email.$studentName.$programName.$id);

            $explodedProgramName = explode("-", $programName);
            $explodedProgramName[0];
        
            $pname='';

            if( $explodedProgramName[0]=='BS(AI)')
            {
                    $pname='Artificial Intelligence (BSAI)';
            }
            else if( $explodedProgramName[0]=='BS(CS)')
            {   
                $pname='Computer Science (BSCS)';

            }
           else if( $explodedProgramName[0]=='BS(SE)')
            {
                $pname='Software Engineering (BSSE)';
            }
            if( $explodedProgramName[0]=='BS(CySec)')
            {
                $pname='Cyber Security (BSCySec) ';

            }
            

            $request->validate([
                'pdfFile' => 'required|mimes:pdf',
            ]);
        
            // Save the PDF file to local storage
            $pdfFile = $request->file('pdfFile');
            $pdfFileName = $pdfFile->getClientOriginalName();
            log::debug($pdfFile->storeAs('pdfs', $pdfFileName));
        
            // Process and send the email using the PDF file as an attachment
            // Your email sending logic goes here
            $userEmail =$email;
            $documentCheckList = "https://drive.google.com/file/d/1E5izg1RhlB-yAyCspBjQ-z_lrUugTDgg/view?usp=sharing";

            //status 1 krna ha 
          //  $message="hello jee";
            $emailSubject="ADMISSION OFFER LETTER, SHIFA TAMEER-E-MILLAT UNIVERSITY - (STMU)";
            $emailContent = '
<html>
<head>
    <style>
        @media only screen and (max-width: 600px) {
            /* Add your responsive styles here */
            /* For example, adjust font size or layout */
        }
    </style>
</head>
<body>
    <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
      
        <p>Name: '.$studentName.'</p>
        <p>Admission ID: '.$programName.'</p>

        <h3 style="text-align: center; text-decoration: underline;"></u>PROVISIONAL ADMISSION IN Bachelor of Science in '.$pname.'</u></h3>
        <p>Reference: Your application regarding admission in Bachelor of Science in '.$pname.' program in Fall 2023 was evaluated. Based on your academic record and entry test held at Department of Computing.</p>
        <ol>
            <li>We are pleased to offer you provisional admission in Bachelor of Science '.$pname.'. This admission is being offered based on your attained HSSC-I result. Please note that if the combined result of HSSC remains below the required eligibility (i.e. <50% marks), the admission will stand cancelled.</li>
            <li>Your registration with the University will, however, be confirmed after the receiving of following documents latest by July 7, 2023:
        
        <ol type="a">
            <li>Attested photocopies of SSC/Equivalent and HSSC/Equivalent documents as per attached checklist.</li>
            <li>Payment of prescribed fee through bank draft/pay order in favor of Shifa Tameer-e-Millat University, Islamabad.</li>
            <li>Affidavit as per attached format on Rs 20/ or 50/- stamp paper.</li>
            <li> The Required documents be submitted at:
            <br>
            Department of Computing,Park Road Campus,
            Shifa Tameer-e-Millat University, Park-Road campus (PRC), Opposite Medikay Cardiac Centre, Park Road, Islamabad, Islamabad. <br>
            Office Hours: Monday to Friday 9:00 AM to 4:00 PM.<br>
            This admission shall be cancelled in case of any false/misinformation found at any stage.
    </li>
        </ol>
        </li>
        </ol>
       
       
        <p>We welcome you to the Department of Computing at Shifa Tameer-e-Millat University and assure you that the STMU, its faculty, and management will provide you with a dynamic learning environment effective in achieving your professional endeavors. 
        </p>
        <p>Your Challan Form is attached herewith and Click <a href="' . $documentCheckList . '">here</a> to download the document checklist.</p>
        <p>
        For further queries do not hesitate to reach us at:
        <li>Email:admissions.ssc@stmu.edu.pk</li>
        <li>Dr. Tayyab:+92 333 599 8335 </li>
        <li>Mr. Ghulam Mustafa:+92 313 954 1028 </li>
        <li>Mr. Zeeshan:+92 332 565 4512 </li>
    </p>
        </div>
</body>
</html>
';

            // Mail::raw(''.$emailBody, function (Message $message) use ($userEmail, $emailSubject, $pdfFile) {
            //     $message->to($userEmail)
            //         ->subject($emailSubject)
            //         ->attach($pdfFile->getRealPath(), [
            //             'as' => "challan",
            //             'mime' => 'application/pdf',
            //         ]);
            // });



            Mail::html($emailContent, function (Message $message) use ($userEmail, $emailSubject, $pdfFile) {
                $message->to($userEmail)
                    ->subject($emailSubject)
                    ->attachData(file_get_contents($pdfFile), 'challan.pdf', [
                        'mime' => 'application/pdf',
                    ]);
            });
            $upload = Upload::find($id);
            log::debug($upload);
            if ($upload) {
                $upload->email_status = 1; // Set challan_status to 1 (generated)
                $upload->save();
    
                // Additional logic if needed
            } else {
                // Handle case when upload with $id is not found
            }
            // Return a response indicating success
            return response()->json(['message' => 'Email sent successfully']);
            
        }


}