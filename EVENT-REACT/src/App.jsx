import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import EventList from "./EventList";

export default function App() {
  return (
    <Router>
      <NavBar />
      <div className="container" style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<h2>Welcome to Event Management System 🎉</h2>} />
          
          <Route path="/events" element={<EventList />} />
        </Routes>
      </div>
    </Router>
  );
}
