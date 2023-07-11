import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseUrl";
import axios from "axios";
import EditChallanPopup from "./editChallanPopup";
import "../Styling/ShowCsv.css"; // Import CSS file for styling
import Chart from "chart.js";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaTrashAlt,
  FaUserEdit,
  FaPrint,
} from "react-icons/fa"; // Assuming you're using react-icons for icons

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
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizeGenerated, setPageSizeGenerated] = useState(10);
  const generatedStudents = generatedFields.length;
  const generateStudents = fields.length;
  const totalStudentCount = fields.length + generatedFields.length;
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedFieldToDelete, setSelectedFieldToDelete] = useState(null);

  const percentageGenerated = (generatedStudents / totalStudentCount) * 100;
  const percentageGenerate = (generateStudents / totalStudentCount) * 100;

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
  const handleDeleteChallan = (field) => {
    setSelectedFieldToDelete(field);
    setShowDeletePopup(true);
  };
  const handleDeleteConfirmation = async () => {
    if (selectedFieldToDelete) {
      console.log(selectedFieldToDelete);
      // Perform the delete action
      try {
        const response = await axios.put(
          `${BASE_URL}/api/deletechallan/${selectedFieldToDelete.challan_generation_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Challan deleted successfully.");
          setDeleteSuccess(true);

          // Perform any additional actions upon successful deletion of challan
        } else {
          console.error("Error:", response.status);
          // Handle the error case
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle the error case
      }
    }

    // Close the delete popup
    setShowDeletePopup(false);
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

    if (updateSuccess || deleteSuccess) {
      timeoutId = setTimeout(() => {
        setUpdateSuccess(false);
        setDeleteSuccess(false);
      }, 2000); // Set the duration (in milliseconds) for how long the success message should be displayed
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [updateSuccess, deleteSuccess, pageSize, pageSizeGenerated]);

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
  const renderPageNumbers = (currentPage, totalPages, handlePageChange) => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum number of visible page numbers

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`btn ${
            i === currentPage ? "btn-outline-primary" : "btn-outline-secondary"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

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
                        <i className="fas fa-print">
                          <FaPrint />
                        </i>
                      </button>
                      {"  "}
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditChallan(field)}
                      >
                        <i className="fas fa-edit">
                          <FaUserEdit />
                        </i>
                      </button>
                      {"  "}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteChallan(field)}
                      >
                        <i className="fas fa-edit">
                          <FaTrashAlt />
                        </i>
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
              <option value={30}>30</option>
            </select>
          </div>
        </div>
        <div className="text-center total-student-count">
          <br></br>{" "}
        </div>
        <div className="text-center">
          <div className="row">
            <div className="col">
              <button
                className="btn btn-secondary"
                onClick={() => handlePageChangeFields(currentPageFields - 1)}
                disabled={currentPageFields === 1}
              >
                Previous
              </button>
            </div>
            <div className="col">
              {renderPageNumbers(
                currentPageFields,
                totalPagesFields,
                handlePageChangeFields
              )}
            </div>
            <div className="col">
              <button
                className="btn btn-secondary"
                onClick={() => handlePageChangeFields(currentPageFields + 1)}
                disabled={currentPageFields === totalPagesFields}
              >
                Next
              </button>
            </div>
          </div>
          <div className="col">
            <span className="page-number">
              <strong>
                {currentPageFields} of {totalPagesFields}
              </strong>
            </span>
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
                      <i className="fas fa-print">
                        {" "}
                        <FaPrint />
                      </i>{" "}
                    </button>
                    {"  "}
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditChallan(field)}
                    >
                      <i className="fas fa-edit">
                        <FaUserEdit />
                      </i>
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
              <option value={30}>30</option>
            </select>
          </div>
        </div>
        <div className="text-center total-student-count">
          <br></br>{" "}
        </div>
        <div className="text-center">
          <div className="row">
            <div className="col">
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
            </div>
            <div className="col">
              {renderPageNumbers(
                currentPageGeneratedFields,
                totalPagesGeneratedFields,
                handlePageChangeGeneratedFields
              )}
            </div>

            <div className="col">
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
          <div className="col">
            <span className="page-number">
              <strong>
                {currentPageGeneratedFields} of {totalPagesGeneratedFields}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {showEditPopup && (
        <div
          className="fade-in"
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
          }}
        >
          <EditChallanPopup
            primaryKey={selectedFieldForEdit.challan_generation_id}
            userID={selectedFieldForEdit.user_id}
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
            Student updated successfully <FaCheckCircle />
          </h1>
        </div>
      )}
      {deleteSuccess && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FF0000",
            border: "1px solid #d0e9c6",
            padding: "20px",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h1
            style={{
              color: "#000000",
              fontSize: "50px",
              margin: "0",
              animation: "font-size 0.5s ease-out",
            }}
          >
            Student Deleted
          </h1>
        </div>
      )}

      {showDeletePopup && (
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
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "16px",
              animation: "heartbeat 1s ease-in-out infinite",
              transformOrigin: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontSize: "48px" }}>
              <FaExclamationTriangle />
            </h1>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete the challan? </p>
            <div style={{ textAlign: "center" }}>
              <button
                className="btn btn-danger"
                onClick={handleDeleteConfirmation}
              >
                OK
              </button>{" "}
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="progress" style={{ height: "20px" }}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={{
            width: `${
              ((totalStudentCount - generatedStudents) / totalStudentCount) *
              100
            }%`,
          }}
          aria-valuenow={totalStudentCount - generatedStudents}
          aria-valuemin="0"
          aria-valuemax={totalStudentCount}
        >
          {totalStudentCount - generatedStudents > 0 ? (
            <>{totalStudentCount - generatedStudents}</>
          ) : (
            "Yet to Generate Challans"
          )}
        </div>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-danger"
          role="progressbar"
          style={{ width: `${percentageGenerated}%` }}
          aria-valuenow={percentageGenerated}
          aria-valuemin="0"
          aria-valuemax={totalStudentCount}
        >
          {generatedStudents > 0 ? (
            <> {generatedStudents}</>
          ) : (
            "Already Generated Challans"
          )}
        </div>
      </div>
      <div
        className="text-center total-student-count"
        style={{ marginTop: "10px" }}
      >
        <span
          className="round-indicator"
          style={{
            backgroundColor: "blue",
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            marginRight: "5px",
          }}
        ></span>
        <label
          style={{
            color: "black",
            display: "inline-block",
            marginRight: "10px",
          }}
        >
          Generate Challans
        </label>
        <span
          className="round-indicator"
          style={{
            backgroundColor: "red",
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            marginRight: "5px",
          }}
        ></span>
        <label style={{ color: "black", display: "inline-block" }}>
          Generated Challans
        </label>
      </div>

      <div className="text-center total-student-count">
        <h5
          style={{
            padding: "10px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Total Number of Students: {totalStudentCount}
        </h5>
      </div>
    </div>
  );
};

export default ShowCsv;
