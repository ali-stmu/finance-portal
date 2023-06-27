import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseUrl";
import axios from "axios";
import GenrateChallan from "./genrateChallan";

const ShowCsv = () => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
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
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePrintChallan = (field) => {
    setSelectedField(field);
    const jsonData = JSON.stringify(field);
    localStorage.setItem("tempDataStudent", jsonData);
    // console.log(jsonData);
    navigate("/genratechallan");
  };

  useEffect(() => {
    fetchFields();
  }, []);

  return (
    <div className="row">
      <div className="col">
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
            {fields.map((field, index) => (
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

        {selectedField && <GenrateChallan challanFields={selectedField} />}
      </div>
      <div className="col">
        <h1>Generated Challan</h1>
      </div>
    </div>
  );
};

export default ShowCsv;
