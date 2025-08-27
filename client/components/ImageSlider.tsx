import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
    alt: "Christ of the Abyss statue underwater - iconic bronze statue in crystal clear water",
    caption: "Christ of the Abyss Statue"
  },
  {
    url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80", 
    alt: "Snorkelers exploring vibrant coral reef with tropical fish",
    caption: "Vibrant Marine Life"
  },
  {
    url: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80",
    alt: "Professional snorkeling group with PADI certified guide",
    caption: "Professional Guided Tours"
  },
  {
    url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    alt: "Crystal clear waters of John Pennekamp Coral Reef State Park",
    caption: "Crystal Clear Waters"
  }
];

export default function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full mb-8">
      {/* Main Image */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={images[currentImage].url}
          alt={images[currentImage].alt}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        {/* Caption */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-semibold text-lg drop-shadow-lg">
            {images[currentImage].caption}
          </p>
        </div>

        {/* Play Button Overlay for First Image */}
        {currentImage === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full w-16 h-16 p-0"
            >
              <Play className="w-6 h-6 text-white ml-1" />
            </Button>
          </div>
        )}

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full w-10 h-10 p-0"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full w-10 h-10 p-0"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </Button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 mt-4 justify-center">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              currentImage === index 
                ? 'border-klsd-red shadow-lg scale-105' 
                : 'border-white/30 hover:border-white/60'
            }`}
          >
            <img
              src={images[index].url}
              alt={images[index].alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center mt-2">
        <span className="text-foam/70 text-sm">
          {currentImage + 1} of {images.length}
        </span>
      </div>
    </div>
  );
}
