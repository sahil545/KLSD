import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle, 
  Star, 
  Shield, 
  Camera,
  Fish,
  Waves,
  TrendingUp,
  Award,
  Calendar,
  Phone,
  MessageCircle,
  ArrowRight,
  AlertCircle,
  ThumbsUp
} from "lucide-react";

export default function TourPageDesign3() {
  return (
    <div className="bg-white">
      {/* Social Proof Banner */}
      <section className="py-4 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="font-semibold">
              🔥 TRENDING: 847 people viewed this tour in the last 24 hours • Book now to secure your spot!
            </span>
          </div>
        </div>
      </section>

      {/* Key Benefits & Urgency */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6">
            
            {/* Main Benefits */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2 border-blue-200 bg-blue-50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">#1 Rated Tour</h3>
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-blue-800 font-semibold">4.9/5 from 2,847 reviews</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 bg-green-50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">100% Safety Record</h3>
                    <p className="text-green-800 font-semibold">25+ years, zero incidents</p>
                    <p className="text-sm text-green-700 mt-1">PADI certified guides</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-200 bg-orange-50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-orange-900 mb-2">Best Value</h3>
                    <p className="text-orange-800 font-semibold">Save $25+ vs competitors</p>
                    <p className="text-sm text-orange-700 mt-1">All equipment included</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Urgency Sidebar */}
            <div>
              <Card className="border-2 border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <h3 className="font-bold text-red-900">Limited Availability</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-800">Today</span>
                        <span className="text-red-600 font-semibold">3 spots left</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-800">Tomorrow</span>
                        <span className="text-red-600 font-semibold">7 spots left</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-800">This Week</span>
                        <span className="text-orange-600 font-semibold">15 spots left</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 font-bold">
                    Book Now - Don't Miss Out!
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Your Journey - Quick Timeline */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your 4-Hour Adventure</h2>
            <p className="text-xl text-gray-600">From arrival to unforgettable memories</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Meet & Greet</h3>
              <p className="text-sm text-gray-600">Equipment fitting & safety briefing</p>
              <div className="text-xs text-blue-600 font-medium mt-2">8:00 AM</div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Boat Journey</h3>
              <p className="text-sm text-gray-600">Scenic ride to statue location</p>
              <div className="text-xs text-teal-600 font-medium mt-2">8:30 AM</div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Snorkel Experience</h3>
              <p className="text-sm text-gray-600">2 hours with the statue & marine life</p>
              <div className="text-xs text-orange-600 font-medium mt-2">9:00 AM</div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold mb-2">Return</h3>
              <p className="text-sm text-gray-600">Share memories on the way back</p>
              <div className="text-xs text-green-600 font-medium mt-2">11:00 AM</div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get - Value Proposition */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything Included - No Hidden Fees
            </h2>
            <p className="text-xl text-gray-600">
              Compare what you get vs. our competition
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* What's Included */}
              <Card className="border-2 border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">
                    ✅ Key Largo Scuba Diving Includes
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Professional snorkeling equipment (mask, fins, snorkel, vest)</span>
                      <Badge className="ml-auto bg-green-100 text-green-800">$35 value</Badge>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">PADI certified dive guide</span>
                      <Badge className="ml-auto bg-green-100 text-green-800">$25 value</Badge>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">John Pennekamp Park entrance fee</span>
                      <Badge className="ml-auto bg-green-100 text-green-800">$10 value</Badge>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Marine life identification guide</span>
                      <Badge className="ml-auto bg-green-100 text-green-800">$15 value</Badge>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Underwater photography assistance</span>
                      <Badge className="ml-auto bg-green-100 text-green-800">$20 value</Badge>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Safety briefing & ongoing support</span>
                      <Badge className="ml-auto bg-green-100 text-green-800">Priceless</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-green-200">
                    <div className="text-center">
                      <div className="text-sm text-green-700">Total Value: $105+</div>
                      <div className="text-2xl font-bold text-green-900">Your Price: $70</div>
                      <div className="text-sm text-green-600">You Save: $35+</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Success Stories */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">JD</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-2">
                          "Absolutely incredible experience! The guide was knowledgeable and the equipment was top-notch. 
                          Seeing the Christ statue was life-changing."
                        </p>
                        <div className="text-sm text-gray-600">- John D., Verified Customer</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">SL</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-2">
                          "Great value! Other companies wanted $95+ for the same experience. 
                          Key Largo Scuba Diving delivered excellence at a fair price."
                        </p>
                        <div className="text-sm text-gray-600">- Sarah L., Verified Customer</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-yellow-200 bg-yellow-50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <ThumbsUp className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-yellow-900 mb-2">98% Satisfaction Rate</div>
                      <p className="text-yellow-800">
                        Out of 2,847 reviews, 2,790 customers rated us 4 or 5 stars
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              100% Risk-Free Booking Guarantee
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Free Cancellation</h3>
                <p className="text-gray-600">Cancel up to 24 hours before for full refund</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Weather Protection</h3>
                <p className="text-gray-600">Reschedule or refund if weather doesn't cooperate</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Satisfaction Promise</h3>
                <p className="text-gray-600">Not satisfied? We'll make it right or refund</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Push CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Don't Wait - Spots Are Filling Fast!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the 50,000+ guests who've experienced the magic of Christ of the Abyss
            </p>
            
            <div className="bg-white/20 rounded-lg p-6 mb-8 inline-block">
              <div className="text-2xl font-bold mb-2">⏰ Limited Time Offer</div>
              <div className="text-lg">Book today and save $15 on equipment rental</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg">
                🔥 Book Now - Save $15
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-6 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: (305) 391-4040
              </Button>
            </div>
            
            <div className="mt-6 text-white/80">
              <span className="text-sm">✓ Instant confirmation </span>
              <span className="text-sm">✓ Free cancellation </span>
              <span className="text-sm">✓ Best price guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
