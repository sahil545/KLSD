import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Clock, 
  Users, 
  Award, 
  Star, 
  Book, 
  Shield,
  Calendar,
  Phone,
  CheckCircle,
  Target
} from 'lucide-react';

export default function Certification() {
  const certifications = [
    {
      id: 1,
      title: "PADI Open Water Diver",
      description: "Your diving adventure begins here. Learn the fundamentals of scuba diving in a safe, supportive environment.",
      price: 450,
      duration: "3-4 days",
      minAge: 10,
      rating: 4.9,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1571406252267-e2d2d9ec468a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Most Popular", "PADI"],
      includes: ["Digital learning materials", "Pool training", "4 open water dives", "PADI certification card", "Equipment included"]
    },
    {
      id: 2,
      title: "PADI Advanced Open Water",
      description: "Expand your diving skills with adventure dives including deep diving and underwater navigation.",
      price: 395,
      duration: "2-3 days",
      minAge: 12,
      rating: 4.8,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Popular", "PADI"],
      includes: ["5 adventure dives", "Digital learning", "Deep dive training", "Navigation skills", "Certification card"]
    },
    {
      id: 3,
      title: "PADI Rescue Diver",
      description: "Learn to prevent and manage problems in the water and become a more confident, capable diver.",
      price: 525,
      duration: "3-4 days",
      minAge: 15,
      rating: 4.9,
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Challenging", "PADI"],
      includes: ["Emergency response training", "Rescue scenarios", "Digital materials", "First aid skills", "Certification card"]
    },
    {
      id: 4,
      title: "PADI Divemaster",
      description: "Take the first step toward a career in diving. Lead dives and assist with training programs.",
      price: 895,
      duration: "2-3 weeks",
      minAge: 18,
      rating: 5.0,
      level: "Professional",
      image: "https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Professional", "PADI"],
      includes: ["Leadership training", "Dive theory", "Practical skills", "Teaching experience", "Professional certification"]
    },
    {
      id: 5,
      title: "PADI Enriched Air (Nitrox)",
      description: "Dive longer with enriched air nitrox. Learn to use nitrox safely for extended bottom times.",
      price: 195,
      duration: "1 day",
      minAge: 12,
      rating: 4.8,
      level: "Specialty",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Quick Course", "PADI"],
      includes: ["Digital learning", "Gas analysis training", "Nitrox theory", "2 nitrox dives", "Certification card"]
    },
    {
      id: 6,
      title: "PADI Night Diver",
      description: "Discover the underwater world after dark and observe nocturnal marine life behavior.",
      price: 295,
      duration: "2 days",
      minAge: 12,
      rating: 4.7,
      level: "Specialty",
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Unique", "PADI"],
      includes: ["Night diving techniques", "Underwater lights", "3 night dives", "Marine life identification", "Certification card"]
    }
  ];

  const specialties = [
    "Deep Diver", "Wreck Diver", "Underwater Navigator", "Peak Performance Buoyancy",
    "Underwater Naturalist", "Fish Identification", "Boat Diver", "Drift Diver",
    "Digital Underwater Photographer", "Project AWARE"
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-sage";
      case "Intermediate": return "bg-ocean";
      case "Advanced": return "bg-coral";
      case "Professional": return "bg-purple-600";
      case "Specialty": return "bg-amber-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage/5 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-ocean to-ocean/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-coral/20 text-coral border-coral/30 text-lg px-4 py-2">
              PADI 5-Star Dive Center
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Scuba Diving
              <span className="block text-coral">Certification</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Start your underwater adventure with professional PADI training. 
              From beginner to professional level certifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-coral hover:bg-coral/90 text-white font-semibold text-lg px-8 py-4">
                <Award className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ocean text-lg px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Ask Questions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Programs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">PADI Certification Programs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the right certification level for your diving goals and experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <Card key={cert.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {cert.badges.map((badge, index) => (
                      <Badge 
                        key={index}
                        className="bg-coral/90 text-white border-0 font-medium"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getLevelColor(cert.level)} text-white border-0 font-medium`}>
                      {cert.level}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg px-3 py-1">
                    <span className="text-2xl font-bold text-ocean">${cert.price}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{cert.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{cert.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{cert.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Age {cert.minAge}+</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-coral fill-coral" />
                      <span className="font-medium">{cert.rating}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2">Course Includes:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {cert.includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-sage" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-ocean hover:bg-ocean/90 text-white font-semibold">
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Courses */}
      <section className="py-16 bg-sage/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Specialty Courses</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enhance your diving skills with specialized training programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {specialties.map((specialty, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow duration-300 border border-sage/20">
                <CardContent className="p-2">
                  <Target className="w-8 h-8 text-ocean mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground text-sm">{specialty}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn With Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Learn With Us</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">PADI 5-Star Rating</h3>
              <p className="text-muted-foreground">Highest level of PADI recognition for quality training and facilities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Expert Instructors</h3>
              <p className="text-muted-foreground">Certified professionals with thousands of dives and years of experience</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Small Classes</h3>
              <p className="text-muted-foreground">Personal attention with maximum 4 students per instructor</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
