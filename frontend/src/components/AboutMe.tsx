import { Box, Typography, Avatar, IconButton, Link } from "@mui/material";
import { FaYoutube, FaLinkedin, FaFacebook, FaGithub } from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaYoutube size={30} />,
    link: "https://www.youtube.com/@LearnwithMaktum",
  },
  {
    icon: <FaLinkedin size={30} />,
    link: "https://www.linkedin.com/in/maktumhusen/",
  },
  { icon: <FaGithub size={30} />, link: "https://github.com/Maktumhusen123" },
  {
    icon: <FaFacebook size={30} />,
    link: "https://www.facebook.com/maktum.paras",
  },
];

const AboutMe = () => {
  return (
    <Box
      mt={6}
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems="center"
      gap={4}
    >
      <Avatar
        alt="Maktumhusen"
        src="/mypic.jpg"
        sx={{
          width: 180,
          height: 180,
          boxShadow: 3,
          border: "4px solid #1976d2",
          transition: "0.3s",
          "&:hover": { transform: "scale(1.05)" },
        }}
      />
      <Box textAlign={{ xs: "center", sm: "left" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" paragraph>
          I’m an IT professional and content creator, passionate about sharing
          knowledge through my YouTube channel and online courses.
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent={{ xs: "center", sm: "flex-start" }}
          gap={2}
        >
          {socialLinks.map((social, index) => (
            <IconButton
              key={index}
              component={Link}
              href={social.link}
              color="primary"
              target="_blank"
              aria-label="social-link"
            >
              {social.icon}
            </IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AboutMe;
