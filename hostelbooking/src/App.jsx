import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import OwnerDashboard from "./pages/OwnerDashboard";
import Complaint from "./pages/Complaint";
import Login from "./pages/Login";

// Assets & Styles
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  // -----------------------------
  // State Management
  // -----------------------------

// Initialize rooms from localStorage
const [rooms, setRooms] = useState(() => {
  const savedRooms = localStorage.getItem("rooms");
  return savedRooms
    ? JSON.parse(savedRooms)
    : [
        { room: "Room 101", beds: [{ id: 1, vacant: true }, { id: 2, vacant: true }, { id: 3, vacant: true }] },
        { room: "Room 102", beds: [{ id: 4, vacant: true }, { id: 5, vacant: true }] },
      ];
});
React.useEffect(() => {
  localStorage.setItem("rooms", JSON.stringify(rooms));
}, [rooms]);

  // Complaints data
  const [complaints, setComplaints] = useState([]);

  // Owner login status
  const [loggedIn, setLoggedIn] = useState(false);

  // Dashboard view: "occupied", "vacant", or "complaints"
  const [dashboardView, setDashboardView] = useState("occupied");

  // -----------------------------
  // JSX
  // -----------------------------
  return (
    <Router>
      {/* -----------------------------
          Navbar
      ----------------------------- */}
      <nav className="navbar" style={styles.navbar}>
        {/* Left: Logo + Title */}
        <div style={styles.navLeft}>
          <img src={logo} alt="Hostel Logo" style={styles.logo} />
          <span style={styles.title}>Comfort Junction</span>
        </div>

        {/* Right: Navigation Links */}
        <div style={styles.navRight}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/booking" className="nav-link">Booking</Link>

          {loggedIn ? (
            <>
              <Link to="/owner" className="nav-link">Owner Dashboard</Link>

              
            </>
          ) : (
            <Link to="/login" className="nav-link">Owner Login</Link>
          )}

          <Link to="/complaint" className="nav-link">Complaint & Suggestion</Link>
        </div>
      </nav>

      {/* -----------------------------
          Logout Button
      ----------------------------- */}
      {loggedIn && (
        <button
          onClick={() => setLoggedIn(false)}
          style={styles.logoutBtn}
        >
          Logout
        </button>
      )}

      {/* -----------------------------
          Routes
      ----------------------------- */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking rooms={rooms} setRooms={setRooms} />} />
        <Route
          path="/owner"
          element={
            loggedIn ? (
              <OwnerDashboard
                rooms={rooms}
                setRooms={setRooms}
                complaints={complaints}
                setComplaints={setComplaints}
                view={dashboardView}
                setView={setDashboardView}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/complaint" element={<Complaint complaints={complaints} setComplaints={setComplaints} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
      </Routes>
    </Router>
  );
}

// -----------------------------
// Inline Styles
// -----------------------------
const styles = {
  navbar: {
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    width: "50px",
    height: "50px",
    borderRadius: "5px",
  },
  title: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "white",
  },
  navRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  logoutBtn: {
    marginTop: "10px",
    marginLeft: "20px",
    padding: "8px 12px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    position: "relative",
  },
};

export default App;
