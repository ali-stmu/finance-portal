import React, { useEffect, useState } from "react";
import BankLogo from "../images/bank_logo1.png";
import UniLogo from "../images/uni_logo.png";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import axios from "axios";
import { BASE_URL } from "../baseUrl";
import { lazy, Suspense } from "react";

const GenrateChallan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // console.log();
  const storedValue = localStorage.getItem("tempDataStudent");
  const parsedValue = JSON.parse(storedValue);
  const [showLazyComponent, setShowLazyComponent] = useState(false);
  // Access other attributes as needed
  const collegeName = "Shifa Tameer-e-Millat University";
  const AccountTitle = "Shifa Tameer-e-Millat University, Islamabad";
  const voucherID = parsedValue.challan_generation_id;
  const date = parsedValue.issue_date;
  const dueDate = parsedValue.Due_Date;
  const bankAccountNumber = "1161003012610002";
  const studentName = parsedValue.Student_Name;
  const rollNo = parsedValue.Student_ID;
  const session = parsedValue.session;
  const pyear = session.replace(/\D/g, "");
  const admission_fee = parsedValue.Admission_fee;
  const TuitionFee = parsedValue.Tuition_fee;
  const TotalDiscount = parsedValue.Tuition_fee_Discount;
  // const totalAmount = parsedValue.Total_Amount;
  const totalAmount = "59,625";
  const parts = rollNo.split("-");
  const programName = parts[0];
  const email = parsedValue.email;

  console.log(email);
  const generatePDF = () => {
    const divToPrint = document.getElementById("main_div");
    setIsLoading(true);

    html2canvas(divToPrint, {
      scale: 1,
      imageSmoothingEnabled: false,
    })
      .then((canvas) => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;

        const pdf = new jsPDF("landscape", "mm", "a4");

        const ratio = contentWidth / contentHeight;
        const canvasWidth = pdf.internal.pageSize.getWidth();
        const canvasHeight = canvasWidth / ratio;

        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          canvasWidth,
          canvasHeight,
          "",
          "FAST"
        );

        pdf.save(`${email}.pdf`);
        setIsLoading(false);
        navigate("/showcsv");
      })
      .catch((error) => {
        console.log("An error occurred while generating PDF: ", error);
      });
  };

  const sendPdfToBackend = () => {
    const divToPrint = document.getElementById("main_div");
    setIsLoading(true);
    //divToPrint.style.width = "78%";
    //divToPrint.style.height = "100%";

    html2canvas(divToPrint, { scale: 2 })
      .then((canvas) => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;

        const pdf = new jsPDF("landscape", "mm", "a4");

        const ratio = contentWidth / contentHeight;
        const canvasWidth = pdf.internal.pageSize.getWidth();
        const canvasHeight = canvasWidth / ratio;

        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          canvasWidth,
          canvasHeight,
          "",
          "FAST"
        );

        const pdfData = pdf.output("blob"); // Get the PDF data as a Blob

        // Create FormData object and append the PDF file
        const formData = new FormData();
        formData.append("pdfFile", pdfData, `${email}.pdf`);

        // Make an HTTP POST request to your Laravel backend API endpoint
        fetch(
          `${BASE_URL}/api/sendEmail/${voucherID}/${email}/${studentName}/${rollNo}`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the backend
            console.log("PDF saved on the server:", data);
            setIsLoading(false);
            navigate("/showcsv");
          })
          .catch((error) => {
            console.log(
              "An error occurred while saving PDF on the server:",
              error
            );
          });
      })
      .catch((error) => {
        console.log("An error occurred while generating PDF: ", error);
      });
  };

  return (
    <>
      <br></br>
      <div className="d-flex justify-content-center">
        {isLoading ? (
          <div className="loading">
            <h1>Loading.....</h1>
          </div>
        ) : (
          <>
            <button
              className="btn btn-primary mx-auto d-block"
              onClick={generatePDF}
            >
              Download Challan
            </button>
            <button
              className="btn btn-primary mx-auto d-block"
              onClick={sendPdfToBackend}
            >
              Send Email
            </button>
          </>
        )}
      </div>
      <div id="main_div" className="row">
        <div
          className="col-sm"
          style={{ marginTop: "15px", overflow: "scroll", width: "920px" }}
          id="div_print_1"
        >
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  <div
                    style={{
                      width: "500px",
                      border: "solid 2px black",
                      padding: "0px",
                      textAlign: "center",
                    }}
                    id="Div6"
                  >
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src={UniLogo}
                              alt="Bank Logo"
                              style={{ width: "75px", height: "75px" }}
                            />
                          </td>
                          <td align="center">
                            <span
                              style={{ fontSize: "11pxt", fontFamily: "Arial" }}
                            >
                              <b>
                                Specialized Fee
                                <br />
                                Challan Form
                                <br />
                                {collegeName}
                              </b>
                              <br />
                              <b>Deposit Slip (Student Copy)</b>
                            </span>
                            <br />
                          </td>
                          <td>
                            <img
                              src={BankLogo}
                              alt="Bank Logo"
                              style={{ width: "100px", height: "50px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3" align="center">
                            <span
                              style={{ fontSize: "11pxt", fontFamily: "Arial" }}
                            ></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      width="100%"
                      className="mystyle"
                      style={{
                        fontFamily: "Arial",
                        fontSize: "15px",
                        borderCollapse: "collapse",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Ch./Receipt/Slip No:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="left"
                            style={{
                              fontSize: "15px",
                              //fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {voucherID}
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Issue Date:</b>
                          </td>
                          <td
                            align="right"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {date}
                          </td>
                          <td
                            align="right"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Due Date:</b>
                          </td>
                          <td
                            align="right"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {dueDate}
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Credit to:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {AccountTitle}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            width="30%"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Collection Account#:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <u>{bankAccountNumber}</u>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Program:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {programName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Student Name:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {studentName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Roll No:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {rollNo}
                          </td>
                          <td
                            align="right"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Program Year:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {pyear}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Semester:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Fall
                          </td>
                          <td
                            align="right"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Session:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {session}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Installment</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            1
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Particulars</b>
                          </td>
                          <td
                            width="25%"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Amount (PKR)</b>
                          </td>
                          <td
                            width="25%"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Total (PKR)</b>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Semester Fee
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {totalAmount}
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {totalAmount}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Total:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>{totalAmount}</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>{totalAmount}</b>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                            <p>
                              <b>Note:</b> Security fee 12,000 (Refundable) and
                              admission charges 32,400 (non-refundable) are the
                              part of program fee.
                            </p>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Remarks:</b>
                          </td>
                          <td
                            colSpan="2"
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            None
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <span
                              style={{ fontSize: "15px", fontFamily: "Arial" }}
                            >
                              <b>
                                Please deposit this challan to any branch of the
                                bank within the due date.
                              </b>
                              <br />
                              <b>
                                After the due date, an additional fine will be
                                charged as per the university policy.
                              </b>
                              <br />
                              <b>
                                Keep the deposit slip safe as proof of payment.
                              </b>
                              <br />
                              <b>
                                This is a computer-generated document and does
                                not require any signature.
                              </b>
                            </span>
                          </td>
                        </tr>
                        <br></br>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td>
                            <b>Bank's Teller</b>
                          </td>
                          <td></td>
                          <td></td>

                          <td>
                            <b>Bank's Officer</b>
                          </td>
                        </tr>
                        <br></br>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="col-sm"
          style={{ marginTop: "15px", overflow: "scroll", width: "920px" }}
          id="div_print_1"
        >
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  <div
                    style={{
                      width: "500px",
                      border: "solid 2px black",
                      padding: "0px",
                      textAlign: "center",
                    }}
                    id="Div6"
                  >
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src={UniLogo}
                              alt="Bank Logo"
                              style={{ width: "75px", height: "75px" }}
                            />
                          </td>
                          <td align="center">
                            <span
                              style={{ fontSize: "11pxt", fontFamily: "Arial" }}
                            >
                              <b>
                                Specialized Fee
                                <br />
                                Challan Form
                                <br />
                                {collegeName}
                              </b>
                              <br />
                              <b>Deposit Slip (Dept. Copy)</b>
                            </span>
                            <br />
                          </td>
                          <td>
                            <img
                              src={BankLogo}
                              alt="Bank Logo"
                              style={{ width: "100px", height: "50px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3" align="center">
                            <span
                              style={{ fontSize: "11pxt", fontFamily: "Arial" }}
                            ></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      width="100%"
                      className="mystyle"
                      style={{
                        fontFamily: "Arial",
                        fontSize: "15px",
                        borderCollapse: "collapse",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Ch./Receipt/Slip No:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="left"
                            style={{
                              fontSize: "15px",
                              //fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {voucherID}
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Issue Date:</b>
                          </td>
                          <td
                            align="right"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {date}
                          </td>
                          <td
                            align="right"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Due Date:</b>
                          </td>
                          <td
                            align="right"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {dueDate}
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Credit to:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {AccountTitle}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            width="30%"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Collection Account#:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <u>{bankAccountNumber}</u>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Program:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {programName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Student Name:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {studentName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Roll No:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {rollNo}
                          </td>
                          <td
                            align="right"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Program Year:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {pyear}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Semester:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Fall
                          </td>
                          <td
                            align="right"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Session:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {session}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Installment</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            1
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Particulars</b>
                          </td>
                          <td
                            width="25%"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Amount (PKR)</b>
                          </td>
                          <td
                            width="25%"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Total (PKR)</b>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Semester Fee
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {totalAmount}
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {totalAmount}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Total:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>{totalAmount}</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>{totalAmount}</b>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                            <p>
                              <b>Note:</b> Security fee 12,000 (Refundable) and
                              admission charges 32,400 (non-refundable) are the
                              part of program fee.
                            </p>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Remarks:</b>
                          </td>
                          <td
                            colSpan="2"
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            None
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <span
                              style={{ fontSize: "15px", fontFamily: "Arial" }}
                            >
                              <b>
                                Please deposit this challan to any branch of the
                                bank within the due date.
                              </b>
                              <br />
                              <b>
                                After the due date, an additional fine will be
                                charged as per the university policy.
                              </b>
                              <br />
                              <b>
                                Keep the deposit slip safe as proof of payment.
                              </b>
                              <br />
                              <b>
                                This is a computer-generated document and does
                                not require any signature.
                              </b>
                            </span>
                          </td>
                        </tr>
                        <br></br>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td>
                            <b>Bank's Teller</b>
                          </td>
                          <td></td>
                          <td></td>

                          <td>
                            <b>Bank's Officer</b>
                          </td>
                        </tr>
                        <br></br>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="col-sm"
          style={{ marginTop: "15px", overflow: "scroll", width: "920px" }}
          id="div_print_1"
        >
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  <div
                    style={{
                      width: "500px",
                      border: "solid 2px black",
                      padding: "0px",
                      textAlign: "center",
                    }}
                    id="Div6"
                  >
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src={UniLogo}
                              alt="Bank Logo"
                              style={{ width: "75px", height: "75px" }}
                            />
                          </td>
                          <td align="center">
                            <span
                              style={{ fontSize: "11pxt", fontFamily: "Arial" }}
                            >
                              <b>
                                Specialized Fee
                                <br />
                                Challan Form
                                <br />
                                {collegeName}
                              </b>
                              <br />
                              <b>Deposit Slip (Bank Copy)</b>
                            </span>
                            <br />
                          </td>
                          <td>
                            <img
                              src={BankLogo}
                              alt="Bank Logo"
                              style={{ width: "100px", height: "50px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3" align="center">
                            <span
                              style={{ fontSize: "11pxt", fontFamily: "Arial" }}
                            ></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      width="100%"
                      className="mystyle"
                      style={{
                        fontFamily: "Arial",
                        fontSize: "15px",
                        borderCollapse: "collapse",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Ch./Receipt/Slip No:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="left"
                            style={{
                              fontSize: "15px",
                              //fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {voucherID}
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Issue Date:</b>
                          </td>
                          <td
                            align="right"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {date}
                          </td>
                          <td
                            align="right"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Due Date:</b>
                          </td>
                          <td
                            align="right"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {dueDate}
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Credit to:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {AccountTitle}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            width="30%"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Collection Account#:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <u>{bankAccountNumber}</u>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Program:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {programName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Student Name:</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {studentName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Roll No:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {rollNo}
                          </td>
                          <td
                            align="right"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Program Year:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {pyear}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Semester:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Fall
                          </td>
                          <td
                            align="right"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Session:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {session}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Installment</b>
                          </td>
                          <td
                            colSpan="3"
                            align="center"
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            1
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Particulars</b>
                          </td>
                          <td
                            width="25%"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Amount (PKR)</b>
                          </td>
                          <td
                            width="25%"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Total (PKR)</b>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Semester Fee
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {totalAmount}
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {totalAmount}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Total:</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>{totalAmount}</b>
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>{totalAmount}</b>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                            <p>
                              <b>Note:</b> Security fee 12,000 (Refundable) and
                              admission charges 32,400 (non-refundable) are the
                              part of program fee.
                            </p>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <b>Remarks:</b>
                          </td>
                          <td
                            colSpan="2"
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            None
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <span
                              style={{ fontSize: "15px", fontFamily: "Arial" }}
                            >
                              <b>
                                Please deposit this challan to any branch of the
                                bank within the due date.
                              </b>
                              <br />
                              <b>
                                After the due date, an additional fine will be
                                charged as per the university policy.
                              </b>
                              <br />
                              <b>
                                Keep the deposit slip safe as proof of payment.
                              </b>
                              <br />
                              <b>
                                This is a computer-generated document and does
                                not require any signature.
                              </b>
                            </span>
                          </td>
                        </tr>
                        <br></br>
                        <tr align="left" style={{ fontSize: "15px" }}>
                          <td>
                            <b>Bank's Teller</b>
                          </td>
                          <td></td>
                          <td></td>

                          <td>
                            <b>Bank's Officer</b>
                          </td>
                        </tr>
                        <br></br>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default GenrateChallan;
