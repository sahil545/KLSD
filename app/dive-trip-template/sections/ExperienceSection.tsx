"use client";

import { Card, CardContent } from "@/components/ui/card";
import { type DiveTripData } from "../data";
import { Fish, Waves, Camera, Shield, MapPin, Clock } from "lucide-react";

const iconMap = {
  Fish,
  Waves,
  Camera,
  Shield,
  MapPin,
  Clock,
};

interface ExperienceSectionProps {
  data: DiveTripData;
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {data.experience.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {data.experience.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {data.experience.features.map((feature, index) => {
              const IconComponent =
                iconMap[feature.icon as keyof typeof iconMap];

              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      {IconComponent && (
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Dive Sites Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Two Spectacular Dive Sites
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {data.details.diveSites.map((site, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">
                      {site.name}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-blue-600" />
                      <span>Depth: {site.depth}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>Duration: {site.duration}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Highlights:
                    </h5>
                    <ul className="space-y-1">
                      {site.highlights.map((highlight, hIndex) => (
                        <li
                          key={hIndex}
                          className="flex items-start gap-2 text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Marine Life:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {site.marineLife.map((life, lIndex) => (
                        <span
                          key={lIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          {life}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              {data.included.title}
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.included.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {data.included.award && (
              <div className="text-center mt-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  🏆 {data.included.award}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
