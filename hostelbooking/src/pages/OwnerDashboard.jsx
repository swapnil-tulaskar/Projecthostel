import React, { useState } from "react";

function OwnerDashboard({ rooms, setRooms, complaints, setComplaints }) {
  const [view, setView] = useState("occupied"); // default view

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

  // Remove single complaint
  const removeComplaint = (index) => {
    setComplaints((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove all complaints
  const removeAllComplaints = () => {
    setComplaints([]);
  };

  const filteredBeds = (beds) =>
    view === "occupied"
      ? beds.filter((bed) => !bed.vacant)
      : beds.filter((bed) => bed.vacant);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏠 Owner Dashboard</h1>

      {/* Toggle View Buttons */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setView("occupied")}
          style={{ background: view === "occupied" ? "#007bff" : "#ccc", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px" }}
        >
          Occupied Beds
        </button>
        <button
          onClick={() => setView("vacant")}
          style={{ background: view === "vacant" ? "#007bff" : "#ccc", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px" }}
        >
          Vacant Beds
        </button>
        <button
          onClick={() => setView("complaints")}
          style={{ background: view === "complaints" ? "#007bff" : "#ccc", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px" }}
        >
          Complaints
        </button>
      </div>

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
                      <b>{c.name}:</b> {c.message}
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
