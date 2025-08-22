import React from "react";
import Bed from "./Bed";

function Room({ room, onSelect, editable = false, onToggle }) {
  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h2>{room.room}</h2>
      {room.beds.map(bed => (
        <Bed
          key={bed.id}
          bed={bed}
          onSelect={(b) => onSelect(room.room, b)}
          editable={editable}
          onToggle={(b) => onToggle && onToggle(room.room, b)}
        />
      ))}
    </div>
  );
}

export default Room;
