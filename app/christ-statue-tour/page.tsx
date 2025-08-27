"use client";

import Navigation from "../../client/components/Navigation";
import WooCommerceHeroNoBooking from "../../client/components/WooCommerceHeroNoBooking";
import SimpleBookingSection from "../../client/components/SimpleBookingSection";
import TourPageNavigation from "../../client/components/TourPageNavigation";
import ModernTourContent from "../../client/components/ModernTourContent";
import Footer from "../../client/components/Footer";

export default function ChristStatueTour() {
  // Fixed loading issue with useWooCommerceProduct hook
  return (
    <div className="min-h-screen">
      <Navigation />
      <TourPageNavigation />
      <main>
        <WooCommerceHeroNoBooking />
        <SimpleBookingSection />
        <ModernTourContent />
      </main>
      <Footer />
    </div>
  );
}
