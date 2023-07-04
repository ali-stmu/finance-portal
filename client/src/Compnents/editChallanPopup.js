import React from "react";
import "../Styling/edit.css";
import { BASE_URL } from "../baseUrl";

const EditChallanPopup = ({
  primaryKey,
  dueDate,
  studentID,
  studentName,
  totalAmount,
  tuitionFee,
  email,
  onSave,
  onClose,
}) => {
  // Define local state for input fields
  const [editedDueDate, setEditedDueDate] = React.useState(dueDate);
  const [editedStudentID, setEditedStudentID] = React.useState(studentID);
  const [editedStudentName, setEditedStudentName] = React.useState(studentName);
  const [editedTotalAmount, setEditedTotalAmount] = React.useState(totalAmount);
  const [editedTuitionFee, setEditedTuitionFee] = React.useState(tuitionFee);
  const [editedEmail, setEditedEmail] = React.useState(email);

  // Handle save button click
  const handleSave = () => {
    // Create an object with the edited data
    const formattedDueDate = new Date(editedDueDate).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
    const editedData = {
      Due_Date: formattedDueDate,
      Student_ID: editedStudentID,
      Student_Name: editedStudentName,
      Total_Amount: editedTotalAmount,
      Tuition_fee: editedTuitionFee,
      email: editedEmail,
    };
    // Make the API call to update the data
    fetch(`${BASE_URL}/api/update/${primaryKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend if needed
        console.log(data);

        // Call the onSave callback if necessary
        onSave(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error(error);
      });
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    // Validate the email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value) || value === "") {
      setEditedEmail(value);
    }
  };

  // Handle total amount input change
  const handleTotalAmountChange = (e) => {
    const value = e.target.value;
    // Remove any non-numeric characters from the input
    const numericValue = value.replace(/[^0-9]/g, "");
    setEditedTotalAmount(numericValue);
  };

  // Handle tuition fee input change
  const handleTuitionFeeChange = (e) => {
    const value = e.target.value;
    // Remove any non-numeric characters from the input
    const numericValue = value.replace(/[^0-9]/g, "");
    setEditedTuitionFee(numericValue);
  };

  return (
    <div className="edit-challan-popup">
      <div className="edit-challan-popup-header">
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Due Date</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Total Amount</th>
              <th>Tuition Fee</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="date"
                  value={editedDueDate}
                  onChange={(e) => setEditedDueDate(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editedStudentID}
                  onChange={(e) => setEditedStudentID(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editedStudentName}
                  onChange={(e) => setEditedStudentName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editedTotalAmount}
                  onChange={handleTotalAmountChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editedTuitionFee}
                  onChange={handleTuitionFeeChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editedEmail}
                  onChange={handleEmailChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChallanPopup;
