<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Upload;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;
use Illuminate\Support\HtmlString;
use Symfony\Component\Mime\Part\Multipart;
use Symfony\Component\Mime\Part\TextPart;
use Symfony\Component\Mime\Part\MimePart;


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

        public function sendEmail(Request $request){


            $request->validate([
                'pdfFile' => 'required|mimes:pdf',
            ]);
        
            // Save the PDF file to local storage
            $pdfFile = $request->file('pdfFile');
            $pdfFileName = $pdfFile->getClientOriginalName();
            log::debug($pdfFile->storeAs('pdfs', $pdfFileName));
        
            // Process and send the email using the PDF file as an attachment
            // Your email sending logic goes here
            $userEmail ='khubaib.mis@stmu.edu.pk';
            $message="hello jee";
            $emailSubject="subject jee";
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
        <p>Ref No: /BS(AI)/Admission Offer/Fall/2023-500X Dated: July 01, 2023</p>
        <p>Name: &lt;Student-Name&gt;</p>
        <p>Admission ID: BS(AI)-500X</p>

        <h3 style="text-align: center; text-decoration: underline;"></u>PROVISIONAL ADMISSION IN Bachelor of Science Artificial Intelligence BS(AI) PROGRAM</u></h3>
        <p>Reference: Your application regarding admission in Bachelor of Science Artificial Intelligence BS(AI) program in Fall 2023 was evaluated based on your academic record and entry test at Department of Computing.</p>
        <ol>
            <li>We are pleased to offer you provisional admission in Bachelor of Science Artificial Intelligence BS(AI). This admission is being offered based on HSSC-I result. Please note, if the combined result of HSSC remains below the required eligibility, the admission will stand cancel.</li>
            <li>Your registration with the university will, however, be confirmed after the receiving of following documents latest by July 15, 2023.
        
        <ol type="a">
            <li>Attested photocopies of SSC/Equivalent and HSSC/Equivalent documents as per attached checklist.</li>
            <li>Payment of prescribed fee through bank draft/pay order in favor of Shifa Tameer-e-Millat University, Islamabad.</li>
            <li>Affidavit as per attached format on Rs 20/ or 50/- stamp paper.</li>
            <li> The Required documents be submitted at:
            <br>
            Student Affair Office, Park Road Campus,
            Shifa Tameer-e-Millat University, Park-Road campus (PRC), near Chateh Pull, Islamabad. <br>
            Office Hours: Monday to Friday 9:00 AM to 4:00 PM.<br>
            This admission shall be cancelled in case of any false/misinformation found at any stage.
    </li>
        </ol>
        </li>
        </ol>
       
        <p>We welcome you in the Department of Computing at Shifa Tameer-e-Millat University and assure you that the university, its faculty, and management will provide you excellent opportunities to grow and achieve your best as an individual as well as a professional.</p>
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

        
            // Return a response indicating success
            return response()->json(['message' => 'Email sent successfully']);
            
        }


}
