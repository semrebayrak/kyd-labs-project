export interface MappedEntry {
  listId?: string; // for dynamo db
  order: number;
  firstName: string;
  lastName?: string;
  numberOfTickets: number;
  notes?: string;
}
