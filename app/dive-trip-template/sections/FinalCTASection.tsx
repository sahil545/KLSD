"use client";

import { Button } from "@/components/ui/button";
import { type DiveTripData } from "../data";
import { Phone, CheckCircle, ArrowRight, Calendar } from "lucide-react";

interface FinalCTASectionProps {
  data: DiveTripData;
}

export default function FinalCTASection({ data }: FinalCTASectionProps) {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-section");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{data.finalCTA.title}</h2>
          <p className="text-xl mb-8 text-blue-100">
            {data.finalCTA.description}
          </p>

          {/* Benefits */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            {data.finalCTA.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-blue-100"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToBooking}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-lg rounded-xl shadow-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Dive Trip
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  `tel:${data.finalCTA.phone.replace(/[^\d]/g, "")}`,
                  "_self",
                )
              }
              className="border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 text-lg rounded-xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call {data.finalCTA.phone}
            </Button>
          </div>

          <div className="mt-6 text-blue-200 text-sm">
            Questions? Call us at {data.finalCTA.phone} or book online above
          </div>
        </div>
      </div>
    </section>
  );
}
