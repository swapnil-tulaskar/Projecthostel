import React from "react";
import { demoUsers, demoPassword } from "../components/demoConfig"; // ✅ import shared config

const DemoCredentials = () => {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        background: "#f2f2f2",
        borderRadius: "8px",
        fontFamily: "monospace",
      }}
    >
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left", paddingRight: "40px" }}>
              Accepted usernames are:
            </th>
            <th style={{ textAlign: "left" }}>Password for all users:</th>
          </tr>
        </thead>
        <tbody>
          {demoUsers.map((email, i) => (
            <tr key={i}>
              <td>{email}</td>
              <td>{demoPassword}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemoCredentials;
