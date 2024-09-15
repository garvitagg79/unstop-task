"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SeatGrid from "./components/SeatGrid";

export default function Home() {
  const [seatsRequested, setSeatsRequested] = useState(1);
  const [message, setMessage] = useState("");
  const [reservedSeats, setReservedSeats] = useState<number[]>([]);
  const [refetchKey, setRefetchKey] = useState(0); // Used to trigger refetch

  const handleReservation = async () => {
    const response = await fetch("/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seatsRequested }),
    });

    const data = await response.json();
    if (response.ok) {
      setReservedSeats(data.seatNumbers);
      setMessage("Seats reserved successfully");
      setRefetchKey((prev) => prev + 1); // Increment refetchKey to trigger SeatGrid refetch
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Main card for seat reservation */}
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Train Seat Reservation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Input for seat request */}
          <div className="space-y-4">
            <div className="flex justify-center items-center space-x-3">
              <label
                htmlFor="seats"
                className="block font-medium text-gray-700"
              >
                Number of seats:
              </label>
              <Input
                id="seats"
                type="number"
                value={seatsRequested}
                onChange={(e) => setSeatsRequested(Number(e.target.value))}
                min={1}
                max={7}
                className="w-20"
              />
            </div>

            {/* Reservation button */}
            <div className="text-center">
              <Button
                onClick={handleReservation}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Reserve Seats
              </Button>
            </div>

            {/* Display message and reserved seats */}
            {message && (
              <Alert variant="default" className="text-center">
                {message}
              </Alert>
            )}
            {reservedSeats.length > 0 && (
              <div className="text-center mt-4">
                <Alert variant="default">
                  Reserved Seats: {reservedSeats.join(", ")}
                </Alert>
              </div>
            )}

            {/* Seat Grid */}
            <SeatGrid key={refetchKey} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
