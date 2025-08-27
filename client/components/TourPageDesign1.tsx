import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Heart,
  Award,
  BookOpen,
  PhoneCall
} from "lucide-react";

export default function TourPageDesign1() {
  return (
    <div className="bg-white">
      {/* Overview Section - SEO Rich */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Experience the Famous Christ of the Abyss Statue
                </h2>
                
                <div className="bg-blue-100 border-l-4 border-blue-500 p-6 mb-8">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">What Makes This Tour Special</h3>
                  <p className="text-blue-800 leading-relaxed">
                    Dive into history at the world-famous Christ of the Abyss statue in John Pennekamp Coral Reef State Park. 
                    This 9-foot bronze statue stands in 25 feet of crystal-clear waters, creating an otherworldly experience 
                    that combines spiritual serenity with marine adventure.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Tour Highlights</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Visit the iconic 9-foot bronze Christ statue</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Snorkel in crystal-clear 25-foot deep waters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Explore vibrant coral reef ecosystem</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Professional underwater photography opportunities</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">What's Included</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Professional-grade snorkeling equipment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">PADI certified dive guides</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Marine life identification guide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Complimentary park entrance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Tour Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Duration</div>
                        <div className="text-sm text-gray-600">4 hours (including travel)</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Group Size</div>
                        <div className="text-sm text-gray-600">Maximum 25 guests</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Meeting Point</div>
                        <div className="text-sm text-gray-600">John Pennekamp State Park</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Waves className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Difficulty</div>
                        <div className="text-sm text-gray-600">Beginner friendly</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">Award Winning</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Winner of Florida Keys Tourism Excellence Award 2023
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Your Journey Timeline - Royal Gorge Style */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From arrival to the unforgettable underwater experience with Christ of the Abyss
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-blue-200 hidden lg:block transform translate-x-1/2"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Welcome & Briefing</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Meet our PADI certified team at John Pennekamp State Park. Equipment fitting and comprehensive safety briefing.
                </p>
                <div className="mt-3 text-xs text-blue-600 font-medium">8:00 AM - 30 minutes</div>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-2xl">2</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-blue-200 hidden lg:block transform translate-x-1/2"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Scenic Boat Ride</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Comfortable vessel journey through crystal-clear waters to the famous statue location in the coral reef sanctuary.
                </p>
                <div className="mt-3 text-xs text-teal-600 font-medium">8:30 AM - 30 minutes</div>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-blue-200 hidden lg:block transform translate-x-1/2"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Underwater Experience</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Snorkel around the iconic 9-foot bronze Christ statue in 25 feet of pristine water with incredible marine life.
                </p>
                <div className="mt-3 text-xs text-orange-600 font-medium">9:00 AM - 2 hours</div>
              </div>

              {/* Step 4 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-2xl">4</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Return & Memories</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Relaxing journey back to shore with time to share your experience and plan your next Key Largo adventure.
                </p>
                <div className="mt-3 text-xs text-green-600 font-medium">11:00 AM - 30 minutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Incredible Marine Life - Royal Gorge Style */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Incredible Marine Life
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              John Pennekamp Coral Reef State Park hosts over 65 species of tropical fish
              and 40 species of coral in this protected underwater sanctuary.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Marine Life Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <Fish className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Tropical Fish Paradise</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Swim alongside vibrant parrotfish, graceful angelfish, curious sergeant majors, and over 60 other species
                  that call these reefs home.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Queen Angelfish</li>
                  <li>• Stoplight Parrotfish</li>
                  <li>• Yellowtail Snapper</li>
                  <li>• French Grunts</li>
                </ul>
              </div>
            </div>

            {/* Marine Life Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <Waves className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Living Coral Gardens</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Explore thriving coral formations including massive brain corals, delicate sea fans,
                  and the iconic elkhorn coral structures.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Brain Coral Colonies</li>
                  <li>• Sea Fan Gardens</li>
                  <li>• Staghorn Formations</li>
                  <li>• Soft Coral Polyps</li>
                </ul>
              </div>
            </div>

            {/* Marine Life Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Camera className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Underwater Photography</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Capture stunning images of the Christ statue surrounded by marine life with crystal-clear
                  60-80 foot visibility.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Professional Photo Tips</li>
                  <li>• Camera Rental Available</li>
                  <li>• Perfect Lighting Conditions</li>
                  <li>• Memorable Compositions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-200">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-blue-200">Safety Record</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book your Christ of the Abyss snorkeling adventure today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3">
              Book Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-3">
              <PhoneCall className="w-5 h-5 mr-2" />
              Call (305) 391-4040
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
