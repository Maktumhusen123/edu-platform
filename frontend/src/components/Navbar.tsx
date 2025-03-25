import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole"); // Get the user role from localStorage

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Courses", to: "/courses" },
  ];

  const roleLinks: { [key: string]: { label: string; to: string }[] } = {
    student: [
      { label: "Dashboard", to: "/student-dashboard" },
      { label: "Enrolled Courses", to: "/enrolled-courses" },
    ],
    instructor: [
      { label: "Instructor Dashboard", to: "/instructor-dashboard" },
      { label: "Create Course", to: "/create-course" },
    ],
    admin: [
      { label: "Admin Dashboard", to: "/admin-dashboard" },
      { label: "Add Course", to: "/add-course" },
      { label: "View Pending Approvals", to: "/view-pending-approvals" },
      { label: "View Approved Instructors", to: "/view-approved-instructors" },
      { label: "View Courses", to: "/view-courses" },
    ],
  };

  return (
    <>
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

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navLinks.map((link) => (
              <Button
                key={link.to}
                color="inherit"
                component={Link}
                to={link.to}
              >
                {link.label}
              </Button>
            ))}
            {role &&
              roleLinks[role]?.map((link) => (
                <Button
                  key={link.to}
                  color="inherit"
                  component={Link}
                  to={link.to}
                >
                  {link.label}
                </Button>
              ))}
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

          {/* Mobile Menu Button */}
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

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <List sx={{ width: 250 }}>
          {navLinks.map((link) => (
            <ListItem
              component={Link}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
          {role &&
            roleLinks[role]?.map((link) => (
              <ListItem
                component={Link}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                sx={{ cursor: "pointer" }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          {!role ? (
            <>
              <ListItem
                component={Link}
                to="/login"
                onClick={() => setMobileOpen(false)}
                sx={{ cursor: "pointer" }} // Ensures it looks clickable
              >
                <ListItemText primary="Login" />
              </ListItem>

              <ListItem
                component={Link}
                to="/signup"
                onClick={() => setMobileOpen(false)}
                sx={{ cursor: "pointer" }} // Ensures it looks clickable
              >
                <ListItemText primary="Signup" />
              </ListItem>
            </>
          ) : (
            <ListItem
              component="button"
              onClick={() => {
                handleLogout();
                setMobileOpen(false);
              }}
              sx={{ cursor: "pointer", textAlign: "left" }} // Ensures it looks and behaves like a button
            >
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
