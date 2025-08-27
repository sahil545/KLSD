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
  Award,
  Phone,
  Calendar,
  ArrowRight
} from "lucide-react";

export default function ModernTourContent() {
  return (
    <div className="bg-white">
      {/* Tour Details Section */}
      <section id="overview" className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        {/* Ocean Background with Contour Lines */}
        <div
          className="absolute inset-0 bg-blue-50/70"
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='600' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2359D6D6' stroke-width='1' opacity='0.7'%3E%3C!-- Irregular contour islands --%3E%3Cpath d='M80,120 C120,100 180,110 220,130 C260,150 290,140 320,120 C350,100 380,110 400,130 C420,150 400,170 380,180 C360,190 340,185 320,175 C300,165 280,170 260,180 C240,190 220,185 200,175 C180,165 160,160 140,150 C120,140 100,135 80,120 Z'/%3E%3Cpath d='M100,140 C130,125 170,135 200,150 C230,165 250,160 270,145 C290,130 310,135 330,150 C350,165 340,180 320,185 C300,190 280,185 260,175 C240,165 220,170 200,175 C180,180 160,175 140,165 C120,155 110,150 100,140 Z'/%3E%3Cpath d='M120,160 C140,150 170,155 190,165 C210,175 220,170 230,160 C240,150 250,155 260,165 C270,175 265,185 250,188 C235,191 220,188 205,183 C190,178 175,180 160,185 C145,190 135,185 125,175 C115,165 117,155 120,160 Z'/%3E%3C!-- Separate contour formation --%3E%3Cpath d='M450,80 C490,70 530,85 560,110 C580,135 575,160 550,180 C525,200 490,195 460,175 C430,155 425,130 440,105 C455,80 450,80 450,80 Z'/%3E%3Cpath d='M470,100 C500,95 525,105 540,125 C555,145 550,160 535,170 C520,180 500,175 485,165 C470,155 468,140 475,125 C482,110 470,100 470,100 Z'/%3E%3Cpath d='M485,120 C500,118 515,125 520,135 C525,145 520,155 510,158 C500,161 490,158 485,150 C480,142 482,130 485,120 Z'/%3E%3C!-- Bottom formation --%3E%3Cpath d='M150,350 C200,330 250,340 300,360 C350,380 400,375 450,355 C500,335 520,350 540,370 C560,390 555,420 530,440 C505,460 470,455 440,435 C410,415 380,420 350,440 C320,460 290,455 260,435 C230,415 210,400 190,380 C170,360 150,350 150,350 Z'/%3E%3Cpath d='M180,370 C220,355 260,365 300,380 C340,395 370,390 400,375 C430,360 450,370 470,385 C490,400 485,420 470,430 C455,440 435,438 415,428 C395,418 375,422 355,432 C335,442 315,438 295,428 C275,418 260,410 245,395 C230,380 220,375 200,380 C180,385 175,375 180,370 Z'/%3E%3C!-- Valley formation --%3E%3Cpath d='M50,250 C90,230 130,240 170,260 C210,280 240,275 270,255 C300,235 320,245 340,265 C360,285 355,310 335,325 C315,340 285,335 255,320 C225,305 195,310 165,325 C135,340 105,335 85,320 C65,305 60,285 70,265 C80,245 50,250 50,250 Z'/%3E%3C/g%3E%3Cg fill='none' stroke='%233B82F6' stroke-width='0.8' opacity='0.5'%3E%3C!-- Overlapping smaller contours --%3E%3Cpath d='M350,200 C380,190 410,195 430,215 C450,235 445,255 425,265 C405,275 380,270 365,255 C350,240 348,225 355,210 C362,195 350,200 350,200 Z'/%3E%3Cpath d='M365,215 C385,210 400,215 410,230 C420,245 415,255 405,260 C395,265 380,262 370,252 C360,242 362,227 365,215 Z'/%3E%3Cpath d='M250,480 C290,470 330,480 360,500 C390,520 385,545 365,555 C345,565 315,560 295,545 C275,530 270,510 280,490 C290,470 250,480 250,480 Z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px',
            backgroundRepeat: 'repeat'
          }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Makes This Experience Special
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover the world-famous Christ of the Abyss statue in the pristine waters 
                of John Pennekamp Coral Reef State Park
              </p>
            </div>

            {/* Hero Image */}
            <div className="mb-16">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=1200"
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
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Fish className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Iconic Underwater Statue</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Visit the famous 9-foot bronze Christ of the Abyss statue, standing majestically 
                        in 25 feet of crystal-clear water as a beacon of peace and wonder.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Waves className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Pristine Marine Sanctuary</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Snorkel through vibrant coral gardens teeming with tropical fish in America's 
                        first underwater park, protected since 1963.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Expert Guidance</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Our PADI certified dive masters provide comprehensive safety briefings 
                        and marine life education throughout your journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">What's Included</h3>
                <div className="bg-blue-50 rounded-2xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Professional snorkeling equipment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">PADI certified dive guide</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">John Pennekamp park entrance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Marine life identification guide</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Safety equipment & briefing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Free parking</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Award className="w-5 h-5" />
                      <span className="font-semibold">Florida Keys Excellence Award Winner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section id="journey" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your 4-Hour Journey</h2>
            <p className="text-xl text-gray-600">From arrival to unforgettable memories</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              
              {/* Step 1 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  {/* Connection line */}
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-teal-300 hidden lg:block transform translate-x-10"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Welcome & Preparation</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Meet our team at John Pennekamp State Park for equipment fitting and comprehensive safety briefing.
                </p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  8:00 AM - 30 minutes
                </Badge>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-2xl">2</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-teal-300 to-orange-300 hidden lg:block transform translate-x-10"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Scenic Boat Journey</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Cruise through crystal-clear waters to the statue location while learning about the area's history.
                </p>
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  8:30 AM - 30 minutes
                </Badge>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-300 to-green-300 hidden lg:block transform translate-x-10"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Underwater Adventure</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Snorkel around the iconic Christ statue and explore the vibrant coral reef ecosystem.
                </p>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  9:00 AM - 2.5 hours
                </Badge>
              </div>

              {/* Step 4 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-2xl">4</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Return & Reflection</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Relax on the return journey while sharing your experience and planning future adventures.
                </p>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  11:30 AM - 30 minutes
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Incredible Marine Life */}
      <section id="marine-life" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Incredible Marine Life
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              John Pennekamp Coral Reef State Park hosts over 65 species of tropical fish
              and 40 species of coral in this protected underwater sanctuary.
            </p>
          </div>

          {/* Desktop: Grid layout, Mobile: Horizontal scroll */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Marine Life Card 1 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-none shadow-lg">
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative overflow-hidden">
                  <Fish className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Tropical Fish Paradise</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Swim alongside vibrant parrotfish, graceful angelfish, curious sergeant majors,
                    and over 60 other colorful species that call these reefs home.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Queen Angelfish</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Stoplight Parrotfish</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Yellowtail Snapper</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Marine Life Card 2 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-none shadow-lg">
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center relative overflow-hidden">
                  <Waves className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Living Coral Gardens</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Explore thriving coral formations including massive brain corals, delicate sea fans,
                    and the iconic elkhorn coral structures.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span>Brain Coral Colonies</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span>Sea Fan Gardens</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span>Staghorn Formations</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Marine Life Card 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-none shadow-lg">
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center relative overflow-hidden">
                  <Camera className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Underwater Photography</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Capture stunning images of the Christ statue surrounded by marine life with crystal-clear
                    60-80 foot visibility perfect for photography.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Professional Photo Tips</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Camera Rental Available</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Perfect Lighting Conditions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile: Horizontal scroll */}
          <div className="lg:hidden overflow-x-auto pb-4">
            <div className="flex gap-6 px-4" style={{ width: 'max-content' }}>

              {/* Marine Life Card 1 - Mobile */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-none shadow-lg flex-shrink-0 w-80">
                <CardContent className="p-0">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative overflow-hidden">
                    <Fish className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Tropical Fish Paradise</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Swim alongside vibrant parrotfish, graceful angelfish, curious sergeant majors,
                      and over 60 other colorful species that call these reefs home.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Queen Angelfish</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Stoplight Parrotfish</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Yellowtail Snapper</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Marine Life Card 2 - Mobile */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-none shadow-lg flex-shrink-0 w-80">
                <CardContent className="p-0">
                  <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center relative overflow-hidden">
                    <Waves className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Living Coral Gardens</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Explore thriving coral formations including massive brain corals, delicate sea fans,
                      and the iconic elkhorn coral structures.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span>Brain Coral Colonies</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span>Sea Fan Gardens</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span>Staghorn Formations</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Marine Life Card 3 - Mobile */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-none shadow-lg flex-shrink-0 w-80">
                <CardContent className="p-0">
                  <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center relative overflow-hidden">
                    <Camera className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Underwater Photography</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Capture stunning images of the Christ statue surrounded by marine life with crystal-clear
                      60-80 foot visibility perfect for photography.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Professional Photo Tips</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Camera Rental Available</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Perfect Lighting Conditions</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section id="why-us" className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Why Key Largo Scuba Diving</h2>
            <p className="text-xl text-blue-100 mb-12">The Florida Keys' most trusted diving experience</p>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50,000+</div>
                <div className="text-blue-200">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4.9/5</div>
                <div className="text-blue-200">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-200">Safety Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="book-now" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready for Your Underwater Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book your Christ of the Abyss experience today and create memories that will last a lifetime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg">
                Book Your Tour Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call (305) 391-4040
              </Button>
            </div>
            
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Instant confirmation
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Free cancellation
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Best price guarantee
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
