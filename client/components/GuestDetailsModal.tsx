"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Calendar,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Users,
  X,
} from "lucide-react";

// Define basic types locally since they don't exist in the woocommerce module
interface BasicBookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guestCount: number;
  selectedDate: string;
  selectedTime: string;
  location: string;
  specialRequests: string;
  certificationLevel?: string;
}

interface WooCommerceData {
  [key: string]: any;
}

interface GuestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (customerData: any) => Promise<void> | void;
  isLoading?: boolean;
  packageDetails?: any;
  guestCount: number;
  diverCount?: number;
  selectedDate?: string;
  selectedTime?: string;
  totalPrice?: number;
  customFormFields?: {
    products: Array<{
      id: string;
      name: string;
      price: number;
    }>;
  };
  onRentalGearUpdate?: (
    passengerIndex: number,
    productId: string,
    isSelected: boolean,
  ) => void;
  rentalGearSelections?: {
    [passengerIndex: number]: { [productId: string]: boolean };
  };
  productIdNumber?: number;
}

interface PassengerInfo {
  firstName: string;
  lastName: string;
  age?: string;
  certificationLevel?: string;
  lastDiveDate?: string;
  hireGuide?: string;
  regulatorRental?: boolean;
  bcdRental?: boolean;
  fullGearRental?: boolean;
  rentalGear?: { [key: number]: boolean };
}

export default function GuestDetailsModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  packageDetails,
  guestCount,
  diverCount,
  selectedDate,
  selectedTime,
  totalPrice,
  customFormFields,
  onRentalGearUpdate,
  rentalGearSelections,
  productIdNumber,
}: GuestDetailsModalProps) {
  const formattedTotal = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(totalPrice ?? 0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    specialRequests: "",
    snorkelerNames: "",
  });

  const [passengers, setPassengers] = useState<PassengerInfo[]>(
    Array.from({ length: diverCount || 0 }, () => ({
      firstName: "",
      lastName: "",
      age: "",
      certificationLevel: "",
      lastDiveDate: "",
      hireGuide: "",
      regulatorRental: false,
      bcdRental: false,
      fullGearRental: false,
      rentalGear: {},
    })),
  );

  // Update passengers array when diverCount changes
  useEffect(() => {
    console.log("GuestDetailsModal: diverCount changed to", diverCount);
    setPassengers(
      Array.from({ length: diverCount || 0 }, (_, index) => ({
        firstName: "",
        lastName: "",
        age: "",
        certificationLevel: "",
        lastDiveDate: "",
        hireGuide: "",
        regulatorRental: false,
        bcdRental: false,
        fullGearRental: false,
        rentalGear: rentalGearSelections?.[index] || {},
      })),
    );
  }, [diverCount, rentalGearSelections]);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePassenger = (
    index: number,
    field: keyof PassengerInfo,
    value: string | boolean | { [key: string]: boolean },
  ) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );
  };

  const isFormValid = () => {
    // Check lead guest information
    const leadGuestValid =
      formData.firstName?.trim() &&
      formData.lastName?.trim() &&
      formData.email?.trim() &&
      formData.phone?.trim();

    // If no additional passengers, only validate lead guest
    if (!diverCount || diverCount === 0) {
      return leadGuestValid;
    }

    // If diverCount > 0, we need to validate additional passengers (skip index 0 as it's the lead guest)
    const additionalPassengersValid = passengers
      .slice(1)
      .every((p) => p.firstName?.trim() && p.lastName?.trim());

    return leadGuestValid && additionalPassengersValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Debug validation
    const validationResult = isFormValid();
    console.log("Form validation result:", validationResult);
    console.log("Form data:", formData);
    console.log("Passengers:", passengers);
    console.log("Diver count:", diverCount);

    if (!validationResult) {
      // More specific error message
      const missingFields = [];
      if (!formData.firstName?.trim()) missingFields.push("First Name");
      if (!formData.lastName?.trim()) missingFields.push("Last Name");
      if (!formData.email?.trim()) missingFields.push("Email");
      if (!formData.phone?.trim()) missingFields.push("Phone");

      if (diverCount && diverCount > 0) {
        // Only check additional passengers (skip index 0 as it's the lead guest)
        passengers.slice(1).forEach((passenger, index) => {
          if (!passenger.firstName?.trim())
            missingFields.push(`Passenger ${index + 2} First Name`);
          if (!passenger.lastName?.trim())
            missingFields.push(`Passenger ${index + 2} Last Name`);
        });
      }

      alert(
        `Please fill in the following required fields: ${missingFields.join(", ")}`,
      );
      return;
    }

    try {
      // Calculate rental gear costs
      const calculateRentalGearCost = () => {
        let totalRentalCost = 0;
        Object.values(rentalGearSelections || {}).forEach((passengerGear) => {
          Object.entries(passengerGear).forEach(([productId, isSelected]) => {
            if (isSelected && customFormFields?.products) {
              const product = customFormFields.products.find(
                (p: any) => p.id === productId,
              );
              if (product) {
                totalRentalCost += product.price;
              }
            }
          });
        });
        return totalRentalCost;
      };

      const rentalGearCost = calculateRentalGearCost();

      // Prepare basic booking data for WooCommerce
      const basicBookingData: BasicBookingData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        guestCount: guestCount,
        selectedDate: selectedDate || "",
        selectedTime: selectedTime || "08:30",
        location: formData.location,
        specialRequests: formData.specialRequests,
        certificationLevel: passengers[0]?.certificationLevel,
      };

      // Prepare WooCommerce booking data in PHP format
      const wooCommerceData: WooCommerceData = {
        // Basic product info
        "add-to-cart": productIdNumber,
        quantity: guestCount,

        // Date and time fields (matching PHP format exactly)
        wc_bookings_field_start_date_year: selectedDate
          ? new Date(selectedDate).getFullYear().toString()
          : "2025",
        wc_bookings_field_start_date_month: selectedDate
          ? (new Date(selectedDate).getMonth() + 1).toString().padStart(2, "0")
          : "10",
        wc_bookings_field_start_date_day: selectedDate
          ? new Date(selectedDate).getDate().toString().padStart(2, "0")
          : "20",
        wc_bookings_field_start_date_time: selectedDate
          ? (() => {
              const [hour, rest] = (selectedTime || "08:30").split(":");
              const isPM = rest && rest.toLowerCase().includes("pm");
              let hourNum = parseInt(hour);
              if (isPM && hourNum !== 12) hourNum += 12;
              if (!isPM && hourNum === 12) hourNum = 0;
              const minute = rest ? rest.split(" ")[0] : "30";
              return `${selectedDate}T${hourNum.toString().padStart(2, "0")}:${minute.padStart(2, "0")}:00-0400`;
            })()
          : "2025-10-20T08:30:00-0400",

        // Additional required date fields that WooCommerce might expect
        wc_bookings_field_start_date: selectedDate || "2025-10-20",
        wc_bookings_field_start_date_hour: selectedTime
          ? (() => {
              const [hour, rest] = selectedTime.split(":");
              const isPM = rest && rest.toLowerCase().includes("pm");
              let hourNum = parseInt(hour);
              if (isPM && hourNum !== 12) hourNum += 12;
              if (!isPM && hourNum === 12) hourNum = 0;
              return hourNum.toString().padStart(2, "0");
            })()
          : "08",
        wc_bookings_field_start_date_minute: selectedTime
          ? selectedTime.split(":")[1].split(" ")[0].padStart(2, "0") // Remove AM/PM and ensure 2 digits
          : "30",

        // Persons fields (use correct IDs from your site)
        wc_bookings_field_persons_34628: guestCount, // Adjust ID as needed
        wc_bookings_field_persons_34629: 0, // Adjust ID as needed

        // Customer information
        tmcp_textfield_0: `${formData.firstName} ${formData.lastName}`,
        tmcp_select_1:
          passengers[0]?.certificationLevel || "Open Water Diver_3",
        tmcp_select_2:
          passengers[0]?.lastDiveDate || "Less than 18 months ago_3",

        // Location and special requests
        tmcp_textfield_3: formData.location || "",
        tmcp_textarea_4: formData.specialRequests || "",
      };

      // Add additional passenger and rental gear data
      const enhancedWooCommerceData = {
        ...wooCommerceData,

        // Certification levels for additional passengers
        ...passengers.slice(1).reduce(
          (acc, passenger, index) => {
            if (passenger.certificationLevel) {
              acc[`tmcp_select_${index + 6}`] = passenger.certificationLevel;
            }
            if (passenger.lastDiveDate) {
              acc[`tmcp_textfield_${index + 11}`] = passenger.lastDiveDate;
            }
            return acc;
          },
          {} as Record<string, string>,
        ),

        // Rental gear selections (matching PHP format exactly)
        ...Object.entries(rentalGearSelections || {}).reduce(
          (acc, [passengerIndex, gearSelections]) => {
            // Get all selected product IDs for this passenger
            const selectedProductIds = Object.entries(gearSelections)
              .filter(([_, isSelected]) => isSelected)
              .map(([productId, _]) => productId);

            if (selectedProductIds.length > 0) {
              // Format: tmcp_product_5_0 => '2506,2507' (comma-separated)
              acc[`tmcp_product_5_${passengerIndex}`] =
                selectedProductIds.join(",");
              acc[`tmcp_product_5_${passengerIndex}_quantity`] = "1";
            }
            return acc;
          },
          {} as Record<string, string>,
        ),

        // Additional booking metadata
        booking_guest_count: guestCount.toString(),
        booking_diver_count: (diverCount || 0).toString(),
        booking_total_price: totalPrice?.toString() || "0",
        booking_rental_cost: rentalGearCost.toString(),
        booking_snorkeler_names: formData.snorkelerNames || "",
      };

      // Complete booking data for logging and storage
      const bookingData = {
        // Lead guest information
        lead_guest: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          specialRequests: formData.specialRequests,
          snorkelerNames: formData.snorkelerNames,
        },

        // All passengers (divers) information
        passengers: passengers.map((passenger, index) => ({
          passengerIndex: index,
          firstName: passenger.firstName,
          lastName: passenger.lastName,
          age: passenger.age,
          certificationLevel: passenger.certificationLevel,
          lastDiveDate: passenger.lastDiveDate,
          hireGuide: passenger.hireGuide,
          rentalGear: passenger.rentalGear,
          rentalGearSelections: rentalGearSelections?.[index] || {},
        })),

        // Booking details
        booking_details: {
          guestCount: guestCount,
          diverCount: diverCount,
          selectedDate: selectedDate,
          selectedTime: selectedTime,
          totalPrice: totalPrice,
          rentalGearCost: rentalGearCost,
          customFormFields: customFormFields,
          rentalGearSelections: rentalGearSelections,
        },

        // Summary information
        summary: {
          totalGuests: guestCount,
          totalDivers: diverCount,
          totalSnorkelers: guestCount - (diverCount || 0),
          selectedDate: selectedDate,
          selectedTime: selectedTime,
          basePrice: totalPrice - rentalGearCost,
          rentalGearCost: rentalGearCost,
          totalPrice: totalPrice,
          snorkelerNames: formData.snorkelerNames,
        },

        // WooCommerce data
        wooCommerceData: wooCommerceData,

        // Timestamp
        submittedAt: new Date().toISOString(),
      };

      console.log("Complete Booking Data:", bookingData);
      console.log("WooCommerce Data:", wooCommerceData);
      console.log(
        "Enhanced WooCommerce Data (with rental gear):",
        enhancedWooCommerceData,
      );
      console.log("Rental Gear Selections:", rentalGearSelections);

      // Store booking data for later submission
      localStorage.setItem("pendingBookingData", JSON.stringify(bookingData));

      // Submit to WooCommerce via rest.php
      await handleWooCommerceBooking(enhancedWooCommerceData, wooCommerceData);

      onClose();
    } catch (error) {
      console.error("Booking error:", error);
      alert("There was a problem processing your booking. Please try again.");
    }
  };

  const submitFormToWooCommerce = (wooCommerceData: WooCommerceData) => {
    const site_url = "https://keylargoscubadiving.com";

    // Direct form submission - simple, reliable, works everywhere
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `${site_url}/?wc-ajax=add_to_cart`;
    form.style.display = "none";

    // Add all WooCommerce fields
    Object.entries(wooCommerceData).forEach(([key, value]) => {
      if (value && value !== "") {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value.toString();
        form.appendChild(input);
      }
    });

    // Add required fields
    const addToCartInput = document.createElement("input");
    addToCartInput.type = "hidden";
    addToCartInput.name = "add-to-cart";
    addToCartInput.value = productIdNumber.toString();
    form.appendChild(addToCartInput);

    const quantityInput = document.createElement("input");
    quantityInput.type = "hidden";
    quantityInput.name = "quantity";
    quantityInput.value = guestCount.toString();
    form.appendChild(quantityInput);

    // Debug logging
    console.log("Submitting form to WooCommerce:", {
      action: form.action,
      method: form.method,
      data: wooCommerceData,
    });

    // Submit the form
    document.body.appendChild(form);
    form.submit();

    // Clean up
    document.body.removeChild(form);
  };

  const handleWooCommerceBooking = async (
    bookingData: any,
    wooCommerceData: any,
  ) => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = productIdNumber;

    if (typeof window !== "undefined") {
      const isWordPressContext = urlParams.get("wordpress") === "1";

      if (isWordPressContext) {
        // Send message to WordPress (iframe context) with PHP-compatible format
        window.parent.postMessage(
          {
            type: "KLSD_ADD_TO_CART",
            productId,
            wooCommerceData,
            guestCount,
            selectedDate,
            selectedTime,
            totalPrice,
            // Additional fields for PHP compatibility
            add_to_cart: productIdNumber,
            quantity: guestCount,
            wc_bookings_field_start_date_year:
              wooCommerceData["wc_bookings_field_start_date_year"],
            wc_bookings_field_start_date_month:
              wooCommerceData["wc_bookings_field_start_date_month"],
            wc_bookings_field_start_date_day:
              wooCommerceData["wc_bookings_field_start_date_day"],
            wc_bookings_field_start_date_time:
              wooCommerceData["wc_bookings_field_start_date_time"],
            wc_bookings_field_persons_34628:
              wooCommerceData["wc_bookings_field_persons_34628"],
            wc_bookings_field_persons_34629:
              wooCommerceData["wc_bookings_field_persons_34629"],
            tmcp_textfield_0: wooCommerceData["tmcp_textfield_0"],
            tmcp_select_1: wooCommerceData["tmcp_select_1"],
            tmcp_select_2: wooCommerceData["tmcp_select_2"],
            tmcp_textfield_3: wooCommerceData["tmcp_textfield_3"],
            tmcp_textarea_4: wooCommerceData["tmcp_textarea_4"],
          },
          "*",
        );
      } else {
        // Form submission to WooCommerce (like PHP script)
        submitFormToWooCommerce(wooCommerceData);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-2xl font-semibold">
              <Users className="w-6 h-6 text-ocean" />
              Guest Details - Christ Statue Tour
            </h2>
            <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booking Summary */}
          <Card className="bg-ocean/5 border-ocean/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-ocean" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Tour Date:</span>
                <span className="font-semibold">
                  {selectedDate || "Date to be selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tour Time:</span>
                <span className="font-semibold">
                  {selectedTime || "8:00 AM"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span className="font-semibold">
                  {guestCount} {guestCount === 1 ? "Adult" : "Adults"}
                </span>
              </div>
              {packageDetails && (
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-semibold">{packageDetails.name}</span>
                </div>
              )}
              <div className="flex justify-between text-lg border-t pt-2">
                <span>Total (incl. tax):</span>
                <span className="font-bold text-ocean">{formattedTotal}</span>
              </div>
            </CardContent>
          </Card>

          {/* Guest Information Form */}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Lead Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Passengers */}
            {diverCount && diverCount > 0 && (
              <Card className="mt-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    All Passenger Names
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {passengers.map((p, i) => (
                    <div key={i} className="p-4 border rounded-lg bg-gray-50">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Passenger {i + 1}
                        {i === 0 && (
                          <Badge variant="outline" className="text-xs">
                            Lead Guest (above)
                          </Badge>
                        )}
                      </h4>
                      <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid md:grid-cols-3 gap-3">
                          <div>
                            <Label>First Name *</Label>
                            <Input
                              value={i === 0 ? formData.firstName : p.firstName}
                              onChange={(e) =>
                                i === 0
                                  ? updateField("firstName", e.target.value)
                                  : updatePassenger(
                                      i,
                                      "firstName",
                                      e.target.value,
                                    )
                              }
                              disabled={i === 0}
                              required
                            />
                          </div>
                          <div>
                            <Label>Last Name *</Label>
                            <Input
                              value={i === 0 ? formData.lastName : p.lastName}
                              onChange={(e) =>
                                i === 0
                                  ? updateField("lastName", e.target.value)
                                  : updatePassenger(
                                      i,
                                      "lastName",
                                      e.target.value,
                                    )
                              }
                              disabled={i === 0}
                              required
                            />
                          </div>
                          <div>
                            <Label>Age</Label>
                            <Input
                              type="number"
                              min="5"
                              max="100"
                              value={p.age}
                              onChange={(e) =>
                                updatePassenger(i, "age", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        {/* Certified Divers Only Section */}
                        {/* <div className="space-y-4">
                          <h5 className="font-semibold text-gray-700">
                            Certified Divers Only
                          </h5>

                          <div className="grid md:grid-cols-3 gap-3">
                            <div>
                              <Label>Certification Level</Label>
                              <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={p.certificationLevel}
                                onChange={(e) =>
                                  updatePassenger(
                                    i,
                                    "certificationLevel",
                                    e.target.value,
                                  )
                                }
                              >
                                <option value="">Certification Level</option>
                                <option value="Open Water">Open Water</option>
                                <option value="Advanced Open Water">
                                  Advanced Open Water
                                </option>
                                <option value="Rescue Diver">
                                  Rescue Diver
                                </option>
                                <option value="Divemaster">Divemaster</option>
                                <option value="Instructor">Instructor</option>
                              </select>
                            </div>

                            <div>
                              <Label>When did you dive last?</Label>
                              <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={p.lastDiveDate}
                                onChange={(e) =>
                                  updatePassenger(
                                    i,
                                    "lastDiveDate",
                                    e.target.value,
                                  )
                                }
                              >
                                <option value="">
                                  When did you dive last?
                                </option>
                                <option value="Within 6 months">
                                  Within 6 months
                                </option>
                                <option value="6-12 months ago">
                                  6-12 months ago
                                </option>
                                <option value="1-2 years ago">
                                  1-2 years ago
                                </option>
                                <option value="More than 2 years">
                                  More than 2 years
                                </option>
                                <option value="Never">Never</option>
                              </select>
                            </div>

                            <div>
                              <Label>Hire a guide?</Label>
                              <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={p.hireGuide}
                                onChange={(e) =>
                                  updatePassenger(
                                    i,
                                    "hireGuide",
                                    e.target.value,
                                  )
                                }
                              >
                                <option value="">Hire a guide?</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                        </div> */}

                        {/* Rental Gear Section */}
                        <div className="space-y-4">
                          <h5 className="font-semibold text-gray-700">
                            Does Diver Need Rental Gear?
                          </h5>

                          <div className="grid md:grid-cols-3 gap-4">
                            {customFormFields?.products
                              ?.filter(
                                (product, index, self) =>
                                  index ===
                                  self.findIndex((p) => p.id === product.id),
                              )
                              .map((product) => (
                                <div
                                  key={product.id}
                                  className="flex items-start gap-3"
                                >
                                  <input
                                    type="checkbox"
                                    id={`gear-${product.id}-${i}`}
                                    checked={
                                      p.rentalGear?.[product.id] || false
                                    }
                                    onChange={(e) => {
                                      updatePassenger(i, "rentalGear", {
                                        ...p.rentalGear,
                                        [product.id]: e.target.checked,
                                      });
                                      if (onRentalGearUpdate) {
                                        onRentalGearUpdate(
                                          i,
                                          product.id,
                                          e.target.checked,
                                        );
                                      }
                                    }}
                                    className="mt-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  />
                                  <div>
                                    <label
                                      htmlFor={`gear-${product.id}-${i}`}
                                      className="text-xs font-medium text-gray-700"
                                    >
                                      {product.name}
                                    </label>
                                    <p className="text-sm text-blue-600">
                                      ${product.price.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Snorkeler Names */}
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Snorkeler Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 uppercase">
                    Enter All Snorkelers Name(s)
                  </Label>
                  <textarea
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Enter the names of all snorkelers..."
                    value={formData.snorkelerNames || ""}
                    onChange={(e) =>
                      updateField("snorkelerNames", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Booking
              </Button>
              <Button
                type="submit"
                // disabled={!isFormValid() || isLoading}
                className="flex-1 bg-coral hover:bg-coral/90 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Complete Booking {formattedTotal}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   User,
//   Calendar,
//   CreditCard,
//   CheckCircle,
//   ArrowLeft,
//   Users,
//   X,
// } from "lucide-react";

// interface GuestDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit?: (customerData: any) => void;
//   isLoading?: boolean;
//   packageDetails?: any;
//   guestCount: number;
//   selectedDate?: string;
//   selectedTime?: string;
//   totalPrice?: number;
// }

// interface PassengerInfo {
//   firstName: string;
//   lastName: string;
//   age?: string;
// }

// export default function GuestDetailsModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   isLoading = false,
//   packageDetails,
//   guestCount,
//   selectedDate,
//   selectedTime,
//   totalPrice,
// }: GuestDetailsModalProps) {
//   // Format currency inside component for consistency
//   const formattedTotal = new Intl.NumberFormat(undefined, {
//     style: "currency",
//     currency: "USD",
//   }).format(totalPrice ?? 0);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     location: "",
//     specialRequests: "",
//   });

//   const [passengers, setPassengers] = useState<PassengerInfo[]>(
//     Array.from({ length: guestCount }, () => ({
//       firstName: "",
//       lastName: "",
//       age: "",
//     })),
//   );

//   const updateField = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const updatePassenger = (
//     index: number,
//     field: keyof PassengerInfo,
//     value: string,
//   ) => {
//     setPassengers((prev) =>
//       prev.map((passenger, i) =>
//         i === index ? { ...passenger, [field]: value } : passenger,
//       ),
//     );
//   };

//   const isFormValid = () => {
//     const leadGuestValid =
//       formData.firstName &&
//       formData.lastName &&
//       formData.email &&
//       formData.phone;
//     const passengersValid = passengers.every((p) => p.firstName && p.lastName);
//     return leadGuestValid && passengersValid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isFormValid()) return;

//     // Prepare booking data for WooCommerce
//     const bookingData = {
//       lead_guest: {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         location: formData.location,
//         specialRequests: formData.specialRequests,
//       },
//       passengers: passengers,
//       booking_details: {
//         guest_count: guestCount,
//         selected_date: selectedDate,
//         selected_time: selectedTime,
//         total_price: totalPrice,
//       }
//     };

//     try {
//       // Call WooCommerce add to cart
//       await handleWooCommerceBooking(bookingData);
//     } catch (error) {
//       console.error('Booking error:', error);
//       // Handle error - maybe show error message
//     }
//   };

//   const handleWooCommerceBooking = async (bookingData: any) => {
//     // Get product ID from URL or props
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = urlParams.get('product') || '34450'; // Default Christ Statue Tour ID

//     // For WordPress integration, we'll redirect to the WordPress product page with booking data
//     if (typeof window !== 'undefined') {
//       const isWordPressContext = urlParams.get('wordpress') === '1';

//       if (isWordPressContext) {
//         // We're in WordPress - trigger WooCommerce booking flow
//         window.parent.postMessage({
//           type: 'KLSD_ADD_TO_CART',
//           productId: productId,
//           bookingData: bookingData,
//           guestCount: guestCount,
//           selectedDate: selectedDate,
//           selectedTime: selectedTime,
//           totalPrice: totalPrice
//         }, '*');

//         // Close modal
//         onClose();
//       } else {
//         // Development/staging - redirect to WordPress for actual booking
//         const wpProductUrl = `https://keylargoscubadiving.com/product/christ-of-the-abyss-snorkeling-tour/?add-to-cart=${productId}&quantity=${guestCount}`;
//         window.location.href = wpProductUrl;
//       }
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto w-full">
//         {/* Header */}
//         <div className="p-6 border-b">
//           <div className="flex items-center justify-between">
//             <h2 className="flex items-center gap-3 text-2xl font-semibold">
//               <Users className="w-6 h-6 text-ocean" />
//               Guest Details - Christ Statue Tour
//             </h2>
//             <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Booking Summary */}
//           <Card className="bg-ocean/5 border-ocean/20">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-ocean" />
//                 Booking Summary
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="flex justify-between">
//                 <span>Tour Date:</span>
//                 <span className="font-semibold">
//                   {selectedDate || "Date to be selected"}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Tour Time:</span>
//                 <span className="font-semibold">
//                   {selectedTime || "8:00 AM"}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Guests:</span>
//                 <span className="font-semibold">
//                   {guestCount} {guestCount === 1 ? "Adult" : "Adults"}
//                 </span>
//               </div>
//               {packageDetails && (
//                 <div className="flex justify-between">
//                   <span>Package:</span>
//                   <span className="font-semibold">{packageDetails.name}</span>
//                 </div>
//               )}
//               <div className="flex justify-between text-lg border-t pt-2">
//                 <span>Total (incl. tax):</span>
//                 <span className="font-bold text-ocean">{formattedTotal}</span>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Guest Information Form */}
//           <form onSubmit={handleSubmit}>
//             <Card>
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <User className="w-5 h-5" />
//                   Lead Guest Information
//                 </CardTitle>
//                 <p className="text-sm text-muted-foreground">
//                   Primary contact for this booking
//                 </p>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="firstName">First Name *</Label>
//                     <Input
//                       id="firstName"
//                       value={formData.firstName}
//                       onChange={(e) => updateField("firstName", e.target.value)}
//                       placeholder="Enter first name"
//                       className="mt-1"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="lastName">Last Name *</Label>
//                     <Input
//                       id="lastName"
//                       value={formData.lastName}
//                       onChange={(e) => updateField("lastName", e.target.value)}
//                       placeholder="Enter last name"
//                       className="mt-1"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="email">Email Address *</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => updateField("email", e.target.value)}
//                       placeholder="Enter email address"
//                       className="mt-1"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="phone">Phone Number *</Label>
//                     <Input
//                       id="phone"
//                       type="tel"
//                       value={formData.phone}
//                       onChange={(e) => updateField("phone", e.target.value)}
//                       placeholder="(305) 555-0123"
//                       className="mt-1"
//                       required
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <Label htmlFor="location">Hotel/Location (Optional)</Label>
//                     <Input
//                       id="location"
//                       value={formData.location}
//                       onChange={(e) => updateField("location", e.target.value)}
//                       placeholder="e.g., Hawks Cay Resort, Mile Marker 61"
//                       className="mt-1"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <Label htmlFor="specialRequests">
//                       Special Requests (Optional)
//                     </Label>
//                     <textarea
//                       id="specialRequests"
//                       value={formData.specialRequests}
//                       onChange={(e) =>
//                         updateField("specialRequests", e.target.value)
//                       }
//                       placeholder="Any special accommodations, dietary restrictions, or requests..."
//                       className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                       rows={3}
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* All Passengers Information */}
//             {guestCount > 1 && (
//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-lg flex items-center gap-2">
//                     <Users className="w-5 h-5" />
//                     All Passenger Names ({guestCount} total)
//                 </CardTitle>
//                   <p className="text-sm text-muted-foreground">
//                     Required for Coast Guard manifest and safety briefing
//                   </p>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {passengers.map((passenger, index) => (
//                     <div
//                       key={index}
//                       className="p-4 border rounded-lg bg-gray-50"
//                     >
//                       <h4 className="font-medium mb-3 flex items-center gap-2">
//                         <User className="w-4 h-4" />
//                         Passenger {index + 1}
//                         {index === 0 && (
//                           <Badge variant="outline" className="text-xs">
//                             Lead Guest (above)
//                           </Badge>
//                         )}
//                       </h4>
//                       <div className="grid md:grid-cols-3 gap-3">
//                         <div>
//                           <Label htmlFor={`passenger-firstName-${index}`}>
//                             First Name *
//                           </Label>
//                           <Input
//                             id={`passenger-firstName-${index}`}
//                             value={
//                               index === 0
//                                 ? formData.firstName
//                                 : passenger.firstName
//                             }
//                             onChange={(e) => {
//                               if (index === 0) {
//                                 updateField("firstName", e.target.value);
//                               }
//                               updatePassenger(
//                                 index,
//                                 "firstName",
//                                 e.target.value,
//                               );
//                             }}
//                             placeholder="First name"
//                             className="mt-1"
//                             disabled={index === 0}
//                             required
//                           />
//                           {index === 0 && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               Auto-filled from lead guest
//                             </p>
//                           )}
//                         </div>
//                         <div>
//                           <Label htmlFor={`passenger-lastName-${index}`}>
//                             Last Name *
//                           </Label>
//                           <Input
//                             id={`passenger-lastName-${index}`}
//                             value={
//                               index === 0
//                                 ? formData.lastName
//                                 : passenger.lastName
//                             }
//                             onChange={(e) => {
//                               if (index === 0) {
//                                 updateField("lastName", e.target.value);
//                               }
//                               updatePassenger(
//                                 index,
//                                 "lastName",
//                                 e.target.value,
//                               );
//                             }}
//                             placeholder="Last name"
//                             className="mt-1"
//                             disabled={index === 0}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <Label htmlFor={`passenger-age-${index}`}>
//                             Age (Optional)
//                           </Label>
//                           <Input
//                             id={`passenger-age-${index}`}
//                             value={passenger.age}
//                             onChange={(e) =>
//                               updatePassenger(index, "age", e.target.value)
//                             }
//                             placeholder="Age"
//                             className="mt-1"
//                             type="number"
//                             min="5"
//                             max="100"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             )}

//             {/* Safety & Requirements Notice */}
//             <Card className="bg-amber-50 border-amber-200 mt-6">
//               <CardContent className="p-4">
//                 <h4 className="font-semibold text-amber-800 mb-2">
//                   Important Safety Information
//                 </h4>
//                 <ul className="text-sm text-amber-700 space-y-1">
//                   <li>
//                     • All guests must be comfortable in water and able to swim
//                   </li>
//                   <li>
//                     • Minimum age: 5 years old (children must be accompanied by
//                     adults)
//                   </li>
//                   <li>
//                     • Please inform us of any medical conditions or concerns
//                   </li>
//                   <li>• Tour may be cancelled due to weather conditions</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             {/* Action Buttons */}
//             <div className="flex gap-4 pt-6">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onClose}
//                 className="flex-1"
//                 disabled={isLoading}
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Booking
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={!isFormValid() || isLoading}
//                 className="flex-1 bg-coral hover:bg-coral/90 text-white"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <CreditCard className="w-4 h-4 mr-2" />
//                     Complete Booking {totalPrice}
//                   </>
//                 )}
//               </Button>
//             </div>

//             {/* Trust Indicators */}
//             <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground border-t">
//               <div className="flex items-center gap-1">
//                 <CheckCircle className="w-4 h-4 text-green-600" />
//                 <span>Secure Booking</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <CheckCircle className="w-4 h-4 text-green-600" />
//                 <span>Instant Confirmation</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <CheckCircle className="w-4 h-4 text-green-600" />
//                 <span>Weather Guarantee</span>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
