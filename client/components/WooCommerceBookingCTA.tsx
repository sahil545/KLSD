import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Phone, 
  Clock, 
  Shield, 
  AlertCircle, 
  CheckCircle,
  Users,
  Star,
  DollarSign,
  Zap
} from "lucide-react";

export default function WooCommerceBookingCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-ocean/10 via-ocean-light/20 to-ocean/10">
      <div className="container mx-auto px-4">
        {/* Main CTA Card */}
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2">
              {/* Left Side - Urgency & Benefits */}
              <div className="p-8 lg:p-12 bg-gradient-to-br from-ocean to-ocean-dark text-white">
                <div className="space-y-6">
                  {/* Urgency Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Limited Availability</h3>
                      <p className="text-foam/80">Don't miss out on this experience</p>
                    </div>
                  </div>

                  {/* Urgency Points */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-coral flex-shrink-0" />
                      <span className="text-foam/90">Most tours sell out within 24 hours of departure</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-coral flex-shrink-0" />
                      <span className="text-foam/90">Only 25 spots available per tour</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-coral flex-shrink-0" />
                      <span className="text-foam/90">Only 3 departures daily</span>
                    </div>
                  </div>

                  {/* Competitive Advantage */}
                  <div className="bg-coral/20 backdrop-blur-sm rounded-lg p-4 border border-coral/30">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-coral" />
                      <span className="font-semibold text-foam">Save Money!</span>
                    </div>
                    <p className="text-foam/90 text-sm">
                      We don't charge booking fees like TripAdvisor or Viator. 
                      <span className="font-semibold"> Save $15-25 per person</span> by booking direct!
                    </p>
                  </div>

                  {/* Guarantees */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foam">Our Promise to You:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-foam/90 text-sm">100% money-back if cancelled due to weather</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-foam/90 text-sm">Instant confirmation - no waiting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-foam/90 text-sm">PADI certified guides for your safety</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-foam/90 text-sm">All equipment included - no hidden costs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Booking Actions */}
              <div className="p-8 lg:p-12">
                <div className="space-y-6">
                  {/* Pricing Highlight */}
                  <div className="text-center">
                    <Badge className="bg-green-500/10 text-green-700 border-green-500/20 mb-4">
                      Limited Time Pricing
                    </Badge>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-5xl font-bold text-ocean">$70</span>
                      <div className="text-left text-muted-foreground">
                        <div className="text-sm">+ tax</div>
                        <div className="text-sm">per person</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Compare: Other operators charge $85-95 + booking fees
                    </p>
                  </div>

                  {/* Primary CTA */}
                  <Button 
                    size="lg" 
                    className="w-full bg-coral hover:bg-coral/90 text-white font-bold py-6 text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Calendar className="w-6 h-6 mr-3" />
                    Secure Your Spot Now
                  </Button>

                  {/* Trust Elements */}
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Instant Confirmation</span>
                    </div>
                  </div>

                  {/* Alternative - Phone */}
                  <div className="text-center border-t pt-6">
                    <p className="text-muted-foreground mb-4">
                      Prefer to speak with someone?
                    </p>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full border-2 border-ocean text-ocean hover:bg-ocean hover:text-white font-semibold"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call (305) 391-4040
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Available 7 days a week, 8am-6pm
                    </p>
                  </div>

                  {/* Social Proof */}
                  <div className="bg-ocean/5 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-coral fill-coral" />
                      <Star className="w-5 h-5 text-coral fill-coral" />
                      <Star className="w-5 h-5 text-coral fill-coral" />
                      <Star className="w-5 h-5 text-coral fill-coral" />
                      <Star className="w-5 h-5 text-coral fill-coral" />
                      <span className="font-semibold text-ocean ml-2">4.9/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">487 reviews</span> • 
                      <span className="font-semibold"> 12,000+ happy guests</span> this year
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Trust Bar */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 bg-white/50 backdrop-blur-sm rounded-2xl px-8 py-4 border border-ocean/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-foreground">15 Years Experience</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-foreground">PADI Certified</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-foreground">Top Rated</span>
            </div>
          </div>
        </div>

        {/* Final Urgency Message */}
        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground">
            🔥 <span className="font-semibold text-coral">24 people</span> viewed this tour in the last hour
          </p>
        </div>
      </div>
    </section>
  );
}
