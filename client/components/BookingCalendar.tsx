"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  DollarSign,
  X,
  Clock,
  Mail,
  Phone,
  CreditCard,
  Package,
  Search,
} from "lucide-react";

interface BookingData {
  id: number;
  number: string;
  status: string;
  date_created: string;
  total: string;
  currency: string;
  customer_name: string;
  customer_email: string;
  booking_details: {
    service_name: string;
    quantity: number;
    total: string;
  }[];
}

interface BookingCalendarProps {
  month?: number; // 0-11 (0 = January)
  year?: number;
  className?: string;
}
interface BookingSearchResult extends BookingData {
  customer_phone?: string;
  is_booking?: boolean;
}

export default function BookingCalendar({
  month = 7, // August = 7 (0-indexed)
  year = 2025,
  className = "",
}: BookingCalendarProps) {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(
    null,
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BookingSearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchStats, setSearchStats] = useState<{
    total_found: number;
    total_searched: number;
  } | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [fastSearchMode, setFastSearchMode] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSearchId, setCurrentSearchId] = useState<number>(0);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    // Add a small delay to prevent race conditions during Fast Refresh
    // Skip initial fetch if in development and HMR is active
    const isDev = process.env.NODE_ENV === "development";
    const delay = isDev ? 500 : 100; // Longer delay in development

    const timeoutId = setTimeout(() => {
      // Check if component is still mounted and not in HMR cycle
      if (
        typeof window !== "undefined" &&
        document.visibilityState === "visible"
      ) {
        fetchBookings();
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [currentMonth, currentYear]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const searchContainer = document.getElementById("smart-search-container");
      if (searchContainer && !searchContainer.contains(target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchBookings = async (attempt = 1) => {
    setLoading(true);
    setBookingsError(null);

    try {
      // Add timeout protection to prevent hanging requests
      const controller = new AbortController();
      const isDev = process.env.NODE_ENV === "development";
      const timeout = isDev ? 10000 : 15000; // Shorter timeout in development
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch("/api/bookings?limit=50", {
        signal: controller.signal,
        headers: {
          "Cache-Control": "no-cache",
          Accept: "application/json",
          ...(isDev && { "X-Dev-Mode": "true" }), // Dev mode header
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
        setRetryCount(0); // Reset retry count on success
        setBookingsError(null);
      } else {
        throw new Error(data.message || "API returned unsuccessful response");
      }
    } catch (error) {
      console.error(`Failed to fetch bookings (attempt ${attempt}):`, error);

      let errorMessage = "Failed to load bookings";

      if (error.name === "AbortError") {
        errorMessage = "Request timed out. The server may be busy.";
      } else if (
        error.message?.includes("Failed to fetch") ||
        error.message?.includes("NetworkError")
      ) {
        const isDev = process.env.NODE_ENV === "development";
        if (isDev) {
          errorMessage =
            "Development server connection issue. This often resolves automatically.";
        } else {
          errorMessage =
            "Network connection error. Please check your internet connection.";
        }
      } else if (error.message?.includes("HTTP")) {
        errorMessage = `Server error: ${error.message}`;
      }

      setBookingsError(errorMessage);

      // Retry logic - max 3 attempts
      if (
        attempt < 3 &&
        (error.name === "AbortError" ||
          error.message?.includes("Failed to fetch"))
      ) {
        console.log(
          `Retrying in ${attempt * 2} seconds... (attempt ${attempt + 1}/3)`,
        );
        setRetryCount(attempt);
        setTimeout(() => {
          fetchBookings(attempt + 1);
        }, attempt * 2000); // Exponential backoff: 2s, 4s, 6s
        return;
      }

      // Set empty bookings array on final failure to prevent app crashes
      setBookings([]);
    } finally {
      if (attempt === 1 || attempt >= 3) {
        setLoading(false);
      }
    }
  };

  // Get bookings for a specific date
  const getBookingsForDate = (date: Date) => {
    if (!bookings || !Array.isArray(bookings)) return [];

    return bookings.filter((booking) => {
      try {
        if (!booking || !booking.date_created) return false;
        const bookingDate = new Date(booking.date_created);
        return (
          bookingDate.getDate() === date.getDate() &&
          bookingDate.getMonth() === date.getMonth() &&
          bookingDate.getFullYear() === date.getFullYear()
        );
      } catch (error) {
        console.error("Error filtering booking by date:", booking, error);
        return false;
      }
    });
  };

  // Extract product info from booking
  const getBookingDisplayInfo = (booking: BookingData) => {
    const primaryService = booking.booking_details[0] || {
      service_name: "Tour",
      quantity: 1,
      total: "0",
    };

    // Extract serviceName with fallback
    const serviceName = primaryService.service_name || "Tour";

    // Try to extract tour time from booking metadata or use common tour times
    let time = "";
    const bookingDate = new Date(booking.date_created);

    // Common Key Largo tour times - randomize for demo purposes based on booking ID
    const commonTourTimes = [
      "8:30 AM",
      "10:00 AM",
      "12:30 PM",
      "2:00 PM",
      "3:30 PM",
    ];
    const timeIndex = (booking.id || 0) % commonTourTimes.length;
    time = commonTourTimes[timeIndex];

    // Calculate total participants from all services
    const totalParticipants = booking.booking_details.reduce(
      (sum, detail) => sum + (detail.quantity || 1),
      0,
    );

    // Shorten service name for display and clean it up
    let shortServiceName = serviceName
      .replace(/^(Tour|Trip|Dive|Snorkeling|Scuba)\s*-?\s*/i, "") // Remove common prefixes
      .replace(/\s+(Tour|Trip|Dive|Experience)$/i, "") // Remove common suffixes
      .trim();

    if (shortServiceName.length > 18) {
      shortServiceName = shortServiceName.substring(0, 18) + "...";
    }

    // Fallback to original name if cleaning resulted in empty string
    if (!shortServiceName) {
      shortServiceName =
        serviceName.length > 18
          ? serviceName.substring(0, 18) + "..."
          : serviceName;
    }

    return {
      serviceName: shortServiceName,
      time,
      participants: totalParticipants,
      displayText: `${shortServiceName}`,
      detailText: `${time} • ${totalParticipants} ${totalParticipants === 1 ? "person" : "people"}`,
    };
  };

  const handleBookingClick = (booking: BookingData) => {
    setSelectedBooking(booking);
    setIsPopupOpen(true);
  };

  const performSearch = async (query: string, fastMode: boolean = true) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      setSearchError(null);
      setSearchStats(null);
      return;
    }

    // Create unique search ID to prevent race conditions
    const searchId = Date.now();
    setCurrentSearchId(searchId);

    setSearchLoading(true);
    setSearchError(null); // Clear previous errors

    try {
      // Add timeout to fetch request
      const controller = new AbortController();
      const isDev = process.env.NODE_ENV === "development";
      const timeout = isDev ? 20000 : 35000; // Shorter timeout in development
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const searchUrl = `/api/search-bookings?q=${encodeURIComponent(query)}${fastMode ? "&fast=true" : ""}`;
      const response = await fetch(searchUrl, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(isDev && { "X-Dev-Mode": "true" }), // Dev mode header
        },
      });

      clearTimeout(timeoutId);

      // Check if this search is still current (not superseded by newer search)
      if (searchId !== currentSearchId) {
        console.log("Search superseded, ignoring results");
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Search failed: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      // Double-check search is still current before updating state
      if (searchId === currentSearchId) {
        if (data.success) {
          // console.log(`Search completed for "${query}": ${data.results.length} results`); // Disabled for production stability
          setSearchResults(data.results);
          setSearchStats({
            total_found: data.total_found || data.results.length,
            total_searched: data.total_searched || 0,
          });
          setShowSearchResults(true);
          setSearchError(null);

          // Backup search results to prevent loss
          try {
            sessionStorage.setItem(
              "lastSearchResults",
              JSON.stringify({
                query,
                results: data.results,
                stats: {
                  total_found: data.total_found,
                  total_searched: data.total_searched,
                },
                timestamp: Date.now(),
              }),
            );
          } catch (e) {
            // Ignore storage errors
          }
        } else {
          throw new Error(data.message || "Search failed");
        }
      }
    } catch (error) {
      // Only update error state if this search is still current
      if (searchId === currentSearchId) {
        console.error("Search failed:", error);

        if (error.name === "AbortError") {
          const isDev = process.env.NODE_ENV === "development";
          const timeoutMsg = isDev
            ? "Search timed out in development mode. This is normal and often resolves automatically."
            : "Search timed out. Try a more specific search term or use comprehensive search.";
          setSearchError(timeoutMsg);
          setSearchResults([]);
          setSearchStats({ total_found: 0, total_searched: 0 });
          setShowSearchResults(true);
        } else if (error.message?.includes("Failed to fetch")) {
          const isDev = process.env.NODE_ENV === "development";
          const networkMsg = isDev
            ? "Development server connection issue. Try again in a moment."
            : "Network error. Please check your connection and try again.";
          setSearchError(networkMsg);
          setSearchResults([]);
          setShowSearchResults(true);
        } else {
          setSearchError(error.message || "Search failed. Please try again.");
          setSearchResults([]);
          setShowSearchResults(true);
        }
      }
    } finally {
      // Only clear loading if this search is still current
      if (searchId === currentSearchId) {
        setSearchLoading(false);
      }
    }
  };

  // Debounced search to avoid too many API calls
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      return; // Don't start timer for empty/short queries
    }

    const timeoutId = setTimeout(() => {
      // Double-check query is still valid before searching
      if (searchQuery && searchQuery.length >= 2) {
        performSearch(searchQuery, fastSearchMode);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchQuery]); // Remove fastSearchMode from dependencies to prevent unnecessary re-runs

  // Separate effect for fast search mode changes
  useEffect(() => {
    if (searchQuery && searchQuery.length >= 2) {
      // Immediately search with new mode
      performSearch(searchQuery, fastSearchMode);
    }
  }, [fastSearchMode]);

  // Search results backup and restoration (without excessive logging)
  useEffect(() => {
    // If results disappeared unexpectedly, try to restore from session storage
    if (
      searchQuery &&
      searchQuery.length >= 2 &&
      searchResults.length === 0 &&
      !searchLoading &&
      showSearchResults
    ) {
      try {
        const backup = sessionStorage.getItem("lastSearchResults");
        if (backup) {
          const parsed = JSON.parse(backup);
          // Only restore if query matches and backup is recent (within 1 minute)
          if (
            parsed.query === searchQuery &&
            Date.now() - parsed.timestamp < 60000
          ) {
            setSearchResults(parsed.results);
            setSearchStats(parsed.stats);
          }
        }
      } catch (e) {
        // Ignore restoration errors silently
      }
    }
  }, [searchResults, showSearchResults, searchLoading, searchQuery]);

  const handleSearchInputChange = (query: string) => {
    setSearchQuery(query);
    setSearchError(null); // Clear errors when user types

    // Only clear results if query is truly empty or very short
    if (query.length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      setSearchStats(null);
      setSearchLoading(false);
    } else if (query.length === 1) {
      // Show hint but don't clear existing results yet
      setSearchError(null);
    }
    // For queries >= 2 characters, let the debounced search handle it
  };

  const handleSearchResultClick = (result: any) => {
    setSelectedBooking(result);
    setIsPopupOpen(true);
    // Keep search results visible when opening popup
    // setShowSearchResults(false); // Commented out to keep results visible
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
    setSearchError(null);
    setSearchStats(null);
    setSearchLoading(false);
    setCurrentSearchId(0); // Reset search ID
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday

    const days = [];
    const totalDays = 42; // 6 weeks * 7 days

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "processing":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      case "cancelled":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const calendarDays = generateCalendarDays();
  const currentMonthBookings = (bookings || []).filter((booking) => {
    try {
      const bookingDate = new Date(booking.date_created);
      return (
        bookingDate.getMonth() === currentMonth &&
        bookingDate.getFullYear() === currentYear
      );
    } catch (error) {
      console.error("Invalid booking date:", booking);
      return false;
    }
  });

  const totalRevenue = currentMonthBookings.reduce((sum, booking) => {
    try {
      return sum + parseFloat(booking.total || "0");
    } catch (error) {
      console.error("Invalid booking total:", booking);
      return sum;
    }
  }, 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Calendar className="w-6 h-6 text-ocean" />
              <CardTitle className="text-2xl">
                {monthNames[currentMonth]} {currentYear} - Booking Calendar
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("prev")}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("next")}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Month Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {currentMonthBookings.length}
                </p>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {currentMonthBookings.reduce((sum, booking) => {
                    try {
                      return (
                        sum +
                        (booking.booking_details || []).reduce(
                          (detailSum, detail) =>
                            detailSum + (detail?.quantity || 0),
                          0,
                        )
                      );
                    } catch (error) {
                      console.error(
                        "Error calculating participants:",
                        booking,
                        error,
                      );
                      return sum;
                    }
                  }, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Smart Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" id="smart-search-container">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, email, phone, or order number..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                className="pl-10 pr-12 py-2 w-full"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {searchLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                )}
              </div>
            </div>

            {/* Search Mode Toggle */}
            <div className="flex items-center gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!fastSearchMode}
                  onChange={(e) => setFastSearchMode(!e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-600">
                  Comprehensive search (slower, searches entire database)
                </span>
              </label>
            </div>

            {/* Error Display */}
            {searchError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-red-700 text-sm">{searchError}</span>
                </div>
                {searchError.includes("timed out") && fastSearchMode && (
                  <button
                    onClick={() => {
                      setFastSearchMode(false);
                      if (searchQuery) performSearch(searchQuery, false);
                    }}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    Try comprehensive search instead
                  </button>
                )}
              </div>
            )}
          </div>

          {showSearchResults && (
            <div className="max-h-80 overflow-y-auto border rounded-lg bg-white">
              {searchLoading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p>Searching...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <p>No results found for "{searchQuery}"</p>
                  {searchStats && (
                    <p className="text-xs mt-1">
                      Searched through {searchStats.total_searched} orders in
                      entire database
                    </p>
                  )}
                </div>
              ) : (
                <div className="divide-y">
                  {searchResults.slice(0, 10).map((result) => {
                    // Determine what matched the search
                    const query = searchQuery.toLowerCase();
                    const matchTypes = [];
                    if (result.customer_name.toLowerCase().includes(query))
                      matchTypes.push("Name");
                    if (result.customer_email.toLowerCase().includes(query))
                      matchTypes.push("Email");
                    if (result.customer_phone?.toLowerCase().includes(query))
                      matchTypes.push("Phone");
                    if (result.number.toLowerCase().includes(query))
                      matchTypes.push("Order#");

                    return (
                      <div
                        key={result.id}
                        className="p-4 hover:bg-blue-50 cursor-pointer transition-colors border-l-4 border-l-transparent hover:border-l-blue-500"
                        onClick={() => handleSearchResultClick(result)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-gray-900">
                                    {result.customer_name}
                                  </h4>
                                  {matchTypes.length > 0 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs text-blue-600 border-blue-200"
                                    >
                                      Matched: {matchTypes.join(", ")}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {result.customer_email}
                                </p>
                                {result.customer_phone && (
                                  <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {result.customer_phone}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              Order #{result.number} •{" "}
                              {new Date(
                                result.date_created,
                              ).toLocaleDateString()}
                              {result.booking_details.length > 0 && (
                                <span className="ml-2 font-medium">
                                  • {result.booking_details[0].service_name}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                className={`${
                                  result.status === "completed"
                                    ? "bg-green-500"
                                    : result.status === "processing"
                                      ? "bg-blue-500"
                                      : result.status === "pending"
                                        ? "bg-yellow-500"
                                        : result.status === "failed"
                                          ? "bg-red-500"
                                          : "bg-gray-500"
                                } text-white text-xs`}
                              >
                                {result.status}
                              </Badge>
                              {result.is_booking && (
                                <Badge
                                  variant="outline"
                                  className="text-xs text-green-600 border-green-200"
                                >
                                  Booking
                                </Badge>
                              )}
                            </div>
                            <p className="font-bold text-green-600">
                              ${result.total}
                            </p>
                            <p className="text-xs text-gray-500">
                              {result.booking_details.reduce(
                                (sum, detail) => sum + detail.quantity,
                                0,
                              )}{" "}
                              people
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {searchResults.length > 10 && (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      Showing first 10 of {searchResults.length} results
                      {searchStats && (
                        <span className="block text-xs mt-1">
                          Searched {searchStats.total_searched} orders across
                          entire database
                        </span>
                      )}
                    </div>
                  )}

                  {searchResults.length <= 10 && searchStats && (
                    <div className="p-2 text-center text-gray-500 text-xs border-t">
                      Searched {searchStats.total_searched} orders across entire
                      database
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> Fast search checks recent orders (~500).
            Enable comprehensive search to search entire database (slower but
            more thorough).
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-6">
          {bookingsError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <X className="w-5 h-5 text-red-500" />
                  <div>
                    <h4 className="font-semibold text-red-800">
                      Unable to Load Bookings
                    </h4>
                    <p className="text-red-700 text-sm">{bookingsError}</p>
                    {retryCount > 0 && (
                      <p className="text-red-600 text-xs mt-1">
                        Retrying... (attempt {retryCount + 1}/3)
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchBookings()}
                  disabled={loading}
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  {loading ? "Retrying..." : "Retry"}
                </Button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-500">
                  {retryCount > 0
                    ? `Retrying... (${retryCount + 1}/3)`
                    : "Loading bookings..."}
                </p>
                {loading && (
                  <p className="text-xs text-gray-400 mt-2">
                    Fetching from WooCommerce API...
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="p-2 text-center font-semibold text-gray-700 border-b"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((date, index) => {
                  const dayBookings = getBookingsForDate(date);
                  const isCurrentMonth = date.getMonth() === currentMonth;
                  const isToday =
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear();

                  return (
                    <div
                      key={index}
                      className={`
                        min-h-[120px] p-2 border rounded-lg
                        ${isCurrentMonth ? "bg-white" : "bg-gray-50"}
                        ${isToday ? "ring-2 ring-blue-500" : ""}
                        hover:bg-gray-50 transition-colors
                      `}
                    >
                      <div
                        className={`
                        font-semibold text-sm mb-1
                        ${isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                        ${isToday ? "text-blue-600" : ""}
                      `}
                      >
                        {date.getDate()}
                      </div>

                      <div className="space-y-1">
                        {dayBookings
                          .slice(0, 2)
                          .map((booking, bookingIndex) => {
                            const displayInfo = getBookingDisplayInfo(booking);
                            return (
                              <div
                                key={booking.id}
                                className={`
                                text-xs p-2 rounded text-white cursor-pointer
                                ${getStatusColor(booking.status)}
                                hover:opacity-80 transition-opacity
                                leading-tight transform hover:scale-105
                              `}
                                title={`Click to view details • ${displayInfo.serviceName} • ${displayInfo.time} • ${displayInfo.participants} ${displayInfo.participants === 1 ? "person" : "people"} • Customer: ${booking.customer_name} • $${booking.total}`}
                                onClick={() => handleBookingClick(booking)}
                              >
                                <div className="font-medium truncate mb-1">
                                  {displayInfo.serviceName}
                                </div>
                                <div className="text-[10px] opacity-90">
                                  {displayInfo.detailText}
                                </div>
                              </div>
                            );
                          })}

                        {dayBookings.length > 2 && (
                          <div className="text-xs text-gray-500 font-medium p-1">
                            +{dayBookings.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Calendar Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-sm">
                Booking Block Format:
              </h4>
              <div className="text-sm text-gray-600 mb-2">
                Each booking shows: <strong>Product Name</strong> +{" "}
                <strong>Time</strong> + <strong>Number of People</strong>
              </div>
              <div className="bg-gray-100 p-2 rounded text-xs">
                Example: "Christ of the Abyss Tour" • "10:00 AM • 4 people"
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-sm">
                Booking Status Colors:
              </h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-500"></div>
                  <span className="text-sm">Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-500"></div>
                  <span className="text-sm">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500"></div>
                  <span className="text-sm">Failed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-500"></div>
                  <span className="text-sm">Cancelled</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details Popup */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Booking Details #{selectedBooking?.number}
              </span>
              <Badge
                className={`${
                  selectedBooking?.status === "completed"
                    ? "bg-green-500"
                    : selectedBooking?.status === "processing"
                      ? "bg-blue-500"
                      : selectedBooking?.status === "pending"
                        ? "bg-yellow-500"
                        : selectedBooking?.status === "failed"
                          ? "bg-red-500"
                          : "bg-gray-500"
                } text-white`}
              >
                {selectedBooking?.status?.toUpperCase()}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Name
                      </label>
                      <p className="text-lg font-semibold">
                        {selectedBooking.customer_name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Email
                      </label>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {selectedBooking.customer_email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Booking Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Booking Date
                      </label>
                      <p>
                        {new Date(
                          selectedBooking.date_created,
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Tour Time
                      </label>
                      <p>{getBookingDisplayInfo(selectedBooking).time}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Total Participants
                      </label>
                      <p className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {
                          getBookingDisplayInfo(selectedBooking).participants
                        }{" "}
                        {getBookingDisplayInfo(selectedBooking).participants ===
                        1
                          ? "person"
                          : "people"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services & Pricing */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Services & Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedBooking.booking_details.map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">
                          {service.service_name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {service.quantity}{" "}
                          {service.quantity === 1 ? "person" : "people"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${service.total}</p>
                        <p className="text-sm text-gray-600">
                          $
                          {(
                            parseFloat(service.total) / service.quantity
                          ).toFixed(2)}{" "}
                          per person
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Total Amount:
                      </span>
                      <span className="text-green-600">
                        ${selectedBooking.total} {selectedBooking.currency}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Details */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">
                        Order ID:
                      </span>{" "}
                      {selectedBooking.id}
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Order Number:
                      </span>{" "}
                      #{selectedBooking.number}
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Created:
                      </span>{" "}
                      {new Date(selectedBooking.date_created).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Currency:
                      </span>{" "}
                      {selectedBooking.currency}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    window.open(
                      `mailto:${selectedBooking.customer_email}`,
                      "_blank",
                    )
                  }
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Customer
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
