"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DiveSiteData } from "./DiveSitesMap";

// Dynamically import the map component with no SSR
const DiveSitesMap = dynamic(() => import("./DiveSitesMap"), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-100 rounded-lg flex items-center justify-center h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <div className="text-gray-500">Loading interactive map...</div>
      </div>
    </div>
  ),
});

interface DiveSitesMapWrapperProps {
  diveSites: DiveSiteData[];
  selectedSite?: number | null;
  onSiteSelect?: (siteId: number) => void;
  className?: string;
}

export default function DiveSitesMapWrapper(props: DiveSitesMapWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${props.className || "h-96"}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <div className="text-gray-500">Loading interactive map...</div>
        </div>
      </div>
    );
  }

  return <DiveSitesMap {...props} />;
}
