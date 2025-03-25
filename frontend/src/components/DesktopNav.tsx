import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  role: string | null;
  navLinks: { label: string; to: string }[];
  roleLinks: { [key: string]: { label: string; to: string }[] };
}

const DesktopNav = ({ role, navLinks, roleLinks }: Props) => {
  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      {navLinks.map((link) => (
        <Button key={link.to} color="inherit" component={Link} to={link.to}>
          {link.label}
        </Button>
      ))}
      {role &&
        roleLinks[role]?.map((link) => (
          <Button key={link.to} color="inherit" component={Link} to={link.to}>
            {link.label}
          </Button>
        ))}
      {!role && (
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
      )}
    </Box>
  );
};

export default DesktopNav;
