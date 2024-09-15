import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Assuming Supabase client is set up in `lib/supabaseClient.ts`

// Constants
const SEATS_PER_ROW = 7;
const TOTAL_SEATS = 80;

export default function SeatGrid() {
  const [seats, setSeats] = useState<
    Array<{ id: number; seat_number: number; isReserved: boolean }>
  >([]);

  // Fetch seat data from Supabase
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const { data, error } = await supabase
          .from("seats")
          .select("id, seat_number, is_reserved")
          .order("seat_number", { ascending: true }); // Ensure seats are ordered

        if (error) {
          console.error("Error fetching seats:", error);
          return;
        }

        // Transform data to match the format for your component
        const seatData = data.map((seat: any) => ({
          id: seat.id,
          seat_number: seat.seat_number,
          isReserved: seat.is_reserved,
        }));

        setSeats(seatData);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, []);

  // Function to get the seat status class based on the reservation status
  const getSeatStatusClass = (isReserved: boolean) => {
    return isReserved
      ? "bg-red-500 cursor-not-allowed" // Reserved seat
      : "bg-green-500 hover:bg-green-600"; // Available seat
  };

  // Group seats into rows
  const getRows = () => {
    const rows = [];
    for (let i = 0; i < TOTAL_SEATS; i += SEATS_PER_ROW) {
      rows.push(seats.slice(i, i + SEATS_PER_ROW));
    }
    return rows;
  };

  const rows = getRows();

  return (
    <div className="mt-6">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid grid-cols-${SEATS_PER_ROW} gap-2 mb-4`} // Always use 7 columns for each row
        >
          {row.map((seat) => (
            <Button
              key={seat.id}
              disabled={seat.isReserved}
              className={`w-16 h-16 text-white ${getSeatStatusClass(
                seat.isReserved
              )}`}
            >
              {seat.seat_number}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
