import React, { useEffect, useState } from "react";
import "../Styling/edit.css";
import { BASE_URL } from "../baseUrl";

const EditChallanPopup = ({
  primaryKey,
  userID,
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
  const [editedDueDate, setEditedDueDate] = useState(dueDate);
  const [splittedStudentID, setsplittedStudentID] = useState([]);
  const [editedStudentID, setEditedStudentID] = useState("");
  const [dropDownStudentID, setDropDownStudentID] = useState("");
  const [editedStudentName, setEditedStudentName] = useState(studentName);
  const [editedTotalAmount, setEditedTotalAmount] = useState(totalAmount);
  const [editedTuitionFee, setEditedTuitionFee] = useState(tuitionFee);
  const [editedEmail, setEditedEmail] = useState(email);
  const [dropdownValues, setDropdownValues] = useState([]);
  const [conatinate, setConcatinate] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity
  const [showEmailError, setShowEmailError] = useState(false); // Track whether to show the email error
  const [isSaveDisabled, setIsSaveDisabled] = useState(false); // Track if Save button should be disabled

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/dropdownfill/${userID}`, {
          method: "POST",
        });
        const data = await response.json();
        setDropdownValues(data);
        // Extract the necessary values from the data and set the dropdownValues state
      } catch (error) {
        console.error(error);
      }
    };

    setsplittedStudentID(studentID.split("-"));
    fetchData();
  }, [studentID, userID]);

  useEffect(() => {
    if (splittedStudentID.length >= 2) {
      setEditedStudentID(splittedStudentID[1]);
      setDropDownStudentID(splittedStudentID[0]);
    }
  }, [splittedStudentID]);

  useEffect(() => {
    setConcatinate(dropDownStudentID + "-" + editedStudentID);
  }, [dropDownStudentID, editedStudentID]);

  // Handle save button click
  const handleSave = () => {
    // Validate the email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(editedEmail) || editedEmail === "";

    if (!isEmailValid) {
      // Show error message if the email is not valid
      setShowEmailError(true);
      setIsSaveDisabled(true);
      return;
    }

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
      Student_ID: conatinate,
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
    setIsSaveDisabled(false);
  };

  const handleStudentID = (e) => {
    setDropDownStudentID(e);
  };

  const handleStudentIdText = (e) => {
    setEditedStudentID(e);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  // Handle email input blur event
  const handleEmailBlur = () => {
    // Validate the email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(editedEmail) || editedEmail === "";

    // Set the appropriate states to show the error message and disable/enable Save button
    setShowEmailError(!isEmailValid);
    setIsEmailValid(isEmailValid);
    setIsSaveDisabled(!isEmailValid);
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
              <th>
                Due Date<p>{editedDueDate}</p>
              </th>
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
                <select
                  onChange={(e) => handleStudentID(e.target.value)}
                  value={dropDownStudentID || splittedStudentID[0]}
                >
                  {dropdownValues.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={editedStudentID}
                  onChange={(e) => handleStudentIdText(e.target.value)}
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
                  onBlur={handleEmailBlur}
                  className={
                    showEmailError && !isEmailValid ? "invalid-email" : ""
                  }
                />
                {showEmailError && !isEmailValid && (
                  <span className="error-message">Email is not valid</span>
                )}
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
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChallanPopup;
