import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Ensure supabase client is correctly configured

export async function POST(request: Request) {
  try {
    const { seatsRequested } = await request.json();

    if (!seatsRequested || seatsRequested < 1 || seatsRequested > 7) {
      return NextResponse.json({ message: 'You can book between 1 and 7 seats only.' }, { status: 400 });
    }

    // Fetch available seats from Supabase
    const { data: availableSeats, error } = await supabase
      .from('seats')
      .select('*')
      .eq('is_reserved', false)
      .order('seat_number', { ascending: true });

    if (error) {
      console.error('Error fetching seats:', error);
      return NextResponse.json({ message: 'Error fetching seats' }, { status: 500 });
    }

    if (!availableSeats || availableSeats.length < seatsRequested) {
      return NextResponse.json({ message: 'Not enough seats available' }, { status: 400 });
    }

    let seatsToBook = [];
    let reservationGroup = Math.floor(Date.now() / 1000); // Use seconds since epoch for a unique integer

    // Try to find consecutive seats in the same row
    for (let i = 0; i < availableSeats.length; i++) {
      let row = Math.floor((availableSeats[i].seat_number - 1) / 7);
      let consecutiveSeats = availableSeats.slice(i, i + seatsRequested);

      if (consecutiveSeats.length === seatsRequested &&
          consecutiveSeats.every((seat, index) => 
            Math.floor((seat.seat_number - 1) / 7) === row && 
            seat.seat_number === consecutiveSeats[0].seat_number + index)) {
        
        seatsToBook = consecutiveSeats;
        break;
      }
    }

    // If not enough consecutive seats, assign nearby ones
    if (seatsToBook.length === 0) {
      seatsToBook = availableSeats.slice(0, seatsRequested);
    }

    // Reserve the seats
    const seatNumbers = seatsToBook.map(seat => seat.seat_number);
    console.log(seatNumbers)
    const { error: updateError } = await supabase
      .from('seats')
      .update({ is_reserved: true, reservation_group: reservationGroup })
      .in('seat_number', seatNumbers);

    if (updateError) {
      console.error('Error reserving seats:', updateError);
      return NextResponse.json({ message: 'Error reserving seats' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Seats reserved', seatNumbers });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
