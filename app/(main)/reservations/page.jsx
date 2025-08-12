import { getUserTestDrives } from "@/actions/test-drive";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReservationsList } from "./_components/reservations-list";

// Force dynamic rendering since this page uses authentication
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "My Reservations | Vehiql",
  description: "Manage your test drive reservations",
};

export default async function ReservationsPage() {
  // Check authentication on server
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect=/reservations");
  }

  // Fetch reservations on the server
  const reservationsResult = await getUserTestDrives();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl mb-6 font-semibold">Your Reservations</h1>
      <ReservationsList initialData={reservationsResult} />
    </div>
  );
}