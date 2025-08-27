import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  BookOpen, 
  Shield, 
  Users, 
  Award,
  CheckCircle,
  Clock,
  Download,
  Play
} from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "Basic Diving Physics",
    description: "Understand pressure, buoyancy, and how your body reacts underwater",
    duration: "15 min",
    level: "Beginner",
    completed: false,
    type: "video"
  },
  {
    id: 2,
    title: "Essential Equipment Overview",
    description: "Complete guide to mask, fins, regulator, and BCD basics",
    duration: "20 min",
    level: "Beginner", 
    completed: false,
    type: "interactive"
  },
  {
    id: 3,
    title: "Breathing Techniques Underwater",
    description: "Master controlled breathing and relaxation techniques",
    duration: "12 min",
    level: "Beginner",
    completed: false,
    type: "video"
  },
  {
    id: 4,
    title: "Hand Signals & Communication",
    description: "Essential underwater communication signals every diver must know",
    duration: "18 min",
    level: "Beginner",
    completed: false,
    type: "interactive"
  },
  {
    id: 5,
    title: "Safety Procedures & Emergency Response",
    description: "Critical safety protocols and emergency procedures",
    duration: "25 min",
    level: "Intermediate",
    completed: false,
    type: "video"
  },
  {
    id: 6,
    title: "Dive Planning & Tables",
    description: "Learn to plan safe dives using dive tables and computers",
    duration: "30 min",
    level: "Intermediate",
    completed: false,
    type: "interactive"
  }
];

const certificationPath = [
  {
    level: "Open Water Diver",
    description: "Your entry into the underwater world",
    requirements: "Complete theory, confined water, and 4 open water dives",
    depth: "18m/60ft",
    price: "$450"
  },
  {
    level: "Advanced Open Water",
    description: "Expand your diving skills and experience",
    requirements: "5 adventure dives including deep and navigation",
    depth: "30m/100ft", 
    price: "$350"
  },
  {
    level: "Rescue Diver",
    description: "Learn to prevent and manage diving emergencies",
    requirements: "Emergency First Response, theory, and rescue scenarios",
    depth: "30m/100ft",
    price: "$400"
  },
  {
    level: "Divemaster",
    description: "Your first step into professional diving",
    requirements: "Assist instructors and guide certified divers",
    depth: "40m/130ft",
    price: "$750"
  }
];

export default function ScubaDiving101() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <BookOpen className="w-8 h-8 text-green-400" />
                <span className="text-sm font-semibold text-green-400 uppercase tracking-wide">
                  Learn to Dive
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Scuba Diving 101
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                Master the fundamentals of safe scuba diving with our comprehensive beginner's course
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-800 px-8 py-3">
                  Download Guide
                  <Download className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Course Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-green-400" />
                      <span>6 comprehensive lessons</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-green-400" />
                      <span>Expert instructors</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-green-400" />
                      <span>Certification pathway</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span>Safety focused</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Learning Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our structured curriculum designed by certified instructors to build your diving skills progressively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className="group hover:shadow-xl transition-all duration-300 border-none shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      {lesson.type === "video" ? (
                        <Play className="w-5 h-5 text-green-600" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      Lesson {index + 1}
                    </span>
                  </div>
                  {lesson.completed && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {lesson.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {lesson.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-xs">
                    {lesson.level}
                  </Badge>
                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={lesson.completed}
                >
                  {lesson.completed ? "Completed" : "Start Lesson"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Topics */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You'll Learn
            </h2>
            <p className="text-xl text-gray-600">
              Essential knowledge for safe and confident diving
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety First</h3>
              <p className="text-gray-600 text-sm">
                Master safety procedures, emergency protocols, and risk management
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication</h3>
              <p className="text-gray-600 text-sm">
                Learn essential hand signals and underwater communication
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Theory</h3>
              <p className="text-gray-600 text-sm">
                Understand diving physics, physiology, and dive planning
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Certification</h3>
              <p className="text-gray-600 text-sm">
                Prepare for your Open Water Diver certification
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Pathway */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Certification Pathway
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Progress through PADI certifications and advance your diving skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationPath.map((cert, index) => (
            <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-none shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {cert.level}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {cert.description}
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Requirements:</span>
                    <p className="text-gray-600">{cert.requirements}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Max Depth:</span>
                    <p className="text-gray-600">{cert.depth}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Price:</span>
                    <p className="text-green-600 font-semibold">{cert.price}</p>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Diving Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of certified divers who started their underwater adventure with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Enroll in Course
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3">
                Contact Instructor
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
