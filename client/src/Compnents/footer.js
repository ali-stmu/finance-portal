import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-2">
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
