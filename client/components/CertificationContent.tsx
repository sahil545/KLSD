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
  ArrowRight,
  BookOpen,
  Target,
  Zap,
  Heart,
  Mountain,
  Anchor,
} from "lucide-react";

export default function CertificationContent() {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById(
      "certification-booking-section",
    );
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white">
      {/* Course Overview Section */}
      <section
        id="course-overview"
        className="py-20 bg-gradient-to-b from-gray-50 to-white relative"
      >
        {/* Ocean Background with Contour Lines */}
        <div className="absolute inset-0 bg-blue-50/70" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='600' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2359D6D6' stroke-width='1' opacity='0.7'%3E%3Cpath d='M80,120 C120,100 180,110 220,130 C260,150 290,140 320,120 C350,100 380,110 400,130 C420,150 400,170 380,180 C360,190 340,185 320,175 C300,165 280,170 260,180 C240,190 220,185 200,175 C180,165 160,160 140,150 C120,140 100,135 80,120 Z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "300px 300px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose PADI Certification in Key Largo?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Learn to scuba dive in the crystal-clear waters of the Florida
                Keys with experienced PADI instructors and world-class dive
                sites
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    PADI 5★ Dive Center
                  </h3>
                  <p className="text-gray-600">
                    Learn from the highest-rated PADI dive center in Key Largo
                    with over 25 years of experience training safe, confident
                    divers.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Small Class Sizes
                  </h3>
                  <p className="text-gray-600">
                    Maximum 6 students per instructor ensures personalized
                    attention and faster skill development in a safe learning
                    environment.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    World-Class Location
                  </h3>
                  <p className="text-gray-600">
                    Train in the pristine waters of John Pennekamp Coral Reef
                    State Park, America's first underwater preserve.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Course Curriculum */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">
                Complete PADI Open Water Curriculum
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Knowledge Development */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Knowledge Development
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Equipment overview and selection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Dive planning and safety procedures</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Underwater physics and physiology</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Marine environment and conservation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Dive computer operation and tables</span>
                    </li>
                  </ul>
                </div>

                {/* Practical Skills */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Waves className="w-5 h-5 text-blue-600" />
                    Practical Skills Training
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Equipment assembly and pre-dive checks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Mask clearing and regulator recovery</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Buoyancy control and hovering</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Emergency procedures and rescue techniques</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Underwater navigation and communication</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8">
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                  All skills practiced in pool and open water environments
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Schedule and Structure */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your 4-Day Certification Journey
              </h2>
              <p className="text-xl text-gray-600">
                Structured learning path from classroom to open water
                certification
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Day 1 */}
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-semibold">
                    Day 1
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-3">
                      Knowledge & Pool
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>8:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>PADI theory and classroom</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Waves className="w-4 h-4" />
                        <span>Pool skills development</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day 2 */}
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 text-sm font-semibold">
                    Day 2
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-3">
                      Advanced Pool
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>8:00 AM - 12:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span>Master essential skills</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>Emergency procedures</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day 3 */}
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="absolute top-0 right-0 bg-orange-600 text-white px-3 py-1 text-sm font-semibold">
                    Day 3
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-3">
                      First Ocean Dive
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>8:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Anchor className="w-4 h-4" />
                        <span>Shallow reef dives</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fish className="w-4 h-4" />
                        <span>Apply skills in ocean</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day 4 */}
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-sm font-semibold">
                    Day 4
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-3">
                      Certification Dives
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>8:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>Final skill demonstration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span>Celebrate your certification!</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything Included in Your Course
              </h2>
              <p className="text-xl text-gray-600">
                No hidden fees - complete certification package
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Equipment */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Professional Equipment
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>BCD (buoyancy control device)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Regulator and octopus</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Wetsuit, mask, fins, and snorkel</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Weight system and weights</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Tank and air fills</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Materials */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Learning Materials
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>PADI Open Water manual and eLearning</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Digital certification card</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>PADI logbook and slate</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Dive tables and planning materials</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Certificate processing fees</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Badge className="bg-green-100 text-green-800 px-6 py-3 text-lg">
                $399 - No Additional Fees or Equipment Rental Charges
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Meet Your Expert PADI Instructors
              </h2>
              <p className="text-xl text-gray-600">
                Learn from certified professionals with thousands of dives
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Instructor 1 */}
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Captain Mike Rodriguez
                  </h3>
                  <Badge className="mb-3">PADI Master Instructor</Badge>
                  <p className="text-gray-600 text-sm mb-4">
                    25+ years diving experience, 3,000+ certified students,
                    specializes in nervous beginners and advanced rescue
                    training.
                  </p>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Instructor 2 */}
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sarah Thompson</h3>
                  <Badge className="mb-3">PADI Course Director</Badge>
                  <p className="text-gray-600 text-sm mb-4">
                    Marine biology background, 15 years instruction experience,
                    expert in underwater photography and conservation.
                  </p>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Instructor 3 */}
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">David Chen</h3>
                  <Badge className="mb-3">PADI Staff Instructor</Badge>
                  <p className="text-gray-600 text-sm mb-4">
                    Technical diving specialist, 10 years instruction,
                    multilingual (English, Spanish, Mandarin).
                  </p>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about PADI certification
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question:
                    "What is the minimum age for PADI Open Water certification?",
                  answer:
                    "Students must be at least 12 years old for Open Water certification. We also offer PADI Bubblemaker for kids 8+ and Seal Team for ages 8-12.",
                },
                {
                  question: "Do I need to know how to swim before starting?",
                  answer:
                    "Yes, you must be able to swim 200 meters (any stroke) and tread water for 10 minutes. We can assess your swimming ability during your first session.",
                },
                {
                  question: "How long is my PADI certification valid?",
                  answer:
                    "Your PADI Open Water certification never expires! However, if you haven't dived in a while, we recommend a refresher course to brush up on your skills.",
                },
                {
                  question: "What if weather conditions prevent diving?",
                  answer:
                    "Safety is our priority. If conditions are unsafe, we'll reschedule your open water dives at no additional cost. Pool sessions can usually continue regardless of weather.",
                },
                {
                  question:
                    "Can I complete the course if I have medical concerns?",
                  answer:
                    "Most people can safely learn to dive. You'll complete a medical questionnaire, and some conditions may require physician approval before participation.",
                },
                {
                  question:
                    "What's the difference between Open Water and Advanced certification?",
                  answer:
                    "Open Water allows diving to 60 feet with a certified buddy. Advanced Open Water extends this to 100 feet and includes specialty dive training like night diving and deep diving.",
                },
              ].map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Underwater Adventure?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of satisfied students who earned their PADI
              certification in the beautiful waters of Key Largo
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle className="w-5 h-5" />
                <span>
                  Small classes • Expert instruction • All equipment included
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToBooking}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-lg rounded-xl shadow-lg"
              >
                Start Your Certification - $399
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 text-lg rounded-xl"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (305) 451-4040
              </Button>
            </div>

            <div className="mt-6 text-blue-200 text-sm">
              Questions? Call us at (305) 451-4040 or book online above
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
