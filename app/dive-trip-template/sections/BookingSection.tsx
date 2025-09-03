"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import BookingCalendar from "@/components/BookingCalendar";
import DiveBookingModalSimple from "../components/DiveBookingModalSimple";
import { type DiveTripData } from "../data";
import {
  Calendar,
  Star,
  Plus,
  Minus,
  CheckCircle,
  Users,
  DollarSign,
  Clock,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";

interface BookingSectionProps {
  data: DiveTripData;
  productId?: number;
}

export default function BookingSection({
  data,
  productId = 34593,
}: BookingSectionProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [calendarError, setCalendarError] = useState(false);
  const [diverCount, setDiverCount] = useState(2);
  const calendarDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(data.pricing.basePrice);

  // Calculate base pricing (gear and services will be handled in modal)
  const baseCost = diverCount * selectedPrice;
  const tax = baseCost * data.pricing.taxRate;
  const totalPrice = baseCost + tax;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      try {
        if (
          calendarDropdownRef.current &&
          !calendarDropdownRef.current.contains(event.target as Node)
        ) {
          setShowCalendarDropdown(false);
        }
      } catch (error) {
        console.error("Error in click outside handler:", error);
        setShowCalendarDropdown(false);
      }
    };

    if (showCalendarDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendarDropdown]);

  const handleDateTimeSelect = (date: string, time: string, price: number) => {
    setSelectedDate(date);
    setSelectedTime(time);
    if (price && price > 0) {
      setSelectedPrice(price);
    }
    setShowCalendarDropdown(false);
  };

  const formatSelectedDateTime = () => {
    if (!selectedDate || !selectedTime) return "";

    const date = new Date(selectedDate);
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
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

  const handleReserveClick = () => {
    if (!selectedDate || !selectedTime) {
      return;
    }
    setShowBookingModal(true);
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
            Book Your Dive Trip
          </h2>
          <p className="text-gray-600">
            Starting at ${data.pricing.basePrice} per diver • Includes tanks &
            weights • Free cancellation up to 24 hours
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Side - Tour Details */}
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Tour Details
              </h3>

              {/* Date Selection */}
              <div className="mb-6 relative" ref={calendarDropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>

                <Button
                  variant="outline"
                  onClick={() => {
                    try {
                      setCalendarError(false);
                      setShowCalendarDropdown(!showCalendarDropdown);
                    } catch (error) {
                      console.error("Error opening calendar:", error);
                      setCalendarError(true);
                    }
                  }}
                  className="w-full justify-start border border-gray-300 hover:border-gray-400 h-11 bg-white"
                >
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    {selectedDate && selectedTime
                      ? formatSelectedDateTime()
                      : "Choose Date & Time"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 ml-auto transition-transform text-gray-400 ${showCalendarDropdown ? "rotate-180" : ""}`}
                  />
                </Button>

                {showCalendarDropdown && (
                  <div className="absolute top-full mt-1 left-0 right-0 z-50">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                      {!calendarError ? (
                        <BookingCalendar
                          productId={productId}
                          onDateTimeSelect={handleDateTimeSelect}
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          lazyLoad={true}
                        />
                      ) : (
                        <div className="p-6 text-center">
                          <div className="text-gray-500 mb-4">
                            <Clock className="w-8 h-8 mx-auto mb-2" />
                            <h3 className="font-medium text-gray-900 mb-2">
                              Calendar Temporarily Unavailable
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Call us to check availability and book your dive
                              trip.
                            </p>
                          </div>
                          <Button
                            onClick={() => {
                              window.open("tel:+1-305-391-4040", "_self");
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            Call to Book: (305) 391-4040
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Number of Divers */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Divers
                </label>
                <div className="flex items-center justify-center border border-gray-300 rounded-lg bg-white p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDiverCount(Math.max(1, diverCount - 1))}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 text-center mx-6">
                    <div className="text-2xl font-bold text-gray-900">
                      {diverCount}
                    </div>
                    <div className="text-sm text-gray-500">divers</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDiverCount(Math.min(20, diverCount + 1))}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  <span>
                    {data.details.rating}/5 rating from{" "}
                    {data.details.reviewCount} reviews
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>No booking fees - save $15+</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Pricing & Payment */}
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Pricing & Payment
              </h3>

              {/* Price Display */}
              <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-700 mb-1">
                  ${totalPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  for {diverCount} {diverCount === 1 ? "diver" : "divers"}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    ${selectedPrice.toFixed(2)} × {diverCount} divers
                  </span>
                  <span className="text-gray-900">${baseCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-base font-semibold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Reserve Button */}
              <Button
                onClick={handleReserveClick}
                disabled={!selectedDate || !selectedTime}
                className={`w-full font-semibold py-3 rounded-lg mb-3 ${
                  selectedDate && selectedTime
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-white opacity-75 cursor-not-allowed"
                }`}
              >
                {selectedDate && selectedTime
                  ? "Continue to Diver Details"
                  : "Select Date & Time First"}
              </Button>

              <div className="text-center text-sm text-gray-500">
                {selectedDate && selectedTime
                  ? "Add gear rentals & complete diver information in next step"
                  : "Select your preferred date and time above"}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dive Booking Modal - Simplified version */}
      <DiveBookingModalSimple
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tripData={data}
        diverCount={diverCount}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        basePrice={selectedPrice}
      />
    </section>
  );
}
