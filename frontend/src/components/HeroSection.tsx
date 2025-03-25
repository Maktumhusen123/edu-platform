import { Box, Typography, Button } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      textAlign="center"
      mt={5}
      py={6}
      sx={{
        bgcolor: "#1976d2",
        color: "white",
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to Learn with Maktum
      </Typography>
      <Typography variant="h6" paragraph>
        Your all-in-one learning hub—access courses, study materials, textbooks,
        and essential tools to enhance your learning experience.
      </Typography>
      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <Button
          variant="contained"
          color="secondary"
          href="/signup"
          sx={{ px: 4, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
        >
          Get Started
        </Button>
        <Button
          variant="contained"
          color="secondary"
          href="/learn-more"
          sx={{ px: 4, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
