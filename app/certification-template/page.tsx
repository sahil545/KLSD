"use client";

import Navigation from "../../client/components/Navigation";
import TourPageNavigation from "../../client/components/TourPageNavigation";
import CertificationHero from "../../client/components/CertificationHero";
import CertificationBookingSection from "../../client/components/CertificationBookingSection";
import CertificationContent from "../../client/components/CertificationContent";
import Footer from "../../client/components/Footer";

export default function CertificationTemplate() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <TourPageNavigation />
      <main>
        <CertificationHero />
        <CertificationBookingSection />
        <CertificationContent />
      </main>
      <Footer />
    </div>
  );
}
