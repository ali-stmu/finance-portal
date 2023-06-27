import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Finance Module
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link btn btn-link"
              to="/uploadcsv"
              data-toggle="modal"
              data-target="#uploadModal"
            >
              Upload CSV Table
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link btn btn-link"
              to="/showcsv"
              data-toggle="modal"
              data-target="#viewModal"
            >
              Challans
            </Link>
          </li>
          {
            <li className="nav-item">
              <Link
                className="nav-link btn btn-link"
                to="/emailverification"
                data-toggle="modal"
                data-target="#viewModal"
              >
                Email Verification
              </Link>
            </li>
          }
          <li className="nav-item">
            <Link
              className="nav-link btn btn-link"
              to="/feeverification"
              data-toggle="modal"
              data-target="#viewModal"
            >
              Fee Verification
            </Link>
          </li>
          <Link className="nav-item" to="/login" onClick={handleLogout}>
            <button
              className="nav-link btn btn-link"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
