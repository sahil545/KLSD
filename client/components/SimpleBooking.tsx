import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GuestDetailsModal from "@/components/GuestDetailsModal";

export default function SimpleBooking() {
  const [showModal, setShowModal] = useState(false);
  const [guestCount, setGuestCount] = useState(2);

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
        "Free parking included"
      ],
      badge: "Most Popular"
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
        "Priority boarding"
      ],
      badge: "Best Value"
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
        "Luxury boat access"
      ],
      badge: "Ultimate Luxury"
    }
  ];

  const handleBookNow = (packageIndex: number) => {
    setShowModal(true);
  };

  const handleBookingSubmit = async (customerData: any) => {
    console.log('Booking submitted:', customerData);
    alert('Booking submitted successfully!');
    setShowModal(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Sacred Experience
          </h2>
          <p className="text-xl text-gray-600">
            Select the perfect package for your Christ of the Abyss adventure
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card key={index} className={`relative ${pkg.popular ? 'border-2 border-blue-500 scale-105' : ''}`}>
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                  {pkg.badge}
                </div>
              )}
              
              <CardHeader className={`text-center ${pkg.popular ? 'pt-12' : 'pt-6'}`}>
                <CardTitle className="text-2xl font-bold mb-2">{pkg.name}</CardTitle>
                <div className="text-3xl font-bold text-blue-600">${pkg.price}</div>
                <div className="text-sm text-gray-500 line-through">${pkg.originalPrice}</div>
                <div className="text-sm text-gray-600">per person</div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {pkg.includes.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={() => handleBookNow(index)}
                >
                  Reserve Your Spot - ${pkg.price}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <GuestDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleBookingSubmit}
        packageDetails={packages[0]}
        guestCount={guestCount}
        selectedDate="2024-01-20"
        selectedTime="8:00 AM"
      />
    </section>
  );
}
