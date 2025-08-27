import Navigation from "@/components/Navigation";
import WooCommerceHero from "@/components/WooCommerceHero";
import TourPageNavigation from "@/components/TourPageNavigation";
import ModernTourContent from "@/components/ModernTourContent";
import Footer from "@/components/Footer";

export default function ChristStatueTour() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <TourPageNavigation />
      <main>
        <WooCommerceHero />
        <ModernTourContent />
      </main>
      <Footer />
    </div>
  );
}
