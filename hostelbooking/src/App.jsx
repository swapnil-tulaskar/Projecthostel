import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Booking from "./pages/Booking";
import OwnerDashboard from "./pages/OwnerDashboard";
import Home from "./pages/Home";
import Complaint from "./pages/Complaint";
import Login from "./pages/Login";  // new page
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  // Central data: Rooms & Beds
  const [rooms, setRooms] = useState([
    {
      room: "Room 101",
      beds: [
        { id: 1, vacant: true },
        { id: 2, vacant: true },
        { id: 3, vacant: true },
      ],
    },
    {
      room: "Room 102",
      beds: [
        { id: 4, vacant: true },
        { id: 5, vacant: true },
      ],
    },
  ]);

  // Complaints
  const [complaints, setComplaints] = useState([]);

  // Login state
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      {/* Navbar */}
      <nav
        style={{
          padding: "12px 20px",
          background: "#007bff",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left: Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={logo}
            alt="Hostel Logo"
            style={{ width: "50px", height: "50px", borderRadius: "5px" }}
          />
          <span
            style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
          >
            Comfort Junction
          </span>
        </div>

        {/* Right: Links */}
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/booking" className="nav-link">Booking</Link>

          {/* Conditionally render Login / Owner Dashboard */}
          {loggedIn ? (
            <Link to="/owner" className="nav-link">Owner Dashboard</Link>
          ) : (
            <Link to="/login" className="nav-link">Owner Login</Link>
          )}

          <Link to="/complaint" className="nav-link">Complaint & Suggestion</Link>
        </div>
      </nav>
      {loggedIn && (
  <button
    onClick={() => setLoggedIn(false)}
    style={{
      marginTop: "10px",
      marginLeft: "20px",
      padding: "8px 12px",
      background: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      position: "relative", // stays in flow under navbar
    }}
  >
    Logout
  </button>
)}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/booking"
          element={<Booking rooms={rooms} setRooms={setRooms} />}
        />
        <Route
          path="/owner"
          element={
            loggedIn ? (
              <OwnerDashboard
                rooms={rooms}
                setRooms={setRooms}
                complaints={complaints}
                setComplaints={setComplaints}
                setLoggedIn={setLoggedIn} // pass for logout
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/complaint"
          element={
            <Complaint
              complaints={complaints}
              setComplaints={setComplaints}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
