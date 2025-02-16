import { getGuestList } from "@/services/apiClient";
import { Column } from "@/types/table";
import { Button, Error, Loading, Table } from "@/ui";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const guestList = await getGuestList(id);
        const data = guestList.data;
        if (data.length === 0) {
          setError("No guests found for this list.");
        } else {
          setGuests(data);
        }
      } catch (_error) {
        setError("Error fetching guest list. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchGuestList();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <Error
        confirmText="Go Back"
        onConfirm={() => navigate("/")}
        content={<span className="text-red-500 mb-6">{error}</span>}
      />
    );
  }
  return (
    <div className="min-h-screen w-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8 relative">
          <Button
            onClick={() => navigate("/")}
            className="absolute left-0 top-2"
          >
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Guest List</h1>
        </div>
        <Table data={guests} columns={columns} />
        <div className="mt-4 text-right text-sm text-gray-600">
          Total Guests: {guests.length} | Total Tickets:{" "}
          {guests.reduce((acc, guest) => acc + guest.numberOfTickets, 0)}
        </div>
      </div>
    </div>
  );
}
