import { Box, Typography, TextField, Button, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      mt={6}
      py={3}
      textAlign="center"
      sx={{
        bgcolor: "#f4f6f8",
        borderRadius: 2,
        boxShadow: 3,
        "&:hover": { boxShadow: 6 },
      }}
    >
      <Box mt={2}>
        <Link
          href="#about"
          sx={{ mx: 2, color: "#1976d2", textDecoration: "none" }}
        >
          About
        </Link>
        <Link
          href="mailto:winmaktum@gmail.com"
          sx={{ mx: 2, color: "#1976d2", textDecoration: "none" }}
        >
          Contact
        </Link>
      </Box>
      <Box mt={3}>
        <Typography variant="body2" color="textSecondary">
          Stay updated with our newsletter
        </Typography>
        <Box mt={2} display="flex" justifyContent="center">
          <TextField
            variant="outlined"
            label="Enter your email"
            size="small"
            sx={{ maxWidth: 300 }}
          />
          <Button variant="contained" color="primary" sx={{ ml: 2 }}>
            Subscribe
          </Button>
        </Box>
      </Box>
      <Typography mt={2} variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Learn with Maktum. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
