import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, TrendingUp, Users, Award, Calendar } from "lucide-react";

const testimonials = [
  {
    name: "Sarah & Mike Johnson",
    location: "Orlando, FL",
    rating: 5,
    text: "Absolutely incredible experience! We were nervous as first-time snorkelers, but the guide made us feel completely safe. The Christ statue was breathtaking - photos don't do it justice. We saw so many colorful fish and the water was crystal clear. Worth every penny!",
    tour: "Christ Statue Tour",
    initials: "SJ",
    verified: true,
    days_ago: 3
  },
  {
    name: "Jennifer Rodriguez",
    location: "Miami, FL", 
    rating: 5,
    text: "This was the highlight of our Key Largo vacation! The statue is absolutely magnificent underwater. Our guide was knowledgeable about marine life and made sure everyone felt comfortable. The small group size made it feel very personal. Highly recommend!",
    tour: "Christ Statue Tour",
    initials: "JR",
    verified: true,
    days_ago: 7
  },
  {
    name: "David & Lisa Chen",
    location: "Atlanta, GA",
    rating: 5,
    text: "We've done snorkeling tours all over the Caribbean, but this was something special. The spiritual aspect of the Christ statue combined with the incredible marine life made this unforgettable. Professional crew and excellent equipment. We'll definitely be back!",
    tour: "Christ Statue Tour", 
    initials: "DC",
    verified: true,
    days_ago: 12
  }
];

const stats = [
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    sublabel: "487 reviews"
  },
  {
    icon: Users,
    value: "12,000+",
    label: "Happy Guests",
    sublabel: "This year alone"
  },
  {
    icon: Award,
    value: "#1",
    label: "Rated Tour",
    sublabel: "TripAdvisor 2024"
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Recommend Rate",
    sublabel: "Would book again"
  }
];

export default function WooCommerceSocialProof() {
  return (
    <section className="py-16 bg-gradient-to-b from-ocean-light/5 to-background">
      <div className="container mx-auto px-4">
        {/* Trust Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-ocean/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-ocean" />
                </div>
                <div className="text-3xl font-bold text-ocean mb-1">{stat.value}</div>
                <div className="font-semibold text-foreground">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-ocean border-ocean/20">
            Guest Reviews
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our Guests Are 
            <span className="text-ocean"> Saying</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Read authentic reviews from recent guests who experienced the magic of the 
            Christ of the Abyss statue snorkeling tour.
          </p>
        </div>

        {/* Recent Reviews */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="border-0 bg-white/80 backdrop-blur-sm hover:bg-white/95 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Quote decoration */}
                    <div className="w-12 h-12 bg-ocean/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Quote className="w-6 h-6 text-ocean" />
                    </div>

                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-ocean/20">
                            <AvatarFallback className="bg-ocean/10 text-ocean font-semibold">
                              {testimonial.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{testimonial.location}</span>
                              <span>•</span>
                              <span>{testimonial.days_ago} days ago</span>
                              {testimonial.verified && (
                                <>
                                  <span>•</span>
                                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-700 border-green-500/20">
                                    ✓ Verified Guest
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-coral fill-coral" />
                          ))}
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
                        "{testimonial.text}"
                      </p>

                      {/* Tour Badge */}
                      <Badge 
                        variant="outline" 
                        className="bg-ocean/5 text-ocean border-ocean/20"
                      >
                        {testimonial.tour}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Reviews CTA */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-ocean/10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-coral fill-coral" />
              <span className="text-2xl font-bold text-ocean">4.9 out of 5</span>
            </div>
            <p className="text-muted-foreground mb-6 text-lg">
              Based on <span className="font-semibold text-foreground">487 verified reviews</span> from recent guests
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-2 border-ocean text-ocean hover:bg-ocean hover:text-white">
                Read All Reviews
              </Button>
              <Button size="lg" className="bg-coral hover:bg-coral/90 text-white">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Experience
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xs font-bold">✓</span>
              </div>
              <span className="text-sm text-muted-foreground">PADI Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-bold">✓</span>
              </div>
              <span className="text-sm text-muted-foreground">Licensed Operator</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xs font-bold">✓</span>
              </div>
              <span className="text-sm text-muted-foreground">Insured & Bonded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xs font-bold">✓</span>
              </div>
              <span className="text-sm text-muted-foreground">15 Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
