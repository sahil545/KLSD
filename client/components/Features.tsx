import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Fish, 
  Camera, 
  Shield, 
  Users, 
  Clock, 
  Award,
  Waves,
  Heart
} from "lucide-react";

const features = [
  {
    icon: Fish,
    title: "Sacred Underwater Experience",
    description: "Visit the iconic 9-foot bronze Christ of the Abyss statue, submerged in 25 feet of crystal-clear water in John Pennekamp Coral Reef State Park.",
    badge: "Iconic"
  },
  {
    icon: Camera,
    title: "Professional Photos Included",
    description: "Our certified guides capture your underwater moments with professional photography equipment. Take home stunning memories of your adventure.",
    badge: "Free Photos"
  },
  {
    icon: Shield,
    title: "Safety First Approach",
    description: "All equipment inspected and sanitized. PADI certified guides ensure your safety while exploring the vibrant coral reef ecosystem.",
    badge: "PADI Certified"
  },
  {
    icon: Users,
    title: "Small Group Experience",
    description: "Maximum 8 guests per tour ensures personalized attention and a more intimate experience with the marine life and statue.",
    badge: "VIP Experience"
  },
  {
    icon: Waves,
    title: "Perfect Water Conditions",
    description: "Key Largo's protected waters offer year-round visibility of 60-100 feet, perfect for snorkeling and underwater photography.",
    badge: "Crystal Clear"
  },
  {
    icon: Award,
    title: "Award-Winning Service",
    description: "Voted #1 snorkeling tour in Key Largo for 5 consecutive years. Join thousands of satisfied adventurers who've experienced the magic.",
    badge: "#1 Rated"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-ocean-light/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-ocean border-ocean/20">
            Why Choose Us
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            An Unforgettable 
            <span className="text-ocean"> Sacred Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover why thousands of adventurers choose our Christ Statue Snorkeling Tour 
            for their Key Largo underwater experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80"
            >
              <CardContent className="p-8">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-ocean/10 rounded-2xl flex items-center justify-center group-hover:bg-ocean/20 transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-ocean" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="bg-coral/10 text-coral border-coral/20 hover:bg-coral/20"
                  >
                    {feature.badge}
                  </Badge>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-ocean transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-ocean/5 rounded-full px-6 py-3 border border-ocean/20">
            <Heart className="w-5 h-5 text-coral" />
            <span className="text-ocean font-medium">
              Join 10,000+ happy adventurers who've experienced the magic
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
