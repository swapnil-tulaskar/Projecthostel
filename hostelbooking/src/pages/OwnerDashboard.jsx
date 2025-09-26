import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function OwnerDashboard({ rooms, setRooms, complaints, setComplaints, setLoggedIn }) {
  const navigate = useNavigate();
  const [view, setView] = useState("occupied"); // local dashboard view

  // -----------------------------
  // Bed Functions
  // -----------------------------
  const toggleBedStatus = (roomName, bedId) => {
    const updatedRooms = rooms.map((room) => {
      if (room.room === roomName) {
        return {
          ...room,
          beds: room.beds.map((bed) =>
            bed.id === bedId
              ? { ...bed, vacant: !bed.vacant, booking: bed.vacant ? null : bed.booking }
              : bed
          ),
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  const addBed = (roomName) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.room === roomName) {
          const maxId = room.beds.length ? Math.max(...room.beds.map((b) => b.id)) : 0;
          const newBed = { id: maxId + 1, vacant: true };
          return { ...room, beds: [...room.beds, newBed] };
        }
        return room;
      })
    );
  };

  const filteredBeds = (beds) =>
    view === "occupied"
      ? beds.filter((bed) => !bed.vacant)
      : beds.filter((bed) => bed.vacant);

  // -----------------------------
  // Complaint Functions
  // -----------------------------
  const removeComplaint = (index) => {
    setComplaints((prev) => prev.filter((_, i) => i !== index));
  };

  const removeAllComplaints = () => {
    setComplaints([]);
  };

  // -----------------------------
  // Logout
  // -----------------------------
  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏠 Owner Dashboard</h1>

      {/* Dashboard View Controls */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setView("occupied")} style={buttonStyle(view === "occupied")}>
          Occupied Beds
        </button>
        <button onClick={() => setView("vacant")} style={buttonStyle(view === "vacant")}>
          Vacant Beds
        </button>
        <button onClick={() => setView("complaints")} style={buttonStyle(view === "complaints")}>
          Complaints
        </button>
        
      </div>

      {/* -----------------------------
          Beds View
      ----------------------------- */}
      {(view === "occupied" || view === "vacant") &&
        rooms.map((room) => {
          const bedsToShow = filteredBeds(room.beds);
          if (bedsToShow.length === 0 && view === "occupied") return null;

          return (
            <div key={room.room} style={{ marginBottom: "15px" }}>
              <h2>{room.room}</h2>
              <button
                onClick={() => addBed(room.room)}
                style={{ marginBottom: "10px", padding: "5px 10px", borderRadius: "5px", background: "#22c55e", color: "white", border: "none", cursor: "pointer" }}
              >
                ➕ Add Bed
              </button>
              <ul>
                {bedsToShow.map((bed) => (
                  <li key={bed.id} style={{ marginBottom: "10px" }}>
                    <strong>Bed {bed.id}:</strong>{" "}
                    {bed.vacant ? (
                      <>Vacant 🟢</>
                    ) : (
                      <>
                        Occupied 🔴 <br />
                        👤 Name: <b>{bed.booking?.name}</b> <br />
                        📅 Rent Date: {bed.booking?.rentDate} <br />
                        📞 Phone: {bed.booking?.phone} <br />
                        🆔 Aadhaar: {bed.booking?.aadhar} <br />
                        🏠 Address: {bed.booking?.address} <br />
                        <button
                          onClick={() => toggleBedStatus(room.room, bed.id)}
                          style={{ marginLeft: "10px" }}
                        >
                          Mark as Vacant
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

      {/* -----------------------------
          Complaints View
      ----------------------------- */}
      {view === "complaints" && (
        <div>
          {complaints.length > 0 ? (
            <>
              <button onClick={removeAllComplaints} style={{ ...buttonStyle(false), background: "#f97316", marginBottom: "15px" }}>
                Remove All
              </button>
              <ul>
                {complaints.map((c, index) => (
                  <li key={index} style={complaintStyle}>
                    <div>
                      <b>{c.name}:</b> {c.message} <br />
                      <span style={{ fontSize: "12px", color: "#555" }}>🕒 Submitted at: {c.timestamp}</span>
                    </div>
                    <button onClick={() => removeComplaint(index)} style={{ ...buttonStyle(false), background: "#ef4444" }}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No complaints yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

// -----------------------------
// Styles
// -----------------------------
const buttonStyle = (active) => ({
  padding: "5px 12px",
  marginRight: "10px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  background: active ? "#2563eb" : "#3b82f6",
  color: "white",
});

const complaintStyle = {
  marginBottom: "10px",
  padding: "10px",
  border: "1px solid #007bff",
  borderRadius: "8px",
  background: "#e0f0ff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default OwnerDashboard;
