import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./Navbar/navBar";
import UploadCsv from "./Compnents/uploadCsv";
import ShowCsv from "./Compnents/showCsv";
import Login from "./Compnents/login";
import FeeVerification from "./Compnents/feeVerification";
import GenrateChallan from "./Compnents/genrateChallan";
import EmailVerification from "./Compnents/emailVerification";

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

  // Check if session data exists
  //const isLoggedIn = /* Your session check logic */;

  return (
    <div className="App">
      {!isLoginRoute && <NavBar />}
      {/* Render the navbar only if it's not the login route and the user is logged in */}
      <Routes>
        <Route path="/uploadcsv" element={<UploadCsv />} />
        <Route path="/showcsv" element={<ShowCsv />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feeverification" element={<FeeVerification />} />
        <Route path="/genratechallan" element={<GenrateChallan />} />
        <Route path="/emailverification" element={<EmailVerification />} />
      </Routes>
    </div>
  );
}

export default App;
