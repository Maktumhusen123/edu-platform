import { Container } from "@mui/material";
import HeroSection from "../components/HeroSection";
import AboutMe from "../components/AboutMe";
import Offerings from "../components/Offerings";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <HeroSection />
      <AboutMe />
      <Offerings />
      <Footer />
    </Container>
  );
};

export default Home;
