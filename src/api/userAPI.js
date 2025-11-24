// src/api/userAPI.js
const API = import.meta.env.VITE_BACKEND_URL;

export async function deleteUser(uid) {
  try {
    const response = await fetch(`${API}/deleteUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
    });

    return await response.json();
  } catch (err) {
    console.error("deleteUser error:", err);
  }
}
