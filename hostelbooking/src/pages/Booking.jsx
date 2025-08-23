import React, { useState } from "react";
import BookingForm from "../components/BookingForm";

function Booking({ rooms, setRooms }) {
  const [selectedBed, setSelectedBed] = useState(null);

  // Handle booking confirmation
  const handleConfirmBooking = (selectedBed, formData) => {
    const updatedRooms = rooms.map((room) => {
      if (room.room === selectedBed.room) {
        return {
          ...room,
          beds: room.beds.map((bed) =>
            bed.id === selectedBed.bed.id
              ? {
                  ...bed,
                  vacant: false,
                  booking: formData,
                }
              : bed
          ),
        };
      }
      return room;
    });

    setRooms(updatedRooms);
    setSelectedBed(null); // Close form after booking
  };

  // Handle bed click directly
  const handleBedClick = (room, bed) => {
    if (!bed.vacant) return; // Prevent clicking on occupied beds
    setSelectedBed({ room: room.room, bed });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛏️ Booking Page</h1>
      {rooms.map((room) => (
        <div key={room.room} style={{ marginBottom: "15px" }}>
          <h2>{room.room}</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {room.beds.map((bed) => (
              <div
                key={bed.id}
                onClick={() => handleBedClick(room, bed)}
                style={{
                  width: "70px",
                  height: "50px",
                  borderRadius: "5px",
                  backgroundColor: bed.vacant ? "green" : "gray",
                  cursor: bed.vacant ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Bed {bed.id}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Show form when a bed is selected */}
      {selectedBed && (
        <BookingForm
          selectedBed={selectedBed}
          onConfirm={handleConfirmBooking}
          onCancel={() => setSelectedBed(null)}
        />
      )}
    </div>
  );
}

export default Booking;
