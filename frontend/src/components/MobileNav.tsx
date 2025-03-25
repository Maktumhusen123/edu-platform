import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  role: string | null;
  handleLogout: () => void;
  navLinks: { label: string; to: string }[];
  roleLinks: { [key: string]: { label: string; to: string }[] };
}

const MobileNav = ({
  mobileOpen,
  setMobileOpen,
  role,
  handleLogout,
  navLinks,
  roleLinks,
}: Props) => {
  return (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
    >
      <List sx={{ width: 250 }}>
        {navLinks.map((link) => (
          <ListItem
            key={link.to}
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
              key={link.to}
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
              sx={{ cursor: "pointer" }}
            >
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              component={Link}
              to="/signup"
              onClick={() => setMobileOpen(false)}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText primary="Signup" />
            </ListItem>
          </>
        ) : (
          <ListItem
            onClick={() => {
              handleLogout();
              setMobileOpen(false);
            }}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default MobileNav;
