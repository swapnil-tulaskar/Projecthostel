import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function OwnerDashboard({ rooms, setRooms, complaints, setComplaints, setLoggedIn }) {
  const [view, setView] = useState("occupied");
  const navigate = useNavigate();

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

  const removeComplaint = (index) => {
    setComplaints((prev) => prev.filter((_, i) => i !== index));
  };

  const removeAllComplaints = () => {
    if (window.confirm("Remove all complaints?")) {
      setComplaints([]);
    }
  };

  const filteredBeds = (beds) =>
    view === "occupied"
      ? beds.filter((bed) => !bed.vacant)
      : beds.filter((bed) => bed.vacant);

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* ✅ Navbar */}
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
        <h2 style={{ color: "white" }}>🏠 Owner Dashboard</h2>
        <div style={{ display: "flex", gap: "15px" }}>
          <span
            onClick={() => setView("occupied")}
            style={{
              color: view === "occupied" ? "yellow" : "white",
              cursor: "pointer",
              fontWeight: view === "occupied" ? "bold" : "normal",
            }}
          >
            Occupied Beds
          </span>
          <span
            onClick={() => setView("vacant")}
            style={{
              color: view === "vacant" ? "yellow" : "white",
              cursor: "pointer",
              fontWeight: view === "vacant" ? "bold" : "normal",
            }}
          >
            Vacant Beds
          </span>
          <span
            onClick={() => setView("complaints")}
            style={{
              color: view === "complaints" ? "yellow" : "white",
              cursor: "pointer",
              fontWeight: view === "complaints" ? "bold" : "normal",
            }}
          >
            Complaints
          </span>
          <span
            onClick={handleLogout}
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

      {/* Beds List */}
      {(view === "occupied" || view === "vacant") &&
        rooms.map((room) => {
          const bedsToShow = filteredBeds(room.beds);
          if (bedsToShow.length === 0) return null;

          return (
            <div key={room.room} style={{ marginBottom: "15px" }}>
              <h2>{room.room}</h2>
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

      {/* Complaints View */}
      {view === "complaints" && (
        <div>
          {complaints.length > 0 ? (
            <>
              <button
                onClick={removeAllComplaints}
                style={{
                  marginBottom: "15px",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  background: "#f97316",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Remove All
              </button>

              <ul>
                {complaints.map((c, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: "1px solid #007bff",
                      borderRadius: "8px",
                      background: "#e0f0ff",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <b>{c.name}:</b> {c.message} <br />
                      <span style={{ fontSize: "12px", color: "#555" }}>
                        🕒 Submitted at: {c.timestamp}
                      </span>
                    </div>
                    <button
                      onClick={() => removeComplaint(index)}
                      style={{
                        marginLeft: "10px",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
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

export default OwnerDashboard;
