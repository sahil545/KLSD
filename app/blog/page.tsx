"use client";

import React from "react";
import { Navigation } from "../../client/components/Navigation";
import { Footer } from "../../client/components/Footer";
import { BlogSection } from "../../client/components/BlogSection";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
