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
import Footer from "./Compnents/footer";
import VerifyChallan from "./Finance/verifyChallan";

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
    <div className="App d-flex flex-column min-vh-100">
      {!isLoginRoute && !location.pathname.startsWith("/notfound") && (
        <>
          <NavBar />
        </>
      )}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/verifychallan" element={<VerifyChallan />} />
          <Route path="/uploadcsv" element={<UploadCsv />} />
          <Route path="/showcsv" element={<ShowCsv />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feeverification" element={<FeeVerification />} />
          <Route path="/genratechallan" element={<GenrateChallan />} />
          <Route path="/emailverification" element={<EmailVerification />} />
          <Route path="/" element={<UploadCsv />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/notfound" />} />
        </Routes>
      </div>
      {!isLoginRoute && !location.pathname.startsWith("/notfound") && (
        <>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
