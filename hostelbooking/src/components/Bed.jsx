import React from "react";

function Bed({ bed, onSelect, editable = false, onToggle }) {
  return (
    <button
      style={{
        margin: "5px",
        padding: "10px",
        background: bed.vacant ? "green" : "gray",
        color: "white",
        cursor: editable ? "pointer" : bed.vacant ? "pointer" : "not-allowed",
      }}
      // user mode → select vacant bed
      // owner mode → toggle bed status
      onClick={() => {
        if (editable) {
          onToggle(bed);
        } else if (bed.vacant) {
          onSelect(bed);
        }
      }}
    >
      Bed {bed.id} {bed.vacant ? "" : "(Occupied)"}
    </button>
  );
}

export default Bed;
