"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";

// Import L for custom markers - will be initialized in useEffect
import L from "leaflet";

export interface DiveSiteData {
  id: number;
  name: string;
  location: string;
  depth: string;
  type: string;
  difficulty: string;
  description: string;
  image: string;
  highlights: string[];
  marineLife: string[];
  coordinates: [number, number]; // [latitude, longitude]
}

interface DiveSitesMapProps {
  diveSites: DiveSiteData[];
  selectedSite?: number | null;
  onSiteSelect?: (siteId: number) => void;
  className?: string;
}

// Component to fit map bounds to show all markers
function MapBounds({ diveSites }: { diveSites: DiveSiteData[] }) {
  const map = useMap();

  useEffect(() => {
    if (diveSites.length > 0) {
      const bounds = new LatLngBounds(
        diveSites.map((site) => site.coordinates)
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [diveSites, map]);

  return null;
}


export default function DiveSitesMap({
  diveSites,
  selectedSite,
  onSiteSelect,
  className = ""
}: DiveSitesMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Fix for default markers in react-leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    });

    setIsMounted(true);
  }, []);

  // Custom marker icon for dive sites
  const createDiveIcon = (type: string) => {
    const color = type === "Wreck" ? "#dc2626" : type === "Reef" ? "#059669" : "#0ea5e9";

    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            color: white;
            font-weight: bold;
            font-size: 12px;
          ">${type === "Wreck" ? "W" : type === "Reef" ? "R" : "D"}</div>
        </div>
      `,
      className: "dive-site-marker",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });
  };

  if (!isMounted) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  // Center on Key Largo area
  const keyLargoCenter: [number, number] = [25.0865, -80.4526];

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={keyLargoCenter}
        zoom={11}
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapBounds diveSites={diveSites} />
        
        {diveSites.map((site) => (
          <Marker
            key={site.id}
            position={site.coordinates}
            icon={createDiveIcon(site.type)}
            eventHandlers={{
              click: () => onSiteSelect?.(site.id),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <h3 className="font-bold text-lg text-ocean mb-2">{site.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{site.location}</p>
                <div className="flex gap-4 text-sm mb-2">
                  <span><strong>Depth:</strong> {site.depth}</span>
                  <span><strong>Type:</strong> {site.type}</span>
                </div>
                <div className="text-sm mb-2">
                  <strong>Difficulty:</strong> 
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${
                    site.difficulty === "Beginner" 
                      ? "bg-green-100 text-green-800"
                      : site.difficulty === "Intermediate"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {site.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{site.description}</p>
                <div className="text-xs">
                  <strong>Highlights:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {site.highlights.slice(0, 2).map((highlight, index) => (
                      <li key={index} className="text-gray-600">{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg z-10">
        <h4 className="font-semibold text-sm mb-2">Dive Site Types</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white"></div>
            <span>Wreck Diving</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-white"></div>
            <span>Reef Diving</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
            <span>Other Sites</span>
          </div>
        </div>
      </div>
    </div>
  );
}
