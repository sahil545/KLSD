"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  Phone,
  Calendar,
  Waves,
  Star,
  MapPin,
  Clock,
  ChevronDown,
  Fish,
  Ship,
  Moon,
  Anchor,
  Users,
  Crown,
} from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const navItems = [
    { label: "Certification", href: "/certification" },
    { label: "Dive Sites", href: "/dive-sites" },
    { label: "Scuba Gear", href: "/scuba-gear" },
    { label: "Contact", href: "/contact" },
  ];

  // Parent navigation items with children
  const parentNavItems = [
    {
      label: "Dev Links",
      children: [
        { label: "Content Manager", href: "/content-manager" },
        { label: "Bookings", href: "/booking-calendar" },
        { label: "Snorkeling Trips", href: "/snorkeling-trips" },
        { label: "Dev Calendar", href: "/dev/calender" },
        { label: "Dev Modal", href: "/dev/modal" },
        { label: "Image Test", href: "/image-test" },
      ],
    },
    {
      label: "Template",
      children: [
        { label: "Certification Template", href: "/certification-template" },
        { label: "Christ Statue Template", href: "/christ-statue-tour" },
        {
          label: "Snorkeling Tours Template",
          href: "/snorkeling-tours-template",
        },
        { label: "Dive Trip Template", href: "/dive-trip-template" },
        { label: "Simple Product Template", href: "/product-template-1a" },
      ],
    },
  ];

  const tripsMenuItems = [
    { label: "Snorkeling Tours", href: "/snorkeling-tours", icon: Waves },
    { label: "All Dive Trips", href: "/all-dive-trips", icon: Fish },
    { label: "Reef Dive Trips", href: "/reef-dive-trips", icon: Fish },
    { label: "Wreck Dive Trips", href: "/wreck-dive-trips", icon: Ship },
    { label: "Night Dive Trips", href: "/night-dive-trips", icon: Moon },
    { label: "Private Charters", href: "/private-charters", icon: Anchor },
  ];

  const featuredProducts = [
    {
      name: "Christ Statue Snorkeling Tour",
      price: "$89",
      description: "Famous underwater statue",
      href: "/christ-statue-tour",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=300",
    },
    {
      name: "Molasses Reef Dive & Snorkel Combo",
      price: "$125",
      description: "Perfect for divers and snorkelers",
      href: "/molasses-reef-combo",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=300",
    },
    {
      name: "Spiegel Grove Wreck Dive",
      price: "$145",
      description: "Massive naval vessel wreck",
      href: "/spiegel-grove-wreck",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=300",
    },
    {
      name: "Duane Wreck Dive",
      price: "$140",
      description: "Historic coast guard cutter",
      href: "/duane-wreck",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=300",
    },
    {
      name: "Bibb Wreck Dive",
      price: "$140",
      description: "Twin to the Duane wreck",
      href: "/bibb-wreck",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=300",
    },
    {
      name: "Night Dive",
      price: "$155",
      description: "Experience marine life after dark",
      href: "/night-dive",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=300",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-ocean/10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F078ec59be1b24e338d5a681cb34aad66?format=webp&width=800"
              alt="Key Largo Scuba Diving Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Trips & Tours Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 text-foreground hover:text-ocean transition-colors font-medium">
                Trips & Tours
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-[900px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 z-50"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  {/* Invisible bridge to prevent menu from closing */}
                  <div className="absolute -top-2 left-0 right-0 h-2 bg-transparent"></div>

                  <div className="grid grid-cols-5 gap-6">
                    {/* Left 2 Columns - Trip Categories */}
                    <div className="col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-ocean" />
                        Trip Categories
                      </h3>
                      <div className="space-y-2">
                        {tripsMenuItems.map((item, index) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={index}
                              href={item.href}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-ocean/5 transition-colors group"
                            >
                              <IconComponent className="w-4 h-4 text-ocean group-hover:text-ocean/80" />
                              <span className="text-sm font-medium text-gray-700 group-hover:text-ocean">
                                {item.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right 3 Columns - Featured Products */}
                    <div className="col-span-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Crown className="w-5 h-5 text-coral" />
                        Featured Adventures
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {featuredProducts.slice(0, 4).map((product, index) => (
                          <Link
                            key={index}
                            href={product.href}
                            className="group bg-gradient-to-br from-ocean/5 to-sage/5 rounded-lg p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-ocean/20"
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 text-sm group-hover:text-ocean transition-colors mb-1 line-clamp-2">
                                  {product.name}
                                </h4>
                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                  {product.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-coral">
                                    {product.price}
                                  </span>
                                  <span className="text-xs text-ocean font-medium group-hover:text-ocean/80">
                                    Book →
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Parent Navigation Items with Dropdowns */}
            {parentNavItems.map((parentItem, index) => (
              <div
                key={`parent-${index}`}
                className="relative"
                onMouseEnter={() =>
                  setOpenDropdowns((prev) => ({
                    ...prev,
                    [parentItem.label]: true,
                  }))
                }
                onMouseLeave={() =>
                  setOpenDropdowns((prev) => ({
                    ...prev,
                    [parentItem.label]: false,
                  }))
                }
              >
                <button className="flex items-center gap-1 text-foreground hover:text-ocean transition-colors font-medium">
                  {parentItem.label}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {openDropdowns[parentItem.label] && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {/* Invisible bridge to prevent menu from closing */}
                    <div className="absolute -top-2 left-0 right-0 h-2 bg-transparent"></div>

                    {parentItem.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-ocean/5 hover:text-ocean transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Other Navigation Items */}
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-foreground hover:text-ocean transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>(305) 555-DIVE</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-coral fill-coral" />
                <span className="font-medium">4.9/5</span>
              </div>
            </div>
            <Button className="bg-coral hover:bg-coral/90 text-white font-semibold shadow-lg">
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <Link
                      href="/"
                      className="hover:opacity-80 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F078ec59be1b24e338d5a681cb34aad66?format=webp&width=800"
                        alt="Key Largo Scuba Diving Logo"
                        className="h-10 w-auto"
                      />
                    </Link>
                  </div>

                  {/* Quick Info */}
                  <div className="bg-ocean/5 rounded-lg p-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-ocean" />
                        <span className="text-sm text-foreground">
                          Key Largo, FL
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-ocean" />
                        <span className="text-sm text-foreground">
                          3 tours daily
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-coral fill-coral" />
                        <span className="text-sm text-foreground">
                          4.9/5 rating (500+ reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="space-y-4 mb-6">
                    {/* Trips & Tours Section */}
                    <div>
                      <div className="py-3 text-lg font-medium text-foreground border-b border-gray-100">
                        Trips & Tours
                      </div>
                      <div className="pl-4 mt-2 space-y-2">
                        {tripsMenuItems.map((item, index) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={index}
                              href={item.href}
                              className="flex items-center gap-3 py-2 text-base font-medium text-gray-600 hover:text-ocean transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <IconComponent className="w-4 h-4" />
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Parent Navigation Items for Mobile */}
                    {parentNavItems.map((parentItem, index) => (
                      <div key={`mobile-parent-${index}`}>
                        <button
                          onClick={() =>
                            toggleDropdown(`mobile-${parentItem.label}`)
                          }
                          className="flex items-center justify-between w-full py-3 text-lg font-medium text-foreground hover:text-ocean transition-colors border-b border-gray-100"
                        >
                          <span>{parentItem.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openDropdowns[`mobile-${parentItem.label}`]
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        {openDropdowns[`mobile-${parentItem.label}`] && (
                          <div className="pl-4 pb-2 space-y-1">
                            {parentItem.children.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                href={child.href}
                                className="block py-2 text-base text-gray-600 hover:text-ocean transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Other Navigation Items */}
                    {navItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block py-3 text-lg font-medium text-foreground hover:text-ocean transition-colors border-b border-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <div className="mt-auto space-y-4">
                    <Button
                      size="lg"
                      className="w-full bg-coral hover:bg-coral/90 text-white font-semibold"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Your Adventure
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-2 border-ocean text-ocean hover:bg-ocean hover:text-white"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call (305) 555-DIVE
                    </Button>

                    <div className="text-center pt-4">
                      <Badge
                        variant="outline"
                        className="text-ocean border-ocean/20"
                      >
                        Limited spots - Book today!
                      </Badge>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
