import { Link } from "react-router-dom";
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
