"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import GuestDetailsModal from "@/components/GuestDetailsModal";
import BookingCalendar from "@/components/BookingCalendar";
import { type TourData } from "../data";
import {
  Calendar,
  Star,
  Plus,
  Minus,
  CheckCircle,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";

interface BookingAvailability {
  product_id: number;
  available_dates: string[];
  time_slots: Array<{
    date: string;
    time: string;
    available_spots: number;
    price: number;
    booking_id?: string;
  }>;
  max_capacity: number;
  duration: number;
}

interface BookingSectionProps {
  data: TourData;
  productId?: number;
}

export default function BookingSection({ data, productId = 34592 }: BookingSectionProps) {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(data.pricing.basePrice);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [availability, setAvailability] = useState<BookingAvailability | null>(null);
  const [preloadingCalendar, setPreloadingCalendar] = useState(false);

  // Preload calendar data when component mounts
  useEffect(() => {
    let controller: AbortController | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const preloadCalendarData = async () => {
      setPreloadingCalendar(true);
      try {
        // Create abort controller for this specific request
        controller = new AbortController();
        timeoutId = setTimeout(() => {
          if (controller) {
            controller.abort();
          }
        }, 10000); // 10 second timeout for preload

        const response = await fetch(`/api/wc-bookings?action=get_availability&product_id=${productId}`, {
          signal: controller.signal
        });

        // Clear timeout if request completes successfully
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setAvailability(data.data);
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Calendar preload timeout or cancelled - calendar will load on demand');
        } else {
          console.log('Calendar preload failed (non-critical):', error);
        }
      } finally {
        setPreloadingCalendar(false);
      }
    };

    preloadCalendarData();

    // Cleanup function to prevent AbortError on unmount
    return () => {
      if (controller) {
        controller.abort();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [productId]);

  // Calculate pricing with proper error handling
  const currentPrice = selectedPrice || data.pricing.basePrice;
  const tax = guestCount * currentPrice * data.pricing.taxRate;
  const totalPrice = guestCount * currentPrice + tax;

  const handleDateTimeSelect = (date: string, time: string, price: number) => {
    console.log('Date/Time selected:', { date, time, price }); // Debug log
    setSelectedDate(date);
    setSelectedTime(time);
    // Ensure price is valid before setting
    if (price && price > 0) {
      setSelectedPrice(price);
    }
    setShowCalendar(false);
  };

  const formatSelectedDateTime = () => {
    if (!selectedDate || !selectedTime) return "";

    const date = new Date(selectedDate);
    const dateStr = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const [hours, minutes] = selectedTime.split(':');
    const timeDate = new Date();
    timeDate.setHours(parseInt(hours), parseInt(minutes));
    const timeStr = timeDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${dateStr} at ${timeStr}`;
  };

  const handleReserveClick = async () => {
    if (!selectedDate || !selectedTime) {
      setShowCalendar(true);
      return;
    }

    setIsCreatingBooking(true);

    try {
      // Create booking order via API
      const bookingData = {
        product_id: productId,
        date: selectedDate,
        time: selectedTime,
        guests: guestCount,
        customer: {
          first_name: 'Guest', // Would get from form
          last_name: 'Customer',
          email: 'guest@example.com',
          phone: '(555) 123-4567',
        },
      };

      const response = await fetch('/api/wc-bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        // Redirect to WooCommerce checkout
        window.location.href = result.checkout_url;
      } else {
        console.error('Booking creation failed:', result.error);
        // Fallback: show guest modal for manual booking
        setShowGuestModal(true);
      }
    } catch (error) {
      console.error('Booking error:', error);
      // Fallback: show guest modal for manual booking
      setShowGuestModal(true);
    } finally {
      setIsCreatingBooking(false);
    }
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
            Starting at ${data.pricing.basePrice} per person • Free cancellation up to 24 hours
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - Date & Guest Selection */}
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Tour Details
              </h3>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Date
                </label>
                <Button
                variant="outline"
                onClick={() => setShowCalendar(true)}
                disabled={preloadingCalendar}
                className="w-full justify-start border-2 border-gray-200 hover:border-blue-300 h-12"
              >
                <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                <span className="text-gray-700">
                  {preloadingCalendar ? 'Loading calendar...' :
                   selectedDate && selectedTime ? formatSelectedDateTime() : 'Choose Date & Time'}
                </span>
              </Button>
              {selectedDate && selectedTime && (
                <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <CheckCircle className="w-4 h-4" />
                    <span>Date & time selected</span>
                  </div>
                </div>
              )}
              </div>

              {/* Guest Count */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Number of Guests
                </label>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="h-12 w-12 p-0 border-gray-300 rounded-full"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <div className="text-center">
                    <div className="font-bold text-3xl text-gray-900">
                      {guestCount}
                    </div>
                    <div className="text-sm text-gray-500">guests</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuestCount(Math.min(25, guestCount + 1))}
                    className="h-12 w-12 p-0 border-gray-300 rounded-full"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{data.details.rating}/5 rating from {data.details.reviewCount} reviews</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>No booking fees - save $15+</span>
                </div>
              </div>
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
                  for {guestCount} {guestCount === 1 ? "guest" : "guests"}
                </div>
                {currentPrice !== data.pricing.basePrice && (
                  <div className="text-sm text-blue-600 mt-1">
                    Selected time: ${currentPrice}/person
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                <span>
                  ${currentPrice.toFixed(2)} × {guestCount} guests
                </span>
                <span>${(guestCount * currentPrice).toFixed(2)}</span>
              </div>
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
                ) : selectedDate && selectedTime ? (
                  'Reserve Your Spot Now'
                ) : (
                  'Select Date & Time First'
                )}
              </Button>

              <div className="text-center text-sm text-gray-500">
                {selectedDate && selectedTime ? (
                  "You'll be redirected to secure checkout"
                ) : (
                  "Select your preferred date and time above"
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Calendar Modal */}
      <BookingCalendar
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        productId={productId}
        onDateTimeSelect={handleDateTimeSelect}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        preloadedAvailability={availability}
        onDataLoad={(data) => setAvailability(data)}
      />

      {/* Guest Details Modal */}
      <GuestDetailsModal
        isOpen={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        guestCount={guestCount}
        totalPrice={Number.isFinite(totalPrice) ? totalPrice : 0}
        selectedDate={selectedDate}
      />
    </section>
  );
}
