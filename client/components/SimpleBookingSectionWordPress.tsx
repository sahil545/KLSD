import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import GuestDetailsModal from "@/components/GuestDetailsModal";
import {
  Calendar,
  Star,
  Plus,
  Minus,
  CheckCircle,
  Users,
  DollarSign,
} from "lucide-react";

interface ProductData {
  id: number;
  name: string;
  price: number | string;
  stockQuantity?: number;
  tourData?: {
    duration: string;
    groupSize: string;
    location: string;
    difficulty: string;
    gearIncluded: boolean;
    highlights?: string[];
    included?: string[];
  };
}

interface WooCommerceData {
  currencySymbol?: string;
  taxRate?: number;
  addToCartUrl?: string;
  cartNonce?: string;
}

interface Props {
  product: ProductData;
  wooCommerceData?: WooCommerceData;
  onAddToCart?: (quantity: number, guestData: any[]) => Promise<void>;
}

export default function SimpleBookingSectionWordPress({ 
  product, 
  wooCommerceData, 
  onAddToCart 
}: Props) {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get values with fallbacks
  const pricePerPerson = typeof product.price === 'number' ? product.price : parseFloat(product.price.toString()) || 70;
  const currencySymbol = wooCommerceData?.currencySymbol || "$";
  const taxRate = wooCommerceData?.taxRate || 0.07;
  const maxGuests = product.stockQuantity || 25;

  const tax = guestCount * pricePerPerson * taxRate;
  const totalPrice = guestCount * pricePerPerson + tax;

  const handleReserveClick = () => {
    setShowGuestModal(true);
  };

  const handleDirectAddToCart = async () => {
    if (onAddToCart) {
      try {
        setIsLoading(true);
        await onAddToCart(guestCount, []);
      } catch (error) {
        console.error("Failed to add to cart:", error);
        alert("Failed to add to cart. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Fallback to WordPress form submission
      const formData = new FormData();
      formData.append("add-to-cart", product.id.toString());
      formData.append("quantity", guestCount.toString());
      
      if (wooCommerceData?.cartNonce) {
        formData.append("woocommerce-cart-nonce", wooCommerceData.cartNonce);
      }

      try {
        setIsLoading(true);
        const response = await fetch(window.location.href, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          if (wooCommerceData?.addToCartUrl) {
            window.location.href = wooCommerceData.addToCartUrl;
          } else {
            alert("Added to cart successfully!");
          }
        } else {
          throw new Error("Failed to add to cart");
        }
      } catch (error) {
        console.error("Failed to add to cart:", error);
        alert("Failed to add to cart. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section
      id="booking-section"
      className="py-16 bg-white border-t border-gray-100"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Experience
          </h2>
          <p className="text-gray-600">
            Starting at {currencySymbol}{pricePerPerson} per person • Free cancellation up to 24 hours
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - Date & Guest Selection */}
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Tour Details
              </h3>

              {/* Tour Info Display */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">{product.name}</h4>
                {product.tourData && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 font-medium">{product.tourData.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Group Size:</span>
                      <span className="ml-2 font-medium">{product.tourData.groupSize}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <span className="ml-2 font-medium">{product.tourData.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="ml-2 font-medium">{product.tourData.difficulty}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Date
                </label>
                <Button
                  variant="outline"
                  className="w-full justify-start border-2 border-gray-200 hover:border-blue-300 h-12"
                  onClick={() => alert("Date picker integration needed")}
                >
                  <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="text-gray-700">Choose Date & Time</span>
                </Button>
              </div>

              {/* Guest Count */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Number of Guests
                </label>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="h-12 w-12 p-0 border-gray-300 rounded-full"
                    disabled={guestCount <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <div className="text-center">
                    <div className="font-bold text-3xl text-gray-900">
                      {guestCount}
                    </div>
                    <div className="text-sm text-gray-500">guests</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuestCount(Math.min(maxGuests, guestCount + 1))}
                    className="h-12 w-12 p-0 border-gray-300 rounded-full"
                    disabled={guestCount >= maxGuests}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.9/5 rating from 487 reviews</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>No booking fees - save $15+</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Pricing & Booking */}
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Pricing & Payment
              </h3>

              {/* Price Display */}
              <div className="text-center mb-6 p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  {currencySymbol}{totalPrice.toFixed(2)}
                </div>
                <div className="text-gray-600">
                  for {guestCount} {guestCount === 1 ? "guest" : "guests"}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>
                    {currencySymbol}{pricePerPerson} × {guestCount} guests
                  </span>
                  <span>{currencySymbol}{(guestCount * pricePerPerson).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                  <span>{currencySymbol}{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-gray-900 text-lg border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>{currencySymbol}{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Reserve Buttons */}
              <div className="space-y-3">
                {/* Quick Add to Cart */}
                <Button
                  onClick={handleDirectAddToCart}
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 text-lg rounded-lg"
                >
                  {isLoading ? "Adding..." : "Add to Cart Now"}
                </Button>

                {/* Reserve with Details */}
                <Button
                  onClick={handleReserveClick}
                  variant="outline"
                  className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-4 text-lg rounded-lg"
                >
                  Reserve with Guest Details
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500 mt-4">
                You won't be charged until your booking is confirmed
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Guest Details Modal */}
      <GuestDetailsModal
        isOpen={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        guestCount={guestCount}
        totalPrice={Number.isFinite(totalPrice) ? totalPrice : 0}
        selectedDate={selectedDate}
      />
    </section>
  );
}
