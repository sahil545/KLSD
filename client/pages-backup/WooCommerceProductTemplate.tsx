import Navigation from "@/components/Navigation";
import WooCommerceHero from "@/components/WooCommerceHero";
import WooCommerceDetails from "@/components/WooCommerceDetails";
import WooCommerceSocialProof from "@/components/WooCommerceSocialProof";
import WooCommerceBookingCTA from "@/components/WooCommerceBookingCTA";
import Footer from "@/components/Footer";

export default function WooCommerceProductTemplate() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <WooCommerceHero />
        <WooCommerceDetails />
        <WooCommerceSocialProof />
        <WooCommerceBookingCTA />
      </main>
      <Footer />
    </div>
  );
}
