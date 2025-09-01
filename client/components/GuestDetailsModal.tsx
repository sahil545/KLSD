import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Calendar,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Users,
  X,
} from "lucide-react";

interface GuestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (customerData: any) => void;
  isLoading?: boolean;
  packageDetails?: any;
  guestCount: number;
  selectedDate?: string;
  selectedTime?: string;
  totalPrice?: number;
}

interface PassengerInfo {
  firstName: string;
  lastName: string;
  age?: string;
}

export default function GuestDetailsModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  packageDetails,
  guestCount,
  selectedDate,
  selectedTime,
  totalPrice,
}: GuestDetailsModalProps) {
  // Format currency inside component for consistency
  const formattedTotal = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(totalPrice ?? 0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    specialRequests: "",
  });

  const [passengers, setPassengers] = useState<PassengerInfo[]>(
    Array.from({ length: guestCount }, () => ({
      firstName: "",
      lastName: "",
      age: "",
    })),
  );

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePassenger = (
    index: number,
    field: keyof PassengerInfo,
    value: string,
  ) => {
    setPassengers((prev) =>
      prev.map((passenger, i) =>
        i === index ? { ...passenger, [field]: value } : passenger,
      ),
    );
  };

  const isFormValid = () => {
    const leadGuestValid =
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone;
    const passengersValid = passengers.every((p) => p.firstName && p.lastName);
    return leadGuestValid && passengersValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit({
        ...formData,
        passengers: passengers,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-2xl font-semibold">
              <Users className="w-6 h-6 text-ocean" />
              Guest Details - Christ Statue Tour
            </h2>
            <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booking Summary */}
          <Card className="bg-ocean/5 border-ocean/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-ocean" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Tour Date:</span>
                <span className="font-semibold">
                  {selectedDate || "Date to be selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tour Time:</span>
                <span className="font-semibold">
                  {selectedTime || "8:00 AM"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span className="font-semibold">
                  {guestCount} {guestCount === 1 ? "Adult" : "Adults"}
                </span>
              </div>
              {packageDetails && (
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-semibold">{packageDetails.name}</span>
                </div>
              )}
              <div className="flex justify-between text-lg border-t pt-2">
                <span>Total (incl. tax):</span>
                <span className="font-bold text-ocean">{formattedTotal}</span>
              </div>
            </CardContent>
          </Card>

          {/* Guest Information Form */}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Lead Guest Information
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Primary contact for this booking
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      placeholder="Enter first name"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      placeholder="Enter last name"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="Enter email address"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="(305) 555-0123"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="location">Hotel/Location (Optional)</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      placeholder="e.g., Hawks Cay Resort, Mile Marker 61"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="specialRequests">
                      Special Requests (Optional)
                    </Label>
                    <textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) =>
                        updateField("specialRequests", e.target.value)
                      }
                      placeholder="Any special accommodations, dietary restrictions, or requests..."
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All Passengers Information */}
            {guestCount > 1 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    All Passenger Names ({guestCount} total)
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Required for Coast Guard manifest and safety briefing
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg bg-gray-50"
                    >
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Passenger {index + 1}
                        {index === 0 && (
                          <Badge variant="outline" className="text-xs">
                            Lead Guest (above)
                          </Badge>
                        )}
                      </h4>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor={`passenger-firstName-${index}`}>
                            First Name *
                          </Label>
                          <Input
                            id={`passenger-firstName-${index}`}
                            value={
                              index === 0
                                ? formData.firstName
                                : passenger.firstName
                            }
                            onChange={(e) => {
                              if (index === 0) {
                                updateField("firstName", e.target.value);
                              }
                              updatePassenger(
                                index,
                                "firstName",
                                e.target.value,
                              );
                            }}
                            placeholder="First name"
                            className="mt-1"
                            disabled={index === 0}
                            required
                          />
                          {index === 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              Auto-filled from lead guest
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor={`passenger-lastName-${index}`}>
                            Last Name *
                          </Label>
                          <Input
                            id={`passenger-lastName-${index}`}
                            value={
                              index === 0
                                ? formData.lastName
                                : passenger.lastName
                            }
                            onChange={(e) => {
                              if (index === 0) {
                                updateField("lastName", e.target.value);
                              }
                              updatePassenger(
                                index,
                                "lastName",
                                e.target.value,
                              );
                            }}
                            placeholder="Last name"
                            className="mt-1"
                            disabled={index === 0}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`passenger-age-${index}`}>
                            Age (Optional)
                          </Label>
                          <Input
                            id={`passenger-age-${index}`}
                            value={passenger.age}
                            onChange={(e) =>
                              updatePassenger(index, "age", e.target.value)
                            }
                            placeholder="Age"
                            className="mt-1"
                            type="number"
                            min="5"
                            max="100"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Safety & Requirements Notice */}
            <Card className="bg-amber-50 border-amber-200 mt-6">
              <CardContent className="p-4">
                <h4 className="font-semibold text-amber-800 mb-2">
                  Important Safety Information
                </h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>
                    • All guests must be comfortable in water and able to swim
                  </li>
                  <li>
                    • Minimum age: 5 years old (children must be accompanied by
                    adults)
                  </li>
                  <li>
                    • Please inform us of any medical conditions or concerns
                  </li>
                  <li>• Tour may be cancelled due to weather conditions</li>
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
                Back to Booking
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid() || isLoading}
                className="flex-1 bg-coral hover:bg-coral/90 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Complete Booking {totalPrice}
                  </>
                )}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground border-t">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Weather Guarantee</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
