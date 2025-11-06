import React, { useState, useEffect } from "react";
import { addEvent, updateEvent } from "./api";

export default function EventForm({ event, onSaved, onCancel }) {
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setForm({
        id: event.id ?? "",
        title: event.title ?? "",
        description: event.description ?? "",
        startTime: event.startTime ?? "",
        endTime: event.endTime ?? "",
        location: event.location ?? "",
      });
    } else {
      // If no event (adding new), reset form
      setForm({
        id: "",
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        location: "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let saved;
      if (event) {
        if (!form.id) {
          throw new Error("Cannot update event without ID");
        }
        saved = await updateEvent(form.id, form);
      } else {
        saved = await addEvent(form);
      }
      setErrors({});
      onSaved(saved);
    } catch (err) {
      // You might want to parse err.response.data for validation
      setErrors({ general: err.message || "An error occurred" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="event-form"
      style={{
        background: "#fdfdfd",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "20px",
        maxWidth: "500px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#34495e", marginBottom: "15px" }}>
        {event ? "Edit Event ✏️" : "Add New Event ➕"}
      </h2>

      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

      <div style={{ marginBottom: "10px" }}>
        <input
          name="id"
          value={form.id}
          readOnly
          disabled={!!event}
          placeholder="ID"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        {errors.id && <p style={{ color: "red" }}>{errors.id}</p>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          name="startTime"
          placeholder="Start (YYYY-MM-DDTHH:mm)"
          value={form.startTime}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        {errors.startTime && <p style={{ color: "red" }}>{errors.startTime}</p>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          name="endTime"
          placeholder="End (YYYY-MM-DDTHH:mm)"
          value={form.endTime}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        {errors.endTime && <p style={{ color: "red" }}>{errors.endTime}</p>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        {errors.location && <p style={{ color: "red" }}>{errors.location}</p>}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="submit"
          style={{
            background: "#27ae60",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          💾 Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ❌ Cancel
        </button>
      </div>
    </form>
  );
}
