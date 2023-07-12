import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { Table, Button, Form, Alert, Modal } from "react-bootstrap";
import { BASE_URL } from "../baseUrl";
import BGIMAGE from "../images/calculator-closeup.jpg";
import context from "react-bootstrap/esm/AccordionContext";

function UploadCsv() {
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [data, setData] = useState(null); // State to store the parsed Excel data
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const navigate = useNavigate(); // React Router navigation hook
  const [apiResponse, setApiResponse] = useState(null); // State to store the API response
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
  const delay = 5000;

  useEffect(() => {
    let session = sessionStorage.getItem("user");
    if (!session) {
      navigate("/login"); // Redirect to login page if the user session is not found
    }
  }, []);

  const rowsPerPage = 15; // Number of rows to display per page
  const pageNeighbours = 2; // Number of page numbers to show on either side of the current page

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;
      const workbook = XLSX.read(fileData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        blankrows: false,
      });
      setData(excelData); // Parse the Excel data and store it in the state
    };

    reader.readAsBinaryString(selectedFile);
  };

  const handleUpload = () => {
    const formData = new FormData();
    const headers = data[0]; // First row as headers
    const jsonData = []; // Array to store the converted JSON data

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowData = {};

      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const formattedHeader = header.replace(/\s+/g, "_"); // Replace spaces with underscores

        rowData[formattedHeader] = row[j]; // Assign the value to the corresponding header property
      }

      jsonData.push(rowData); // Add the row data to the JSON array
    }

    // You can now send the jsonData to the server as JSON
    // using an HTTP request (e.g., fetch or axios)

    console.log("Upload Clicked");
    console.log("JSON Data:", jsonData);

    fetch(`${BASE_URL}/api/uploadcsv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.insert);
        console.log(data.duplicate);
        // Handle the response from the API
        if (data.duplicate > 0) {
          setApiResponse(data.message); // Set the error message in the state
          setShowModal(true); // Show the modal
        } else {
          setApiResponse(data.message); // Set the success message in the state
          setShowModal(true); // Show the modal
          setTimeout(() => {
            setShowModal(false); // Hide the modal after a delay
            navigateToShowCSV();
          }, delay);
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
        console.error("Error uploading CSV:", error);
        setApiResponse(null); // Clear the API response if an error occurred
      });
  };

  const navigateToShowCSV = () => {
    navigate("/showcsv");
  };

  const handleDownload = () => {
    const sheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    const excelData = XLSX.write(workbook, {
      type: "binary",
      bookType: "xlsx",
    });
    const buffer = new ArrayBuffer(excelData.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < excelData.length; i++) {
      view[i] = excelData.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "download.xlsx"); // Trigger download of the Excel file
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1); // Go to the next page
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1); // Go to the previous page
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update the search term
  };

  if (!data) {
    // If no data is available, render the file upload section
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${BGIMAGE})`,
          backgroundSize: "cover",
          minHeight: "88vh",
        }}
      >
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">
              Please Upload Excel in Provided Format
            </h2>
            <input
              className="form-control"
              type="file"
              onChange={handleFileChange}
              accept=".xlsx,.csv"
            />
          </div>
        </div>
      </div>
    );
  }

  const filteredData = data.filter(
    (row, index) =>
      index === 0 || // Include the header row
      row.some(
        (cell) =>
          cell !== null &&
          cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 1;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

    let pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    if (hasLeftSpill && !hasRightSpill) {
      const extraPages = Array.from(
        { length: spillOffset + 1 },
        (_, index) => startPage - index - 1
      );
      pages = ["...", ...extraPages, ...pages];
    } else if (!hasLeftSpill && hasRightSpill) {
      const extraPages = Array.from(
        { length: spillOffset + 1 },
        (_, index) => endPage + index + 1
      );
      pages = [...pages, ...extraPages, "..."];
    } else if (hasLeftSpill && hasRightSpill) {
      pages = ["...", ...pages, "..."];
    }

    return [1, ...pages, totalPages];
  };

  return (
    <div>
      <Button onClick={handleUpload}>Upload Excel</Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        animation={true}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {apiResponse && data.duplicate > 0 ? (
            <Alert variant="success">{apiResponse}</Alert>
          ) : (
            <Alert variant="danger">{apiResponse}</Alert>
          )}
        </Modal.Body>
      </Modal>

      <div>
        <h2>Excel Sheet is here</h2>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search by name or ID"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Table bordered className="custom-table">
          <thead>
            <tr>
              {data[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cell !== null ? "has-data" : ""}
                  >
                    {cell !== null ? cell : <span>&nbsp;</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="mr-2"
          >
            Previous
          </Button>
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="mr-2">
                {page}
              </span>
            ) : (
              <Button
                key={index}
                onClick={() => setCurrentPage(page)}
                variant={page === currentPage ? "primary" : "outline-primary"}
                className="mr-2"
              >
                {page}
              </Button>
            )
          )}
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      <Button onClick={handleDownload}>Download Excel</Button>
    </div>
  );
}

export default UploadCsv;
