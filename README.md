# Seat Reservation System

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The project includes a seat reservation system where users can view and book seats using a grid interface.

## Features

- **Dynamic Seat Grid:** Displays seats in a grid layout with available and reserved seats.
- **Seat Reservation:** Allows users to reserve a specified number of seats.
- **Supabase Integration:** Uses Supabase as the database for managing seat availability and reservations.

## Getting Started

To get started with the project, follow these steps:

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

Install the required dependencies using your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of the project and add the necessary environment variables for Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

### 4. Run the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Supabase Integration

This project uses [Supabase](https://supabase.io) as the database for managing the seat matrix. Supabase provides a real-time database and authentication, which is utilized to fetch and update seat availability.

### Database Schema

The Supabase database includes a table named `seats` with the following columns:

- `id`: The unique identifier for each seat.
- `seat_number`: The seat number.
- `is_reserved`: A boolean indicating whether the seat is reserved.
- `reservation_group`: A unique identifier for the reservation group.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Feel free to adjust any specific details related to your project or setup.
