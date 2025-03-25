import { Menu, MenuItem, Avatar, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  handleLogout: () => void;
  role: string | null;
}

const ProfileMenu = ({ handleLogout, role }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!role) return null; // Hide if user is not logged in

  return (
    <>
      <Tooltip title="Account">
        <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {role.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem component={Link} to="/profile">
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
            handleMenuClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
