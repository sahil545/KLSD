import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Calendar,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Users,
  X,
  Award,
  Clock,
  MapPin,
} from "lucide-react";

interface CertificationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (studentData: any) => void;
  isLoading?: boolean;
  courseData?: any;
  studentCount?: number;
  selectedOption?: any;
  totalPrice?: number;
}

interface StudentInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  height: string;
  weight: string;
  shoeSize: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalConditions: string;
  swimmingAbility: string;
}

export default function CertificationDetailsModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  courseData,
  studentCount,
  selectedOption,
  totalPrice,
}: CertificationDetailsModalProps) {
  // Format currency inside component for consistency
  const formattedTotal = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(totalPrice ?? 0);

  const [leadStudent, setLeadStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  const [students, setStudents] = useState<StudentInfo[]>(
    Array.from({ length: studentCount }, () => ({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      height: "",
      weight: "",
      shoeSize: "",
      emergencyContact: "",
      emergencyPhone: "",
      medicalConditions: "",
      swimmingAbility: "good",
    })),
  );

  const updateLeadStudent = (field: string, value: string) => {
    setLeadStudent((prev) => ({ ...prev, [field]: value }));
  };

  const updateStudent = (
    index: number,
    field: keyof StudentInfo,
    value: string,
  ) => {
    setStudents((prev) =>
      prev.map((student, i) =>
        i === index ? { ...student, [field]: value } : student,
      ),
    );
  };

  const isFormValid = () => {
    const leadStudentValid =
      leadStudent.firstName &&
      leadStudent.lastName &&
      leadStudent.email &&
      leadStudent.phone;

    const studentsValid = students.every(
      (s) =>
        s.firstName &&
        s.lastName &&
        s.dateOfBirth &&
        s.email &&
        s.height &&
        s.weight &&
        s.shoeSize &&
        s.swimmingAbility,
    );

    return leadStudentValid && studentsValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit?.({
        leadStudent,
        students,
        courseData,
        selectedOption,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-2xl font-semibold">
              <Award className="w-6 h-6 text-blue-600" />
              Student Enrollment - Scuba Certification
            </h2>
            <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Course Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Course Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between">
                    <span>Course:</span>
                    <span className="font-semibold">
                      PADI Open Water Certification
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Option:</span>
                    <span className="font-semibold">
                      {selectedOption?.title || "Standard Group Class"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per student:</span>
                    <span className="font-semibold">
                      ${selectedOption?.price || 399}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span className="font-semibold">
                      {studentCount}{" "}
                      {studentCount === 1 ? "Student" : "Students"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Students:</span>
                    <span className="font-semibold">
                      {selectedOption?.maxStudents || 6}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg border-t pt-2">
                    <span>Total:</span>
                    <span className="font-bold text-blue-600">
                      {formattedTotal}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lead Student Information Form */}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Primary Contact Information
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Primary contact for this enrollment (can be parent/guardian)
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="leadFirstName">First Name *</Label>
                    <Input
                      id="leadFirstName"
                      value={leadStudent.firstName}
                      onChange={(e) =>
                        updateLeadStudent("firstName", e.target.value)
                      }
                      placeholder="Enter first name"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="leadLastName">Last Name *</Label>
                    <Input
                      id="leadLastName"
                      value={leadStudent.lastName}
                      onChange={(e) =>
                        updateLeadStudent("lastName", e.target.value)
                      }
                      placeholder="Enter last name"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="leadEmail">Email Address *</Label>
                    <Input
                      id="leadEmail"
                      type="email"
                      value={leadStudent.email}
                      onChange={(e) =>
                        updateLeadStudent("email", e.target.value)
                      }
                      placeholder="Enter email address"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="leadPhone">Phone Number *</Label>
                    <Input
                      id="leadPhone"
                      type="tel"
                      value={leadStudent.phone}
                      onChange={(e) =>
                        updateLeadStudent("phone", e.target.value)
                      }
                      placeholder="(305) 555-0123"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="leadAddress">Address *</Label>
                    <Input
                      id="leadAddress"
                      value={leadStudent.address}
                      onChange={(e) =>
                        updateLeadStudent("address", e.target.value)
                      }
                      placeholder="Street address"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="leadCity">City *</Label>
                    <Input
                      id="leadCity"
                      value={leadStudent.city}
                      onChange={(e) =>
                        updateLeadStudent("city", e.target.value)
                      }
                      placeholder="City"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="leadState">State *</Label>
                    <Input
                      id="leadState"
                      value={leadStudent.state}
                      onChange={(e) =>
                        updateLeadStudent("state", e.target.value)
                      }
                      placeholder="State"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student Information */}
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Student Information ({studentCount} total)
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Required for PADI certification and equipment fitting
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {students.map((student, index) => (
                  <div key={index} className="p-6 border rounded-lg bg-gray-50">
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Student {index + 1}
                    </h4>

                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`student-firstName-${index}`}>
                          First Name *
                        </Label>
                        <Input
                          id={`student-firstName-${index}`}
                          value={student.firstName}
                          onChange={(e) =>
                            updateStudent(index, "firstName", e.target.value)
                          }
                          placeholder="First name"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`student-lastName-${index}`}>
                          Last Name *
                        </Label>
                        <Input
                          id={`student-lastName-${index}`}
                          value={student.lastName}
                          onChange={(e) =>
                            updateStudent(index, "lastName", e.target.value)
                          }
                          placeholder="Last name"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`student-dob-${index}`}>
                          Date of Birth *
                        </Label>
                        <Input
                          id={`student-dob-${index}`}
                          type="date"
                          value={student.dateOfBirth}
                          onChange={(e) =>
                            updateStudent(index, "dateOfBirth", e.target.value)
                          }
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`student-email-${index}`}>
                          Email Address *
                        </Label>
                        <Input
                          id={`student-email-${index}`}
                          type="email"
                          value={student.email}
                          onChange={(e) =>
                            updateStudent(index, "email", e.target.value)
                          }
                          placeholder="Email address"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    {/* Physical Measurements */}
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`student-height-${index}`}>
                          Height *
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            updateStudent(index, "height", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select height" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="4'10&quot;-5'2&quot;">
                              4'10" - 5'2"
                            </SelectItem>
                            <SelectItem value="5'3&quot;-5'6&quot;">
                              5'3" - 5'6"
                            </SelectItem>
                            <SelectItem value="5'7&quot;-5'10&quot;">
                              5'7" - 5'10"
                            </SelectItem>
                            <SelectItem value="5'11&quot;-6'2&quot;">
                              5'11" - 6'2"
                            </SelectItem>
                            <SelectItem value="6'3&quot;+">6'3"+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`student-weight-${index}`}>
                          Weight *
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            updateStudent(index, "weight", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select weight" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100-130 lbs">
                              100-130 lbs
                            </SelectItem>
                            <SelectItem value="131-160 lbs">
                              131-160 lbs
                            </SelectItem>
                            <SelectItem value="161-190 lbs">
                              161-190 lbs
                            </SelectItem>
                            <SelectItem value="191-220 lbs">
                              191-220 lbs
                            </SelectItem>
                            <SelectItem value="221+ lbs">221+ lbs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`student-shoeSize-${index}`}>
                          Shoe Size *
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            updateStudent(index, "shoeSize", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select shoe size" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 15 }, (_, i) => i + 5).map(
                              (size) => (
                                <SelectItem key={size} value={size.toString()}>
                                  Size {size}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`student-emergencyContact-${index}`}>
                          Emergency Contact Name *
                        </Label>
                        <Input
                          id={`student-emergencyContact-${index}`}
                          value={student.emergencyContact}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "emergencyContact",
                              e.target.value,
                            )
                          }
                          placeholder="Emergency contact name"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`student-emergencyPhone-${index}`}>
                          Emergency Contact Phone *
                        </Label>
                        <Input
                          id={`student-emergencyPhone-${index}`}
                          type="tel"
                          value={student.emergencyPhone}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "emergencyPhone",
                              e.target.value,
                            )
                          }
                          placeholder="Emergency contact phone"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    {/* Swimming Ability */}
                    <div className="mb-4">
                      <Label htmlFor={`student-swimming-${index}`}>
                        Swimming Ability *
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          updateStudent(index, "swimmingAbility", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select swimming ability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">
                            Excellent swimmer
                          </SelectItem>
                          <SelectItem value="good">Good swimmer</SelectItem>
                          <SelectItem value="average">
                            Average swimmer
                          </SelectItem>
                          <SelectItem value="beginner">
                            Beginner swimmer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Medical Conditions */}
                    <div>
                      <Label htmlFor={`student-medical-${index}`}>
                        Medical Conditions or Concerns (Optional)
                      </Label>
                      <textarea
                        id={`student-medical-${index}`}
                        value={student.medicalConditions}
                        onChange={(e) =>
                          updateStudent(
                            index,
                            "medicalConditions",
                            e.target.value,
                          )
                        }
                        placeholder="Any medical conditions, medications, or physical limitations we should know about..."
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Safety & Requirements Notice */}
            <Card className="bg-amber-50 border-amber-200 mt-6">
              <CardContent className="p-4">
                <h4 className="font-semibold text-amber-800 mb-2">
                  Important Certification Requirements
                </h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>
                    • Students must be at least 10 years old (12+ for Open
                    Water)
                  </li>
                  <li>
                    • Must be comfortable in water and able to swim 200 meters
                  </li>
                  <li>
                    • Medical clearance may be required for certain conditions
                  </li>
                  <li>
                    • All students must complete PADI medical questionnaire
                  </li>
                  <li>
                    • Equipment will be fitted based on provided measurements
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course Selection
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid() || isLoading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Enroll Students - {formattedTotal}
                  </>
                )}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground border-t">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Secure Enrollment</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>PADI Certified</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Flexible Scheduling</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
