"use client";
import React, { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { prefetchBookingAvailability } from "./BookingCalendar";
import { Button } from "@/components/ui/button";

type Slot = {
  date: string;
  time: string;
  available_spots: number;
  price: number;
  booking_id?: string;
};

export function formatDateYYYYMMDD(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function WooInlineCalendar(props: {
  productId: number;
  selectedDate?: string;
  onDateTimeSelect: (date: string, time: string, price: number) => void;
}) {
  const { productId, selectedDate, onDateTimeSelect } = props;
  const [availability, setAvailability] = useState<{
    available_dates: string[];
    time_slots: Slot[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [month, setMonth] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined,
  );

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    prefetchBookingAvailability(productId)
      .then((data: any) => {
        if (!mounted) return;
        if (data) {
          setAvailability({
            available_dates: data.available_dates || [],
            time_slots: (data.time_slots || []) as Slot[],
          });
        } else {
          setAvailability({ available_dates: [], time_slots: [] });
        }
      })
      .catch(() => {
        if (!mounted) return;
        setAvailability({ available_dates: [], time_slots: [] });
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [productId]);

  useEffect(() => {
    if (selectedDate) setDate(new Date(selectedDate));
  }, [selectedDate]);

  const disabledMatcher = useMemo(() => {
    const set = new Set(availability?.available_dates || []);
    return (day: Date) => {
      // Never disable while loading or when we don't know availability yet
      if (loading || set.size === 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return day < today; // only disable past days
      }
      return !set.has(formatDateYYYYMMDD(day));
    };
  }, [availability, loading]);

  const selectedDaySlots = useMemo(() => {
    if (!availability || !date) return [] as Slot[];
    const key = formatDateYYYYMMDD(date);
    return availability.time_slots.filter((s) => s.date === key);
  }, [availability, date]);

  return (
    <div className="space-y-3">
      {loading && (
        <div className="text-sm text-gray-600">Loading availability…</div>
      )}
      <DayPicker
        mode="single"
        selected={date}
        onSelect={setDate}
        month={month}
        onMonthChange={setMonth}
        disabled={disabledMatcher}
        captionLayout="dropdown"
        showOutsideDays
      />

      {date && (
        <div className="mt-1">
          {selectedDaySlots.length === 0 ? (
            <div className="text-sm text-gray-600">
              No times available for the selected date.
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">
                Available times
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedDaySlots.map((slot) => (
                  <Button
                    key={`${slot.date}-${slot.time}`}
                    variant="outline"
                    className="justify-between"
                    onClick={() =>
                      onDateTimeSelect(slot.date, slot.time, slot.price)
                    }
                  >
                    <span>{slot.time}</span>
                    <span className="text-gray-600 text-xs">${slot.price}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
