import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseUrl";
import axios from "axios";

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
  const fetchFieldsGenerated = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/feeChallanEmailedData`,
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
    fetchFieldsGenerated();
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

  return (
    <div className="row">
      <div className="col" style={{ padding: "10px 30px 20px" }}>
        <h1>Emailed Challan</h1>
        <input
          type="text"
          placeholder="Search Students..."
          value={searchTextGeneratedFields}
          onChange={handleSearchGeneratedFields}
        />
        <table className="table">
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
                  {(currentPageGeneratedFields - 1) * pageSize + index + 1}
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
        <table className="table">
          <thead>
            <tr>
              <th>
                {" "}
                <button
                  className="btn btn-secondary left"
                  onClick={() =>
                    handlePageChangeGeneratedFields(
                      currentPageGeneratedFields - 1
                    )
                  }
                  disabled={currentPageGeneratedFields === 1}
                >
                  Previous
                </button>
              </th>
              <th>
                <span className="page-number">
                  <strong>
                    {currentPageGeneratedFields} - {totalPagesGeneratedFields}
                  </strong>
                </span>
              </th>
              <th>
                <button
                  className="btn btn-secondary right"
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
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default EmailVerification;