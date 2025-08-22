import React, { useState } from "react";
import BookingForm from "../components/BookingForm";

function Booking({ rooms, setRooms }) {
  const [selectedBed, setSelectedBed] = useState(null);

  // When user confirms booking from BookingForm
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
                  booking: formData, // save all details + rentDate
                }
              : bed
          ),
        };
      }
      return room;
    });

    setRooms(updatedRooms);
    setSelectedBed(null); // close form after booking
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛏️ Booking Page</h1>
      {rooms.map((room) => (
        <div key={room.room} style={{ marginBottom: "15px" }}>
          <h2>{room.room}</h2>
          <ul>
            {room.beds.map((bed) => (
              <li key={bed.id} style={{ marginBottom: "8px" }}>
                Bed {bed.id}:{" "}
                {bed.vacant ? (
                  <>
                    Vacant 🟢{" "}
                    <button onClick={() => setSelectedBed({ room: room.room, bed })}>
                      Book
                    </button>
                  </>
                ) : (
                  <>Occupied 🔴</> // User name hidden
                )}
              </li>
            ))}
          </ul>
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
