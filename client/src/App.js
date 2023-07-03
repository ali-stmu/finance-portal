import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import NavBar from "./Navbar/navBar";
import UploadCsv from "./Compnents/uploadCsv";
import ShowCsv from "./Compnents/showCsv";
import Login from "./Compnents/login";
import FeeVerification from "./Compnents/feeVerification";
import GenrateChallan from "./Compnents/genrateChallan";
import EmailVerification from "./Compnents/emailVerification";
import NotFound from "./Compnents/notFound";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current location is the login route
  const isLoginRoute = location.pathname === "/login";

  const loginCheck = sessionStorage.getItem("user");

  // Check if session data exists
  const isLoggedIn = !!loginCheck;

  if (!isLoggedIn && !isLoginRoute) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      {!isLoginRoute && !location.pathname.startsWith("/notfound") && (
        <NavBar />
      )}
      {/* Render the navbar only if it's not the login route, not the notFound route, and the user is logged in */}

      <Routes>
        <Route path="/uploadcsv" element={<UploadCsv />} />
        <Route path="/showcsv" element={<ShowCsv />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feeverification" element={<FeeVerification />} />
        <Route path="/genratechallan" element={<GenrateChallan />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </div>
  );
}
export default App;
