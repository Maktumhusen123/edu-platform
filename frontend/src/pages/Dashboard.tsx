import { Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Typography variant="h3" fontWeight="bold" gutterBottom color="#333">
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Manage your courses, profile, and settings from here.
      </Typography>
    </>
  );
};

export default Dashboard;
