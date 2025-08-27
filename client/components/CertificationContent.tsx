"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Clock, CheckCircle } from "lucide-react";
import { WordPressImage } from "./WordPressImage";

export function CertificationContent() {
  const certifications = [
    {
      title: "Open Water Diver",
      description: "Learn the fundamentals of scuba diving",
      duration: "3-4 days",
      price: "$299",
      level: "Beginner",
    },
    {
      title: "Advanced Open Water",
      description: "Expand your diving skills and experience",
      duration: "2-3 days",
      price: "$399",
      level: "Intermediate",
    },
    {
      title: "Rescue Diver",
      description: "Learn to prevent and manage diving emergencies",
      duration: "3-4 days",
      price: "$499",
      level: "Advanced",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Conversion-Optimized Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Content - Left Side */}
        <div className="text-center lg:text-left">
          <Badge className="mb-4 bg-klsd-blue text-white">PADI Certified</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Get Scuba Certified in Key Largo
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Professional PADI training with 25+ years of experience. Small
            classes, expert instructors, all equipment included.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle className="w-5 h-5 text-klsd-blue" />
              <span>PADI 5★ Center</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle className="w-5 h-5 text-klsd-blue" />
              <span>Max 4 Students</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle className="w-5 h-5 text-klsd-blue" />
              <span>All Gear Included</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle className="w-5 h-5 text-klsd-blue" />
              <span>25+ Years Exp</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="bg-klsd-blue hover:bg-klsd-blue-dark text-lg px-8 py-4"
            >
              Start Certification - $299
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-klsd-blue text-klsd-blue hover:bg-klsd-blue hover:text-white"
            >
              Call (305) 391-4040
            </Button>
          </div>
        </div>

        {/* Image - Right Side */}
        <div className="order-first lg:order-last">
          <WordPressImage
            filename="scuba-diving-certification-florida-keys"
            width={600}
            height={400}
            alt="PADI Scuba Diving Certification in Florida Keys"
            className="w-full rounded-lg shadow-lg"
            priority={true}
            sizes="(max-width: 1024px) 100vw, 600px"
          />

          {/* Trust Indicators */}
          <div className="mt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1">4.9/5 (500+ reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {certifications.map((cert, index) => (
          <Card
            key={index}
            className="group hover:shadow-xl transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant="outline"
                  className="text-klsd-blue border-klsd-blue"
                >
                  {cert.level}
                </Badge>
                <Award className="w-6 h-6 text-klsd-blue" />
              </div>
              <CardTitle className="text-2xl">{cert.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{cert.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-klsd-blue" />
                  <span>{cert.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-klsd-blue" />
                  <span>Max 4 students</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <span className="text-3xl font-bold text-klsd-blue">
                  {cert.price}
                </span>
                <Button className="bg-klsd-blue hover:bg-klsd-blue-dark">
                  Enroll Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="bg-muted/50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            "PADI 5 Star Dive Center",
            "25+ Years Experience",
            "Small Class Sizes",
            "Equipment Included",
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-klsd-blue" />
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
