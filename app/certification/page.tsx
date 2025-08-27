"use client";

import React from "react";
import { Navigation } from "../../client/components/Navigation";
import { Footer } from "../../client/components/Footer";
import CertificationContent  from "../../client/components/CertificationContent";

export default function Certification() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <CertificationContent />
      </main>
      <Footer />
    </div>
  );
}
