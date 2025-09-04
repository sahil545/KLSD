"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
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

interface BookingCalendarProps {
  productId: number;
  onDateTimeSelect: (date: string, time: string, price: number) => void;
  selectedDate?: string;
  selectedTime?: string;
  lazyLoad?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  mode?: "date-only" | "date-time";
  showManualTimeInput?: boolean;
}

// In-memory availability cache per product
const __availabilityCache = new Map<
  string,
  { ts: number; data: BookingAvailability }
>();
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function prefetchBookingAvailability(productId: number) {
  const key = String(productId);
  const now = Date.now();
  const cached = __availabilityCache.get(key);
  if (cached && now - cached.ts < CACHE_TTL_MS) return cached.data;

  const controller = new AbortController();
  const to = setTimeout(() => {
    try {
      controller.abort();
    } catch {}
  }, 5000);
  try {
    const r = await fetch(
      `/api/wc-bookings/?action=get_availability&product_id=${productId}`,
      { cache: "no-store", signal: controller.signal },
    );
    if (!r.ok) return cached?.data as any;
    const j = await r.json();
    const data = (j.data ?? j) as BookingAvailability;
    __availabilityCache.set(key, { ts: now, data });
    return data;
  } catch (err: any) {
    // Swallow timeouts/aborts and return cached data if any
    return cached?.data as any;
  } finally {
    clearTimeout(to);
  }
}

export default function BookingCalendar({
  productId,
  onDateTimeSelect,
  selectedDate,
  selectedTime,
  lazyLoad = false,
  mode = "date-time",
  showManualTimeInput = false,
}: BookingCalendarProps) {
  const [availability, setAvailability] = useState<BookingAvailability | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [localSelectedDate, setLocalSelectedDate] = useState(
    selectedDate || "",
  );
  const [nativeTime, setNativeTime] = useState("");

  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const lastFetchTimeRef = useRef<number>(0);

  // On mount, hydrate from cache and maybe refresh
  useEffect(() => {
    let didPrefill = false;
    const key = String(productId);
    const cached = __availabilityCache.get(key);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      setAvailability(cached.data);
      didPrefill = true;
    }
    if (productId && !lazyLoad) {
      fetchAvailability(didPrefill);
    }
  }, [productId, lazyLoad]);

  useEffect(() => {
    if (lazyLoad && productId && !availability) {
      fetchAvailability(false);
    }
  }, []);

  useEffect(() => {
    setLocalSelectedDate(selectedDate || "");
  }, [selectedDate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (
        abortControllerRef.current &&
        !abortControllerRef.current.signal.aborted
      ) {
        try {
          abortControllerRef.current.abort();
        } catch (err) {
          // Silently ignore during cleanup
        }
      }
    };
  }, []);

  const fetchAvailability = async (prefilled: boolean = false) => {
    // Rate limiting: prevent requests more than once every 1 second
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTimeRef.current;
    if (timeSinceLastFetch < 1000) return;
    lastFetchTimeRef.current = now;

    if (
      abortControllerRef.current &&
      !abortControllerRef.current.signal.aborted
    ) {
      try {
        abortControllerRef.current.abort();
      } catch {}
    }
    if (!isMountedRef.current) return;

    if (!prefilled) setLoading(true);
    setError(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    let timeoutId: NodeJS.Timeout | null = null;

    try {
      timeoutId = setTimeout(() => {
        try {
          controller.abort("request timeout");
        } catch {}
      }, 5000);

      const key = String(productId);
      const response = await fetch(
        `/api/wc-bookings/?action=get_availability&product_id=${productId}`,
        { signal: controller.signal, cache: "no-store" },
      );

      // Clear timeout on successful response
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (!isMountedRef.current) return;
      if (!response.ok)
        throw new Error(`Failed to load availability (${response.status})`);

      const data = await response.json();
      if (!isMountedRef.current) return;
      if (data.success) {
        const payload = data.data as BookingAvailability;
        setAvailability(payload);
        __availabilityCache.set(key, { ts: Date.now(), data: payload });
      } else {
        setError(data.error || "No availability found");
      }
    } catch (err) {
      // Clear timeout on error
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Don't update state if component is unmounted
      if (!isMountedRef.current) {
        return;
      }

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          const reason = (controller as any)?.signal?.reason;
          if (reason === "request timeout") {
            setError("Loading is taking too long. Please try again.");
          }
          // For other aborts (unmount or new request), do nothing
          return;
        } else if (err.message.includes("Failed to fetch")) {
          setError("Unable to connect. Please check your internet connection.");
        } else {
          setError("Unable to load availability. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }

      if (err instanceof Error && err.name === "AbortError") {
        const reason: any = (controller as any)?.signal?.reason;
        if (reason === "request timeout") {
          console.warn("Booking availability request timed out");
        }
        return;
      }
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (isMountedRef.current) {
        setLoading(false);
      }
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
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

  const getAvailableDatesInMonth = useCallback(
    (month: Date): string[] => {
      if (!availability) return [];

      return availability.available_dates.filter((date) => {
        const dateObj = new Date(date);
        return (
          dateObj.getMonth() === month.getMonth() &&
          dateObj.getFullYear() === month.getFullYear()
        );
      });
    },
    [availability],
  );

  const getTimeSlotsForDate = useCallback(
    (date: string): BookingSlot[] => {
      if (!availability) return [];

      return availability.time_slots.filter((slot) => slot.date === date);
    },
    [availability],
  );

  const maybeEmitNativeSelection = (date: string, time: string) => {
    if (mode === "date-only") {
      onDateTimeSelect(date, "", 0);
      return;
    }
    if (date && time) {
      onDateTimeSelect(date, time, 0);
    }
  };

  const handleDateSelect = (date: string) => {
    setLocalSelectedDate(date);
    maybeEmitNativeSelection(date, nativeTime);
  };

  const handleTimeSelect = (time: string, price: number) => {
    if (localSelectedDate) {
      onDateTimeSelect(localSelectedDate, time, price);
    }
  };

  const handleNativeTimeChange = (time: string) => {
    setNativeTime(time);
    if (localSelectedDate) {
      maybeEmitNativeSelection(localSelectedDate, time);
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
        {!availability && loading && (
          <div className="p-4">
            <div className="animate-pulse space-y-2">
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div key={i} className="h-8 bg-gray-100 rounded" />
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Month header */}
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

        {/* Day headers */}
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

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const selectedDateSlots = useMemo(
    () => (localSelectedDate ? getTimeSlotsForDate(localSelectedDate) : []),
    [localSelectedDate, getTimeSlotsForDate],
  );

  return (
    <Card className="w-full shadow-lg border border-gray-200 bg-white">
      <CardHeader className="pb-3 px-4 pt-4">
        <CardTitle className="text-base font-semibold">
          Select Date & Time
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Date</label>
            <input
              type="date"
              className="w-full h-9 rounded border border-gray-300 px-2 text-sm"
              value={localSelectedDate}
              min={availability?.available_dates?.[0]}
              max={
                availability?.available_dates?.[
                  availability?.available_dates.length - 1
                ]
              }
              onChange={(e) => handleDateSelect(e.target.value)}
            />
            {availability &&
              localSelectedDate &&
              !availability.available_dates.includes(localSelectedDate) && (
                <p className="text-xs text-red-600">
                  Selected date is not available.
                </p>
              )}
          </div>
          {mode !== "date-only" && showManualTimeInput && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Time</label>
              <input
                type="time"
                className="w-full h-9 rounded border border-gray-300 px-2 text-sm"
                step={900}
                value={nativeTime}
                onChange={(e) => handleNativeTimeChange(e.target.value)}
              />
              <p className="text-[11px] text-gray-500">
                Selecting both date and time will set your selection
                immediately.
              </p>
            </div>
          )}
        </div>

        {loading && (
          <div className="text-center py-6">
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-sm text-gray-600 font-medium">
              Loading availability...
            </p>
            <p className="text-xs text-gray-500 mt-1">
              This may take a few seconds
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800 mb-1">
                  Unable to Load Calendar
                </h4>
                <p className="text-sm text-red-700">{error}</p>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchAvailability(false)}
                    disabled={loading}
                    className="text-red-700 border-red-300 hover:bg-red-50"
                  >
                    {loading ? "Retrying..." : "Try Again"}
                  </Button>
                </div>
              </div>
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
                  Selected:{" "}
                  {new Date(localSelectedDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              )}
            </div>

            {/* Time Slots */}
            {mode !== "date-only" && localSelectedDate && (
              <div className="border-t pt-3">
                <h4 className="font-medium text-sm mb-2">Available Times</h4>

                {selectedDateSlots.length === 0 ? (
                  <div className="text-center py-3 text-gray-500">
                    <Clock className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No times available</p>
                  </div>
                ) : (
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {selectedDateSlots.map((slot) => (
                      <button
                        key={`${slot.date}-${slot.time}`}
                        onClick={() => handleTimeSelect(slot.time, slot.price)}
                        className="w-full p-2 rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-left transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">
                              {formatTime(slot.time)}
                            </div>
                            <div className="text-xs text-gray-600 flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {slot.available_spots} spots
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-sm">
                              ${slot.price}
                            </div>
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
                <p className="text-sm">Select a date to see available times</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
