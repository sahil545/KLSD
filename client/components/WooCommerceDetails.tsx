import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  MapPin, 
  Users, 
  Camera, 
  Fish, 
  Shield, 
  Car,
  Waves,
  AlertTriangle,
  CheckCircle,
  Star,
  Calendar
} from "lucide-react";

export default function WooCommerceDetails() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-ocean-light/5">
      <div className="container mx-auto px-4">
        {/* Tour Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-ocean/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Fish className="w-8 h-8 text-ocean" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Sacred Underwater Experience</h3>
              <p className="text-muted-foreground">
                Visit the iconic 9-foot bronze Christ of the Abyss statue, submerged in 25 feet of crystal-clear water.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-ocean/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-ocean" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Perfect for Photography</h3>
              <p className="text-muted-foreground">
                Crystal-clear waters with 60-100ft visibility provide ideal conditions for underwater photography.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-ocean/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-ocean" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">PADI Certified Guides</h3>
              <p className="text-muted-foreground">
                Professional, certified guides ensure your safety while sharing marine life knowledge.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="included">What's Included</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Waves className="w-6 h-6 text-ocean" />
                    Tour Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Experience one of the most unique and spiritual underwater adventures in the Florida Keys. 
                    The Christ of the Abyss statue stands majestically in 25 feet of crystal-clear water in 
                    John Pennekamp Coral Reef State Park, creating an unforgettable snorkeling experience.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Why This Tour is Special</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-ocean mt-0.5 flex-shrink-0" />
                          <span>Iconic 9-foot bronze statue submerged since 1965</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-ocean mt-0.5 flex-shrink-0" />
                          <span>Perfect for all skill levels - beginners welcome</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-ocean mt-0.5 flex-shrink-0" />
                          <span>Protected waters in America's first underwater park</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-ocean mt-0.5 flex-shrink-0" />
                          <span>Abundant marine life and coral formations</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Tour Highlights</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
                          <span>Christ of the Abyss statue viewing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
                          <span>Vibrant coral reef exploration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
                          <span>Tropical fish identification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
                          <span>Marine conservation education</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="itinerary" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-ocean" />
                    Daily Itinerary (4 Hours)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-ocean/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-ocean font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Check-in & Safety Briefing</h4>
                        <p className="text-sm text-muted-foreground mb-2">30 minutes</p>
                        <p className="text-muted-foreground">
                          Meet at John Pennekamp State Park marina. Equipment fitting, safety briefing, 
                          and snorkeling instruction for beginners.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-ocean/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-ocean font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Boat Departure</h4>
                        <p className="text-sm text-muted-foreground mb-2">20 minutes</p>
                        <p className="text-muted-foreground">
                          Scenic boat ride to the Christ of the Abyss site. Learn about the statue's 
                          history and the marine sanctuary.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-ocean/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-ocean font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Christ Statue Snorkeling</h4>
                        <p className="text-sm text-muted-foreground mb-2">90 minutes</p>
                        <p className="text-muted-foreground">
                          Extended snorkeling time at the statue site. Explore the coral reef, 
                          observe marine life, and experience this sacred underwater monument.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-ocean/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-ocean font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Return & Debrief</h4>
                        <p className="text-sm text-muted-foreground mb-2">40 minutes</p>
                        <p className="text-muted-foreground">
                          Return to marina with discussion about marine life observed and 
                          conservation efforts in the Florida Keys.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="included" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">✓ What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Professional snorkeling equipment (mask, fins, snorkel, vest)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>PADI certified dive guide</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Safety briefing and snorkeling instruction</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Free parking at state park</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Complimentary water and light snacks</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Marine life identification guide</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-muted-foreground">Not Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <Car className="w-5 h-5" />
                        <span>Transportation to/from hotels</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Camera className="w-5 h-5" />
                        <span>Underwater camera rental ($25 available)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Calendar className="w-5 h-5" />
                        <span>State park entry fee ($2.50 per person)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Fish className="w-5 h-5" />
                        <span>Lunch (recommendations provided)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-ocean" />
                      Who Can Join
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Minimum age: 5 years old</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>All swimming levels welcome</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>No snorkeling experience required</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Families and couples welcome</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-orange-700">
                      <AlertTriangle className="w-6 h-6" />
                      Important Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>Must be comfortable in water</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>Weather dependent - tours may be cancelled for safety</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>Bring swimwear, towel, and sunscreen</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>No touching or standing on coral - marine protection laws</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
