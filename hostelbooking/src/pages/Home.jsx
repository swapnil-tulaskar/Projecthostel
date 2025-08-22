import React from "react";

function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🏠 Welcome to Our Hostel</h1>

      <section>
        <h2>About the Hostel</h2>
        <p>Our hostel offers a safe and comfortable environment with modern amenities.</p>
      </section>

      <section>
        <h2>⚠️ Important Warnings</h2>
        <ul>
          <li>No smoking inside the hostel.</li>
          <li>Visitors are not allowed after 9 PM.</li>
          <li>Keep your personal belongings safe .</li>
        </ul>
      </section>

      <section>
        <h2>📋 Instructions & Rules</h2>
        <ul>
          <li>Maintain cleanliness at all times.</li>
          <li>Follow hostel timings strictly.</li>
          <li>Report any issues to the warden immediately.</li>
        </ul>
      </section>

      <section>
        <h2>🎯 Activities</h2>
        <ul>
          <li>Weekly cleaning schedule</li>
          <li>Monthly cultural events</li>
          <li>Sports and fitness programs</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
