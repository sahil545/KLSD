"use client";

import React, { useState } from "react";
import { Navigation } from "../../client/components/Navigation";
import { Footer } from "../../client/components/Footer";
import BookingCalendar from "../../client/components/BookingCalendar";
import { BookingCalendarErrorBoundary } from "../../client/components/BookingCalendarErrorBoundary";
import { DevStatus } from "../../client/components/DevStatus";
import { Badge } from "../../client/components/ui/badge";

export default function BookingCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleDateTimeSelect = (date: string, time: string, price: number) => {
    setSelectedDate(date);
    setSelectedTime(time);
    console.log(`Selected: ${date} at ${time} for $${price}`);
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-gradient-to-r from-ocean to-sage text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-coral/20 text-coral border-coral/30 text-lg px-4 py-2">
              Booking Management
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Booking Calendar
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              View and manage your diving tour bookings by month. Track customer reservations, 
              revenue, and participant counts in an easy-to-read calendar format.
            </p>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <BookingCalendarErrorBoundary>
            <BookingCalendar
              isOpen={true}
              onClose={() => console.log('Calendar closed')}
              productId={34592}
              onDateTimeSelect={handleDateTimeSelect}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </BookingCalendarErrorBoundary>

          {selectedDate && selectedTime && (
            <div className="mt-8 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
                <p className="text-green-800 font-medium">
                  Selected: {selectedDate} at {selectedTime}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <DevStatus />
    </div>
  );
}
