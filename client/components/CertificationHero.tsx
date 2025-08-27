import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CertificationDetailsModal from "@/components/CertificationDetailsModal";
import {
  Clock,
  MapPin,
  Star,
  Users,
  AlertCircle,
  CheckCircle,
  Shield,
  ArrowDown,
  Award,
  BookOpen,
} from "lucide-react";

interface CertificationData {
  id: string;
  name: string;
  level: string;
  duration: string;
  maxStudents: string;
  location: string;
  price: number;
  prerequisites: string;
  certification: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  images: string[];
  description: string;
}

// Mock certification data - this would come from your CMS or API
const mockCertifications: { [key: string]: CertificationData } = {
  "open-water": {
    id: "open-water",
    name: "PADI Open Water Diver Certification",
    level: "Beginner",
    duration: "3-4 Days",
    maxStudents: "6 Max",
    location: "Key Largo",
    price: 399,
    prerequisites: "Swimming ability required",
    certification: "PADI Open Water Diver",
    rating: 4.9,
    reviewCount: 324,
    highlights: [
      "Learn fundamental scuba diving skills and safety",
      "Dive to depths of 60 feet with a certified buddy",
      "Internationally recognized PADI certification",
      "All equipment and materials included",
      "Small class sizes with expert PADI instructors",
    ],
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&h=600&fit=crop",
    ],
    description:
      "Start your underwater adventure with the world's most popular scuba course",
  },
  "advanced-open-water": {
    id: "advanced-open-water",
    name: "PADI Advanced Open Water Diver",
    level: "Intermediate",
    duration: "2-3 Days",
    maxStudents: "6 Max",
    location: "Key Largo",
    price: 449,
    prerequisites: "Open Water Diver certification",
    certification: "PADI Advanced Open Water Diver",
    rating: 4.8,
    reviewCount: 198,
    highlights: [
      "Explore deeper dive sites up to 100 feet",
      "Master 5 specialty adventure dives",
      "Night diving and deep diving specialties",
      "Underwater navigation skills",
      "Build confidence with advanced techniques",
    ],
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
    ],
    description:
      "Take your diving skills to the next level with advanced techniques",
  },
  "rescue-diver": {
    id: "rescue-diver",
    name: "PADI Rescue Diver Certification",
    level: "Advanced",
    duration: "3-4 Days",
    maxStudents: "4 Max",
    location: "Key Largo",
    price: 549,
    prerequisites: "Advanced Open Water + EFR certification",
    certification: "PADI Rescue Diver",
    rating: 4.9,
    reviewCount: 156,
    highlights: [
      "Learn to prevent and manage diving emergencies",
      "Develop leadership and problem-solving skills",
      "Emergency response and rescue techniques",
      "Build confidence as a responsible diver",
      "Gateway to PADI professional courses",
    ],
    images: [
      "https://images.unsplash.com/photo-1566024287286-457247b70310?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&h=600&fit=crop",
    ],
    description:
      "Become a skilled and confident rescue diver with emergency response training",
  },
};

export default function CertificationHero() {
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [currentCourse, setCourse] = useState<CertificationData>(
    mockCertifications["open-water"],
  );

  // Get course from URL params or use default
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const courseParam = urlParams.get("course") || "open-water";
      const selectedCourse =
        mockCertifications[courseParam] || mockCertifications["open-water"];
      setCourse(selectedCourse);
    }
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById(
      "certification-booking-section",
    );
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "intermediate":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "advanced":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-white/20 text-white border-white/30";
    }
  };

  return (
    <section
      className="relative text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%)",
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: `url("${currentCourse.images[0]}")`,
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-white/5 rounded-full -top-48 -right-48"></div>
        <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full -bottom-32 -left-32"></div>
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Breadcrumb */}
            <nav className="text-sm text-white/70 mb-4">
              <span>Certifications</span> /{" "}
              <span className="text-white">{currentCourse.name}</span>
            </nav>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 flex items-center gap-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F68f4a1ac67f04a54a4e3914e4b66253f?format=webp&width=800"
                  alt="PADI Logo"
                  className="w-5 h-5 object-contain"
                />
                🏆 PADI 5★ Center
              </Badge>
              <Badge className={getBadgeColor(currentCourse.level)}>
                📚 {currentCourse.level} Level
              </Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                ✓ All Equipment Included
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              {currentCourse.name}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              {currentCourse.description}
            </p>

            {/* Star Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-white/90">{currentCourse.rating}/5</span>
              <span className="text-white/70">
                ({currentCourse.reviewCount} reviews)
              </span>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <Clock className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-white/90">Duration</div>
                <div className="font-semibold">{currentCourse.duration}</div>
              </div>
              <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <Users className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-white/90">Class Size</div>
                <div className="font-semibold">{currentCourse.maxStudents}</div>
              </div>
              <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-white/90">Location</div>
                <div className="font-semibold">{currentCourse.location}</div>
              </div>
              <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <Award className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-white/90">Certification</div>
                <div className="font-semibold">PADI</div>
              </div>
            </div>

            {/* Key Selling Points */}
            <div className="space-y-3 mb-8">
              {currentCourse.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-white/90">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Pricing Display */}
            <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">
                    ${currentCourse.price}
                  </div>
                  <div className="text-white/70 text-sm">
                    Per student • All materials included
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white/70 text-sm">Prerequisites:</div>
                  <div className="text-white text-sm font-semibold">
                    {currentCourse.prerequisites}
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency Message */}
            <div className="mb-6 text-sm space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-300" />
                <span className="font-semibold text-white">
                  Limited Class Sizes
                </span>
              </div>
              <div className="text-white/80 ml-6">
                Small groups ensure personalized instruction
              </div>
              <div className="text-green-300 ml-6">
                ✓ Flexible Scheduling & Rescheduling Available
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={scrollToBooking}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-lg rounded-xl shadow-lg"
            >
              Start Your Certification - ${currentCourse.price}
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right Column - Additional Info */}
          <div className="hidden lg:block space-y-6">
            {/* Course Level Badge */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-semibold">Course Level</h3>
              </div>
              <div className="text-white/90">
                <div className="text-2xl font-bold mb-2">
                  {currentCourse.level}
                </div>
                <p className="text-sm">
                  Perfect for divers ready to{" "}
                  {currentCourse.level === "Beginner"
                    ? "start their diving journey"
                    : currentCourse.level === "Intermediate"
                      ? "advance their skills"
                      : "master rescue techniques"}
                </p>
              </div>
            </div>

            {/* PADI Standards */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F68f4a1ac67f04a54a4e3914e4b66253f?format=webp&width=800"
                  alt="PADI Logo"
                  className="w-8 h-8 object-contain"
                />
                <h3 className="text-xl font-semibold">PADI Standards</h3>
              </div>
              <div className="space-y-2 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Internationally recognized certification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Lifetime certification validity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Digital certification card included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      <CertificationDetailsModal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        courseData={currentCourse}
      />
    </section>
  );
}
