import Navigation from "@/components/Navigation";
import WooCommerceHeroFullWidth from "@/components/WooCommerceHeroFullWidth";
import BookingSection from "@/components/BookingSection";
import TourPageNavigation from "@/components/TourPageNavigation";
import ModernTourContent from "@/components/ModernTourContent";
import Footer from "@/components/Footer";

export default function ChristStatueTourVariant() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <TourPageNavigation />
      <main>
        <WooCommerceHeroFullWidth />
        <BookingSection />
        <ModernTourContent />
      </main>
      <Footer />
    </div>
  );
}
