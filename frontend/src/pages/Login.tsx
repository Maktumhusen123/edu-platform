import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
} from "@mui/material";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Send only email and password (no role here)
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email: formData.email, password: formData.password } // Only send email and password
      );

      // Assuming the backend sends a success message and a token
      localStorage.setItem("authToken", response.data.token); // Store the token in local storage
      localStorage.setItem("userRole", response.data.user.role); // Store the role in localStorage

      // Check the role and navigate to the appropriate dashboard
      const role = response.data.user.role;
      if (role === "admin") {
        navigate("/admin-dashboard"); // Redirect to admin dashboard
      } else if (role === "instructor") {
        navigate("/instructor-dashboard"); // Redirect to instructor dashboard
      } else if (role === "student") {
        navigate("/dashboard"); // Redirect to student dashboard
      }

      setSuccess(response.data.message);
      setFormData({ email: "", password: "" }); // Reset form after successful login
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Login to Your Account
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Box>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Log In
          </Button>
        </form>
        <Typography mt={2}>
          Don't have an account? <Link href="/signup">Sign up here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
