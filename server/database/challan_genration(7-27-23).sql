-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2023 at 07:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `challan_genration`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `RunCountQuery` ()   BEGIN
    WHILE TRUE DO
        -- Your count query here
        SELECT COUNT(*) FROM student_excel;
        
        -- Pause execution for 5 seconds
        SELECT SLEEP(5);
    END WHILE;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `bank_voucher_info`
--

CREATE TABLE `bank_voucher_info` (
  `id` int(11) NOT NULL,
  `challan_generation_id` int(11) DEFAULT NULL,
  `inquiry_date` varchar(50) DEFAULT NULL,
  `receipt_date` varchar(50) DEFAULT NULL,
  `accountCode` varchar(50) DEFAULT NULL,
  `instrumentNo` varchar(50) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `net_amount` double DEFAULT NULL,
  `paid_status` int(50) NOT NULL DEFAULT 0,
  `fine` double DEFAULT NULL,
  `customer_id` varchar(50) NOT NULL,
  `gateway` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank_voucher_info`
--

INSERT INTO `bank_voucher_info` (`id`, `challan_generation_id`, `inquiry_date`, `receipt_date`, `accountCode`, `instrumentNo`, `amount`, `net_amount`, `paid_status`, `fine`, `customer_id`, `gateway`) VALUES
(38, 41, '10/Jul/2023', '21/Dec/2023', '', '21252201', 59625, 60375, 0, 750, '123456', 'bankIslami'),
(40, 42, '10/Jul/2023', '21/Dec/2023', '', '21252201', 59625, 59625, 0, 0, '123456', 'bankIslami'),
(42, 46, '10/Jul/2023', '21/Dec/2023', '', '21252201', 59625, 59625, 1, 0, '123456', 'bankIslami'),
(43, 47, '10/Jul/2023', '21/Dec/2023', '', '21252201', 59625, 59625, 1, 0, '123456', 'bankIslami');

-- --------------------------------------------------------

--
-- Table structure for table `department_mapping`
--

CREATE TABLE `department_mapping` (
  `department_mapping_id` int(11) NOT NULL,
  `program_name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department_mapping`
--

INSERT INTO `department_mapping` (`department_mapping_id`, `program_name`, `user_id`) VALUES
(1, 'BS(CS)', 11),
(2, 'BS(AI)', 11),
(3, 'BS(CySec)', 11),
(4, 'BS(SE)', 11);

-- --------------------------------------------------------

--
-- Table structure for table `student_excel`
--

CREATE TABLE `student_excel` (
  `challan_generation_id` int(11) NOT NULL,
  `Challan_No` varchar(255) DEFAULT NULL,
  `Student_ID` varchar(255) DEFAULT NULL,
  `Student_Name` varchar(255) DEFAULT NULL,
  `Semester` varchar(255) DEFAULT NULL,
  `Tuition_fee` varchar(255) DEFAULT NULL,
  `Tuition_fee_Discount` varchar(255) DEFAULT NULL,
  `Admission_fee` varchar(255) DEFAULT NULL,
  `University_Reg_fee` varchar(255) DEFAULT NULL,
  `Security_Deposit_Refundable` varchar(255) DEFAULT NULL,
  `Medical_Checkup` varchar(255) DEFAULT NULL,
  `Semester_Enrollment_Fee` varchar(255) DEFAULT NULL,
  `Examination_Fee` varchar(255) DEFAULT NULL,
  `Co_Curricular_activities_fee` varchar(255) DEFAULT NULL,
  `Hostel_Fee` varchar(255) DEFAULT NULL,
  `PMC_Registration` varchar(255) DEFAULT NULL,
  `Pharmacy_Council_Reg_Fee` varchar(255) DEFAULT NULL,
  `Clinical_Charges` varchar(255) DEFAULT NULL,
  `Library_Fee` varchar(255) DEFAULT NULL,
  `Migration_Fee` varchar(255) DEFAULT NULL,
  `Document_Verification_Fee` varchar(255) DEFAULT NULL,
  `Application_Prospectus_Fee` varchar(255) DEFAULT NULL,
  `Degree_and_Convocation_Fee` varchar(255) DEFAULT NULL,
  `Advance_Tax` varchar(255) DEFAULT NULL,
  `Others_Specify` varchar(255) DEFAULT NULL,
  `Late_fee` varchar(255) DEFAULT NULL,
  `Transport_Charges` varchar(255) DEFAULT NULL,
  `Special_Discount` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Due_Date` varchar(255) DEFAULT NULL,
  `Others_Narration` varchar(255) DEFAULT NULL,
  `Campus_Development_Charges` varchar(255) DEFAULT NULL,
  `Total_Amount` varchar(255) DEFAULT NULL,
  `Hostel_Fee_Month` varchar(255) DEFAULT NULL,
  `Fine_Per_Day` varchar(255) DEFAULT NULL,
  `Cut_Off_Date` varchar(255) DEFAULT NULL,
  `Fine_Narration` varchar(255) DEFAULT NULL,
  `Document_Verification_Narration` varchar(255) DEFAULT NULL,
  `GL_Narration` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `issue_date` varchar(255) DEFAULT NULL,
  `Installment` varchar(255) DEFAULT NULL,
  `inst_issue_date` varchar(255) DEFAULT NULL,
  `inst_due_date` varchar(255) DEFAULT NULL,
  `challan_status` tinyint(4) DEFAULT 0,
  `session` varchar(255) DEFAULT NULL,
  `email_status` tinyint(4) DEFAULT 0,
  `challan_path` varchar(255) DEFAULT NULL,
  `delete_status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_excel`
--

INSERT INTO `student_excel` (`challan_generation_id`, `Challan_No`, `Student_ID`, `Student_Name`, `Semester`, `Tuition_fee`, `Tuition_fee_Discount`, `Admission_fee`, `University_Reg_fee`, `Security_Deposit_Refundable`, `Medical_Checkup`, `Semester_Enrollment_Fee`, `Examination_Fee`, `Co_Curricular_activities_fee`, `Hostel_Fee`, `PMC_Registration`, `Pharmacy_Council_Reg_Fee`, `Clinical_Charges`, `Library_Fee`, `Migration_Fee`, `Document_Verification_Fee`, `Application_Prospectus_Fee`, `Degree_and_Convocation_Fee`, `Advance_Tax`, `Others_Specify`, `Late_fee`, `Transport_Charges`, `Special_Discount`, `Department`, `Due_Date`, `Others_Narration`, `Campus_Development_Charges`, `Total_Amount`, `Hostel_Fee_Month`, `Fine_Per_Day`, `Cut_Off_Date`, `Fine_Narration`, `Document_Verification_Narration`, `GL_Narration`, `email`, `updated_at`, `created_at`, `issue_date`, `Installment`, `inst_issue_date`, `inst_due_date`, `challan_status`, `session`, `email_status`, `challan_path`, `delete_status`) VALUES
(1, '1', 'BS(AI)-6001', 'Areeba Javed', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', 'ss', 'After Due Date, the late fee of Rs.200/- per day will be collected & utilized for charitable purpose only.', '59625', NULL, NULL, NULL, NULL, NULL, 'Aaiza Javed-2023-001 SCD Tuition Fee #501', 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:35', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', 'yes', 'Thursday, September 22, 2022', 'Thursday, September 22, 2022', 0, 'Fall 2023', 0, NULL, 0),
(2, '2', 'BS(AI)-6002', 'Ezba Maheen.', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, 'After Due Date, the late fee of Rs.200/- per day will be collected & utilized for charitable purpose only.', '59625', NULL, NULL, NULL, NULL, NULL, 'Abdul Hafeez Khan Niazi-2023-002 SCD Tuition Fee #502', 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:42', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', 'no', 'Thursday, February 9, 2023', 'Thursday, February 9, 2023', 0, 'Fall 2023', 0, NULL, 0),
(3, '3', 'BS(AI)-6003', 'Noor E Eman', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, 'After Due Date, the late fee of Rs.200/- per day will be collected & utilized for charitable purpose only.', '59625', NULL, NULL, NULL, NULL, NULL, 'Adeena Sajid-2023-004 SCD Tuition Fee #503', 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:42', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', 'yes', 'Thursday, May 18, 2023', 'Thursday, May 18, 2023', 0, 'Fall 2023', 0, NULL, 0),
(4, '4', 'BS(AI)-6004', 'Javeria Amir', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Tuesday, July 25, 2023', NULL, 'After Due Date, the late fee of Rs.200/- per day will be collected & utilized for charitable purpose only.', '59625', NULL, NULL, NULL, NULL, NULL, 'Aleeza Aamir-2023-006 SCD Tuition Fee #504', 'abdullah.ssc@stmu.edu.pk', '2023-07-24 02:13:06', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', 'no', 'Wednesday, January 4, 2023', 'Wednesday, January 4, 2023', 0, 'Fall 2023', 0, NULL, 0),
(5, '5', 'BS(AI)-6005', 'Zameer Ul Hassan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, 'After Due Date, the late fee of Rs.200/- per day will be collected & utilized for charitable purpose only.', '59625', NULL, NULL, NULL, NULL, NULL, 'Amina Ashraf-2023-007 SCD Tuition Fee #505', 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:42', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', 'yes', 'Thursday, October 13, 2022', 'Thursday, October 13, 2022', 0, 'Fall 2023', 0, NULL, 0),
(6, '6', 'BS(AI)-6006', 'Murtaza khalid', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, 'After Due Date, the late fee of Rs.200/- per day will be collected & utilized for charitable purpose only.', '59625', NULL, NULL, NULL, NULL, NULL, 'Amna Bint-E-Rashid-2023-008 SCD Tuition Fee #506', 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:42', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', 'yes', 'Monday, June 26, 2023', 'Monday, June 26, 2023', 0, 'Fall 2023', 0, NULL, 0),
(7, '7', 'BS(AI)-6007', 'Ikram Ullah', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, 'After Due Date, the late fee of Rs.200/- per day will be collected & utilized for charitable purpose only.', '59625', NULL, NULL, NULL, NULL, NULL, 'Amna Bint-E-Rashid-2023-008 SCD Tuition Fee #506', 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:42', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', 'yes', 'Monday, June 26, 2023', 'Monday, June 26, 2023', 0, 'Fall 2023', 0, NULL, 0),
(8, '8', 'BS(AI)-6008', 'Muhammad Sohail', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:42', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(9, '9', 'BS(AI)-6009', 'Muhammad Ibrahim', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:42', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(10, '10', 'BS(AI)-6010', 'Muhammad Furqan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(11, '11', 'BS(AI)-6011', 'Alisha Batool', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(12, '12', 'BS(AI)-6012', 'Muhammad farhan amin', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(13, '13', 'BS(AI)-6013', 'Akash akhlaq', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(14, '14', 'BS(AI)-6014', 'Syed Noor Shah', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(15, '15', 'BS(AI)-6015', 'Usama Ahmed', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(16, '16', 'BS(AI)-6016', 'Bushra', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(17, '17', 'BS(AI)-6017', 'Wazir Misham Haider', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(18, '18', 'BS(AI)-6018', 'Sultan Khan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(19, '19', 'BS(AI)-6019', 'Syeda Tanees Fatima', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(20, '20', 'BS(AI)-6020', 'Mubashar Ali', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 03:03:36', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 1, 'Fall 2023', 1, NULL, 0),
(21, '21', 'BS(AI)-6021', 'Alishan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Tuesday, July 25, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-24 02:14:33', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(22, '22', 'BS(AI)-6022', 'Mohsin raza', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(23, '23', 'BS(AI)-6023', 'Abdul Qayyim', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(24, '24', 'BS(AI)-6024', 'Muhammad Hassan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(25, '25', 'BS(AI)-6025', 'Hafiz Muhammad Arslan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(26, '26', 'BS(AI)-6026', 'Muhammad Qasim', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(27, '27', 'BS(CySec)-5001', 'Muhammad Umar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(28, '28', 'BS(CySec)-5002', 'Muhammad umer abbas', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(29, '29', 'BS(CySec)-5003', 'Meerab Ambreen', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(30, '30', 'BS(CySec)-5004', 'Hifza Bibi', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(31, '31', 'BS(CySec)-5005', 'Malik Hammad Ali', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(32, '32', 'BS(CySec)-5006', 'Muhammad Anas Raza', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(33, '33', 'BS(CySec)-5007', 'Noman khalid', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(34, '34', 'BS(CySec)-5008', 'Muhammad subhan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(35, '35', 'BS(CySec)-5009', 'Muhammad Affan Ahmad', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(36, '36', 'BS(CySec)-5010', 'Ali Hussnain', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(37, '37', 'BS(CySec)-5011', 'Hasrat Ali', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Tuesday, July 25, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-24 02:13:23', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(38, '38', 'BS(CySec)-5012', 'Usama Iftikhar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(39, '39', 'BS(CySec)-5013', 'Muhammad Amjad', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(40, '40', 'BS(CySec)-5014', 'Wazir sher Muhammad', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(41, '41', 'BS(CySec)-5015', 'Muhammad Kaab Bin Babar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, '250', NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-24 10:07:38', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 1, 'Fall 2023', 1, NULL, 0),
(42, '42', 'BS(CySec)-5016', 'Aneeq Jamshaid', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(43, '43', 'BS(CySec)-5017', 'Syed Ibrar Ullah', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(44, '44', 'BS(CySec)-5018', 'Pir Anas Ali Shah', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(45, '45', 'BS(CySec)-5019', 'Zohaib Shahbaz', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(46, '46', 'BS(CySec)-5020', 'Muhammad Zahid', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(47, '47', 'BS(CySec)-5021', 'Shania Muhammad', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(48, '48', 'BS(CySec)-5022', 'Nadeem Masih', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(49, '49', 'BS(CySec)-5023', 'Muhammad Hussain', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(50, '50', 'BS(CySec)-5024', 'Sammar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(51, '51', 'BS(AI)-6027', 'Shanze iman', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(52, '52', 'BS(AI)-6028', 'SUNEEL MAQSOOD', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(53, '53', 'BS(AI)-6029', 'Muhammad Dur E Adan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(54, '54', 'BS(AI)-6030', 'Saeem Cheema', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Tuesday, July 25, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-24 02:14:48', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(55, '55', 'BS(AI)-6031', 'Muhmmad Umar Khan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(56, '56', 'BS(AI)-6032', 'Hasna mustafvi', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(57, '57', 'BS(AI)-6033', 'Usama Javed', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-21 02:51:45', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 1, 'Fall 2023', 0, NULL, 0),
(58, '58', 'BS(AI)-6034', 'Faizan Ahmed', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(59, '59', 'BS(AI)-6035', 'Muhammad Anas', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(60, '60', 'BS(AI)-6036', 'Esha', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(61, '61', 'BS(AI)-6037', 'Muhammad Mueez Altaf', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(62, '62', 'BS(AI)-6038', 'Muhammad Shoaib Ilyas', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(63, '63', 'BS(AI)-6039', 'Sahil Qureshi', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(AI)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(64, '64', 'BS(CySec)-5025', 'Muhammad Abdul Hadi', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(65, '65', 'BS(CySec)-5026', 'Muhammad Taimoor', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(66, '66', 'BS(CySec)-5027', 'Awais', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(67, '67', 'BS(CySec)-5028', 'Sarmad', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(68, '68', 'BS(CySec)-5029', 'Ijaz Ali', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(69, '69', 'BS(CySec)-5030', 'Farhan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(70, '70', 'BS(CySec)-5031', 'Muhammad Abdullah', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(71, '71', 'BS(CySec)-5032', 'Shahid ULLAH', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(72, '72', 'BS(CySec)-5033', 'Tayyab Parviaz', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(73, '73', 'BS(CySec)-5034', 'Fazal amin', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(74, '74', 'BS(CySec)-5035', 'Rehman Raza', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(75, '75', 'BS(CySec)-5036', 'Muhammad Samiullah', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(76, '76', 'BS(CySec)-5037', 'Muhammad Ehtasham khan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(77, '77', 'BS(CySec)-5038', 'Muhammad Aqeel', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CySec)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(78, '78', 'BS(SE)-2101', 'Alban daud', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(79, '79', 'BS(SE)-2102', 'Haseeb Ullah Shah', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(80, '80', 'BS(SE)-2103', 'Muhammad Saran', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(81, '81', 'BS(SE)-2104', 'Umer', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(82, '82', 'BS(SE)-2105', 'Hussain shuja', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(83, '83', 'BS(SE)-2106', 'ZEESHAN ULLAH', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(84, '84', 'BS(SE)-2107', 'Jabran khan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(85, '85', 'BS(SE)-2108', 'BARKAT ALI', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(86, '86', 'BS(SE)-2109', 'Muhammad farhan amin', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(87, '87', 'BS(SE)-2110', 'Muhammad Awais', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(88, '88', 'BS(SE)-2111', 'Sameer ahmad', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(89, '89', 'BS(SE)-2112', 'Abu Bakar Bilal', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(90, '90', 'BS(SE)-2113', 'Muhammad Faheem Akhtar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(91, '91', 'BS(SE)-2114', 'Nayyab Haider', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(92, '92', 'BS(SE)-2115', 'Zohaib khan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(93, '93', 'BS(SE)-2116', 'Muhammad Zeshan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(94, '94', 'BS(SE)-2117', 'Muhammad issa', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(95, '95', 'BS(SE)-2118', 'savaira umar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(96, '96', 'BS(SE)-2119', 'Muhammad Usama', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(97, '97', 'BS(SE)-2120', 'Abdulrehmanyasin', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(98, '98', 'BS(SE)-2121', 'M. Anas Mukhtar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(99, '99', 'BS(SE)-2122', 'Muhammad Sheraz', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(100, '100', 'BS(SE)-2123', 'Muharram Ali', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(101, '101', 'BS(SE)-2124', 'Syed Usman Ali Shah', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(102, '102', 'BS(SE)-2125', 'MUHAMMAD ISLAM', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(103, '103', 'BS(SE)-2126', 'Behraz Muhammad', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(104, '104', 'BS(SE)-2127', 'Malaika', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(105, '105', 'BS(SE)-2128', 'Rameez Akhtar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(106, '106', 'BS(SE)-2129', 'Muhammad Arslan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(107, '107', 'BS(SE)-2130', 'Abu Bakar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(108, '108', 'BS(SE)-2131', 'Muhammad Sheraz', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(109, '109', 'BS(SE)-2132', 'MUHAMMAD ZAIN AHMAD', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(110, '110', 'BS(SE)-2133', 'Niranjan Lal', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0);
INSERT INTO `student_excel` (`challan_generation_id`, `Challan_No`, `Student_ID`, `Student_Name`, `Semester`, `Tuition_fee`, `Tuition_fee_Discount`, `Admission_fee`, `University_Reg_fee`, `Security_Deposit_Refundable`, `Medical_Checkup`, `Semester_Enrollment_Fee`, `Examination_Fee`, `Co_Curricular_activities_fee`, `Hostel_Fee`, `PMC_Registration`, `Pharmacy_Council_Reg_Fee`, `Clinical_Charges`, `Library_Fee`, `Migration_Fee`, `Document_Verification_Fee`, `Application_Prospectus_Fee`, `Degree_and_Convocation_Fee`, `Advance_Tax`, `Others_Specify`, `Late_fee`, `Transport_Charges`, `Special_Discount`, `Department`, `Due_Date`, `Others_Narration`, `Campus_Development_Charges`, `Total_Amount`, `Hostel_Fee_Month`, `Fine_Per_Day`, `Cut_Off_Date`, `Fine_Narration`, `Document_Verification_Narration`, `GL_Narration`, `email`, `updated_at`, `created_at`, `issue_date`, `Installment`, `inst_issue_date`, `inst_due_date`, `challan_status`, `session`, `email_status`, `challan_path`, `delete_status`) VALUES
(111, '111', 'BS(SE)-2134', 'Hamza Imdad', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(112, '112', 'BS(SE)-2135', 'Rehman Akhtar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(113, '113', 'BS(SE)-2136', 'Sehrish Riaz', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(114, '114', 'BS(SE)-2137', 'Ehsan ali', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(115, '115', 'BS(SE)-2138', 'umar ali', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(116, '116', 'BS(SE)-2139', 'Mujahid Hussain', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(117, '117', 'BS(SE)-2140', 'Muhammad saad', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(118, '118', 'BS(SE)-2141', 'Abdul Hanan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(119, '119', 'BS(SE)-2142', 'Danyal Jamal', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(120, '120', 'BS(SE)-2143', 'Abid Hussain', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(121, '121', 'BS(SE)-2144', 'Muntaha', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(122, '122', 'BS(SE)-2145', 'Ehtisham ul hassan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(123, '123', 'BS(SE)-2146', 'Usama faisal', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(124, '124', 'BS(SE)-2147', 'Hamdan Ashar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(125, '125', 'BS(SE)-2148', 'farhanrasool', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(126, '126', 'BS(SE)-2149', 'Adeel Sami', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(127, '127', 'BS(SE)-2150', 'Yaseen khan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(SE)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(128, '128', 'BS(CS)-23101', 'Syeda hadiya ali gilani', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(129, '129', 'BS(CS)-23102', 'Raja Umair Zaheer', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(130, '130', 'BS(CS)-23103', 'Abdul Wahab', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(131, '131', 'BS(CS)-23104', 'Muhammad Hassnain Safdar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(132, '132', 'BS(CS)-23105', 'Areej kanwal', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(133, '133', 'BS(CS)-23106', 'Hadi Haider', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(134, '134', 'BS(CS)-23107', 'Muhammad Abdul Hadi', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(135, '135', 'BS(CS)-23108', 'Muhammad Islam', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(136, '136', 'BS(CS)-23109', 'Abdulbari', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(137, '137', 'BS(CS)-23110', 'MUHAMMAD TALHA KHAN', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(138, '138', 'BS(CS)-23111', 'MUHAMMAD WALEED', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(139, '139', 'BS(CS)-23112', 'Muhammad Zeeshan Ijaz', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(140, '140', 'BS(CS)-23113', 'Mufakker Aizaz', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(141, '141', 'BS(CS)-23114', 'Hamza Sajid', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(142, '142', 'BS(CS)-23115', 'Muhammad Kaab Bin Babar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(143, '143', 'BS(CS)-23116', 'Muhammad Asif', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(144, '144', 'BS(CS)-23117', 'Noor Ahmed', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(145, '145', 'BS(CS)-23118', 'Faisal Ali khan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(146, '146', 'BS(CS)-23119', 'Sultan Muhammad Araiz Shaukat', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(147, '147', 'BS(CS)-23120', 'Syeda Hadiya Ali', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(148, '148', 'BS(CS)-23121', 'MUHAMMAD HASSAAN NASEER', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(149, '149', 'BS(CS)-23122', 'sheraz zafar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(150, '150', 'BS(CS)-23123', 'Jazib jabbar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(151, '151', 'BS(CS)-23124', 'Noor E Eman', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(152, '152', 'BS(CS)-23125', 'Noorullah', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(153, '153', 'BS(CS)-23126', 'Rabiya safeer', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(154, '154', 'BS(CS)-23127', 'Anand raj', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(155, '155', 'BS(CS)-23128', 'Hamza Shahzad', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(156, '156', 'BS(CS)-23129', 'Humayun Abbasi', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(157, '157', 'BS(CS)-23130', 'Shahjahan Ibrahim', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(158, '158', 'BS(CS)-23131', 'Muhammad Abdul Hanan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(159, '159', 'BS(CS)-23132', 'Safdar Ali', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(160, '160', 'BS(CS)-23133', 'Muhammad Furqan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(161, '161', 'BS(CS)-23134', 'Zarmeena Mukhtar', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(162, '162', 'BS(CS)-23135', 'Mazhar Imtiaz', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(163, '163', 'BS(CS)-23136', 'M Adnan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(164, '164', 'BS(CS)-23137', 'Muhammad Shariyar Awan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(165, '165', 'BS(CS)-23138', 'MUHAMMAD MUQEET ASGHAR', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(166, '166', 'BS(CS)-23139', 'Meerab', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(167, '167', 'BS(CS)-23140', 'Ali Imran', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(168, '168', 'BS(CS)-23141', 'Muhammad Nabeel Khan', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(169, '169', 'BS(CS)-23142', 'Mawadat zahra', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(170, '170', 'BS(CS)-23143', 'Taha Zahid', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BS(CS)', 'Friday, July 07, 2023', NULL, NULL, '59625', NULL, NULL, NULL, NULL, NULL, NULL, 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:43', '2023-07-20 02:49:35', 'Tuesday, June 27, 2023', NULL, NULL, NULL, 0, 'Fall 2023', 0, NULL, 0),
(171, '1', 'BS(AI)-6001', 'Areeba Javed', '1st', '59625', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BSAI', 'Friday, July 07, 2023', 'ss', 'After Due Date, the late fee of Rs.200/- per day will be collected & utilized for charitable purpose only.', '59625', NULL, NULL, NULL, NULL, NULL, 'Aaiza Javed-2023-001 SCD Tuition Fee #501', 'abdullah.ssc@stmu.edu.pk', '2023-07-20 02:49:42', '2023-07-20 02:49:42', 'Tuesday, June 27, 2023', 'yes', 'Thursday, September 22, 2022', 'Thursday, September 22, 2022', 0, 'Fall 2023', 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `updated_at`, `created_at`, `role`, `token`) VALUES
(11, 'mak@gmail.com', '$2y$10$8gBXjCdQM7TRgZFK9di5SeakYltwZSx7w8a0N720LsTCFl/tMWmJK', '2023-07-24 01:11:40', '2023-06-21 04:43:26', 'Admin', '5omGCumCy6ytSulMcja9RSnaKdKC7mif'),
(15, 'admissions.ssc@stmu.edu.pk', '$2y$10$nBg56WoStzXK.Ry3yAUI1O/wtJRom4N7TvmHQNKDnV9oP59nh8ETq', '2023-06-27 08:22:58', '2023-06-27 08:22:58', 'Admin', NULL),
(16, 'admissions.ssc@stmu.edu.pk', '$2y$10$PRnJgAZxF.8H.N04VJx1NejMfxAJkGfvWomf0/6wzBJrOyIOljg62', '2023-06-27 08:26:29', '2023-06-27 08:26:29', 'Admin', NULL),
(17, 'admissions.ssc@stmu.edu.pk', '$2y$10$/vwh0JdWum2kEKDohD/QWOv/ki2p3eODeHYNwdySU43klVhE6EnyC', '2023-06-27 10:34:17', '2023-06-27 10:34:17', 'Admin', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank_voucher_info`
--
ALTER TABLE `bank_voucher_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_challan_generation_id` (`challan_generation_id`);

--
-- Indexes for table `department_mapping`
--
ALTER TABLE `department_mapping`
  ADD PRIMARY KEY (`department_mapping_id`),
  ADD KEY `fk_department_mapping_user` (`user_id`);

--
-- Indexes for table `student_excel`
--
ALTER TABLE `student_excel`
  ADD PRIMARY KEY (`challan_generation_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank_voucher_info`
--
ALTER TABLE `bank_voucher_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `department_mapping`
--
ALTER TABLE `department_mapping`
  MODIFY `department_mapping_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student_excel`
--
ALTER TABLE `student_excel`
  MODIFY `challan_generation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bank_voucher_info`
--
ALTER TABLE `bank_voucher_info`
  ADD CONSTRAINT `fk_challan_generation_id` FOREIGN KEY (`challan_generation_id`) REFERENCES `student_excel` (`challan_generation_id`);

--
-- Constraints for table `department_mapping`
--
ALTER TABLE `department_mapping`
  ADD CONSTRAINT `fk_department_mapping_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
