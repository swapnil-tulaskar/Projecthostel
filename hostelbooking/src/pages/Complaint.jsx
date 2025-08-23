import React, { useState } from "react";

function Complaint({ complaints, setComplaints }) {
  const [name, setName] = useState(""); // state for name
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Both name and message are required
    if (name.trim().length === 0 || message.trim().length === 0) return;

    // Get current date and time
    const now = new Date();
    const timestamp = now.toLocaleString(); // Format: "8/22/2025, 3:00:00 PM"

    // Add complaint with timestamp
    setComplaints([
      ...complaints,
      { name: name.trim(), message: message.trim(), timestamp },
    ]);

    setName("");
    setMessage("");
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "400px",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
          background: "#f9f9f9",
        }}
      >
        <h1 style={{ fontSize: "20px", marginBottom: "15px" }}>
          📝 Complaint & Suggestion
        </h1>
        {submitted && <p style={{ color: "green" }}>Your complaint has been submitted!</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Message: </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <button
            type="submit"
            style={{
              background: "#007bff",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Complaint;
