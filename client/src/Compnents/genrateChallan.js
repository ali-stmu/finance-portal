import React, { useEffect, useState } from "react";
import BankLogo from "../images/bank_logo1.png";
import UniLogo from "../images/uni_logo.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GenrateChallan = () => {
  const [isLoading, setIsLoading] = useState(false);
  // console.log();
  const storedValue = localStorage.getItem("tempDataStudent");
  const parsedValue = JSON.parse(storedValue);
  // Access other attributes as needed
  const collegeName = "Shifa Tameer-e-Millat University";
  const voucherID = parsedValue.challan_generation_id;
  const date = parsedValue.issue_date;
  const dueDate = parsedValue.Due_Date;
  const bankAccountNumber = "1234567890";
  const studentName = parsedValue.Student_Name;
  const rollNo = parsedValue.Student_ID;
  const session = parsedValue.session;
  const pyear = session.replace(/\D/g, "");
  const admission_fee = parsedValue.Admission_fee;
  const TuitionFee = parsedValue.Tuition_fee;
  const totalAmount = parsedValue.Total_Amount;
  const parts = rollNo.split("-");
  const programName = parts[0];
  console.log(pyear);
  const generatePDF = () => {
    const divToPrint = document.getElementById("main_div");
    setIsLoading(true); // Set loading state to true

    //divToPrint.style.transform = "rotate(90deg)";
    divToPrint.style.width = "78%"; // Set the width of the div to 100% of the parent container
    divToPrint.style.height = "100%"; // Set the height of the div to 100% of the parent container

    html2canvas(divToPrint, { scale: 5 })
      .then((canvas) => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;

        // Adjust page orientation to portrait
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

        pdf.save("generated_pdf.pdf");
      })
      .catch((error) => {
        console.log("An error occurred while generating PDF: ", error);
      });
  };

  return (
    <>
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
                      width: "400px",
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
                              style={{ width: "100px", height: "100px" }}
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
                        fontSize: "11px",
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
                              fontSize: "11px",
                              fontWeight: "bold",
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
                              fontSize: "11px",
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
                              fontSize: "11px",
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {collegeName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <u>{bankAccountNumber}</u>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {programName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
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
                              fontSize: "11px",
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {pyear}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
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
                              fontSize: "11px",
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
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                        <tr align="left" style={{ fontSize: "11px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Admission Fee
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {admission_fee}
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {admission_fee}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Tuition Fee
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {TuitionFee}
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {TuitionFee}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              style={{ fontSize: "11px", fontFamily: "Arial" }}
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
                      width: "400px",
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
                              style={{ width: "100px", height: "100px" }}
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
                        fontSize: "11px",
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
                              fontSize: "11px",
                              fontWeight: "bold",
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
                              fontSize: "11px",
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
                              fontSize: "11px",
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {collegeName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <u>{bankAccountNumber}</u>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {programName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
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
                              fontSize: "11px",
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {pyear}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
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
                              fontSize: "11px",
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
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                        <tr align="left" style={{ fontSize: "11px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Admission Fee
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {admission_fee}
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {admission_fee}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Tuition Fee
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {TuitionFee}
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {TuitionFee}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              style={{ fontSize: "11px", fontFamily: "Arial" }}
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
                      width: "400px",
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
                              style={{ width: "100px", height: "100px" }}
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
                        fontSize: "11px",
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
                              fontSize: "11px",
                              fontWeight: "bold",
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
                              fontSize: "11px",
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
                              fontSize: "11px",
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {collegeName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            <u>{bankAccountNumber}</u>
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {programName}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
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
                              fontSize: "11px",
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
                              fontSize: "11px",
                              fontWeight: "bold",
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {pyear}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              fontSize: "11px",
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
                              fontSize: "11px",
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
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                        <tr align="left" style={{ fontSize: "11px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Admission Fee
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {admission_fee}
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {admission_fee}
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
                          <td
                            colSpan="2"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            Tuition Fee
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {TuitionFee}
                          </td>
                          <td
                            align="center"
                            style={{
                              border: "1px solid black",
                              padding: "5px",
                            }}
                          >
                            {TuitionFee}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" align="center">
                            <hr style={{ border: "1px solid black" }} />
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                          </td>
                        </tr>
                        <tr align="left" style={{ fontSize: "11px" }}>
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
                              style={{ fontSize: "11px", fontFamily: "Arial" }}
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
      <div>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <button
            className="btn btn-primary mx-auto d-block"
            onClick={generatePDF}
          >
            Generate PDF
          </button>
        )}
        {/* Rest of your component */}
      </div>
    </>
  );
};

export default GenrateChallan;
