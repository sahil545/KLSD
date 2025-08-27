import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    location: "Miami, FL",
    rating: 5,
    text: "The Christ of the Abyss experience was absolutely magical! The water was so clear and the statue was breathtaking. Our guide Mark was incredibly knowledgeable and made sure everyone felt safe and comfortable. The photos they took were stunning - we'll treasure them forever!",
    tour: "Christ Statue Tour",
    initials: "SC"
  },
  {
    name: "Michael Rodriguez",
    location: "Orlando, FL",
    rating: 5,
    text: "I've been snorkeling all over the Caribbean, but this was something special. The spiritual experience of seeing the Christ statue underwater was unlike anything else. The small group size meant we got personal attention and the best spots to view the statue.",
    tour: "Private Group Tour",
    initials: "MR"
  },
  {
    name: "Jennifer & Tom Walsh",
    location: "Atlanta, GA",
    rating: 5,
    text: "Perfect anniversary trip! We were nervous as first-time snorkelers, but the crew was amazing. They provided all the gear and taught us everything we needed to know. Seeing the statue together was incredibly moving. Highly recommend!",
    tour: "Couples Experience",
    initials: "JT"
  },
  {
    name: "David Kim",
    location: "New York, NY",
    rating: 5,
    text: "Brought my teenage kids and they absolutely loved it! The marine life around the statue was incredible - we saw so many colorful fish and even a sea turtle. The professional photos captured memories we'll have forever. Worth every penny!",
    tour: "Family Adventure",
    initials: "DK"
  },
  {
    name: "Lisa Thompson",
    location: "Chicago, IL",
    rating: 5,
    text: "As a solo traveler, I was made to feel completely welcome. The small group became like a little family for the day. The Christ statue was even more impressive in person than in photos. This tour exceeded all my expectations!",
    tour: "Solo Adventure",
    initials: "LT"
  },
  {
    name: "Carlos & Maria Santos",
    location: "Texas",
    rating: 5,
    text: "We've done many tours in Florida, but this was the most memorable. The spiritual aspect of the Christ statue combined with the natural beauty of the reef was incredible. Our guide's passion for marine conservation was inspiring.",
    tour: "Eco-Adventure",
    initials: "CM"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-ocean-light/5 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-ocean border-ocean/20">
            Guest Experiences
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Stories from the 
            <span className="text-ocean">Sacred Waters</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Read what our guests say about their transformative experience visiting 
            the Christ of the Abyss statue.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 relative overflow-hidden"
            >
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="w-8 h-8 text-ocean" />
              </div>

              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-ocean/20">
                      <AvatarFallback className="bg-ocean/10 text-ocean font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-coral fill-coral" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-6">
                  "{testimonial.text}"
                </p>

                {/* Tour Type Badge */}
                <Badge 
                  variant="outline" 
                  className="bg-ocean/5 text-ocean border-ocean/20 hover:bg-ocean/10"
                >
                  {testimonial.tour}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center gap-8 bg-white/50 backdrop-blur-sm rounded-2xl px-8 py-6 border border-ocean/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-ocean">4.9</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-ocean/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-ocean">500+</div>
              <div className="text-sm text-muted-foreground">5-Star Reviews</div>
            </div>
            <div className="w-px h-12 bg-ocean/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-ocean">10,000+</div>
              <div className="text-sm text-muted-foreground">Happy Guests</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
