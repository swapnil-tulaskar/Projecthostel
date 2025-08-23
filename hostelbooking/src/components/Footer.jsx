import React from "react";

function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "10px",
        background: "#f5f5f5",
        marginTop: "20px",
        fontSize: "14px",
      }}
    >
      © {new Date().getFullYear()} Swami. All rights reserved.
    </footer>
  );
}

export default Footer;
