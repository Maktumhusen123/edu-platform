import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole"); // Get the user role from localStorage

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token
    localStorage.removeItem("userRole"); // Remove the role
    navigate("/login"); // Redirect to login page
  };

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(10px)" }}
    >
      <Toolbar>
        {/* Logo / Branding */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          Learn with Maktum
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/courses">
            Courses
          </Button>

          {/* Conditional Rendering based on Role */}
          {role === "student" ? (
            <>
              <Button color="inherit" component={Link} to="/student-dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/enrolled-courses">
                Enrolled Courses
              </Button>
            </>
          ) : role === "instructor" ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/instructor-dashboard"
              >
                Instructor Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/create-course">
                Create Course
              </Button>
            </>
          ) : role === "admin" ? (
            <>
              <Button color="inherit" component={Link} to="/admin-dashboard">
                Admin Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/add-course">
                Add Course
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/view-pending-approvals"
              >
                View Pending Approvals
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/view-approved-instructors"
              >
                View Approved Instructors
              </Button>
              <Button color="inherit" component={Link} to="/view-courses">
                View Courses
              </Button>
            </>
          ) : null}

          {/* Show Login and Signup buttons when not logged in */}
          {!role ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
                sx={{ ml: 1 }}
              >
                Signup
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>

        {/* Mobile Menu Button (For Small Screens) */}
        <IconButton
          color="inherit"
          edge="end"
          sx={{ display: { md: "none" } }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
