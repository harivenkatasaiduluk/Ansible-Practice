import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "./api";
import EventForm from "./EventForm";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Cannot delete event without ID");
      return;
    }
    try {
      await deleteEvent(id);
      load();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (event) => {
    if (!event || !event.id) {
      console.error("Invalid event to edit:", event);
      return;
    }
    setEditing(event);
    setShowForm(true);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>📅 Events</h2>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
          }}
          style={{
            background: "#2980b9",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ➕ Add Event
        </button>
      </div>

      {showForm && (
        <EventForm
          event={editing}
          onSaved={(savedEvent) => {
            setShowForm(false);
            setEditing(null);

            if (savedEvent && savedEvent.id) {
              setEvents((prev) => {
                const exists = prev.some((e) => e.id === savedEvent.id);
                if (exists) {
                  return prev.map((e) => (e.id === savedEvent.id ? savedEvent : e));
                } else {
                  return [...prev, savedEvent];
                }
              });
            } else {
              // fallback if savedEvent doesn't have id
              load();
            }
          }}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      <div>
        {events.length === 0 ? (
          <p style={{ textAlign: "center", color: "#7f8c8d" }}>No events available. Add one!</p>
        ) : (
          events.map((e) => {
            if (!e.id) {
              console.warn("Event without ID found, skipping:", e);
              return null;
            }
            return (
              <div
                key={e.id}
                style={{
                  background: "#ecf0f1",
                  margin: "15px 0",
                  padding: "15px",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ color: "#2c3e50", marginBottom: "8px" }}>
                  {e.title} 🎭
                </h3>

                <p style={{ margin: "5px 0" }}>{e.description}</p>
                <p style={{ margin: "5px 0" }}>📍 {e.location}</p>
                <p style={{ margin: "5px 0" }}>
                  🕒 {e.startTime} → {e.endTime}
                </p>

                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => handleEdit(e)}
                    style={{
                      background: "#f39c12",
                      color: "#fff",
                      padding: "8px 15px",
                      marginRight: "10px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    style={{
                      background: "#e74c3c",
                      color: "#fff",
                      padding: "8px 15px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
