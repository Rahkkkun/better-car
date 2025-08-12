import { getCarFilters } from "@/actions/car-listing";
import { CarsClientWrapper } from "./_components/cars-client-wrapper";

// Force dynamic rendering since this page uses client-side search params
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Cars | Vehiql",
  description: "Browse and search for your dream car",
};

export default async function CarsPage() {
  // Fetch filters data on the server
  const filtersData = await getCarFilters();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl mb-4">Browse Cars</h1>
      <CarsClientWrapper filters={filtersData.data} />
    </div>
  );
}