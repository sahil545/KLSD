"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface BookingSlot {
  date: string;
  time: string;
  available_spots: number;
  price: number;
  booking_id?: string;
}

interface BookingAvailability {
  product_id: number;
  available_dates: string[];
  time_slots: BookingSlot[];
  max_capacity: number;
  duration: number;
}

interface DateTimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  onDateTimeSelect: (date: string, time: string, price: number) => void;
  selectedDate?: string;
  selectedTime?: string;
}

export default function DateTimePicker({
  isOpen,
  onClose,
  productId,
  onDateTimeSelect,
  selectedDate,
  selectedTime,
}: DateTimePickerProps) {
  const [availability, setAvailability] = useState<BookingAvailability | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [localSelectedDate, setLocalSelectedDate] = useState(
    selectedDate || "",
  );
  const [localSelectedTime, setLocalSelectedTime] = useState(
    selectedTime || "",
  );

  useEffect(() => {
    if (isOpen && productId) {
      fetchAvailability();
    }
  }, [isOpen, productId]);

  useEffect(() => {
    setLocalSelectedDate(selectedDate || "");
    setLocalSelectedTime(selectedTime || "");
  }, [selectedDate, selectedTime]);

  const fetchAvailability = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/wc-bookings?action=get_availability&product_id=${productId}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to load availability (${response.status})`);
      }

      const data = await response.json();

      if (data.success) {
        setAvailability(data.data);
      } else {
        setError(data.error || "No availability found");
      }
    } catch (err) {
      console.error("Booking availability error:", err);
      // Create fallback availability data for testing
      const fallbackData: BookingAvailability = {
        product_id: productId,
        available_dates: [],
        time_slots: [],
        max_capacity: 25,
        duration: 4,
      };

      // Generate some sample dates for the next 30 days
      const today = new Date();
      for (let i = 1; i <= 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toISOString().split("T")[0];

        // Skip weekends for demo
        if (date.getDay() !== 0 && date.getDay() !== 6) {
          fallbackData.available_dates.push(dateString);
          fallbackData.time_slots.push({
            date: dateString,
            time: "13:00",
            available_spots: 25,
            price: 70,
          });
        }
      }

      setAvailability(fallbackData);
      setError("Using demo data - API connection failed");
    } finally {
      setLoading(false);
    }
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

  const getAvailableDatesInMonth = (month: Date): string[] => {
    if (!availability) return [];
    return availability.available_dates.filter((date) => {
      const dateObj = new Date(date);
      return (
        dateObj.getMonth() === month.getMonth() &&
        dateObj.getFullYear() === month.getFullYear()
      );
    });
  };

  const getTimeSlotsForDate = (date: string): BookingSlot[] => {
    if (!availability) return [];
    return availability.time_slots.filter((slot) => slot.date === date);
  };

  const handleDateSelect = (date: string) => {
    setLocalSelectedDate(date);
    setLocalSelectedTime("");
  };

  const handleTimeSelect = (time: string, price: number) => {
    setLocalSelectedTime(time);
    if (localSelectedDate) {
      onDateTimeSelect(localSelectedDate, time, price);
    }
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const availableDates = getAvailableDatesInMonth(currentMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      const isCurrentMonth = date.getMonth() === month;
      const isAvailable = availableDates.includes(dateString);
      const isSelected = localSelectedDate === dateString;
      const isPast = date < today;

      days.push(
        <button
          key={dateString}
          onClick={() => isAvailable && !isPast && handleDateSelect(dateString)}
          disabled={!isAvailable || isPast || !isCurrentMonth}
          className={`
            h-8 w-8 rounded text-sm font-medium transition-colors relative
            ${
              isSelected
                ? "bg-blue-600 text-white"
                : isAvailable && !isPast && isCurrentMonth
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : "text-gray-300 cursor-not-allowed"
            }
            ${!isCurrentMonth ? "opacity-30" : ""}
          `}
        >
          {date.getDate()}
          {isAvailable && !isPast && isCurrentMonth && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
          )}
        </button>,
      );
    }

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                ),
              )
            }
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h4 className="font-medium text-sm">
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                ),
              )
            }
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div
              key={index}
              className="h-6 flex items-center justify-center text-xs font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  if (!isOpen) return null;

  const selectedDateSlots = localSelectedDate
    ? getTimeSlotsForDate(localSelectedDate)
    : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-lg">Select Date & Time</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading availability...</p>
            </div>
          )}

          {error && (
            <div
              className={`border rounded p-3 ${
                error.includes("demo data")
                  ? "bg-blue-50 border-blue-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div
                className={`flex items-center gap-2 mb-2 ${
                  error.includes("demo data") ? "text-blue-800" : "text-red-800"
                }`}
              >
                {error.includes("demo data") ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {error.includes("demo data")
                    ? "Demo Mode"
                    : "Availability Error"}
                </span>
              </div>
              <p
                className={`text-sm mb-3 ${
                  error.includes("demo data") ? "text-blue-700" : "text-red-700"
                }`}
              >
                {error}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={fetchAvailability}>
                  Try Again
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          )}

          {availability && !loading && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={
                        localSelectedDate
                          ? new Date(localSelectedDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              },
                            )
                          : "dd-mm-2025"
                      }
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                      placeholder="dd-mm-2025"
                    />
                    <Calendar className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={
                        localSelectedTime
                          ? formatTime(localSelectedTime)
                          : "--:--"
                      }
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                      placeholder="--:--"
                    />
                    <Clock className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Selecting both date and time will set your selection
                immediately.
              </div>

              <div className="mb-4">
                {renderCalendar()}
                {localSelectedDate && (
                  <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-blue-900">
                    Selected:{" "}
                    {new Date(localSelectedDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                )}
              </div>

              {localSelectedDate && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-sm mb-3">Available Times</h4>
                  {selectedDateSlots.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        No times available for this date
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedDateSlots.map((slot) => (
                        <button
                          key={`${slot.date}-${slot.time}`}
                          onClick={() =>
                            handleTimeSelect(slot.time, slot.price)
                          }
                          className={`w-full p-3 rounded border-2 text-left transition-all ${
                            localSelectedTime === slot.time
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">
                                {formatTime(slot.time)}
                              </div>
                              <div className="text-xs text-gray-600 flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {slot.available_spots} spots
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">${slot.price}</div>
                              <div className="text-xs text-gray-600">
                                per person
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {!localSelectedDate && (
                <div className="text-center py-4 text-gray-500 border-t">
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    Select a date to see available times
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
