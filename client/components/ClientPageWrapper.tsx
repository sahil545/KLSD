"use client";

import SimpleBookingSection from "./SimpleBookingSection";
import TourPageNavigation from "./TourPageNavigation";
import ModernTourContent from "./ModernTourContent";

interface ClientPageWrapperProps {
  productData?: any;
}

export default function ClientPageWrapper({
  productData,
}: ClientPageWrapperProps) {
  return (
    <>
      <TourPageNavigation />
      <SimpleBookingSection />
      <ModernTourContent />
    </>
  );
}
