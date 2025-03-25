import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  IconButton,
  Link,
} from "@mui/material";
import { useState } from "react";
import { FaYoutube, FaLinkedin, FaFacebook, FaGithub } from "react-icons/fa";

const Home = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const offerings = [
    {
      title: "Class I - XII NCERT & Beyond",
      desc: "Explore expert-guided courses covering NCERT subjects.",
    },
    {
      title: "Mastering APM Tools",
      desc: "Learn to monitor, optimize, and troubleshoot applications using tools like Dynatrace and AppDynamics.",
    },
    {
      title: "Convert Your Documents",
      desc: "Easily convert PDFs, Word documents, and other file formats with our powerful tools.",
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
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
          Your all-in-one learning hub—access courses, study materials,
          textbooks, and essential tools to enhance your learning experience.
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

      {/* About Me Section */}
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
            knowledge through my YouTube channel and online courses. With
            hands-on experience in Application Performance Monitoring (APM), I
            create easy-to-understand resources to help learners upskill.
          </Typography>
          <Typography variant="body1">
            Whether you're just starting or looking to expand your expertise,
            this platform offers curated courses, study materials, and practical
            tools to support your journey.
          </Typography>
          {/* Social Media Icons */}
          <Box
            mt={2}
            display="flex"
            justifyContent={{ xs: "center", sm: "flex-start" }}
            gap={2}
          >
            {[
              {
                icon: <FaYoutube size={30} />,
                link: "https://www.youtube.com/@LearnwithMaktum",
              },
              {
                icon: <FaLinkedin size={30} />,
                link: "https://www.linkedin.com/in/maktumhusen/",
              },
              {
                icon: <FaGithub size={30} />,
                link: "https://github.com/Maktumhusen123",
              },
              {
                icon: <FaFacebook size={30} />,
                link: "https://www.facebook.com/maktum.paras",
              },
            ].map((social, index) => (
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

      {/* Offerings Section */}
      <Box mt={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          What’s in It for You?
        </Typography>
        <Grid container spacing={3} mt={2}>
          {offerings.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  boxShadow: hoverIndex === index ? 6 : 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 8 },
                }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mt={1}>
                      {item.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer Section */}
      <Box
        mt={6}
        py={3}
        textAlign="center"
        sx={{
          bgcolor: "#f4f6f8",
          borderRadius: 2,
          boxShadow: 3,
          transition: "0.3s",
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
    </Container>
  );
};

export default Home;
