import React from "react";
import "../Styling/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              &copy; {new Date().getFullYear()} Shifa Tameer-e-Millat
              University. All rights reserved. Powered by MIS/STMU.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
