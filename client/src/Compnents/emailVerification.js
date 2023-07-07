import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseUrl";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const EmailVerification = () => {
  const [generatedFields, setGeneratedFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [currentPageGeneratedFields, setCurrentPageGeneratedFields] =
    useState(1);
  const [totalPagesGeneratedFields, setTotalPagesGeneratedFields] = useState(1);
  const [searchTextGeneratedFields, setSearchTextGeneratedFields] =
    useState("");
  const pageSize = 12;
  const navigate = useNavigate();

  const fetchFieldsGenerated = async (email) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/feeChallanEmailedData/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setGeneratedFields(data.fields);
        setTotalPagesGeneratedFields(Math.ceil(data.fields.length / pageSize));
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePrintChallan = async (field) => {
    setSelectedField(field);
    const jsonData = JSON.stringify(field);
    localStorage.setItem("tempDataStudent", jsonData);

    try {
      const response = await axios.put(
        `${BASE_URL}/api/updatechallan/${field.challan_generation_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Challan generated successfully.");
        // Perform any additional actions upon successful generation of challan
      } else {
        console.error("Error:", response.status);
        // Handle the error case
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error case
    }

    navigate("/genratechallan");
  };

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let email = user.user.user_id;
    fetchFieldsGenerated(email);
  }, []);

  const handlePageChangeGeneratedFields = (page) => {
    setCurrentPageGeneratedFields(page);
  };

  const handleSearchGeneratedFields = (event) => {
    setSearchTextGeneratedFields(event.target.value);
    setCurrentPageGeneratedFields(1);
  };

  const getPaginatedData = (data, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  const filterData = (data, searchText) => {
    return data.filter((item) => {
      const studentName = item.Student_Name
        ? item.Student_Name.toLowerCase()
        : "";
      const studentID = item.Student_ID ? item.Student_ID.toLowerCase() : "";
      const search = searchText.toLowerCase();
      return studentName.includes(search) || studentID.includes(search);
    });
  };

  const filteredGeneratedFields = filterData(
    generatedFields,
    searchTextGeneratedFields
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const header = "Shifa Tameer-e-Millat University";
    const footer = "Page";

    let currentPage = 1;

    const totalPages = Math.ceil(generatedFields.length / pageSize);

    const pageHeight = doc.internal.pageSize.getHeight();
    const contentHeight = pageHeight - 60; // Adjusted content height to leave space for header, footer, and table headings
    const rowsPerPage = Math.floor(contentHeight / 10); // Assuming each row has a height of 10 (adjust as needed)

    filteredGeneratedFields.forEach((field, index) => {
      if (index > 0 && index % rowsPerPage === 0) {
        doc.addPage();
        currentPage++;
        // Add header for the new page
        doc.setFontSize(14);
        doc.setTextColor("#007bff");
        doc.setFont("helvetica", "bold");

        const headerWidth = doc.getTextWidth(header);
        const pageWidth = doc.internal.pageSize.getWidth();
        const xPos = (pageWidth - headerWidth) / 2;

        doc.text(header, xPos, 15);
        doc.setFontSize(12);
        doc.setTextColor("#000000");
        doc.setFont("helvetica", "normal");
        doc.text(10, 30, "Sr. No");
        doc.text(25, 30, "Student Name");
        doc.text(90, 30, "Student ID");
        doc.setLineWidth(0.5);
        doc.line(10, 33, 200, 33);

        // Add border to the page
        doc.setDrawColor("#000000");
        doc.setLineWidth(1);
        doc.rect(5, 5, pageWidth - 10, pageHeight - 10, "S");
      }

      const rowPosition = 10 + ((index % rowsPerPage) + 1) * 10;
      const spacing = 5;
      doc.setTextColor("#000000");
      doc.setFont("helvetica", "normal");
      doc.text(10, rowPosition + spacing + 35, String(index + 1));
      doc.text(25, rowPosition + spacing + 35, field.Student_Name);
      doc.text(90, rowPosition + spacing + 35, field.Student_ID);
    });

    // Add footer to each page
    for (let i = 1; i <= doc.internal.getNumberOfPages(); i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor("#666666");
      doc.text(
        footer + " " + i + " of " + totalPages,
        10,
        doc.internal.pageSize.height - 10
      );

      // Add header to the first page
      if (i === 1) {
        doc.setFontSize(18);
        doc.setTextColor("#007bff");
        doc.setFont("helvetica", "bold");

        const headerWidth = doc.getTextWidth(header);
        const pageWidth = doc.internal.pageSize.getWidth();
        const xPos = (pageWidth - headerWidth) / 2;

        doc.text(header, xPos, 20);
        doc.setFontSize(12);
        doc.setTextColor("#000000");
        doc.setFont("helvetica", "normal");
        doc.text(10, 30, "Sr. No");
        doc.text(25, 30, "Student Name");
        doc.text(90, 30, "Student ID");
        doc.setLineWidth(0.5);
        doc.line(10, 33, 200, 33);
      }

      // Add border to the page
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.setDrawColor("#000000");
      doc.setLineWidth(1);
      doc.rect(5, 5, pageWidth - 10, pageHeight - 10, "S");
    }

    doc.save("emailedChallan.pdf");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h1>Emailed Challan</h1>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Students..."
                  value={searchTextGeneratedFields}
                  onChange={handleSearchGeneratedFields}
                />
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Sr. No</th>
                      <th>Student Name</th>
                      <th>Student ID</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData(
                      filteredGeneratedFields,
                      currentPageGeneratedFields
                    ).map((field, index) => (
                      <tr key={index}>
                        <td>
                          {(currentPageGeneratedFields - 1) * pageSize +
                            index +
                            1}
                        </td>
                        <td>{field.Student_Name}</td>
                        <td>{field.Student_ID}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handlePrintChallan(field)}
                          >
                            Re-Generate Challan
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col">
                  {" "}
                  <button
                    className="btn btn-primary"
                    onClick={handleDownloadPDF}
                  >
                    Download PDF
                  </button>
                </div>
                <div>
                  <div className="text-center">
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handlePageChangeGeneratedFields(
                          currentPageGeneratedFields - 1
                        )
                      }
                      disabled={currentPageGeneratedFields === 1}
                    >
                      Previous
                    </button>
                    <span className="page-number">
                      <strong>
                        {currentPageGeneratedFields} of{" "}
                        {totalPagesGeneratedFields}
                      </strong>
                    </span>
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handlePageChangeGeneratedFields(
                          currentPageGeneratedFields + 1
                        )
                      }
                      disabled={
                        currentPageGeneratedFields === totalPagesGeneratedFields
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
