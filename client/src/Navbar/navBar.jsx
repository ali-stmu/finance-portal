import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import "../Styling/Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };

  let user = sessionStorage.getItem("user");
  let userJson = JSON.parse(user);

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-blue">
      <Link className="navbar-brand" to="/">
        Finance Module
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={!isNavCollapsed}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse ${
          isNavCollapsed ? "" : "show"
        } navbar-collapse justify-content-end`}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          {userJson.user.role === "Finance" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/verifychallan">
                  Verify Challan
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          )}

          {userJson.user.role !== "Finance" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/uploadcsv">
                  Upload CSV Table
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/showcsv">
                  Challans
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/emailverification">
                  Email Verification
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feeverification">
                  Fee Verification
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
