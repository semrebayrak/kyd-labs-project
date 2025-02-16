const baseURL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://ukhsm5rbs2.execute-api.us-east-1.amazonaws.com";

type GuestListResponse = {
  data: {
    guestId: string;
    firstName: string;
    lastName: string;
    numberOfTickets: number;
    notes: string;
    listId: string;
    order: number;
  }[];
};

type UploadCSVResponse = {
  success: boolean;
  shareableLink: string;
  listId: string;
};

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
