"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle } from "lucide-react";

// Custom CSS for date picker styling
const customDatePickerStyles = `
  .custom-datepicker {
    font-family: inherit;
  }
  
  .custom-datepicker .react-datepicker__header {
    background-color: white !important;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem;
  }
  
  .custom-datepicker .react-datepicker__current-month {
    color: #374151 !important;
    font-weight: 600;
    font-size: 1.125rem;
  }
  
  .custom-datepicker .react-datepicker__day-names {
    display: flex !important;
    justify-content: space-between !important;
    margin-bottom: 0.5rem !important;
    padding: 0 1rem !important;
  }
  
  .custom-datepicker .react-datepicker__day-name {
    color: #6b7280 !important;
    font-weight: 500;
    text-align: center !important;
    width: 2rem !important;
    height: 2rem !important;
    line-height: 2rem !important;
    margin: 0 !important;
    padding: 0 !important;
    flex: 1 !important;
  }
  
  .custom-datepicker .react-datepicker__month {
    width: 100% !important;
  }
  
  .custom-datepicker .react-datepicker__week {
    display: flex !important;
    justify-content: space-between !important;
    margin-bottom: 0.125rem !important;
    padding: 0 0.5rem !important;
  }
  
  .custom-datepicker .react-datepicker__day {
    color: #374151 !important;
    border-radius: 0.375rem;
    margin: 0 !important;
    width: 2rem !important;
    height: 2rem !important;
    line-height: 2rem !important;
    text-align: center !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex: 1 !important;
  }
  
  .custom-datepicker .react-datepicker__day--outside-month {
    color: #d1d5db !important;
  }
  
  .custom-datepicker .react-datepicker__day:hover {
    background-color: #f3f4f6 !important;
  }
  
  .custom-datepicker .react-datepicker__day--selected {
    background-color: #3b82f6 !important;
    color: white !important;
  }
  
  .custom-datepicker .react-datepicker__day--keyboard-selected {
    background-color: #3b82f6 !important;
    color: white !important;
  }
  
  .custom-datepicker .react-datepicker__day--disabled {
    color: #d1d5db !important;
  }
  
  .custom-datepicker .react-datepicker__navigation {
    top: 1rem;
  }
  
  .custom-datepicker .react-datepicker__navigation-icon::before {
    border-color: #6b7280 !important;
  }
  
  .custom-datepicker .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
    border-color: #374151 !important;
  }
`;

// Inject custom styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = customDatePickerStyles;
  document.head.appendChild(styleElement);
}

interface TimeSlot {
  type: string;
  bookable: string;
  priority: number;
  from: string;
  to: string;
}

interface PersonType {
  id: number;
  name: string;
  description: string;
  base_cost: string;
  block_cost: string;
  min: string;
  max: string;
}

interface BookingData {
  availability: TimeSlot[];
  has_persons: string;
  min_persons: string;
  max_persons: string;
  person_cost_multiplier: string;
  person_qty_multiplier: string;
  has_person_types: string;
  person_types: PersonType[];
}

interface ProductResponse {
  id: number;
  name: string;
  booking_data: BookingData;
}

interface SimpleDatePickerProps {
  productId: number;
  onDateSelect: (
    date: Date,
    timeSlot: TimeSlot,
    personTypes: PersonType[],
  ) => void;
  onPersonTypesLoaded?: (personTypes: PersonType[]) => void;
  selectedDate?: Date;
  selectedTimeSlot?: TimeSlot;
}

export default function SimpleDatePicker({
  productId,
  onDateSelect,
  onPersonTypesLoaded,
  selectedDate,
  selectedTimeSlot,
}: SimpleDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(selectedDate || null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [personTypes, setPersonTypes] = useState<PersonType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch person types on component mount
  useEffect(() => {
    fetchPersonTypes();
  }, []);

  const fetchPersonTypes = async () => {
    try {
      const response = await fetch(
        `https://keylargoscubadiving.com/wp-json/childtheme/v1/product/${productId}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch product data (${response.status})`);
      }

      const data: ProductResponse = await response.json();

      if (data.booking_data && data.booking_data.person_types) {
        setPersonTypes(data.booking_data.person_types);
        // Pass person types to parent component immediately
        if (onPersonTypesLoaded) {
          onPersonTypesLoaded(data.booking_data.person_types);
        }
      }
    } catch (err) {
      console.error("Error fetching person types:", err);
    }
  };

  const fetchTimeSlots = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://keylargoscubadiving.com/wp-json/childtheme/v1/product/${productId}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch product data (${response.status})`);
      }

      const data: ProductResponse = await response.json();

      if (data.booking_data && data.booking_data.availability) {
        const filteredTimeSlots = data.booking_data.availability.filter(
          (slot) => slot.bookable === "yes",
        );
        setTimeSlots(filteredTimeSlots);
      } else {
        setTimeSlots([]);
        setError("No time slots available");
      }
    } catch (err) {
      console.error("Error fetching time slots:", err);
      setError("Failed to load time slots");
      setTimeSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
    if (newDate) {
      // Fetch time slots when a date is selected
      fetchTimeSlots();
      // Close the dropdown after date selection
      setIsOpen(false);
    } else {
      // Clear time slots when no date is selected
      setTimeSlots([]);
    }
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    if (date) {
      onDateSelect(date, timeSlot, personTypes);
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

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Date
        </label>
        <div className="relative">
          <input
            type="text"
            value={date ? formatDate(date) : ""}
            readOnly
            placeholder="Select a date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <Calendar className="w-4 h-4 text-gray-500" />
          </Button>
        </div>

        {/* Date Picker Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              inline
              minDate={new Date()}
              maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)} // 90 days from now
              className="w-full"
              calendarClassName="custom-datepicker"
            />
          </div>
        )}

        {/* Selected Date Confirmation */}
        {date && (
          <div className="mt-2 flex items-center gap-2 text-sm text-green-700">
            <CheckCircle className="w-4 h-4" />
            <span>Selected Date: {formatDate(date)}</span>
          </div>
        )}
      </div>

      {/* Time Slot Selection - Only show when date is selected */}
      {date && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Time Slot
          </label>

          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading time slots...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-4 text-red-600">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && timeSlots.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No time slots available for this date</p>
            </div>
          )}

          {!loading && !error && timeSlots.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSlotSelect(slot)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    selectedTimeSlot === slot
                      ? "border-green-500 bg-green-50 text-green-700"
                      : slot.bookable === "yes"
                        ? "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
                        : "border-red-200 bg-red-50 text-red-700 cursor-not-allowed"
                  }`}
                  disabled={slot.bookable !== "yes"}
                >
                  <div className="font-medium">{formatTime(slot.from)}</div>
                  <div className="text-xs mt-1">
                    {slot.bookable === "yes" ? "Available" : "Unavailable"}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
