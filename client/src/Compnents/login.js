import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Form } from "react-bootstrap";
import { BASE_URL } from "../baseUrl";
import UniLogo from "../images/uni_logo.png";
// Style the container
const Container = styled("div")({
  display: "flex",
  flexDirection: "column", // Add this line to stack logo and card vertically
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(to top, #0073b1, #6ec9f7)",
});

// Style the form card
const Card = styled("div")({
  display: "flex",
  flexDirection: "column", // Add this line to stack form fields vertically
  padding: "32px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
  borderRadius: "30px",
  backgroundColor: "#ffffff",
});
const LogoImage = styled("img")({
  marginBottom: "50px",
  width: "200px",
  alignSelf: "center", // Add this line to center the logo horizontally
});

// Style the form fields
const StyledTextField = styled(TextField)({
  marginBottom: "16px",
});

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
          if (data.user.role === "Finance") {
            navigate("/feeverification");
          } else {
            // Navigate to the home page
            navigate("/uploadcsv");
          }
        } else {
          throw new Error("Invalid response");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error.message || "Invalid response");
        setErrorMessage("Invalid Credentials");
      });
  };

  return (
    <Container>
      <LogoImage src={UniLogo} alt="Uni Logo" />
      <Card>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Finance Portal Login
        </Typography>
        <Form onSubmit={handleSubmit}>
          <StyledTextField
            id="username"
            label="Email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <StyledTextField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" type="submit" fullWidth>
            Sign In
          </Button>
        </Form>
        {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            marginTop="16px"
          >
            {errorMessage}
          </Typography>
        )}
      </Card>
    </Container>
  );
}

export default Login;
