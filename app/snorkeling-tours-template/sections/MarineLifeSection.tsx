"use client";

import { Card, CardContent } from "@/components/ui/card";
import { type TourData } from "../data";
import { Fish, Waves, Camera } from "lucide-react";

interface MarineLifeSectionProps {
  data: TourData;
}

export default function MarineLifeSection({ data }: MarineLifeSectionProps) {
  // Icon mapping function
  const getIcon = (color: string) => {
    const iconMap = {
      blue: Fish,
      teal: Waves,
      orange: Camera
    };
    return iconMap[color as keyof typeof iconMap] || Fish;
  };

  // Color mapping for different categories
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-gradient-to-br from-blue-400 to-blue-600",
        dot: "bg-blue-500"
      },
      teal: {
        bg: "bg-gradient-to-br from-teal-400 to-teal-600",
        dot: "bg-teal-500"
      },
      orange: {
        bg: "bg-gradient-to-br from-orange-400 to-orange-600",
        dot: "bg-orange-500"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="marine-life" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {data.marineLife.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {data.marineLife.description}
          </p>
        </div>

        {/* Desktop: Grid layout, Mobile: Horizontal scroll */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.marineLife.categories.map((category, index) => {
            const IconComponent = getIcon(category.color);
            const colors = getColorClasses(category.color);
            
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-none shadow-lg">
                <CardContent className="p-0">
                  <div className={`h-48 ${colors.bg} flex items-center justify-center relative overflow-hidden`}>
                    <IconComponent className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{category.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="space-y-2">
                      {category.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className={`w-2 h-2 ${colors.dot} rounded-full`}></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="lg:hidden overflow-x-auto pb-4">
          <div className="flex gap-6 px-4" style={{ width: 'max-content' }}>
            {data.marineLife.categories.map((category, index) => {
              const IconComponent = getIcon(category.color);
              const colors = getColorClasses(category.color);
              
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-none shadow-lg flex-shrink-0 w-80">
                  <CardContent className="p-0">
                    <div className={`h-48 ${colors.bg} flex items-center justify-center relative overflow-hidden`}>
                      <IconComponent className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">{category.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="space-y-2">
                        {category.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className={`w-2 h-2 ${colors.dot} rounded-full`}></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
