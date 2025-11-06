import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>EMS</h1>
      <div style={styles.links}>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.active } : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/events"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.active } : styles.link
          }
        >
          Events
        </NavLink>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#2980b9",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#fff",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#fff",
    fontWeight: "bold",
    textDecoration: "none",
  },
  active: {
    textDecoration: "underline",
    // You can also change color when active if desired:
    // color: "#ffeaa7",
  },
};
