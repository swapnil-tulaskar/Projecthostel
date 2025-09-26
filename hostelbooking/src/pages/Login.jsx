import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DemoCredentials from "../components/DemoCredentials"; // show usernames/passwords

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Accepted demo usernames
  const demoUsers = [
    "owner@test.com",
    "man@test.com",
    "admin@test.com",
    "guest@test.com",
  ];

  // Common password for all users
  const demoPassword = "user123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (demoUsers.includes(email) && password === demoPassword) {
      setLoggedIn(true);
      navigate("/owner"); // go to dashboard
    } else {
      setError("❌ Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
      <h2>🔑 Owner Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "8px",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "8px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Login
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Show demo credentials below form */}
       <DemoCredentials demoUsers={demoUsers} demoPassword={demoPassword} />
    </div>
  );
}

export default Login;

