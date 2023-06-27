import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseUrl";
import axios from "axios";

const ShowCsv = () => {
  const [fields, setFields] = useState([]);
  const [generatedFields, setGeneratedFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [currentPageFields, setCurrentPageFields] = useState(1);
  const [currentPageGeneratedFields, setCurrentPageGeneratedFields] =
    useState(1);
  const [totalPagesFields, setTotalPagesFields] = useState(1);
  const [totalPagesGeneratedFields, setTotalPagesGeneratedFields] = useState(1);

  const pageSize = 15;
  const navigate = useNavigate();

  const fetchFields = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/feeChallanData`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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

  const fetchFieldsGenerated = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/feeChallanGeneratedData`,
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
    fetchFields();
    fetchFieldsGenerated();
  }, []);

  const handlePageChangeFields = (page) => {
    setCurrentPageFields(page);
  };

  const handlePageChangeGeneratedFields = (page) => {
    setCurrentPageGeneratedFields(page);
  };

  const getPaginatedData = (data, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div className="row">
      <div className="col" style={{ borderRight: "1px solid #ccc" }}>
        <h1>Generate Challan</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Student ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData(fields, currentPageFields).map((field, index) => (
              <tr key={index}>
                <td>{field.challan_generation_id}</td>
                <td>{field.Student_Name}</td>
                <td>{field.Student_ID}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handlePrintChallan(field)}
                  >
                    Print Challan
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="btn btn-secondary left"
            onClick={() => handlePageChangeFields(currentPageFields - 1)}
            disabled={currentPageFields === 1}
          >
            Previous
          </button>
          <span className="page-number">
            <strong>
              {currentPageFields} - {totalPagesFields}{" "}
            </strong>
          </span>
          <button
            className="btn btn-secondary right"
            onClick={() => handlePageChangeFields(currentPageFields + 1)}
            disabled={currentPageFields === totalPagesFields}
          >
            Next
          </button>
        </div>
      </div>
      <div className="col">
        <div className="col">
          <h1>Generated Challan</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Student ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData(
                generatedFields,
                currentPageGeneratedFields
              ).map((field, index) => (
                <tr key={index}>
                  <td>{field.challan_generation_id}</td>
                  <td>{field.Student_Name}</td>
                  <td>{field.Student_ID}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePrintChallan(field)}
                    >
                      Re-Generate Challan
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className="btn btn-secondary left"
              onClick={() =>
                handlePageChangeGeneratedFields(currentPageGeneratedFields - 1)
              }
              disabled={currentPageGeneratedFields === 1}
            >
              Previous
            </button>
            <span className="page-number">
              <strong>
                {currentPageGeneratedFields} - {totalPagesGeneratedFields}
              </strong>
            </span>
            <button
              className="btn btn-secondary right"
              onClick={() =>
                handlePageChangeGeneratedFields(currentPageGeneratedFields + 1)
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
  );
};

export default ShowCsv;
