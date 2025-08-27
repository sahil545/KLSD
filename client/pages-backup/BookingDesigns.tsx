import Navigation from "@/components/Navigation";
import BookingDesign1 from "@/components/BookingDesign1";
import BookingDesign2 from "@/components/BookingDesign2";
import BookingDesign3 from "@/components/BookingDesign3";
import BookingDesign4 from "@/components/BookingDesign4";
import BookingDesign5 from "@/components/BookingDesign5";
import BookingDesign6 from "@/components/BookingDesign6";
import BookingDesign7 from "@/components/BookingDesign7";

export default function BookingDesigns() {
  const handleReserveClick = () => {
    alert("Reserve clicked!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Booking Form Design Options
        </h1>
        <p className="text-white/80 text-center mb-12">
          Choose your preferred booking form design for the Christ Statue Tour hero section
        </p>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">

          {/* Design 1 */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white text-center">
              Design 1: Modern Glass
            </h2>
            <p className="text-white/70 text-xs text-center">
              Transparent glass-morphism design that blends with ocean background
            </p>
            <BookingDesign1 onReserveClick={handleReserveClick} />
          </div>

          {/* Design 2 */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white text-center">
              Design 2: Clean Minimal
            </h2>
            <p className="text-white/70 text-xs text-center">
              Clean white card with clear typography and organized layout
            </p>
            <BookingDesign2 onReserveClick={handleReserveClick} />
          </div>

          {/* Design 3 */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white text-center">
              Design 3: Modern Split
            </h2>
            <p className="text-white/70 text-xs text-center">
              Split layout with gradient header and organized booking controls
            </p>
            <BookingDesign3 onReserveClick={handleReserveClick} />
          </div>

          {/* Design 4 */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white text-center">
              Design 4: Hybrid Split
            </h2>
            <p className="text-white/70 text-xs text-center">
              Design 3 base with Design 2's guest toggles and footer layout
            </p>
            <BookingDesign4 onReserveClick={handleReserveClick} />
          </div>
        </div>

        {/* Header Design Variations */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Header Design Variations
          </h2>
          <p className="text-white/80 text-center mb-8">
            Softer alternatives to the solid blue gradient in Design 4
          </p>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* Design 5 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white text-center">
                Design 5: Logo Ray Pattern
              </h3>
              <p className="text-white/70 text-xs text-center">
                Subtle rays inspired by your logo with softer blue gradient
              </p>
              <BookingDesign5 onReserveClick={handleReserveClick} />
            </div>

            {/* Design 6 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white text-center">
                Design 6: Ocean Background
              </h3>
              <p className="text-white/70 text-xs text-center">
                Christ statue image background with blue overlay
              </p>
              <BookingDesign6 onReserveClick={handleReserveClick} />
            </div>

            {/* Design 7 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white text-center">
                Design 7: Wave Pattern
              </h3>
              <p className="text-white/70 text-xs text-center">
                Softer gradient with subtle wave patterns and circles
              </p>
              <BookingDesign7 onReserveClick={handleReserveClick} />
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            All designs include the same functionality: date selection, guest count, pricing calculation, and reservation
          </p>
        </div>
      </div>
    </div>
  );
}
