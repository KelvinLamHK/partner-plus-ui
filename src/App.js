import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage.jsx"
import LandingPage from "../src/pages/LandingPage.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/Landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
