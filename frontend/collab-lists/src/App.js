import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
