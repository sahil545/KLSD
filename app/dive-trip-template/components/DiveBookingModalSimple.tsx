"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DiveBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripData: any;
  diverCount: number;
  selectedDate: string;
  selectedTime: string;
  basePrice: number;
}

export default function DiveBookingModalSimple({
  isOpen,
  onClose,
  tripData,
  diverCount,
  selectedDate,
  selectedTime,
  basePrice,
}: DiveBookingModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Diver Information</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>Trip: {tripData.name}</p>
          <p>Date: {selectedDate}</p>
          <p>Time: {selectedTime}</p>
          <p>Divers: {diverCount}</p>
          <p>Base Price: ${basePrice}</p>

          <div className="mt-6">
            <Button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
