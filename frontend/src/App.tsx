import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout"; // Import Layout
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>
      {/* Public Pages with only Navbar */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Container sx={{ mt: 4 }}>
              <Home />
            </Container>
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Navbar />
            <Container sx={{ mt: 4 }}>
              <Login />
            </Container>
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <Navbar />
            <Container sx={{ mt: 4 }}>
              <Signup />
            </Container>
          </>
        }
      />

      {/* Dashboard and Protected Routes inside Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        {/* Add more routes like /courses, /assignments here */}
      </Route>
    </Routes>
  );
};

export default App;
