import Navigation from "@/components/Navigation";
import BlogSection from "@/components/BlogSection";
import WooCommerceHeroNoBooking from "@/components/WooCommerceHeroNoBooking";
import SimpleBookingSection from "@/components/SimpleBookingSection";
import SimpleTourNavigation from "@/components/SimpleTourNavigation";
import ModernTourContent from "@/components/ModernTourContent";
import Footer from "@/components/Footer";

export default function ChristStatueTourNoSidebar() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SimpleTourNavigation />
      <main>
        <WooCommerceHeroNoBooking />
        <SimpleBookingSection />
        <ModernTourContent />
      </main>
      <BlogSection />
      <Footer />
    </div>
  );
}
