import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CertificationDetailsModal from "@/components/CertificationDetailsModal";
import {
  Calendar,
  Star,
  Plus,
  Minus,
  CheckCircle,
  Users,
  DollarSign,
  Clock,
  Award,
  BookOpen,
} from "lucide-react";

interface CourseOption {
  title: string;
  description: string;
  price: number;
  features: string[];
  maxStudents: number;
  popular?: boolean;
}

// Course options and upgrades
const courseOptions: CourseOption[] = [
  {
    title: "Standard Group Class",
    description: "Traditional group certification with up to 6 students",
    price: 399,
    features: [
      "Group instruction with max 6 students",
      "All equipment included",
      "PADI certification",
      "4-day course schedule",
    ],
    maxStudents: 6,
  },
  {
    title: "Semi Private Class",
    description: "Smaller group with personalized attention",
    price: 549,
    features: [
      "Small group - max 3 students",
      "More personalized instruction",
      "Flexible scheduling options",
      "All equipment included",
      "PADI certification",
    ],
    maxStudents: 3,
    popular: true,
  },
  {
    title: "Private Class",
    description: "One-on-one instruction tailored to your pace",
    price: 799,
    features: [
      "Individual instruction",
      "Custom pace and schedule",
      "Premium equipment options",
      "Choice of instructor",
      "PADI certification",
    ],
    maxStudents: 1,
  },
  {
    title: "Private Boat",
    description: "Exclusive boat charter for your certification",
    price: 1299,
    features: [
      "Private boat charter",
      "Choose your dive sites",
      "Custom schedule",
      "Premium equipment included",
      "Dedicated instructor",
      "PADI certification",
    ],
    maxStudents: 4,
  },
];

export default function CertificationBookingSection() {
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [studentCount, setStudentCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState<CourseOption | null>(
    null,
  );

  // Get price from selected option or use default
  const pricePerStudent = selectedOption?.price || 399;
  const tax = studentCount * pricePerStudent * 0.07;
  const totalPrice = studentCount * pricePerStudent + tax;

  const handleEnrollClick = () => {
    if (selectedOption) {
      setShowStudentModal(true);
    }
  };

  return (
    <section
      id="certification-booking-section"
      className="py-16 bg-white border-t border-gray-100"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Schedule Your Certification
          </h2>
          <p className="text-gray-600">
            Starting at ${pricePerStudent} per student • Small classes, expert
            instruction
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - Course Schedule Selection */}
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Course Options & Upgrades
              </h3>

              {/* Course Options */}
              <div className="space-y-4 mb-6">
                {courseOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:border-blue-300 relative ${
                      selectedOption === option
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedOption(option)}
                  >
                    {option.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white">
                        Most Popular
                      </Badge>
                    )}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-lg">
                          {option.title}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {option.description}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-blue-600">
                          ${option.price}
                        </div>
                        <div className="text-xs text-gray-500">per student</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {option.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="text-sm text-gray-600 flex items-center gap-2"
                        >
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Max {option.maxStudents}{" "}
                      {option.maxStudents === 1 ? "student" : "students"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Student Count */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Number of Students
                </label>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setStudentCount(Math.max(1, studentCount - 1))
                    }
                    className="h-12 w-12 p-0 border-gray-300 rounded-full"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <div className="text-center">
                    <div className="font-bold text-3xl text-gray-900">
                      {studentCount}
                    </div>
                    <div className="text-sm text-gray-500">
                      {studentCount === 1 ? "student" : "students"}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setStudentCount(
                        Math.min(
                          selectedOption?.maxStudents || 6,
                          studentCount + 1,
                        ),
                      )
                    }
                    className="h-12 w-12 p-0 border-gray-300 rounded-full"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
                <div className="text-xs text-gray-500 text-center mt-2">
                  {selectedOption
                    ? `Maximum ${selectedOption.maxStudents} ${selectedOption.maxStudents === 1 ? "student" : "students"} for ${selectedOption.title.toLowerCase()}`
                    : "Select a course option to see limits"}
                </div>
              </div>

              {/* Course Requirements */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  What's Included
                </h4>
                <div className="grid grid-cols-1 gap-2 text-sm text-blue-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>All scuba equipment and materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>PADI certification upon completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Digital certification card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Logbook and training materials</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Pricing & Enrollment */}
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Course Pricing & Enrollment
              </h3>

              {/* Selected Course Display */}
              {selectedOption ? (
                <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
                  <div className="text-sm text-green-700 mb-1">
                    Selected Option:
                  </div>
                  <div className="font-semibold text-green-900">
                    {selectedOption.title}
                  </div>
                  <div className="text-sm text-green-700">
                    {selectedOption.description}
                  </div>
                  <div className="text-sm text-green-700 font-semibold mt-1">
                    ${selectedOption.price} per student
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    Select a course option to continue
                  </div>
                </div>
              )}

              {/* Price Display */}
              <div className="text-center mb-6 p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  ${totalPrice.toFixed(2)}
                </div>
                <div className="text-gray-600">
                  for {studentCount}{" "}
                  {studentCount === 1 ? "student" : "students"}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>
                    ${pricePerStudent} × {studentCount}{" "}
                    {studentCount === 1 ? "student" : "students"}
                  </span>
                  <span>${(studentCount * pricePerStudent).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-gray-900 text-lg border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">
                  Payment Options
                </h4>
                <div className="text-sm text-amber-700 space-y-1">
                  <div>• $100 deposit to secure your spot</div>
                  <div>• Remaining balance due on course start date</div>
                  <div>• Full payment discount available</div>
                </div>
              </div>

              {/* Enroll Button */}
              <Button
                onClick={handleEnrollClick}
                disabled={
                  !selectedOption ||
                  (selectedOption && studentCount > selectedOption.maxStudents)
                }
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 text-lg rounded-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedOption
                  ? studentCount > selectedOption.maxStudents
                    ? `Reduce to ${selectedOption.maxStudents} ${selectedOption.maxStudents === 1 ? "student" : "students"} max`
                    : `Enroll Now - $${totalPrice.toFixed(2)}`
                  : "Select Course Option First"}
              </Button>

              <div className="text-center text-sm text-gray-500 mb-4">
                Secure your spot with just a $100 deposit
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Flexible rescheduling up to 48 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.9/5 rating from 300+ certified divers</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>Best price guarantee in Key Largo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Student Details Modal */}
      <CertificationDetailsModal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        studentCount={studentCount}
        totalPrice={Number.isFinite(totalPrice) ? totalPrice : 0}
        selectedOption={selectedOption}
      />
    </section>
  );
}
