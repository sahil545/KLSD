import Navigation from "../../client/components/Navigation";
import StaticHero from "../../client/components/StaticHero";
import ClientPageWrapper from "../../client/components/ClientPageWrapper";
import Footer from "../../client/components/Footer";

// Server-side function to get product data
async function getProductData(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  // Default fallback product data
  const defaultProduct = {
    id: 34450,
    name: "Christ of the Abyss Snorkeling Tour",
    price: "89.00",
    categories: [
      { id: 15, name: "Snorkeling Tours", slug: "snorkeling-tours" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
        alt: "Underwater tour experience",
      },
    ],
    tourData: {
      duration: "4 Hours",
      groupSize: "25 Max",
      location: "Key Largo",
      difficulty: "All Levels",
      gearIncluded: true,
      highlights: [
        "Famous 9-foot bronze Christ statue in crystal-clear water",
        "All snorkeling equipment included",
        "PADI certified guides",
        "Small group experience",
      ],
    },
  };

  // Read product data from URL parameters (sent by WordPress)
  const productData = {
    id: searchParams.product_id
      ? parseInt(searchParams.product_id as string, 10)
      : defaultProduct.id,
    name: searchParams.product_name
      ? decodeURIComponent(searchParams.product_name as string)
      : defaultProduct.name,
    price: (searchParams.product_price as string) || defaultProduct.price,
    categories: searchParams.product_categories
      ? JSON.parse(
          decodeURIComponent(searchParams.product_categories as string),
        )
      : defaultProduct.categories,
    images: searchParams.product_images
      ? JSON.parse(decodeURIComponent(searchParams.product_images as string))
      : defaultProduct.images,
    tourData: {
      duration: searchParams.tour_duration
        ? decodeURIComponent(searchParams.tour_duration as string)
        : defaultProduct.tourData.duration,
      groupSize: searchParams.tour_group_size
        ? decodeURIComponent(searchParams.tour_group_size as string)
        : defaultProduct.tourData.groupSize,
      location: searchParams.tour_location
        ? decodeURIComponent(searchParams.tour_location as string)
        : defaultProduct.tourData.location,
      difficulty: searchParams.tour_difficulty
        ? decodeURIComponent(searchParams.tour_difficulty as string)
        : defaultProduct.tourData.difficulty,
      gearIncluded:
        searchParams.tour_gear_included === "1" ||
        defaultProduct.tourData.gearIncluded,
      highlights: searchParams.tour_highlights
        ? JSON.parse(decodeURIComponent(searchParams.tour_highlights as string))
        : defaultProduct.tourData.highlights,
    },
  };

  console.log("SSR: Using product data:", productData);
  return productData;
}

export default async function ChristStatueTourStatic({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get product data server-side
  const productData = await getProductData(searchParams);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <StaticHero product={productData} />
        <ClientPageWrapper productData={productData} />
      </main>
      <Footer />
    </div>
  );
}
