import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../Styling/login.css";
import { BASE_URL } from "../baseUrl";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to send
    const data = {
      email: email,
      password: password,
    };

    // Make the API call
    fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        if (data) {
          // Save user data in sessionStorage
          sessionStorage.setItem("user", JSON.stringify(data));

          // Navigate to the home page
          navigate("/uploadcsv");
        } else {
          throw new Error("Invalid response");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error.message || "Invalid response");
        setErrorMessage("Invalid Credetianls");
      });
  };
  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark login-container">
      <div className="login-card">
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
        {errorMessage && <p style={{ color: "red" }}>Invalid Credentials</p>}
      </div>
    </div>
  );
}

export default Login;
