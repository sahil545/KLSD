import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  MapPin,
  Fish,
  Award,
  ArrowRight
} from "lucide-react";

const sections = [
  { id: "overview", label: "Overview", icon: MapPin },
  { id: "journey", label: "Your Journey", icon: ArrowRight },
  { id: "marine-life", label: "Marine Life", icon: Fish },
  { id: "why-us", label: "Why Us", icon: Award },
  { id: "book-now", label: "Book Now", icon: Calendar }
];

export default function TourPageNavigation() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Show navigation after hero section
          const heroHeight = window.innerHeight * 0.8;
          setIsVisible(window.scrollY > heroHeight);

          // Update active section based on scroll position - only if navigation is visible
          if (window.scrollY > heroHeight) {
            const sectionElements = sections.map(section =>
              document.getElementById(section.id)
            ).filter(Boolean);

            const currentSection = sectionElements.find(element => {
              if (!element) return false;
              const rect = element.getBoundingClientRect();
              return rect.top <= 200 && rect.bottom >= 200;
            });

            if (currentSection && currentSection.id !== activeSection) {
              setActiveSection(currentSection.id);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -120; // Consistent offset for all sections
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + yOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          
          {/* Navigation Menu */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{section.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Book Button */}
          <Button 
            onClick={() => scrollToSection('book-now')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 shadow-lg hidden md:flex"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Quick Book
          </Button>
        </div>
      </div>
    </nav>
  );
}
