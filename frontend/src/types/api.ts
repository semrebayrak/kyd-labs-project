export type GuestListResponse = {
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

export type UploadCSVResponse = {
  success: boolean;
  shareableLink: string;
  listId: string;
};
