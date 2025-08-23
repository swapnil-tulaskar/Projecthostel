import React from "react";

const DemoCredentials = () => {
  const demoUsers = [
    "owner@test.com",
    "man@test.com",
    "admin@test.com",
    "guest@test.com",
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        background: "#f2f2f2",
        padding: "20px",
        marginTop: "20px",
        fontFamily: "monospace",
      }}
    >
      {/* Left side - usernames */}
      <div>
        <p>
          <b>Accepted usernames are:</b>
        </p>
        {demoUsers.map((email, i) => (
          <p key={i}>{email}</p>
        ))}
      </div>

      {/* Right side - password */}
      <div>
        <p>
          <b>Password for all users:</b>
        </p>
        <p>user12345</p>
      </div>
    </div>
  );
};

export default DemoCredentials;
