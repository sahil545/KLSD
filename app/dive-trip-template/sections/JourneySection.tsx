"use client";

import { Card, CardContent } from "@/components/ui/card";
import { type DiveTripData } from "../data";
import { CheckCircle, Clock, MapPin } from "lucide-react";

interface JourneySectionProps {
  data: DiveTripData;
}

export default function JourneySection({ data }: JourneySectionProps) {
  const colorClasses = {
    blue: "bg-blue-500",
    teal: "bg-teal-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {data.journey.title}
            </h2>
            <p className="text-xl text-gray-600">{data.journey.description}</p>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {data.journey.steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline Line */}
                {index < data.journey.steps.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-20 bg-gray-200 z-0"></div>
                )}

                <Card className="relative hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      {/* Step Number */}
                      <div
                        className={`w-16 h-16 ${colorClasses[step.color]} rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 relative z-10`}
                      >
                        {step.step}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {step.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-2 md:mt-0">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {step.time}
                            </div>
                            {step.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {step.location}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Complete Dive Experience
            </h3>
            <p className="text-gray-600 mb-6">
              From check-in to return, our experienced crew ensures your safety
              and enjoyment at every step of your underwater adventure.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                Perfect for divers with Open Water certification and above
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
