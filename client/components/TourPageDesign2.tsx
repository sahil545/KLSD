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
  Play,
  ArrowRight,
  Quote
} from "lucide-react";

export default function TourPageDesign2() {
  return (
    <div className="bg-white">
      {/* Hero Story Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url("https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=1200")'
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              ⭐ Featured Experience
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              A Spiritual Journey Beneath the Waves
            </h2>
            <p className="text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed">
              Experience the profound serenity of the Christ of the Abyss statue, 
              where faith meets the ocean's embrace in one of the world's most unique spiritual destinations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 font-semibold">
                <Play className="w-5 h-5 mr-2" />
                Watch Experience Video
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                View Photo Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Your Journey Timeline - Royal Gorge Inspired */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A carefully orchestrated spiritual and natural adventure from shore to sacred statue
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Journey Step 1 */}
              <div className="relative text-center group">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-all duration-300">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  {/* Connection Line */}
                  <div className="absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-teal-300 hidden lg:block transform translate-x-12"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Sacred Welcome</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Begin your spiritual journey with our blessing ceremony and equipment consecration at the historic park entrance.
                </p>
                <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  8:00 AM • 30 min
                </div>
              </div>

              {/* Journey Step 2 */}
              <div className="relative text-center group">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-all duration-300">
                    <span className="text-white font-bold text-2xl">2</span>
                  </div>
                  {/* Connection Line */}
                  <div className="absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-teal-300 to-orange-300 hidden lg:block transform translate-x-12"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Pilgrimage Voyage</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Sail through pristine waters as our guide shares the profound history of the Christ statue's creation and meaning.
                </p>
                <div className="inline-block bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                  8:30 AM • 30 min
                </div>
              </div>

              {/* Journey Step 3 */}
              <div className="relative text-center group">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-all duration-300">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                  {/* Connection Line */}
                  <div className="absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-300 to-green-300 hidden lg:block transform translate-x-12"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Divine Immersion</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Experience transcendence as you swim in the sacred presence of Christ of the Abyss surrounded by God's marine creation.
                </p>
                <div className="inline-block bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                  9:00 AM • 2 hours
                </div>
              </div>

              {/* Journey Step 4 */}
              <div className="relative text-center group">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-all duration-300">
                    <span className="text-white font-bold text-2xl">4</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Reflection & Return</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Share your transformative experience with fellow pilgrims as we return to shore with hearts and minds renewed.
                </p>
                <div className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  11:00 AM • 30 min
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Spotlight */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-none shadow-xl">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center mb-8">
                  <Quote className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <blockquote className="text-2xl lg:text-3xl font-light text-gray-800 leading-relaxed italic">
                    "Swimming alongside the Christ of the Abyss statue was a transformative experience. 
                    The combination of spiritual wonder and natural beauty created memories that will last a lifetime."
                  </blockquote>
                </div>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">MJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Maria Johnson</div>
                    <div className="text-gray-600">Miami, FL</div>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Trust Building */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Key Largo Scuba Diving Leads the Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over 25 years of excellence in marine education and underwater experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Industry Recognition</h3>
              <p className="text-gray-600 leading-relaxed">
                Winner of multiple tourism excellence awards and recognized as the premier diving operator in the Florida Keys.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safety Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Perfect safety record with PADI certified dive masters and comprehensive insurance coverage for every guest.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Guest Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                4.9/5 star rating from over 10,000 reviews, with personalized attention and small group experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - SEO Rich */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Is prior snorkeling experience required?</h3>
                  <p className="text-gray-600">
                    No experience necessary! Our PADI certified guides provide comprehensive instruction and support 
                    for beginners. We also have flotation devices available for added confidence.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">What should I bring?</h3>
                  <p className="text-gray-600">
                    We provide all snorkeling equipment. You just need to bring sunscreen (reef-safe), towel, 
                    water, and a sense of adventure! Underwater cameras are available for rent.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">How deep is the Christ of the Abyss statue?</h3>
                  <p className="text-gray-600">
                    The statue sits in approximately 25 feet of crystal-clear water, perfect for snorkeling. 
                    The visibility is typically 60-80 feet, allowing for incredible viewing and photography.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Begin Your Underwater Spiritual Journey
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands who have discovered the peace and wonder of the Christ of the Abyss. 
            Book your transformative experience today.
          </p>
          
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg">
            Reserve Your Experience
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="mt-6 text-blue-200">
            ✓ Instant confirmation • ✓ Free cancellation • ✓ Best price guarantee
          </p>
        </div>
      </section>
    </div>
  );
}
