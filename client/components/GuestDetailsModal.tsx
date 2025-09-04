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
  personTypes?: Array<{
    id: number;
    name: string;
    description: string;
    base_cost: string;
    block_cost: string;
    min: string;
    max: string;
  }>;
  personTypeCounts?: Array<{ id: number; count: number; name: string }>;
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

interface SnorkelerInfo {
  firstName: string;
  lastName: string;
  age?: string;
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
  personTypes,
  personTypeCounts,
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
  });

  const [isScreenLoading, setIsScreenLoading] = useState(false);

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

  // Calculate total non-diver passengers count
  const nonDiverCount = guestCount - (diverCount || 0);

  // Function to get person type for a given passenger index
  const getPersonTypeForPassengerIndex = (index: number) => {
    if (!personTypeCounts || personTypeCounts.length === 0) {
      return { id: 0, name: "Passenger" };
    }

    // Use personTypeCounts to determine which person type this passenger belongs to
    let currentIndex = 0;
    for (const personTypeCount of personTypeCounts) {
      if (index < currentIndex + personTypeCount.count) {
        return {
          id: personTypeCount.id,
          name: personTypeCount.name,
        };
      }
      currentIndex += personTypeCount.count;
    }

    // Fallback
    return personTypeCounts[0];
  };

  const [snorkelers, setSnorkelers] = useState<SnorkelerInfo[]>(
    Array.from({ length: nonDiverCount }, () => ({
      firstName: "",
      lastName: "",
      age: "",
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
  }, [diverCount]);

  // Update snorkelers array when non-diver count changes
  useEffect(() => {
    const newNonDiverCount = guestCount - (diverCount || 0);
    setSnorkelers(
      Array.from({ length: newNonDiverCount }, () => ({
        firstName: "",
        lastName: "",
        age: "",
      })),
    );
  }, [guestCount, diverCount]);

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

  const updateSnorkeler = (
    index: number,
    field: keyof SnorkelerInfo,
    value: string,
  ) => {
    setSnorkelers((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    );
  };

  const isFormValid = () => {
    // Check lead guest information
    const leadGuestValid =
      formData.firstName?.trim() &&
      formData.lastName?.trim() &&
      formData.email?.trim() &&
      formData.phone?.trim();

    // Validate additional passengers (divers) if any
    const additionalPassengersValid =
      !diverCount ||
      diverCount === 0 ||
      passengers
        .slice(1)
        .every((p) => p.firstName?.trim() && p.lastName?.trim());

    // Validate snorkelers if any
    const snorkelersValid =
      nonDiverCount === 0 ||
      snorkelers.every((s) => s.firstName?.trim() && s.lastName?.trim());

    return leadGuestValid && additionalPassengersValid && snorkelersValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validation
    const validationResult = isFormValid();

    if (!validationResult) {
      // More specific error message
      const missingFields = [];
      if (!formData.firstName?.trim()) missingFields.push("First Name");
      if (!formData.lastName?.trim()) missingFields.push("Last Name");
      if (!formData.email?.trim()) missingFields.push("Email");
      if (!formData.phone?.trim()) missingFields.push("Phone");

      if (diverCount && diverCount > 0) {
        // Only check additional passengers (skip index 0 as it's the lead guest)
        const diverPersonType = personTypes?.find(
          (pt) =>
            pt.name.toLowerCase().includes("diver") ||
            pt.name.toLowerCase().includes("# of divers"),
        );
        const diverTypeName = diverPersonType?.name || "Diver";

        passengers.slice(1).forEach((passenger, index) => {
          if (!passenger.firstName?.trim())
            missingFields.push(`${diverTypeName} ${index + 2} First Name`);
          if (!passenger.lastName?.trim())
            missingFields.push(`${diverTypeName} ${index + 2} Last Name`);
        });
      }

      // Check snorkelers
      if (nonDiverCount > 0) {
        const snorkelerPersonType = personTypes?.find(
          (pt) =>
            pt.name.toLowerCase().includes("snorkeler") ||
            pt.name.toLowerCase().includes("# of snorkelers"),
        );
        const snorkelerTypeName = snorkelerPersonType?.name || "Snorkeler";

        snorkelers.forEach((snorkeler, index) => {
          if (!snorkeler.firstName?.trim())
            missingFields.push(`${snorkelerTypeName} ${index + 1} First Name`);
          if (!snorkeler.lastName?.trim())
            missingFields.push(`${snorkelerTypeName} ${index + 1} Last Name`);
        });
      }

      alert(
        `Please fill in the following required fields: ${missingFields.join(", ")}`,
      );
      return;
    }

    setIsScreenLoading(true);

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
        quantity: diverCount,

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
        // wc_bookings_field_persons_4696: diverCount, // Adjust ID as needed
        // wc_bookings_field_persons_4697: guestCount - diverCount, // Adjust ID as needed

        // Persons fields (use personTypeCounts directly)
        ...(() => {
          const personFields: { [key: string]: number } = {};

          if (personTypeCounts && personTypeCounts.length > 0) {
            // Use provided person type counts directly
            personTypeCounts.forEach((personTypeCount) => {
              personFields[`wc_bookings_field_persons_${personTypeCount.id}`] =
                personTypeCount.count;
            });
          } else if (personTypes && personTypes.length > 0) {
            // Fallback: if no personTypeCounts provided, distribute guests to first person type
            personTypes.forEach((personType, index) => {
              if (index === 0) {
                personFields[`wc_bookings_field_persons_${personType.id}`] =
                  guestCount;
              } else {
                personFields[`wc_bookings_field_persons_${personType.id}`] = 0;
              }
            });
          }
          return personFields;
        })(),

        // Customer information (lead guest)
        tmcp_textfield_0: `${formData.firstName} ${formData.lastName}`,
        // tmcp_select_1:
        //   passengers[0]?.certificationLevel || "Open Water Diver_3",
        // tmcp_select_2:
        //   passengers[0]?.lastDiveDate || "Less than 18 months ago_3",

        // Location and special requests
        tmcp_textfield_3: formData.location || "",
        tmcp_textarea_4: formData.specialRequests || "",
        // Format passenger names based on person types
        ...(() => {
          // Check if person types contain divers or snorkelers
          const hasDiversOrSnorkelers = personTypes?.some(
            (pt) =>
              pt.name.toLowerCase().includes("diver") ||
              pt.name.toLowerCase().includes("snorkeler"),
          );

          // If person types are divers/snorkelers, use string format
          if (hasDiversOrSnorkelers) {
            return {
              tmcp_textarea_30:
                snorkelers
                  .map((s) => `${s.firstName} ${s.lastName}`)
                  .join("\n") || "",
            };
          } else {
            // For other person types, use array format
            const passengerFields: { [key: string]: string } = {};
            snorkelers.forEach((s, index) => {
              if (s.firstName && s.lastName) {
                passengerFields[`tmcp_textfield_0[${index}]`] =
                  `${s.firstName} ${s.lastName}`;
              }
            });
            return passengerFields;
          }
        })(),
      };

      // Add additional passenger and rental gear data
      const enhancedWooCommerceData = {
        ...wooCommerceData,

        // Additional passengers (divers 2, 3, 4, etc.)
        ...passengers.slice(1).reduce((acc, passenger, index) => {
          const actualIndex = index + 1; // Start from passenger 1

          // Use the exact numbering from static version:
          // Diver 1: 0,1,2 | Diver 2: 6,7,8 | Diver 3: 11,12,13 | Diver 4: 16,17,18 | Diver 5: 21,22,23
          let baseFieldIndex;
          if (actualIndex === 1) {
            baseFieldIndex = 6; // Diver 2: 6,7,8
          } else if (actualIndex === 2) {
            baseFieldIndex = 11; // Diver 3: 11,12,13
          } else if (actualIndex === 3) {
            baseFieldIndex = 16; // Diver 4: 16,17,18
          } else if (actualIndex === 4) {
            baseFieldIndex = 21; // Diver 5: 21,22,23
          } else {
            // For additional divers, continue the pattern
            baseFieldIndex = 21 + (actualIndex - 4) * 5;
          }

          // Passenger names
          acc[`tmcp_textfield_${baseFieldIndex}`] =
            `${passenger.firstName} ${passenger.lastName}`;

          // Certification levels
          if (passenger.certificationLevel) {
            acc[`tmcp_select_${baseFieldIndex + 1}`] =
              passenger.certificationLevel;
          }

          // Last dive dates - should be tmcp_select, not tmcp_textfield
          if (passenger.lastDiveDate) {
            acc[`tmcp_select_${baseFieldIndex + 2}`] = passenger.lastDiveDate;
          }

          return acc;
        }, {}),

        // Rental gear add-ons for all passengers
        ...Object.entries(rentalGearSelections || {}).reduce(
          (acc, [passengerIndex, gearSelections]) => {
            const selectedProductIds = Object.entries(gearSelections)
              .filter(([_, isSelected]) => isSelected)
              .map(([productId, _]) => productId);

            if (selectedProductIds.length > 0) {
              // Add each add-on as separate fields (like static version)
              selectedProductIds.forEach((productId, addonIndex) => {
                // Use the exact format from static version:
                // Passenger 0 (Diver 1): base 5, addon indices 0,1 → 5_0, 5_1
                // Passenger 1 (Diver 2): base 10, addon indices 2,3 → 10_2, 10_3
                // Passenger 2 (Diver 3): base 15, addon indices 4,5 → 15_4, 15_5

                let baseFieldNumber, addonIndexForField;

                if (parseInt(passengerIndex) === 0) {
                  // Diver 1: use base 5, addon indices 0,1
                  baseFieldNumber = 5;
                  addonIndexForField = addonIndex; // 0, 1
                } else if (parseInt(passengerIndex) === 1) {
                  // Diver 2: use base 10, addon indices 2,3
                  baseFieldNumber = 10;
                  addonIndexForField = addonIndex + 2; // 2, 3
                } else {
                  // Diver 3+: use base 15, addon indices 4,5,6,7...
                  baseFieldNumber = 15 + (parseInt(passengerIndex) - 2) * 5;
                  addonIndexForField =
                    addonIndex + 4 + (parseInt(passengerIndex) - 2) * 2;
                }

                const fieldKey = `tmcp_product_${baseFieldNumber}_${addonIndexForField}`;
                const quantityKey = `tmcp_product_${baseFieldNumber}_${addonIndexForField}_quantity`;

                acc[fieldKey] = productId;
                acc[quantityKey] = "1";
              });
            }
            return acc;
          },
          {},
        ),

        // Additional booking metadata
        booking_guest_count: guestCount.toString(),
        booking_diver_count: (diverCount || 0).toString(),
        booking_total_price: totalPrice?.toString() || "0",
        booking_rental_cost: rentalGearCost.toString(),
        // Format passenger names for booking metadata based on person types
        ...(() => {
          // Check if person types contain divers or snorkelers
          const hasDiversOrSnorkelers = personTypes?.some(
            (pt) =>
              pt.name.toLowerCase().includes("diver") ||
              pt.name.toLowerCase().includes("snorkeler"),
          );

          // If person types are divers/snorkelers, use string format
          if (hasDiversOrSnorkelers) {
            return {
              booking_snorkeler_names:
                snorkelers
                  .map((s) => `${s.firstName} ${s.lastName}`)
                  .join("\n") || "",
            };
          } else {
            // For other person types, use array format
            const passengerFields: { [key: string]: string } = {};
            snorkelers.forEach((s, index) => {
              if (s.firstName && s.lastName) {
                passengerFields[`booking_passenger_names[${index}]`] =
                  `${s.firstName} ${s.lastName}`;
              }
            });
            return passengerFields;
          }
        })(),
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
          snorkelerNames: snorkelers
            .map((s) => `${s.firstName} ${s.lastName}`)
            .join("\n"),
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
          snorkelerNames: snorkelers
            .map((s) => `${s.firstName} ${s.lastName}`)
            .join("\n"),
        },

        // WooCommerce data
        wooCommerceData: wooCommerceData,

        // Timestamp
        submittedAt: new Date().toISOString(),
      };

      // Store booking data for later submission
      localStorage.setItem("pendingBookingData", JSON.stringify(bookingData));

      // Submit to WooCommerce via rest.php
      await handleWooCommerceBooking(
        enhancedWooCommerceData,
        enhancedWooCommerceData,
      );

      // onClose();
    } catch (error) {
      setIsScreenLoading(false);
      console.error("Booking error:", error);
      alert("There was a problem processing your booking. Please try again.");
    }
  };

  const submitFormToWooCommerce = (wooCommerceData: WooCommerceData) => {
    const site_url = "https://keylargoscubadiving.com";

    // Single form submission with ALL data (main product + all passengers + rental gear)
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `${site_url}/?wc-ajax=add_to_cart`;
    form.style.display = "none";

    // Add main tour product
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

    // Add ALL WooCommerce fields (including passenger details and rental gear)
    Object.entries(wooCommerceData).forEach(([key, value]) => {
      if (value && value !== "") {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value.toString();
        form.appendChild(input);
      }
    });

    // Debug logging
    console.log("Submitting complete form to WooCommerce:", {
      action: form.action,
      method: form.method,
      data: wooCommerceData,
    });

    // Debug: Check what fields are actually being added to the form
    const formFields = Array.from(form.elements).map((element: any) => ({
      name: element.name,
      value: element.value,
    }));
    console.log("Form fields being submitted:", formFields);

    // Debug: Check if rental gear fields are present
    const rentalGearInForm = formFields.filter(
      (field) => field.name && field.name.startsWith("tmcp_product_"),
    );
    console.log("Rental gear fields in form:", rentalGearInForm);

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

            // Diver 1 (lead guest) - already in wooCommerceData
            tmcp_textfield_0: wooCommerceData["tmcp_textfield_0"],
            tmcp_select_1: wooCommerceData["tmcp_select_1"],
            tmcp_select_2: wooCommerceData["tmcp_select_2"],
            tmcp_textfield_3: wooCommerceData["tmcp_textfield_3"],
            tmcp_textarea_4: wooCommerceData["tmcp_textarea_4"],

            // Additional passengers (divers 2, 3, 4, etc.)
            ...passengers.slice(1).reduce((acc, passenger, index) => {
              const actualIndex = index + 1; // Start from passenger 1

              // Use the exact numbering from static version:
              // Diver 1: 0,1,2 | Diver 2: 6,7,8 | Diver 3: 11,12,13 | Diver 4: 16,17,18 | Diver 5: 21,22,23
              let baseFieldIndex;
              if (actualIndex === 1) {
                baseFieldIndex = 6; // Diver 2: 6,7,8
              } else if (actualIndex === 2) {
                baseFieldIndex = 11; // Diver 3: 11,12,13
              } else if (actualIndex === 3) {
                baseFieldIndex = 16; // Diver 4: 16,17,18
              } else if (actualIndex === 4) {
                baseFieldIndex = 21; // Diver 5: 21,22,23
              } else {
                // For additional divers, continue the pattern
                baseFieldIndex = 21 + (actualIndex - 4) * 5;
              }

              // Passenger names
              acc[`tmcp_textfield_${baseFieldIndex}`] =
                `${passenger.firstName} ${passenger.lastName}`;

              // Certification levels
              if (passenger.certificationLevel) {
                acc[`tmcp_select_${baseFieldIndex + 1}`] =
                  passenger.certificationLevel;
              }

              // Last dive dates - should be tmcp_select, not tmcp_textfield
              if (passenger.lastDiveDate) {
                acc[`tmcp_select_${baseFieldIndex + 2}`] =
                  passenger.lastDiveDate;
              }

              return acc;
            }, {}),

            // Rental gear add-ons for all passengers
            ...Object.entries(rentalGearSelections || {}).reduce(
              (acc, [passengerIndex, gearSelections]) => {
                const selectedProductIds = Object.entries(gearSelections)
                  .filter(([_, isSelected]) => isSelected)
                  .map(([productId, _]) => productId);

                if (selectedProductIds.length > 0) {
                  // Add each add-on as separate fields (like static version)
                  selectedProductIds.forEach((productId, addonIndex) => {
                    // Use the exact format from static version:
                    // Passenger 0 (Diver 1): base 5, addon indices 0,1 → 5_0, 5_1
                    // Passenger 1 (Diver 2): base 10, addon indices 2,3 → 10_2, 10_3
                    // Passenger 2 (Diver 3): base 15, addon indices 4,5 → 15_4, 15_5

                    let baseFieldNumber, addonIndexForField;

                    if (parseInt(passengerIndex) === 0) {
                      // Diver 1: use base 5, addon indices 0,1
                      baseFieldNumber = 5;
                      addonIndexForField = addonIndex; // 0, 1
                    } else if (parseInt(passengerIndex) === 1) {
                      // Diver 2: use base 10, addon indices 2,3
                      baseFieldNumber = 10;
                      addonIndexForField = addonIndex + 2; // 2, 3
                    } else {
                      // Diver 3+: use base 15, addon indices 4,5,6,7...
                      baseFieldNumber = 15 + (parseInt(passengerIndex) - 2) * 5;
                      addonIndexForField =
                        addonIndex + 4 + (parseInt(passengerIndex) - 2) * 2;
                    }

                    const fieldKey = `tmcp_product_${baseFieldNumber}_${addonIndexForField}`;
                    const quantityKey = `tmcp_product_${baseFieldNumber}_${addonIndexForField}_quantity`;

                    acc[fieldKey] = productId;
                    acc[quantityKey] = "1";
                  });
                }
                return acc;
              },
              {},
            ),
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
            {(diverCount || 0) > 0 && passengers.length > 0 && (
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
                        {(() => {
                          const diverPersonType = personTypes?.find(
                            (pt) =>
                              pt.name.toLowerCase().includes("diver") ||
                              pt.name.toLowerCase().includes("# of divers"),
                          );
                          const personTypeName =
                            diverPersonType?.name || "Diver";
                          return `${personTypeName} ${i + 1}`;
                        })()}
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

            {/* Passenger Information */}
            {nonDiverCount > 0 && (
              <Card className="mt-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {(() => {
                      // Check if personTypes contains divers or snorkelers
                      const hasDiversOrSnorkelers = personTypes?.some(
                        (pt) =>
                          pt.name.toLowerCase().includes("diver") ||
                          pt.name.toLowerCase().includes("snorkeler"),
                      );

                      if (hasDiversOrSnorkelers) {
                        return "Snorkeler Information";
                      } else {
                        return "Passenger Information";
                      }
                    })()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {snorkelers.map((snorkeler, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg bg-gray-50"
                    >
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {(() => {
                          const personType =
                            getPersonTypeForPassengerIndex(index);
                          const personTypeName =
                            personType?.name || "Passenger";

                          // Calculate the index within this person type
                          let indexWithinType = index;
                          if (personTypeCounts && personTypeCounts.length > 0) {
                            let currentIndex = 0;
                            for (const personTypeCount of personTypeCounts) {
                              if (personType?.id === personTypeCount.id) {
                                indexWithinType = index - currentIndex;
                                break;
                              }
                              currentIndex += personTypeCount.count;
                            }
                          }

                          return `${personTypeName} ${indexWithinType + 1}`;
                        })()}
                      </h4>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <Label>First Name *</Label>
                          <Input
                            value={snorkeler.firstName}
                            onChange={(e) =>
                              updateSnorkeler(
                                index,
                                "firstName",
                                e.target.value,
                              )
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label>Last Name *</Label>
                          <Input
                            value={snorkeler.lastName}
                            onChange={(e) =>
                              updateSnorkeler(index, "lastName", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label>Age</Label>
                          <Input
                            type="number"
                            min="5"
                            max="100"
                            value={snorkeler.age}
                            onChange={(e) =>
                              updateSnorkeler(index, "age", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isScreenLoading}
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
                {isScreenLoading ? (
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
