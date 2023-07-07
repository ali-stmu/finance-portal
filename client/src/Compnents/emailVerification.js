import React, { useState, useEffect, useRef } from "react";
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
  const tableRef = useRef(null);

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
    const table = tableRef.current;
    doc.autoTable({ html: table });

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
                <table
                  className="table table-bordered table-striped"
                  ref={tableRef}
                >
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
