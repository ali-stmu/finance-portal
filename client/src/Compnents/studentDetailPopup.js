import React from "react";
import "../Styling/studentDetailPopup.css"; // Import your CSS files

const StudentDetailsPopup = ({ student, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="student-details-popup">
        <button className="close-button" onClick={onClose}>
          &#x2715;
        </button>
        <h2>Student Details</h2>
        <div className="tab-container">
          <div className="tab-content">
            <p>
              <strong>Challan No:</strong> {student.Challan_No}
            </p>
            <p>
              <strong>Name:</strong> {student.Student_Name}
            </p>
            <p>
              <strong>ID:</strong> {student.Student_ID}
            </p>
            <p>
              <strong>Tuition Fee:</strong> {student.Tuition_fee}
            </p>
            <p>
              <strong>Total Amount:</strong> {student.Total_Amount}
            </p>
          </div>
          <div className="tab-content">
            <p>
              <strong>Due Data:</strong> {student.Due_Date}
            </p>
            <p>
              <strong>Issue Data:</strong> {student.issue_date}
            </p>
            <p>
              <strong>Email:</strong> {student.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPopup;
