"use client";

import { Card, CardContent } from "@/components/ui/card";
import { type TourData } from "../data";
import { 
  CheckCircle, 
  Fish,
  Waves,
  Shield,
  Award
} from "lucide-react";

interface ExperienceSectionProps {
  data: TourData;
}

// Icon mapping function
const getIcon = (iconName: string) => {
  const icons = {
    Fish: Fish,
    Waves: Waves,
    Shield: Shield
  };
  return icons[iconName as keyof typeof icons] || Fish;
};

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  return (
    <section id="overview" className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
      {/* Ocean Background with Contour Lines */}
      <div className="absolute inset-0 bg-blue-50/70" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='600' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2359D6D6' stroke-width='1' opacity='0.7'%3E%3C!-- Irregular contour islands --%3E%3Cpath d='M80,120 C120,100 180,110 220,130 C260,150 290,140 320,120 C350,100 380,110 400,130 C420,150 400,170 380,180 C360,190 340,185 320,175 C300,165 280,170 260,180 C240,190 220,185 200,175 C180,165 160,160 140,150 C120,140 100,135 80,120 Z'/%3E%3Cpath d='M100,140 C130,125 170,135 200,150 C230,165 250,160 270,145 C290,130 310,135 330,150 C350,165 340,180 320,185 C300,190 280,185 260,175 C240,165 220,170 200,175 C180,180 160,175 140,165 C120,155 110,150 100,140 Z'/%3E%3Cpath d='M120,160 C140,150 170,155 190,165 C210,175 220,170 230,160 C240,150 250,155 260,165 C270,175 265,185 250,188 C235,191 220,188 205,183 C190,178 175,180 160,185 C145,190 135,185 125,175 C115,165 117,155 120,160 Z'/%3E%3C!-- Separate contour formation --%3E%3Cpath d='M450,80 C490,70 530,85 560,110 C580,135 575,160 550,180 C525,200 490,195 460,175 C430,155 425,130 440,105 C455,80 450,80 450,80 Z'/%3E%3Cpath d='M470,100 C500,95 525,105 540,125 C555,145 550,160 535,170 C520,180 500,175 485,165 C470,155 468,140 475,125 C482,110 470,100 470,100 Z'/%3E%3Cpath d='M485,120 C500,118 515,125 520,135 C525,145 520,155 510,158 C500,161 490,158 485,150 C480,142 482,130 485,120 Z'/%3E%3C!-- Bottom formation --%3E%3Cpath d='M150,350 C200,330 250,340 300,360 C350,380 400,375 450,355 C500,335 5...`,
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat'
        }}
      />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {data.experience.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {data.experience.description}
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-16">
            <img
              src={data.images.gallery[0]}
              alt="Christ of the Abyss bronze statue underwater in Key Largo Florida Keys snorkeling tour"
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Experience Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">

            {/* Left Column */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">The Experience</h3>
              <div className="space-y-6">
                {data.experience.features.map((feature, index) => {
                  const IconComponent = getIcon(feature.icon);
                  const colorClasses = [
                    "bg-blue-100 text-blue-600",
                    "bg-teal-100 text-teal-600",
                    "bg-orange-100 text-orange-600"
                  ];
                  
                  return (
                    <div key={index} className="flex gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 ${colorClasses[index]} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{data.included.title}</h3>
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="space-y-4">
                  {data.included.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                
                {data.included.award && (
                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Award className="w-5 h-5" />
                      <span className="font-semibold">{data.included.award}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
