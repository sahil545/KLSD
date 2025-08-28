"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, X, ChevronLeft, ChevronRight } from "lucide-react";

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
  preloadedAvailability?: BookingAvailability | null;
  onDataLoad?: (data: BookingAvailability) => void;
}

export default function BookingCalendar({
  isOpen,
  onClose,
  productId,
  onDateTimeSelect,
  selectedDate,
  selectedTime,
  preloadedAvailability,
  onDataLoad,
}: BookingCalendarProps) {
  const [availability, setAvailability] = useState<BookingAvailability | null>(preloadedAvailability || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [localSelectedDate, setLocalSelectedDate] = useState(selectedDate || "");

  // Use refs to track async operations
  const controllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Use preloaded data or fetch on first open
  useEffect(() => {
    if (isOpen && !availability && productId) {
      const fetchData = async () => {
        if (!isMountedRef.current) return;

        setLoading(true);
        setError(null);

        try {
          // Clean up any existing operations
          if (controllerRef.current) {
            controllerRef.current.abort();
          }
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          controllerRef.current = new AbortController();
          timeoutRef.current = setTimeout(() => {
            if (controllerRef.current && !controllerRef.current.signal.aborted) {
              controllerRef.current.abort();
            }
          }, 20000);

          const response = await fetch(`/api/wc-bookings?action=get_availability&product_id=${productId}`, {
            signal: controllerRef.current.signal
          });

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();

          if (data.success && isMountedRef.current) {
            setAvailability(data.data);
            onDataLoad?.(data.data);
          } else if (isMountedRef.current) {
            setError(data.error || 'Failed to fetch availability');
          }
        } catch (err) {
          if (isMountedRef.current) {
            if (err instanceof Error && err.name === 'AbortError') {
              setError('Loading taking too long. Please try again.');
            } else {
              const errorMessage = err instanceof Error ? err.message : 'Network error while fetching availability';
              setError(errorMessage);
            }
            console.error('Booking availability error:', err);
          }
        } finally {
          if (isMountedRef.current) {
            setLoading(false);
          }
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          controllerRef.current = null;
        }
      };

      fetchData();
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // Don't abort controller to avoid AbortError
      controllerRef.current = null;
    };
  }, [isOpen, productId, availability]);

  // Track component mount state
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Update local state when props change
  useEffect(() => {
    if (preloadedAvailability) {
      setAvailability(preloadedAvailability);
    }
  }, [preloadedAvailability]);

  useEffect(() => {
    setLocalSelectedDate(selectedDate || "");
  }, [selectedDate]);

  const fetchAvailability = async () => {
    if (!isMountedRef.current) return;

    setLoading(true);
    setError(null);

    // Clean up any existing operations
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      controllerRef.current = new AbortController();
      timeoutRef.current = setTimeout(() => {
        if (controllerRef.current && !controllerRef.current.signal.aborted) {
          controllerRef.current.abort();
        }
      }, 20000);

      const response = await fetch(`/api/wc-bookings?action=get_availability&product_id=${productId}`, {
        signal: controllerRef.current.signal
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && isMountedRef.current) {
        setAvailability(data.data);
        onDataLoad?.(data.data);
      } else if (isMountedRef.current) {
        setError(data.error || 'Failed to fetch availability');
      }
    } catch (err) {
      if (isMountedRef.current) {
        if (err instanceof Error && err.name === 'AbortError') {
          setError('Loading taking too long. Please try again.');
        } else {
          const errorMessage = err instanceof Error ? err.message : 'Network error while fetching availability';
          setError(errorMessage);
        }
        console.error('Booking availability error:', err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      controllerRef.current = null;
    }
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
  };

  const handleTimeSelect = (time: string, price: number) => {
    if (localSelectedDate) {
      onDateTimeSelect(localSelectedDate, time, price);
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
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
            ${isSelected 
              ? 'bg-blue-600 text-white' 
              : isAvailable && !isPast && isCurrentMonth
                ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                : 'text-gray-300 cursor-not-allowed'
            }
            ${!isCurrentMonth ? 'opacity-30' : ''}
          `}
        >
          {date.getDate()}
          {isAvailable && !isPast && isCurrentMonth && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
          )}
        </button>
      );
    }

    return (
      <div className="space-y-2">
        {/* Month header */}
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h4 className="font-medium text-sm">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="h-6 flex items-center justify-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  const selectedDateSlots = localSelectedDate ? getTimeSlotsForDate(localSelectedDate) : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-lg">Select Date & Time</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {loading && (
            <div className="text-center py-6">
              <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading real availability...</p>
              <p className="text-xs text-gray-500 mt-1">This may take a few seconds</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-sm text-red-800">{error}</p>
              <div className="flex gap-2 mt-2">
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
              {/* Calendar */}
              <div>
                {renderCalendar()}
                {localSelectedDate && (
                  <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-blue-900">
                    Selected: {new Date(localSelectedDate).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                )}
              </div>

              {/* Time Slots */}
              {localSelectedDate && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-sm mb-3">Available Times</h4>
                  
                  {selectedDateSlots.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No times available</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedDateSlots.map((slot) => (
                        <button
                          key={`${slot.date}-${slot.time}`}
                          onClick={() => handleTimeSelect(slot.time, slot.price)}
                          className="w-full p-3 rounded border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-left transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{formatTime(slot.time)}</div>
                              <div className="text-xs text-gray-600 flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {slot.available_spots} spots
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">${slot.price}</div>
                              <div className="text-xs text-gray-600">per person</div>
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
                  <p className="text-sm">Select a date to see available times</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
