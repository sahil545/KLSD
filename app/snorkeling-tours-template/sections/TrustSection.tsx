"use client";

import { type TourData } from "../data";

interface TrustSectionProps {
  data: TourData;
}

export default function TrustSection({ data }: TrustSectionProps) {
  return (
    <section id="why-us" className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{data.trustIndicators.title}</h2>
          <p className="text-xl text-blue-100 mb-12">{data.trustIndicators.subtitle}</p>

          <div className="grid md:grid-cols-4 gap-8">
            {data.trustIndicators.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
