import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const navLinks = [{ label: "Courses", to: "/courses" }];
  const roleLinks = {
    student: [{ label: "Enrolled Courses", to: "/enrolled-courses" }],
    instructor: [
      { label: "Instructor Dashboard", to: "/instructor-dashboard" },
      { label: "Create Course", to: "/create-course" },
    ],
    admin: [
      { label: "Add Course", to: "/add-course" },
      { label: "View Pending Approvals", to: "/view-pending-approvals" },
      { label: "View Approved Instructors", to: "/view-approved-instructors" },
      { label: "View Courses", to: "/view-courses" },
      { label: "View Students", to: "/view-students" },
    ],
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(10px)" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            Learn with Maktum
          </Typography>

          <DesktopNav role={role} navLinks={navLinks} roleLinks={roleLinks} />
          <ProfileMenu role={role} handleLogout={handleLogout} />

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

      <MobileNav
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        role={role}
        navLinks={navLinks}
        roleLinks={roleLinks}
      />
    </>
  );
};

export default Navbar;
