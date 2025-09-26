// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ setLoggedIn }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#007bff",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ color: "white" }}>🏠 Hostel System</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/owner" style={{ color: "white", textDecoration: "none" }}>
          Owner Dashboard
        </Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
          About
        </Link>
        <span
          onClick={() => {
            setLoggedIn(false);
          }}
          style={{
            color: "white",
            cursor: "pointer",
            background: "#ef4444",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          Logout
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
