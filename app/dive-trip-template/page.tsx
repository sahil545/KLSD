"use client";

import Navigation from "../../client/components/Navigation";
import Footer from "../../client/components/Footer";
import HeroSection from "./sections/HeroSection";
import ExperienceSection from "./sections/ExperienceSection";
import JourneySection from "./sections/JourneySection";
import MarineLifeSection from "./sections/MarineLifeSection";
import TrustSection from "./sections/TrustSection";
import BookingSection from "./sections/BookingSection";
import FinalCTASection from "./sections/FinalCTASection";
import { diveTripData } from "./data";

export default function DiveTripTemplate() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection data={diveTripData} />
        <BookingSection data={diveTripData} productId={34593} />
        <ExperienceSection data={diveTripData} />
        <JourneySection data={diveTripData} />
        <MarineLifeSection data={diveTripData} />
        <TrustSection data={diveTripData} />
        <FinalCTASection data={diveTripData} />
      </main>
      <Footer />
    </div>
  );
}
