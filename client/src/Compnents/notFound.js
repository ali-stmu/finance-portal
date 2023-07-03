import React from "react";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">404 Page Not Found</h1>
      <p className="lead">Oops! The page you are looking for does not exist.</p>
      <img
        src="https://example.com/404-image.jpg" // Replace with your own image URL
        alt="404 Error"
        className="img-fluid mt-5"
      />
      <p className="mt-5">
        Go back to <a href="/login">homepage</a>.
      </p>
    </div>
  );
};

export default NotFound;
