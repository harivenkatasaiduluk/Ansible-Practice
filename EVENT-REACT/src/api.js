// Note: ensure your .env (or VITE_ variable) is correctly loaded
const BASE_URL = import.meta.env.VITE_API_BASE_URL;  
// (e.g. "http://localhost:2020/api/events")

// Get all events
export async function getEvents() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`getEvents failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Create a new event
export async function addEvent(event) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(`addEvent failed: ${res.status} ${res.statusText} — ${JSON.stringify(errorBody)}`);
  }
  return res.json();
}

// Update event
export async function updateEvent(id, event) {
  if (!id) {
    throw new Error("updateEvent called without id");
  }
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(`updateEvent failed: ${res.status} ${res.statusText} — ${JSON.stringify(errorBody)}`);
  }
  return res.json();
}

// Delete event
export async function deleteEvent(id) {
  if (!id) {
    throw new Error("deleteEvent called without id");
  }
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`deleteEvent failed: ${res.status} ${res.statusText}`);
  }
  // You might return something if your API returns something
  return true;
}
