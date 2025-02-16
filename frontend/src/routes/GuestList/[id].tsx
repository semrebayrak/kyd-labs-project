import { getGuestList } from "@/services/apiClient";
import { Column } from "@/types/table";
import Loading from "@/ui/Loading";
import { Table } from "@/ui/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Guest {
  firstName: string;
  lastName: string;
  numberOfTickets: number;
  notes: string;
}

const columns: Column<Guest>[] = [
  { header: "Name", accessor: "firstName" },
  { header: "Last Name", accessor: "lastName" },
  { header: "Tickets", accessor: "numberOfTickets" },
  { header: "Notes", accessor: "notes" },
];

export default function GuestList() {
  const { id } = useParams() as { id: string };
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const guestList = await getGuestList(id);
        setGuests(guestList.data);
      } catch (error) {
        console.error("Error fetching guest list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGuestList();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Guest List</h1>

        <Table data={guests} columns={columns} />

        <div className="mt-4 text-right text-sm text-gray-600">
          Total Guests: {guests.length} | Total Tickets:{" "}
          {guests.reduce((acc, guest) => acc + guest.numberOfTickets, 0)}
        </div>
      </div>
    </div>
  );
}
