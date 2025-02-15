export interface MappedEntry {
  listId?: string; // for dynamo db
  firstName: string;
  lastName?: string;
  numberOfTickets: number;
  notes?: string;
}
