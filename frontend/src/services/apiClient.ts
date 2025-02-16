import { GuestListResponse, UploadCSVResponse } from "@/types/api";

const baseURL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://ukhsm5rbs2.execute-api.us-east-1.amazonaws.com";

export async function getGuestList(id: string): Promise<GuestListResponse> {
  const res = await fetch(`${baseURL}/guestlist/${id}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function uploadCSV(
  formData: FormData
): Promise<UploadCSVResponse> {
  const res = await fetch(`${baseURL}/guestlist/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload CSV");
  return res.json();
}
