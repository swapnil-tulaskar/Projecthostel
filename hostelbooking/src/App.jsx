import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Booking from "./pages/Booking";
import OwnerDashboard from "./pages/OwnerDashboard";
import Home from "./pages/Home";
import Complaint from "./pages/Complaint";

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

  // Central state for complaints (array of strings)
  const [complaints, setComplaints] = useState([]);

  return (
    <Router>
      {/* Navbar */}
      <nav
        style={{
          padding: "12px 20px",
          background: "#007bff",
          color: "white",
          display: "flex",
          gap: "20px",
          fontSize: "18px",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/booking" style={{ color: "white", textDecoration: "none" }}>Booking</Link>
        <Link to="/owner" style={{ color: "white", textDecoration: "none" }}>Owner Dashboard</Link>
        <Link to="/complaint" style={{ color: "white", textDecoration: "none" }}>Complaint & Suggestion</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking rooms={rooms} setRooms={setRooms} />} />
        <Route
          path="/owner"
          element={
            <OwnerDashboard
              rooms={rooms}
              setRooms={setRooms}
              complaints={complaints}
              setComplaints={setComplaints} // add this to allow removing complaints
            />
          }
        />
        <Route
          path="/complaint"
          element={
            <Complaint
              complaints={complaints}
              setComplaints={setComplaints} // allow adding new complaints
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
