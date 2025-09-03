"use client";

import { Card, CardContent } from "@/components/ui/card";
import { type DiveTripData } from "../data";
import { Star, Shield, Users, Award } from "lucide-react";

interface TrustSectionProps {
  data: DiveTripData;
}

export default function TrustSection({ data }: TrustSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {data.trustIndicators.title}
            </h2>
            <p className="text-xl text-gray-600">
              {data.trustIndicators.subtitle}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {data.trustIndicators.stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Features */}
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">100% Safety Record</h3>
                <p className="text-sm text-gray-600">
                  Perfect safety record with comprehensive insurance and
                  emergency protocols
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Expert Guides</h3>
                <p className="text-sm text-gray-600">
                  PADI certified dive masters with extensive local knowledge
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">Top Rated</h3>
                <p className="text-sm text-gray-600">
                  Consistently rated #1 dive operator in the Florida Keys
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Award Winning</h3>
                <p className="text-sm text-gray-600">
                  Multiple industry awards for excellence and environmental
                  stewardship
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
