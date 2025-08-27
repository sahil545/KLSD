import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Users,
  Shield,
  Gift,
  CheckCircle,
  Star,
  Camera,
  Waves,
  Fish,
} from "lucide-react";
import { wooCommerce } from "@/lib/woocommerce";
import GuestDetailsModal from "@/components/GuestDetailsModal";

const packages = [
  {
    name: "Essential Experience",
    price: 70,
    originalPrice: 89,
    popular: false,
    duration: "4 hours",
    groupSize: "Up to 25 people",
    includes: [
      "Professional snorkeling equipment",
      "PADI certified guide",
      "Christ statue viewing",
      "Marine life spotting",
      "Safety briefing & instruction",
      "Free parking included",
    ],
    badge: "Most Popular",
  },
  {
    name: "Premium Adventure",
    price: 120,
    originalPrice: 150,
    popular: true,
    duration: "4 hours",
    groupSize: "Up to 15 people",
    includes: [
      "Everything in Essential",
      "Professional underwater photos",
      "Smaller group experience",
      "Premium equipment upgrade",
      "Complimentary refreshments",
      "Priority boarding",
    ],
    badge: "Best Value",
  },
  {
    name: "VIP Sacred Waters",
    price: 200,
    originalPrice: 250,
    popular: false,
    duration: "4 hours",
    groupSize: "Up to 6 people",
    includes: [
      "Everything in Premium",
      "Private guide experience",
      "Extended viewing time",
      "Professional photo album",
      "Champagne celebration",
      "Luxury boat access",
    ],
    badge: "Ultimate Luxury",
  },
];

const urgencyFeatures = [
  {
    icon: Calendar,
    text: "Limited spots available - only 25 guests per tour",
  },
  {
    icon: Gift,
    text: "Book today & save with NO booking fees",
  },
  {
    icon: Shield,
    text: "100% money-back guarantee if weather cancels",
  },
];

export default function Booking() {
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<number>(0);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [showModal, setShowModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [connectionTest, setConnectionTest] = useState<boolean | null>(null);

  const productId = 34450; // Testing product ID

  useEffect(() => {
    loadProductData();
    testWooCommerceConnection();
  }, []);

  const testWooCommerceConnection = async () => {
    try {
      // Use mock data for demo instead of actual API calls
      setConnectionTest(true);
      console.log("Using mock data for demo");
    } catch (error) {
      console.error("Connection test failed:", error);
      setConnectionTest(false);
    }
  };

  const loadProductData = async () => {
    try {
      setLoading(true);

      // Mock product data for Christ Statue tour
      const mockProduct = {
        id: 34450,
        name: "Christ of the Abyss Statue Snorkeling Tour",
        price: 89,
        regular_price: 89,
        sale_price: null,
        description:
          "Experience the iconic Christ of the Abyss statue in crystal-clear waters. An unforgettable snorkeling adventure in Key Largo's most sacred site.",
        short_description:
          "Visit the famous 9-foot bronze Christ statue underwater",
        stock_quantity: 25,
        in_stock: true,
        images: [
          {
            src: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=800",
            alt: "Christ of the Abyss",
          },
        ],
        categories: [{ slug: "snorkeling-tours", name: "Snorkeling Tours" }],
      };

      const mockAvailability = {
        available_dates: [
          {
            date: "2024-01-20",
            times: ["8:00 AM", "12:00 PM", "3:00 PM"],
            spots_available: 25,
          },
          {
            date: "2024-01-21",
            times: ["8:00 AM", "12:00 PM", "3:00 PM"],
            spots_available: 20,
          },
          {
            date: "2024-01-22",
            times: ["8:00 AM", "12:00 PM", "3:00 PM"],
            spots_available: 18,
          },
        ],
      };

      setProductData(mockProduct);
      setAvailability(mockAvailability);
      console.log("Mock product loaded:", mockProduct);
      console.log("Mock availability:", mockAvailability);
    } catch (error) {
      console.error("Failed to load product data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (packageIndex: number) => {
    setSelectedPackage(packageIndex);
    setShowModal(true);
  };

  const handleBookingSubmit = async (customerData: any) => {
    try {
      setIsBooking(true);

      const bookingData = {
        productId: productId,
        quantity: guestCount,
        tourDate: selectedDate || new Date().toISOString().split("T")[0],
        tourTime: selectedTime || "8:00 AM",
        customerData: {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
          phone: customerData.phone,
          location: customerData.location,
          specialRequests: customerData.specialRequests,
        },
      };

      const order = await wooCommerce.createTourBooking(bookingData);

      console.log("Booking created:", order);
      alert(`🎉 Booking successful! Order #${order.id} created.

You will receive a confirmation email shortly.

Order Details:
- Tour: Christ of the Abyss
- Guests: ${guestCount}
- Package: ${packages[selectedPackage].name}
- Total: $${(packages[selectedPackage].price * guestCount * 1.07).toFixed(2)}

You can view this order in your WooCommerce admin under Orders.`);

      setShowModal(false);
    } catch (error) {
      console.error("Booking failed:", error);
      alert(`❌ Booking failed: ${error.message}

Please try again or call (305) 391-4040 for assistance.

Error details have been logged to the console.`);
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-ocean/5 via-ocean-light/10 to-ocean/5">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-ocean/5 via-ocean-light/10 to-ocean/5">
      <div className="container mx-auto px-4">
        {/* Connection Status */}
        <div className="mb-8 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-3 h-3 rounded-full ${connectionTest === true ? "bg-green-500" : connectionTest === false ? "bg-red-500" : "bg-yellow-500"}`}
            ></div>
            <span className="font-semibold">
              WooCommerce Connection Status:
            </span>
            <span
              className={
                connectionTest === true
                  ? "text-green-600"
                  : connectionTest === false
                    ? "text-red-600"
                    : "text-yellow-600"
              }
            >
              {connectionTest === true
                ? "Connected ✅"
                : connectionTest === false
                  ? "Failed ❌"
                  : "Testing..."}
            </span>
          </div>
          {productData && (
            <div className="text-sm text-gray-600">
              <p>
                <strong>Live Product:</strong> {productData.name}
              </p>
              <p>
                <strong>WooCommerce Price:</strong> ${productData.price}
              </p>
              <p>
                <strong>Stock:</strong> {productData.stock_quantity} available (
                {productData.stock_status})
              </p>
            </div>
          )}
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-coral border-coral/20">
            Book Your Adventure
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your
            <span className="text-ocean"> Sacred Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Select the perfect package for your Christ of the Abyss adventure.
            All packages include professional guidance and safety equipment.
          </p>
        </div>

        {/* Urgency Banner */}
        <div className="bg-coral/10 backdrop-blur-sm border border-coral/20 rounded-2xl p-6 mb-12">
          <div className="grid md:grid-cols-3 gap-4">
            {urgencyFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-center md:text-left"
              >
                <div className="w-8 h-8 bg-coral/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-coral" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                pkg.popular
                  ? "border-2 border-ocean scale-105 shadow-xl"
                  : "border-0 bg-white/70 hover:bg-white/90"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-ocean text-white text-center py-2 text-sm font-semibold">
                  {pkg.badge}
                </div>
              )}

              <CardHeader
                className={`text-center ${pkg.popular ? "pt-12" : "pt-8"}`}
              >
                {!pkg.popular && (
                  <Badge variant="outline" className="mx-auto mb-4 w-fit">
                    {pkg.badge}
                  </Badge>
                )}

                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {pkg.name}
                </CardTitle>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-ocean">
                      ${pkg.price}
                    </span>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground line-through">
                        ${pkg.originalPrice}
                      </div>
                      <div className="text-sm font-medium text-coral">
                        Save ${pkg.originalPrice - pkg.price}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">per person</p>
                </div>

                <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {pkg.groupSize}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <Button
                  size="lg"
                  onClick={() => handleBookNow(index)}
                  disabled={!availability?.available || !connectionTest}
                  className={`w-full mb-6 font-semibold ${
                    pkg.popular
                      ? "bg-coral hover:bg-coral/90 text-white"
                      : "bg-ocean hover:bg-ocean/90 text-white"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {!connectionTest
                    ? "Connection Error"
                    : !availability?.available
                      ? "Sold Out"
                      : "Reserve Your Spot - LIVE TEST"}
                </Button>

                <Separator className="mb-6" />

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground mb-4">
                    What&apos;s Included:
                  </h4>
                  {pkg.includes.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-ocean/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-ocean" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Professional Photos
            </h3>
            <p className="text-sm text-muted-foreground">
              High-quality underwater photography included
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-ocean/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-ocean" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Safety First</h3>
            <p className="text-sm text-muted-foreground">
              PADI certified guides & inspected equipment
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-ocean/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Waves className="w-8 h-8 text-ocean" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Perfect Conditions
            </h3>
            <p className="text-sm text-muted-foreground">
              Crystal clear waters 60-100ft visibility
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-ocean/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Fish className="w-8 h-8 text-ocean" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Marine Life</h3>
            <p className="text-sm text-muted-foreground">
              Encounter tropical fish & coral reefs
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-ocean/10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-coral fill-coral" />
              <span className="font-semibold text-foreground">
                Still not sure?
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              Join thousands of satisfied adventurers. Call us at
              <span className="text-ocean font-semibold">
                {" "}
                (305) 391-4040
              </span>{" "}
              for personalized assistance.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-ocean text-ocean hover:bg-ocean hover:text-white"
            >
              Speak with an Expert
            </Button>
          </div>
        </div>
      </div>

      {/* Guest Details Modal */}
      <GuestDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleBookingSubmit}
        isLoading={isBooking}
        packageDetails={packages[selectedPackage]}
        guestCount={guestCount}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </section>
  );
}
