"use client";

import { Badge } from "@/components/ui/badge";
import { type TourData } from "../data";

interface JourneySectionProps {
  data: TourData;
}

export default function JourneySection({ data }: JourneySectionProps) {
  // Color mapping for different steps
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        badge: "bg-blue-50 text-blue-700 border-blue-200",
        line: "bg-gradient-to-r from-blue-300 to-teal-300"
      },
      teal: {
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        badge: "bg-teal-50 text-teal-700 border-teal-200",
        line: "bg-gradient-to-r from-teal-300 to-orange-300"
      },
      orange: {
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
        badge: "bg-orange-50 text-orange-700 border-orange-200",
        line: "bg-gradient-to-r from-orange-300 to-green-300"
      },
      green: {
        bg: "bg-gradient-to-br from-green-500 to-green-600",
        badge: "bg-green-50 text-green-700 border-green-200",
        line: ""
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="journey" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{data.journey.title}</h2>
          <p className="text-xl text-gray-600">{data.journey.description}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {data.journey.steps.map((step, index) => {
              const colors = getColorClasses(step.color);
              const isLast = index === data.journey.steps.length - 1;
              
              return (
                <div key={step.step} className="text-center group">
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-105 transition-transform`}>
                      <span className="text-white font-bold text-2xl">{step.step}</span>
                    </div>
                    {/* Connection line */}
                    {!isLast && (
                      <div className={`absolute top-10 left-1/2 w-full h-0.5 ${colors.line} hidden lg:block transform translate-x-10`}></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <Badge variant="outline" className={colors.badge}>
                    {step.time}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
