import Navigation from "../../client/components/Navigation";
import StaticHero from "../../client/components/StaticHero";
import SimpleBookingSection from "../../client/components/SimpleBookingSection";
import TourPageNavigation from "../../client/components/TourPageNavigation";
import ModernTourContent from "../../client/components/ModernTourContent";
import Footer from "../../client/components/Footer";

// Mock product data for static rendering
const mockProduct = {
  id: 34450,
  name: "Christ of the Abyss Snorkeling Tour",
  price: "89.00",
  categories: [{ id: 15, name: "Snorkeling Tours", slug: "snorkeling-tours" }],
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

export default function ChristStatueTourStatic() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <TourPageNavigation />
      <main>
        <StaticHero product={mockProduct} />
        <SimpleBookingSection />
        <ModernTourContent />
      </main>
      <Footer />
    </div>
  );
}
