"use client";

import { Button } from "@/components/ui/button";
import { type TourData } from "../data";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";

interface FinalCTASectionProps {
  data: TourData;
}

export default function FinalCTASection({ data }: FinalCTASectionProps) {
  return (
    <section id="book-now" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {data.finalCTA.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {data.finalCTA.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg">
              Book Your Tour Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-4 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Call {data.finalCTA.phone}
            </Button>
          </div>
          
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            {data.finalCTA.benefits.map((benefit, index) => (
              <span key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
