<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Upload extends Model
{
    protected $table = 'student_excel';
    protected $primaryKey = 'challan_generation_id';
    protected $fillable = [
        'Challan_No',
        'Student_ID',
        'Student_Name',
        'Semester',
        'Tuition_fee',
        'Tuition_fee_Discount',
        'Admission_fee',
        'University_Reg_fee',
        'Security_Deposit_Refundable',
        'Medical_Checkup',
        'Semester_Enrollment_Fee',
        'Examination_Fee',
        'Co_Curricular_activities_fee',
        'Hostel_Fee',
        'PMC_Registration',
        'Pharmacy_Council_Reg_Fee',
        'Clinical_Charges',
        'Library_Fee',
        'Migration_Fee',
        'Document_Verification_Fee',
        'Application_Prospectus_Fee',
        'Degree_and_Convocation_Fee',
        'Advance_Tax',
        'Others_Specify',
        'Late_fee',
        'Transport_Charges',
        'Special_Discount',
        'Department',
        'Due_Date',
        'Others_Narration',
        'Campus_Development_Charges',
        'Total_Amount',
        'Hostel_Fee_Month',
        'Fine_Per_Day',
        'Cut_Off_Date',
        'Fine_Narration',
        'Document_Verification_Narration',
        'GL_Narration',
        'email',
        'issue_date',
        'installment',
        'inst_issue_date',
        'inst_due_date',
        'challan_status',
        'session',
    ];
}
