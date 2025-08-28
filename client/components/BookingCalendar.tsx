"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, X } from "lucide-react";

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

interface BookingCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  onDateTimeSelect: (date: string, time: string, price: number) => void;
  selectedDate?: string;
  selectedTime?: string;
}

export default function BookingCalendar({
  isOpen,
  onClose,
  productId,
  onDateTimeSelect,
  selectedDate,
  selectedTime,
}: BookingCalendarProps) {
  const [availability, setAvailability] = useState<BookingAvailability | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [localSelectedDate, setLocalSelectedDate] = useState(selectedDate || "");
  const [localSelectedTime, setLocalSelectedTime] = useState(selectedTime || "");

  // Fetch availability when component opens
  useEffect(() => {
    if (isOpen && productId) {
      fetchAvailability();
    }
  }, [isOpen, productId]);

  const fetchAvailability = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/wc-bookings?action=get_availability&product_id=${productId}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setAvailability(data.data);
      } else {
        setError(data.error || 'Failed to fetch availability');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error while fetching availability';
      setError(errorMessage);
      console.error('Booking availability error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getAvailableDatesInMonth = (month: Date): string[] => {
    if (!availability) return [];
    
    return availability.available_dates.filter(date => {
      const dateObj = new Date(date);
      return dateObj.getMonth() === month.getMonth() && 
             dateObj.getFullYear() === month.getFullYear();
    });
  };

  const getTimeSlotsForDate = (date: string): BookingSlot[] => {
    if (!availability) return [];
    
    return availability.time_slots.filter(slot => slot.date === date);
  };

  const handleDateSelect = (date: string) => {
    setLocalSelectedDate(date);
    setLocalSelectedTime(""); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setLocalSelectedTime(time);
    
    if (localSelectedDate) {
      const slot = getTimeSlotsForDate(localSelectedDate).find(s => s.time === time);
      if (slot) {
        onDateTimeSelect(localSelectedDate, time, slot.price);
      }
    }
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const availableDates = getAvailableDatesInMonth(currentMonth);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const isCurrentMonth = date.getMonth() === month;
      const isAvailable = availableDates.includes(dateString);
      const isSelected = localSelectedDate === dateString;
      const isPast = date < new Date();

      days.push(
        <button
          key={dateString}
          onClick={() => isAvailable && handleDateSelect(dateString)}
          disabled={!isAvailable || isPast}
          className={`
            h-10 w-10 rounded-lg text-sm font-medium transition-colors
            ${isSelected 
              ? 'bg-blue-600 text-white' 
              : isAvailable 
                ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                : 'text-gray-300 cursor-not-allowed'
            }
            ${!isCurrentMonth ? 'opacity-30' : ''}
          `}
        >
          {date.getDate()}
        </button>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Date & Time
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading availability...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchAvailability} className="mt-2">
                Try Again
              </Button>
            </div>
          )}

          {availability && !loading && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Choose Date</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    >
                      ←
                    </Button>
                    <span className="font-medium min-w-[140px] text-center">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    >
                      →
                    </Button>
                  </div>
                </div>
                {renderCalendar()}
                
                {localSelectedDate && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">
                      Selected: {formatDate(localSelectedDate)}
                    </p>
                  </div>
                )}
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Choose Time</h3>
                
                {!localSelectedDate && (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Please select a date first</p>
                  </div>
                )}

                {localSelectedDate && (
                  <div className="space-y-3">
                    {getTimeSlotsForDate(localSelectedDate).map((slot) => (
                      <button
                        key={`${slot.date}-${slot.time}`}
                        onClick={() => handleTimeSelect(slot.time)}
                        className={`
                          w-full p-4 rounded-lg border-2 text-left transition-all
                          ${localSelectedTime === slot.time
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-lg">
                              {formatTime(slot.time)}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {slot.available_spots} spots available
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">${slot.price}</div>
                            <div className="text-sm text-gray-600">per person</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          {localSelectedDate && localSelectedTime && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {formatDate(localSelectedDate)} at {formatTime(localSelectedTime)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {availability?.duration} hour tour
                  </p>
                </div>
                <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
                  Confirm Selection
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
