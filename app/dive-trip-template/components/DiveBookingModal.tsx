"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type DiveTripData } from "../data";
import {
  User,
  Mail,
  Award,
  Calendar,
  Ruler,
  Weight,
  Footprints,
  CheckCircle,
  AlertCircle,
  Users,
  Shield,
  X,
} from "lucide-react";

interface DiverInfo {
  fullName: string;
  email: string;
  certificationLevel: string;
  lastDiveMonth: string;
  lastDiveYear: string;
  height: string;
  weight: string;
  shoeSize: string;
  gearPackage: string | null;
  gearItems: string[];
}

interface DiveBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripData: DiveTripData;
  diverCount: number;
  selectedDate: string;
  selectedTime: string;
  basePrice: number;
}

export default function DiveBookingModal({
  isOpen,
  onClose,
  tripData,
  diverCount,
  selectedDate,
  selectedTime,
  basePrice,
}: DiveBookingModalProps) {
  const [currentDiverIndex, setCurrentDiverIndex] = useState(0);
  const [divers, setDivers] = useState<DiverInfo[]>(
    Array.from({ length: diverCount }, () => ({
      fullName: "",
      email: "",
      certificationLevel: "",
      lastDiveMonth: "",
      lastDiveYear: "",
      height: "",
      weight: "",
      shoeSize: "",
      gearPackage: null,
      gearItems: [],
    })),
  );
  const [addDiveGuide, setAddDiveGuide] = useState(false);
  const [addInstructor, setAddInstructor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"info" | "review" | "confirmation">("info");

  const certificationLevels = [
    "Open Water",
    "Advanced Open Water",
    "Rescue Diver",
    "Divemaster",
    "Instructor",
    "Other",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) =>
    (currentYear - i).toString(),
  );

  const updateDiver = (
    field: keyof DiverInfo,
    value: string | boolean | string[],
  ) => {
    setDivers((prev) =>
      prev.map((diver, index) =>
        index === currentDiverIndex ? { ...diver, [field]: value } : diver,
      ),
    );
  };

  const currentDiver = divers[currentDiverIndex];
  const needsGearInfo =
    currentDiver.gearPackage !== null || currentDiver.gearItems.length > 0;

  // Calculate gear cost for a specific diver
  const calculateDiverGearCost = (diver: DiverInfo) => {
    if (diver.gearPackage) {
      const gearPackage = tripData.gearRentals.packages.find(
        (p) => p.id === diver.gearPackage,
      );
      return gearPackage ? gearPackage.discountedPrice : 0;
    }

    let total = 0;
    diver.gearItems.forEach((itemId) => {
      const item = tripData.gearRentals.options.find(
        (opt) => opt.id === itemId,
      );
      if (item) total += item.price;
    });
    return total;
  };

  // Calculate total gear cost for all divers
  const calculateTotalGearCost = () => {
    return divers.reduce(
      (total, diver) => total + calculateDiverGearCost(diver),
      0,
    );
  };

  // Calculate services cost
  const calculateServicesCost = () => {
    let total = 0;

    if (addDiveGuide) {
      const guideService = tripData.services.options.find(
        (s) => s.id === "dive-guide",
      );
      if (guideService && guideService.tieredPricing) {
        const tier =
          guideService.tieredPricing.find((t) => t.peopleCount >= diverCount) ||
          guideService.tieredPricing[guideService.tieredPricing.length - 1];
        total += tier.price;
      }
    }

    if (addInstructor) {
      const instructorService = tripData.services.options.find(
        (s) => s.id === "dive-instructor",
      );
      if (instructorService && instructorService.flatPrice) {
        total += instructorService.flatPrice;
      }
    }

    return total;
  };

  // Calculate total pricing
  const baseCost = diverCount * basePrice;
  const gearCost = calculateTotalGearCost();
  const servicesCost = calculateServicesCost();
  const subtotal = baseCost + gearCost + servicesCost;
  const tax = subtotal * tripData.pricing.taxRate;
  const totalPrice = subtotal + tax;

  // Handle gear selection for current diver
  const handleGearPackageSelect = (packageId: string) => {
    updateDiver("gearPackage", packageId);
    updateDiver("gearItems", []); // Clear individual items
  };

  const handleGearItemToggle = (itemId: string) => {
    const newItems = currentDiver.gearItems.includes(itemId)
      ? currentDiver.gearItems.filter((id) => id !== itemId)
      : [...currentDiver.gearItems, itemId];

    updateDiver("gearItems", newItems);
    if (newItems.length > 0) {
      updateDiver("gearPackage", null); // Clear package when individual items selected
    }
  };

  const isCurrentDiverComplete = () => {
    const required = [
      "fullName",
      "email",
      "certificationLevel",
      "lastDiveMonth",
      "lastDiveYear",
    ];
    const gearRequired = needsGearInfo ? ["height", "weight", "shoeSize"] : [];

    const basicFieldsComplete = [...required, ...gearRequired].every(
      (field) =>
        currentDiver[field as keyof DiverInfo] &&
        (currentDiver[field as keyof DiverInfo] as string).trim() !== "",
    );

    return basicFieldsComplete;
  };

  const areAllDiversComplete = () => {
    return divers.every((_, index) => {
      const tempIndex = currentDiverIndex;
      setCurrentDiverIndex(index);
      const complete = isCurrentDiverComplete();
      setCurrentDiverIndex(tempIndex);
      return complete;
    });
  };

  const handleNext = () => {
    if (currentDiverIndex < diverCount - 1) {
      setCurrentDiverIndex(currentDiverIndex + 1);
    } else if (areAllDiversComplete()) {
      setStep("review");
    }
  };

  const handlePrevious = () => {
    if (currentDiverIndex > 0) {
      setCurrentDiverIndex(currentDiverIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate booking submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStep("confirmation");
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateTime = () => {
    if (!selectedDate || !selectedTime) return "";

    const date = new Date(selectedDate);
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const [hours, minutes] = selectedTime.split(":");
    const timeDate = new Date();
    timeDate.setHours(parseInt(hours), parseInt(minutes));
    const timeStr = timeDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${dateStr} at ${timeStr}`;
  };

  if (step === "confirmation") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-700">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              Booking Confirmed!
            </DialogTitle>
          </DialogHeader>

          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Your dive trip reservation has been confirmed. You'll receive a
              confirmation email shortly with all the details.
            </p>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">
                {tripData.name}
              </h4>
              <p className="text-sm text-green-700">{formatDateTime()}</p>
              <p className="text-sm text-green-700">
                {diverCount} {diverCount === 1 ? "diver" : "divers"}
              </p>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (step === "review") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Your Booking</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Trip Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trip Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">{tripData.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {formatDateTime()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {diverCount} {diverCount === 1 ? "diver" : "divers"}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-700">
                      ${totalPrice.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 mt-2">
                      <div>Base: ${baseCost.toFixed(2)}</div>
                      {gearCost > 0 && <div>Gear: ${gearCost.toFixed(2)}</div>}
                      {servicesCost > 0 && (
                        <div>Services: ${servicesCost.toFixed(2)}</div>
                      )}
                      <div>Tax: ${tax.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Diver Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Diver Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {divers.map((diver, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-2">Diver {index + 1}</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p>
                            <strong>Name:</strong> {diver.fullName}
                          </p>
                          <p>
                            <strong>Email:</strong> {diver.email}
                          </p>
                          <p>
                            <strong>Certification:</strong>{" "}
                            {diver.certificationLevel}
                          </p>
                          <p>
                            <strong>Last Dive:</strong> {diver.lastDiveMonth}{" "}
                            {diver.lastDiveYear}
                          </p>
                        </div>
                        <div>
                          {(diver.gearPackage ||
                            diver.gearItems.length > 0) && (
                            <>
                              <p>
                                <strong>Height:</strong> {diver.height}
                              </p>
                              <p>
                                <strong>Weight:</strong> {diver.weight}
                              </p>
                              <p>
                                <strong>Shoe Size:</strong> {diver.shoeSize}
                              </p>
                              <div className="mt-2">
                                <strong>Gear Rental:</strong>
                                {diver.gearPackage && (
                                  <div className="text-xs text-blue-600">
                                    Package:{" "}
                                    {
                                      tripData.gearRentals.packages.find(
                                        (p) => p.id === diver.gearPackage,
                                      )?.name
                                    }
                                    ($
                                    {
                                      tripData.gearRentals.packages.find(
                                        (p) => p.id === diver.gearPackage,
                                      )?.discountedPrice
                                    }
                                    )
                                  </div>
                                )}
                                {diver.gearItems.length > 0 && (
                                  <div className="text-xs text-blue-600">
                                    Items:{" "}
                                    {diver.gearItems
                                      .map((itemId) => {
                                        const item =
                                          tripData.gearRentals.options.find(
                                            (opt) => opt.id === itemId,
                                          );
                                        return item
                                          ? `${item.name} ($${item.price})`
                                          : "";
                                      })
                                      .join(", ")}
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep("info")}
                className="flex-1"
              >
                Back to Edit
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Diver Information - {currentDiverIndex + 1} of {diverCount}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: diverCount }, (_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded ${
                  i === currentDiverIndex
                    ? "bg-blue-500"
                    : i < currentDiverIndex
                      ? "bg-green-500"
                      : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Diver Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Diver {currentDiverIndex + 1} Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={currentDiver.fullName}
                    onChange={(e) => updateDiver("fullName", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                    placeholder="First Last"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={currentDiver.email}
                    onChange={(e) => updateDiver("email", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Certification Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Award className="w-4 h-4 inline mr-1" />
                  Certification Level *
                </label>
                <select
                  value={currentDiver.certificationLevel}
                  onChange={(e) =>
                    updateDiver("certificationLevel", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select certification level</option>
                  {certificationLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Last Dive */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Last Dive Date *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={currentDiver.lastDiveMonth}
                    onChange={(e) =>
                      updateDiver("lastDiveMonth", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={currentDiver.lastDiveYear}
                    onChange={(e) =>
                      updateDiver("lastDiveYear", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Gear Rental Selection */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Gear Rental Options (Optional)
                </h4>

                {/* Gear Packages */}
                <div className="space-y-3 mb-4">
                  <h5 className="text-sm font-medium text-gray-600">
                    Rental Packages
                  </h5>
                  {tripData.gearRentals.packages.map((pkg) => (
                    <label
                      key={pkg.id}
                      className={`block p-3 border rounded-lg cursor-pointer transition-all ${
                        currentDiver.gearPackage === pkg.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name={`gear-package-${currentDiverIndex}`}
                            checked={currentDiver.gearPackage === pkg.id}
                            onChange={() => handleGearPackageSelect(pkg.id)}
                            className="mt-1"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {pkg.name}
                              </span>
                              {pkg.popular && (
                                <Badge className="bg-orange-100 text-orange-800 text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              {pkg.description}
                            </p>
                            <div className="text-xs text-gray-500 mt-1">
                              Includes: {pkg.items.join(", ")}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-sm">
                            ${pkg.discountedPrice}
                          </div>
                          <div className="text-xs text-gray-500 line-through">
                            ${pkg.originalPrice}
                          </div>
                          <div className="text-xs text-green-600">
                            Save ${pkg.savings}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}

                  <label
                    className={`block p-3 border rounded-lg cursor-pointer transition-all ${
                      currentDiver.gearPackage === null &&
                      currentDiver.gearItems.length === 0
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`gear-package-${currentDiverIndex}`}
                        checked={
                          currentDiver.gearPackage === null &&
                          currentDiver.gearItems.length === 0
                        }
                        onChange={() => {
                          updateDiver("gearPackage", null);
                          updateDiver("gearItems", []);
                        }}
                      />
                      <div>
                        <span className="font-medium text-sm">
                          No Gear Rental
                        </span>
                        <p className="text-xs text-gray-600">
                          I have my own equipment
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Individual Gear Items */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-gray-600">
                    À la Carte Rentals
                  </h5>
                  <div className="text-xs text-gray-500 mb-2">
                    Select individual items (deselects packages above)
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {tripData.gearRentals.options.map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-center justify-between p-2 border rounded cursor-pointer transition-all ${
                          currentDiver.gearItems.includes(item.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={currentDiver.gearItems.includes(item.id)}
                            onChange={() => handleGearItemToggle(item.id)}
                            className="rounded border-gray-300"
                          />
                          <div>
                            <div className="font-medium text-xs">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <div className="font-semibold text-sm">
                          ${item.price}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gear Sizing (if renting gear) */}
              {needsGearInfo && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Gear Sizing Information
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Ruler className="w-4 h-4 inline mr-1" />
                        Height *
                      </label>
                      <input
                        type="text"
                        value={currentDiver.height}
                        onChange={(e) => updateDiver("height", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                        placeholder="5'10&quot; or 178cm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Weight className="w-4 h-4 inline mr-1" />
                        Weight *
                      </label>
                      <input
                        type="text"
                        value={currentDiver.weight}
                        onChange={(e) => updateDiver("weight", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                        placeholder="160 lbs or 72 kg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Footprints className="w-4 h-4 inline mr-1" />
                        Shoe Size *
                      </label>
                      <input
                        type="text"
                        value={currentDiver.shoeSize}
                        onChange={(e) =>
                          updateDiver("shoeSize", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                        placeholder="10 US or 43 EU"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Services Selection (only show for first diver) */}
              {currentDiverIndex === 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Additional Services (For All Divers)
                  </h4>

                  <div className="space-y-3">
                    {tripData.services.options.map((service) => (
                      <label
                        key={service.id}
                        className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-gray-300"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={
                              service.id === "dive-guide"
                                ? addDiveGuide
                                : addInstructor
                            }
                            onChange={(e) => {
                              if (service.id === "dive-guide") {
                                setAddDiveGuide(e.target.checked);
                              } else {
                                setAddInstructor(e.target.checked);
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <div>
                            <div className="font-medium text-sm">
                              {service.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {service.description}
                            </div>
                            {service.id === "dive-guide" &&
                              service.tieredPricing && (
                                <div className="text-xs text-blue-600 mt-1">
                                  Price for {diverCount}{" "}
                                  {diverCount === 1 ? "person" : "people"}
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="font-semibold">
                          $
                          {service.id === "dive-guide"
                            ? service.tieredPricing?.find(
                                (t) => t.peopleCount >= diverCount,
                              )?.price ||
                              service.tieredPricing?.[
                                service.tieredPricing.length - 1
                              ]?.price ||
                              0
                            : service.flatPrice}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Validation Message */}
              {!isCurrentDiverComplete() && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-amber-800">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">
                      Please complete all required fields
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentDiverIndex === 0}
            >
              Previous
            </Button>

            <div className="text-sm text-gray-500 flex items-center">
              {currentDiverIndex + 1} of {diverCount} divers
            </div>

            <Button
              onClick={handleNext}
              disabled={!isCurrentDiverComplete()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentDiverIndex === diverCount - 1
                ? "Review Booking"
                : "Next Diver"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
