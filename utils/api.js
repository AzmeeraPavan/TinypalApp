import { API_BASE } from "../constants"; // Correct path

// Fetch Did You Know data
export async function getDidYouKnow() {
  try {
    const res = await fetch(`${API_BASE}/did_you_know`);
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (error) {
    console.error("getDidYouKnow error:", error);
    throw error;
  }
}

// Fetch Flashcard data
export async function getFlashcard() {
  try {
    const res = await fetch(`${API_BASE}/flashcard`);
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (error) {
    console.error("getFlashcard error:", error);
    throw error;
  }
}
