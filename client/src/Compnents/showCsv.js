import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseUrl";
import axios from "axios";
import EditChallanPopup from "./editChallanPopup";
import "../Styling/ShowCsv.css"; // Import CSS file for styling

const ShowCsv = () => {
  const [fields, setFields] = useState([]);
  const [generatedFields, setGeneratedFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [currentPageFields, setCurrentPageFields] = useState(1);
  const [currentPageGeneratedFields, setCurrentPageGeneratedFields] =
    useState(1);
  const [totalPagesFields, setTotalPagesFields] = useState(1);
  const [totalPagesGeneratedFields, setTotalPagesGeneratedFields] = useState(1);
  const [searchTextFields, setSearchTextFields] = useState("");
  const [searchTextGeneratedFields, setSearchTextGeneratedFields] =
    useState("");
  const [selectedFieldForEdit, setSelectedFieldForEdit] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizeGenerated, setPageSizeGenerated] = useState(10);

  const navigate = useNavigate();
  const fetchFields = async (email) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/feeChallanData/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setFields(data.fields);
        setTotalPagesFields(Math.ceil(data.fields.length / pageSize));
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const totalStudentCount = fields.length + generatedFields.length;
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
  };
  const handlePageSizeChangeGenerated = (event) => {
    setPageSizeGenerated(parseInt(event.target.value));
  };
  const fetchFieldsGenerated = async (email) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/feeChallanGeneratedData/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setGeneratedFields(data.fields);
        setTotalPagesGeneratedFields(
          Math.ceil(data.fields.length / pageSizeGenerated)
        );
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

  const handleEditChallan = async (field) => {
    console.log(field);
    setSelectedFieldForEdit(field);
    setShowEditPopup(true);
  };
  const handleSaveEditPopup = (editedData) => {
    // Perform any necessary save/update logic here
    console.log("Edited data:", editedData);

    // Set the update success status to true
    setUpdateSuccess(true);

    // Close the edit popup
    setShowEditPopup(false);
  };

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let email = user.user.user_id;
    fetchFields(email);
    fetchFieldsGenerated(email);
    let timeoutId;

    if (updateSuccess) {
      timeoutId = setTimeout(() => {
        setUpdateSuccess(false);
      }, 2000); // Set the duration (in milliseconds) for how long the success message should be displayed
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [updateSuccess, pageSize, pageSizeGenerated]);

  const handlePageChangeFields = (page) => {
    setCurrentPageFields(page);
  };

  const handlePageChangeGeneratedFields = (page) => {
    setCurrentPageGeneratedFields(page);
  };

  const handleSearchFields = (event) => {
    setSearchTextFields(event.target.value);
    setCurrentPageFields(1);
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
  const getPaginatedDataGenerated = (data, currentPage) => {
    const startIndex = (currentPage - 1) * pageSizeGenerated;
    const endIndex = startIndex + pageSizeGenerated;
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

  const filteredFields = filterData(fields, searchTextFields);
  const filteredGeneratedFields = filterData(
    generatedFields,
    searchTextGeneratedFields
  );

  return (
    <div className="row">
      <div
        className={`col ${showEditPopup ? "blurred" : ""}`} // Apply the "blurred" class when the edit popup is shown
        style={{
          padding: "10px 30px 20px",
        }}
      >
        <h1>Generate Challan</h1>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search Students..."
            value={searchTextFields}
            onChange={handleSearchFields}
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
              {getPaginatedData(filteredFields, currentPageFields).map(
                (field, index) => (
                  <tr key={index}>
                    <td>{(currentPageFields - 1) * pageSize + index + 1}</td>
                    <td>{field.Student_Name}</td>
                    <td>{field.Student_ID}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handlePrintChallan(field)}
                      >
                        <i className="fas fa-print">Print Challan</i>
                      </button>
                      {"  "}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleEditChallan(field)}
                      >
                        <i className="fas fa-edit">Edit</i>
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className="form-group">
            <label>Page Size:</label>
            <select value={pageSize} onChange={handlePageSizeChange}>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
          </div>
        </div>
        <div className="text-center total-student-count">
          <h4>Total Students: {fields.length}</h4>
        </div>
        <div className="row">
          <div className="col">
            <div className="text-center">
              <button
                className="btn btn-secondary"
                onClick={() => handlePageChangeFields(currentPageFields - 1)}
                disabled={currentPageFields === 1}
              >
                Previous
              </button>
              <span className="page-number">
                <strong>
                  {currentPageFields} of {totalPagesFields}
                </strong>
              </span>
              <button
                className="btn btn-secondary"
                onClick={() => handlePageChangeFields(currentPageFields + 1)}
                disabled={currentPageFields === totalPagesFields}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`col ${showEditPopup ? "blurred" : ""}`} // Apply the "blurred" class when the edit popup is shown
        style={{
          padding: "10px 30px 20px",
        }}
      >
        {" "}
        <h1>Generated Challan</h1>
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
              {getPaginatedDataGenerated(
                filteredGeneratedFields,
                currentPageGeneratedFields
              ).map((field, index) => (
                <tr key={index}>
                  <td>
                    {(currentPageGeneratedFields - 1) * pageSizeGenerated +
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
                      <i className="fas fa-print">Re-Generate Challan</i>{" "}
                    </button>
                    {"  "}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleEditChallan(field)}
                    >
                      <i className="fas fa-edit">Edit</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="form-group">
            <label>Page Size:</label>
            <select
              value={pageSizeGenerated}
              onChange={handlePageSizeChangeGenerated}
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
          </div>
        </div>
        <div className="text-center total-student-count">
          <h4>Total Students: {generatedFields.length}</h4>
        </div>
        <div className="row">
          <div className="col">
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
                  {currentPageGeneratedFields} of {totalPagesGeneratedFields}
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

      {showEditPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            animation: "fade-in 0.5s ease-out",
          }}
        >
          <EditChallanPopup
            primaryKey={selectedFieldForEdit.challan_generation_id}
            dueDate={selectedFieldForEdit.Due_Date}
            studentID={selectedFieldForEdit.Student_ID}
            studentName={selectedFieldForEdit.Student_Name}
            totalAmount={selectedFieldForEdit.Total_Amount}
            tuitionFee={selectedFieldForEdit.Tuition_fee}
            email={selectedFieldForEdit.email}
            onSave={handleSaveEditPopup}
            onClose={() => setShowEditPopup(false)}
          />
        </div>
      )}
      {updateSuccess && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#dff0d8",
            border: "1px solid #d0e9c6",
            padding: "20px",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            animation: "fade-in 0.5s ease-out",
          }}
        >
          <h1
            style={{
              color: "green",
              fontSize: "50px",
              margin: "0",
              animation: "font-size 0.5s ease-out",
            }}
          >
            Student updated successfully
          </h1>
        </div>
      )}

      <div className="text-center total-student-count">
        <h3>Total Students: {totalStudentCount}</h3>
      </div>
    </div>
  );
};

export default ShowCsv;
