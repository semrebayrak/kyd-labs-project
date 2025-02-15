// src/services/apiClient.ts
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getGuestList(id: string) {
  const res = await fetch(`${baseURL}/guestlist/${id}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function uploadCSV(formData: FormData) {
  const res = await fetch(`${baseURL}/guestlist/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload CSV");
  return res.json();
}
