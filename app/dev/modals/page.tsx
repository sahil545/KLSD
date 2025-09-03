"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DiveBookingModal from "../../dive-trip-template/components/DiveBookingModal";
import { diveTripData } from "../../dive-trip-template/data";
import GuestDetailsModal from "@/components/GuestDetailsModal";

export default function DevModalsPage() {
  const [openDive, setOpenDive] = useState(false);
  const [openSnorkel, setOpenSnorkel] = useState(false);

  const diverCount = 2;
  const selectedDate = new Date().toISOString().slice(0, 10);
  const selectedTime = "08:00";
  const basePrice = diveTripData.pricing.basePrice;
  const totalSnorkel = 2 * 70 * (1 + 0.07);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Dev: Modals Showcase</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Dive Trip Modal</h2>
            <p className="text-sm text-gray-600 mb-4">
              Full diver information flow with certification, last dive month/year, optional gear rental and services.
            </p>
            <Button onClick={() => setOpenDive(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              Open Dive Booking Modal
            </Button>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Snorkeling Modal</h2>
            <p className="text-sm text-gray-600 mb-4">
              Guest details modal used on snorkeling templates before checkout.
            </p>
            <Button onClick={() => setOpenSnorkel(true)} className="bg-coral hover:bg-coral/90 text-white">
              Open Snorkeling Guest Details Modal
            </Button>
          </div>
        </div>

        {/* Render modals */}
        <DiveBookingModal
          isOpen={openDive}
          onClose={() => setOpenDive(false)}
          tripData={diveTripData}
          diverCount={diverCount}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          basePrice={basePrice}
        />

        <GuestDetailsModal
          isOpen={openSnorkel}
          onClose={() => setOpenSnorkel(false)}
          guestCount={2}
          totalPrice={Number.isFinite(totalSnorkel) ? totalSnorkel : 0}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      </div>
    </div>
  );
}
