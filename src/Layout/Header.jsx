import React from "react";
import "../styles/header.css";

function Header() {
  return (
    <div className="header">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="me-3">
          {/* you can add user avatar here */}
        </div>
        <div className="header-user">Welcome, Admin 👋</div>
      </div>
    </div>
  );
}

export default Header;
