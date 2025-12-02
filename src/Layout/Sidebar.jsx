// layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css"; // Ensure you have your CSS

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h3>🎬 MovieAdmin</h3>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="bi bi-grid-fill me-2"></i> Genre Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="bi bi-film me-2"></i> Movie Management
          </NavLink>
        </li>
         <li>
          <NavLink to="/add-genre" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="bi bi-film me-2"></i> List Your Genre
          </NavLink>
        </li>
         <li>
          <NavLink to="/add-movie" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="bi bi-film me-2"></i> List Your  Movie 
          </NavLink>
        </li>
      </ul>
      
      <div className="sidebar-footer">
        <span className="text-muted small">© 2025 MoviePanel</span>
      </div>
    </div>
  );
}

export default Sidebar;