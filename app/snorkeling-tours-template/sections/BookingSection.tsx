"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import GuestDetailsModal from "@/components/GuestDetailsModal";
import SimpleDatePicker from "@/components/SimpleDatePicker";
import { type TourData } from "../data";
import {
  Star,
  Plus,
  Minus,
  CheckCircle,
  Users,
  DollarSign,
} from "lucide-react";

interface PersonType {
  id: number;
  name: string;
  description: string;
  base_cost: string;
  block_cost: string;
  min: string;
  max: string;
}

interface BookingSectionProps {
  data: TourData;
  productId?: number;
}

export default function BookingSection({
  data,
  productId,
}: BookingSectionProps) {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [personTypes, setPersonTypes] = useState<PersonType[]>([]);
  const [personTypesLoaded, setPersonTypesLoaded] = useState(false);
  const [personCounts, setPersonCounts] = useState<{ [key: number]: number }>(
    {},
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [selectedPrice, setSelectedPrice] = useState(data.pricing.basePrice);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [customFormFields, setCustomFormFields] = useState<any>(null);
  const [rentalGearSelections, setRentalGearSelections] = useState<{
    [passengerIndex: number]: { [productId: string]: boolean };
  }>({});

  // Calculate total guests from person counts
  const totalGuests = Object.values(personCounts).reduce(
    (sum, count) => sum + count,
    0,
  );

  // Calculate diver count specifically
  const diverCount = personTypes.find((pt) => pt.name.includes("Diver"))
    ? personCounts[personTypes.find((pt) => pt.name.includes("Diver"))!.id] || 0
    : 0;

  // Fetch custom form fields when person types are loaded
  useEffect(() => {
    if (personTypes.length > 0) {
      fetchCustomFormFields();
    }
  }, [personTypes]);

  const fetchCustomFormFields = async () => {
    try {
      const response = await fetch(
        `https://keylargoscubadiving.com/wp-json/childtheme/v1/product/${productId}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch product data (${response.status})`);
      }

      const data = await response.json();
      if (data.custom_form_fields) {
        setCustomFormFields(data.custom_form_fields);
        console.log("✅ Custom form fields loaded:", data.custom_form_fields);
      }
    } catch (err) {
      console.error("Error fetching custom form fields:", err);
    }
  };

  // Calculate pricing based on person types and their block_cost
  const calculatePersonTypePrice = () => {
    let totalPersonTypePrice = 0;
    personTypes.forEach((personType) => {
      const count = personCounts[personType.id] || 0;
      const blockCost = parseFloat(personType.block_cost) || 0;
      totalPersonTypePrice += count * blockCost;
    });
    return totalPersonTypePrice;
  };

  // Calculate rental gear costs
  const calculateRentalGearCost = () => {
    let totalRentalCost = 0;
    Object.values(rentalGearSelections).forEach((passengerGear) => {
      Object.entries(passengerGear).forEach(([productId, isSelected]) => {
        if (isSelected && customFormFields?.products) {
          const product = customFormFields.products.find(
            (p: any) => p.id === productId,
          );
          if (product) {
            totalRentalCost += product.price;
          }
        }
      });
    });
    return totalRentalCost;
  };

  const personTypePrice = calculatePersonTypePrice();
  const rentalGearCost = calculateRentalGearCost();
  const subtotal = personTypePrice + rentalGearCost;
  const tax = subtotal * data.pricing.taxRate;
  const totalPrice = subtotal + tax;

  const handleDateSelect = (
    date: Date,
    timeSlot: any,
    personTypesData: PersonType[],
  ) => {
    console.log("Date/Time selected:", { date, timeSlot, personTypesData }); // Debug log
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
    setPersonTypes(personTypesData);

    // Initialize person counts with minimum values if not already set
    const initialCounts: { [key: number]: number } = { ...personCounts };
    personTypesData.forEach((personType) => {
      if (!(personType.id in initialCounts)) {
        const minCount = parseInt(personType.min) || 0;
        initialCounts[personType.id] = minCount;
      }
    });
    setPersonCounts(initialCounts);

    // You can extract price from timeSlot if available
    // For now, using base price
    setSelectedPrice(data.pricing.basePrice);
  };

  // Initialize person types when they become available
  const initializePersonTypes = (personTypesData: PersonType[]) => {
    setPersonTypes(personTypesData);
    setPersonTypesLoaded(true);
    console.log("Person types initialized:", personTypesData);

    // Initialize person counts with minimum values
    const initialCounts: { [key: number]: number } = {};
    personTypesData.forEach((personType) => {
      const minCount = parseInt(personType.min) || 0;
      initialCounts[personType.id] = minCount;
    });
    setPersonCounts(initialCounts);
  };

  const updatePersonCount = (personTypeId: number, increment: boolean) => {
    const personType = personTypes.find((pt) => pt.id === personTypeId);
    if (!personType) return;

    const currentCount = personCounts[personTypeId] || 0;
    const minCount = parseInt(personType.min) || 0;
    const maxCount = personType.max ? parseInt(personType.max) : 25;

    let newCount;
    if (increment) {
      newCount = Math.min(maxCount, currentCount + 1);
    } else {
      newCount = Math.max(minCount, currentCount - 1);
    }

    setPersonCounts((prev) => ({
      ...prev,
      [personTypeId]: newCount,
    }));
  };

  const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatSelectedDateTime = () => {
    if (!selectedDate || !selectedTimeSlot) return "";

    const dateStr = selectedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const [hours, minutes] = selectedTimeSlot.from.split(":");
    const timeDate = new Date();
    timeDate.setHours(parseInt(hours), parseInt(minutes));
    const timeStr = timeDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${dateStr} at ${timeStr}`;
  };

  const handleRentalGearUpdate = (
    passengerIndex: number,
    productId: string,
    isSelected: boolean,
  ) => {
    setRentalGearSelections((prev) => ({
      ...prev,
      [passengerIndex]: {
        ...prev[passengerIndex],
        [productId]: isSelected,
      },
    }));
  };

  const handleReserveClick = async () => {
    if (!selectedDate || !selectedTimeSlot) {
      // Date picker is always visible, no need to show modal
      return;
    }

    setShowGuestModal(true);
  };

  return (
    <section
      id="booking-section"
      className="py-16 bg-white border-t border-gray-100"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Experience
          </h2>
          <p className="text-gray-600">
            Starting at ${data.pricing.basePrice} per person • Free cancellation
            up to 24 hours
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - Date & Guest Selection */}
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Tour Details
              </h3>

              {/* Date & Time Selection */}
              <div className="mb-6">
                <SimpleDatePicker
                  productId={productId}
                  onDateSelect={handleDateSelect}
                  onPersonTypesLoaded={initializePersonTypes}
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                />
              </div>

              {/* Person Types Selection */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Person Types
                </h4>
                {!personTypesLoaded ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Loading person types...
                    </p>
                  </div>
                ) : personTypes.length > 0 ? (
                  <div
                    className={`grid gap-4 ${personTypes.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
                  >
                    {personTypes.map((personType) => (
                      <div
                        key={personType.id}
                        className="flex flex-col bg-gray-50 rounded-lg p-4"
                      >
                        <div className="mb-3">
                          <h5 className="font-bold text-gray-900 text-center">
                            {personType.name}
                          </h5>
                          {personType.description && (
                            <p className="text-sm text-gray-600 text-center mt-1">
                              {personType.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updatePersonCount(personType.id, false)
                            }
                            className="h-10 w-10 p-0 border-gray-300 rounded-full"
                            disabled={
                              (personCounts[personType.id] || 0) <=
                              (parseInt(personType.min) || 0)
                            }
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-bold text-2xl text-gray-900 min-w-[3rem] text-center">
                            {personCounts[personType.id] || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updatePersonCount(personType.id, true)
                            }
                            className="h-10 w-10 p-0 border-gray-300 rounded-full"
                            disabled={
                              (personCounts[personType.id] || 0) >=
                              parseInt(personType.max || "25")
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      No specific Person Type found
                    </p>
                  </div>
                )}
              </div>

              {/* Trust Indicators */}
              {/* <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>
                    {data.details.rating}/5 rating from{" "}
                    {data.details.reviewCount} reviews
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>No booking fees - save $15+</span>
                </div>
              </div> */}
            </CardContent>
          </Card>

          {/* Right Side - Pricing & Booking */}
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Pricing & Payment
              </h3>

              {/* Price Display */}
              <div className="text-center mb-6 p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  ${totalPrice.toFixed(2)}
                </div>
                <div className="text-gray-600">
                  for {totalGuests} {totalGuests === 1 ? "guest" : "guests"}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mb-6">
                {personTypes.map((personType) => {
                  const count = personCounts[personType.id] || 0;
                  const blockCost = parseFloat(personType.block_cost) || 0;
                  const lineTotal = count * blockCost;

                  if (count > 0) {
                    return (
                      <div
                        key={personType.id}
                        className="flex justify-between items-center text-sm text-gray-600 mb-2"
                      >
                        <span>
                          {personType.name}: {count} × ${blockCost.toFixed(2)}
                        </span>
                        <span>${lineTotal.toFixed(2)}</span>
                      </div>
                    );
                  }
                  return null;
                })}
                {/* <div className="flex justify-between items-center text-sm text-gray-600 mb-3 border-t border-gray-200 pt-2">
                  <span>Person Types Subtotal</span>
                  <span>${personTypePrice.toFixed(2)}</span>
                </div> */}
                {/* {rentalGearCost > 0 && (
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span>Rental Gear</span>
                    <span>${rentalGearCost.toFixed(2)}</span>
                  </div>
                )} */}
                {/* <div className="flex justify-between items-center text-sm text-gray-600 mb-3 border-t border-gray-200 pt-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>*/}
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-gray-900 text-lg border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Reserve Button */}
              <Button
                onClick={handleReserveClick}
                disabled={isCreatingBooking}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 text-lg rounded-lg mb-4"
              >
                {isCreatingBooking ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Creating Booking...
                  </div>
                ) : selectedDate && selectedTimeSlot ? (
                  "Reserve Your Spot Now"
                ) : (
                  "Select Date & Time First"
                )}
              </Button>

              <div className="text-center text-sm text-gray-500">
                {selectedDate && selectedTimeSlot
                  ? "You'll be redirected to secure checkout"
                  : "Select your preferred date and time above"}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Guest Details Modal */}
      <GuestDetailsModal
        isOpen={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        guestCount={totalGuests}
        diverCount={diverCount}
        totalPrice={Number.isFinite(totalPrice) ? totalPrice : 0}
        selectedDate={selectedDate ? formatDate(selectedDate) : ""}
        selectedTime={selectedTimeSlot ? formatTime(selectedTimeSlot.from) : ""}
        customFormFields={customFormFields}
        personTypes={personTypes}
        personTypeCounts={personTypes.map((pt) => ({
          id: pt.id,
          count: personCounts[pt.id] || 0,
          name: pt.name,
        }))}
        onRentalGearUpdate={handleRentalGearUpdate}
        rentalGearSelections={rentalGearSelections}
        productIdNumber={productId}
      />
    </section>
  );
}
