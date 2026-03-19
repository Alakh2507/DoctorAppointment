import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";



const Sidebar = ({ sidebar, setSidebar }) => {
  
  return (
    <>
      {/* Overlay for mobile / close on outside click */}
      {sidebar && <div className="overlay" onClick={() => setSidebar(false)} ></div>}

      <div className={`sidebar ${sidebar ? "active" : ""}`}>
        <h2 className="sidebar-logo">MyApp</h2>

        <nav className="sidebar-links">
          <NavLink to="/" onClick={() => setSidebar(false)}>Home</NavLink>
          <NavLink to="/doctors" onClick={() => setSidebar(false)}>Doctors</NavLink>
          <NavLink to="/myappointment" onClick={() => setSidebar(false)}>My Appointments</NavLink>
          <NavLink to="/about" onClick={() => setSidebar(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setSidebar(false)}>Contact</NavLink>
          <NavLink to="/myprofile" onClick={() => setSidebar(false)}>Profile</NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
