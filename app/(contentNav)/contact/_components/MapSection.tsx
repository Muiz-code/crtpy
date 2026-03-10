/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

interface SearchResult {
  name?: string;
  display_name: string;
  lat: string;
  lon: string;
}

interface WindowWithLeaflet extends Window {
  L: any;
  contactMap: any;
}

const MapSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedMarkers] = useState<Location[]>([
    { id: 1, name: "Main Office", lat: 8.4955, lng: 4.5515 },
    { id: 2, name: "Secondary Office", lat: 8.4975, lng: 4.5535 },
    { id: 3, name: "Branch Office", lat: 8.4935, lng: 4.5495 },
  ]);

  const initializeMap = () => {
    const mapElement = document.getElementById("contact-map");
    if (!mapElement || !(window as unknown as WindowWithLeaflet).L) return;

    const L = (window as unknown as WindowWithLeaflet).L;

    // Remove existing map if it exists
    if ((window as unknown as WindowWithLeaflet).contactMap) {
      (window as unknown as WindowWithLeaflet).contactMap.remove();
    }

    // Clear the map element
    mapElement.innerHTML = "";

    // Create map
    const mapCenter = [8.4955, 4.5515];
    const map = L.map("contact-map", {
      zoomControl: false,
      attributionControl: true,
    }).setView(mapCenter, 13);

    // Add OpenStreetMap tiles with dark theme
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 20,
      },
    ).addTo(map);

    // Custom marker icon
    const customIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="
        width: 20px;
        height: 20px;
        background-color: #FFF7EB;
        border: 2px solid #4AA8C4;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      "></div>`,
      iconSize: [20, 20],
      popupAnchor: [0, -10],
    });

    // Add markers
    selectedMarkers.forEach((location) => {
      L.marker([location.lat, location.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(
          `<div style="color: #0a1419; font-weight: 500;">${location.name}</div>`,
        );
    });

    // Remove default zoom controls
    const zoomControl = document.querySelector(".leaflet-control-zoom");
    if (zoomControl) {
      zoomControl.remove();
    }

    // Store map instance for zoom controls
    (window as unknown as WindowWithLeaflet).contactMap = map;
  };

  const handleZoom = (direction: "in" | "out") => {
    const map = (window as unknown as WindowWithLeaflet).contactMap;
    if (map) {
      if (direction === "in") {
        map.zoomIn();
      } else {
        map.zoomOut();
      }
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Search using Nominatim API (free, no key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery,
        )}&format=json&limit=5`,
        {
          headers: {
            "User-Agent": "MyContactApp/1.0",
          },
        },
      );

      const results = await response.json();
      setSearchResults(results);

      if (results.length > 0) {
        // Center map on first result
        const firstResult = results[0];
        const map = (window as unknown as WindowWithLeaflet).contactMap;
        if (map) {
          const lat = parseFloat(firstResult.lat);
          const lng = parseFloat(firstResult.lon);
          map.setView([lat, lng], 15);

          // Add marker for search result
          const L = (window as unknown as WindowWithLeaflet).L;
          const customIcon = L.divIcon({
            className: "search-marker",
            html: `<div style="
              width: 24px;
              height: 24px;
              background-color: #4AA8C4;
              border: 2px solid #FFF7EB;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            "></div>`,
            iconSize: [24, 24],
            popupAnchor: [0, -12],
          });

          L.marker([lat, lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(
              `<div style="color: #0a1419; font-weight: 500;">${firstResult.display_name}</div>`,
            )
            .openPopup();
        }
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    const map = (window as unknown as WindowWithLeaflet).contactMap;
    const L = (window as unknown as WindowWithLeaflet).L;

    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    if (map) {
      map.setView([lat, lng], 15);

      const customIcon = L.divIcon({
        className: "search-marker",
        html: `<div style="
          width: 24px;
          height: 24px;
          background-color: #4AA8C4;
          border: 2px solid #FFF7EB;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        "></div>`,
        iconSize: [24, 24],
        popupAnchor: [0, -12],
      });

      L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(
          `<div style="color: #0a1419; font-weight: 500;">${result.display_name}</div>`,
        )
        .openPopup();
    }

    setSearchQuery("");
    setSearchResults([]);
  };

  // Load Leaflet CSS and JS
  useEffect(() => {
    // Add Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);

    // Hide default Leaflet zoom controls with CSS
    const style = document.createElement("style");
    style.textContent = `
      .leaflet-control-zoom {
        display: none !important;
      }
      .leaflet-control-zoom-in,
      .leaflet-control-zoom-out {
        display: none !important;
      }
      .leaflet-top.leaflet-left .leaflet-control-zoom {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Add Leaflet JS
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.async = true;
    script.onload = () => {
      setMapLoaded(true);
      initializeMap();
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="w-full bg-[#0a1419]">
      {/* Map Container */}
      <motion.div
        className="relative w-full h-[400px] md:h-[500px] bg-[#1a2a3a]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Search Bar */}
        <div className="absolute top-4 left-4 z-[9999] md:top-8 md:left-8 w-64 md:w-80 pointer-events-auto">
          <form
            onSubmit={handleSearch}
            className="relative z-[9999] pointer-events-auto"
          >
            <input
              type="text"
              placeholder="Search location ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-full bg-white text-[#0a1419] border-none placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#4AA8C4] relative z-[9999] pointer-events-auto"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#999] hover:text-[#4AA8C4] transition disabled:opacity-50"
            >
              {isSearching ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </button>
          </form>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-[9999] pointer-events-auto"
            >
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectResult(result)}
                  className="w-full text-left px-4 py-2 hover:bg-[#f0f0f0] text-[#0a1419] text-sm border-b border-[#eee] last:border-b-0 transition"
                >
                  <div className="font-medium truncate">
                    {result.name || result.display_name.split(",")[0]}
                  </div>
                  <div className="text-xs text-[#999] truncate">
                    {result.display_name.split(",").slice(1, 3).join(",")}
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-4 bottom-4 z-[9999] md:right-8 md:bottom-8 flex flex-col gap-2 pointer-events-auto">
          <button
            onClick={() => handleZoom("in")}
            className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:bg-[#FFF7EB] transition shadow-lg text-[#0a1419] font-bold text-xl"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => handleZoom("out")}
            className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:bg-[#FFF7EB] transition shadow-lg text-[#0a1419] font-bold text-xl"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>

        {/* Leaflet Map */}
        <div id="contact-map" className="w-full h-full" />
      </motion.div>
    </div>
  );
};

export default MapSection;
