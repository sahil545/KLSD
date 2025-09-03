"use client";

import { Card, CardContent } from "@/components/ui/card";
import { type DiveTripData } from "../data";

interface MarineLifeSectionProps {
  data: DiveTripData;
}

export default function MarineLifeSection({ data }: MarineLifeSectionProps) {
  const colorClasses = {
    blue: "bg-blue-500",
    teal: "bg-teal-500",
    orange: "bg-orange-500",
  };

  const colorBackgrounds = {
    blue: "bg-blue-50",
    teal: "bg-teal-50",
    orange: "bg-orange-50",
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {data.marineLife.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {data.marineLife.description}
            </p>
          </div>

          {/* Marine Life Categories */}
          <div className="grid lg:grid-cols-3 gap-8">
            {data.marineLife.categories.map((category, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`h-2 ${colorClasses[category.color]}`}></div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="space-y-2">
                    {category.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className={`inline-block mr-2 mb-2 px-3 py-1 rounded-full text-sm font-medium ${colorBackgrounds[category.color]} text-gray-700`}
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
