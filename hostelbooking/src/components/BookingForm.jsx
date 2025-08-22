import React, { useState } from "react";

// BookingForm component → popup form for booking a bed
function BookingForm({ selectedBed, onConfirm, onCancel }) {
  // State to hold form input values (name, age, phone, aadhar, address)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    aadhar: "",
    address: "",
  });

  // State to hold error message if validation fails
  const [error, setError] = useState("");

  // Handle input changes and update formData state
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submit (when user clicks "Confirm Booking")
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    const age = parseInt(formData.age, 10); // convert age from string → number

    // Validation: Only allow age greater than 10
    if (age <= 10) {
      setError("❌ Booking allowed only for age above 10 years.");
      return;
    }

    // Validation: Phone number must be exactly 10 digits
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("❌ Phone number must be exactly 10 digits.");
      return;
    }

    // Validation: Aadhaar must be 12 digits
    if (!/^\d{12}$/.test(formData.aadhar)) {
      setError("❌ Aadhaar number must be exactly 12 digits.");
      return;
    }

    // Validation: Address should not be empty
    if (formData.address.trim().length < 5) {
      setError("❌ Address must be at least 5 characters.");
      return;
    }

    // If validation passes → clear error and confirm booking
    setError("");
    onConfirm(selectedBed, {
  ...formData,
  rentDate: new Date().toLocaleDateString(), // today’s date
});
  };

  return (
    // Full screen overlay (dark transparent background)
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)", // black with opacity
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Booking form box */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2>
          Booking Form – Bed {selectedBed.bed.id} ({selectedBed.room})
        </h2>

        {/* Form Starts */}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={{ marginBottom: "10px" }}>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          {/* Age Field */}
          <div style={{ marginBottom: "10px" }}>
            <label>Age: </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="11"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          {/* Phone Field */}
          <div style={{ marginBottom: "10px" }}>
            <label>Phone: </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              minLength="10"
              maxLength="10"
              pattern="\d{10}"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          {/* Aadhaar Field */}
          <div style={{ marginBottom: "10px" }}>
            <label>Aadhaar No: </label>
            <input
              type="text"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              required
              minLength="12"
              maxLength="12"
              pattern="\d{12}"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          {/* Address Field */}
          <div style={{ marginBottom: "10px" }}>
            <label>Address: </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              style={{ width: "100%", padding: "8px" }}
            ></textarea>
          </div>

          {/* Show error if validation fails */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Buttons */}
          <button
            type="submit"
            style={{
              background: "#22c55e", // green
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Confirm Booking
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              marginLeft: "10px",
              background: "#ef4444", // red
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </form>
        {/* Form Ends */}
      </div>
    </div>
  );
}

export default BookingForm;
