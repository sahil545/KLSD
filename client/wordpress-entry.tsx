import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Homepage from "./pages/Homepage";
import Blog from "./pages/Blog";
import ScubaDiving101 from "./pages/ScubaDiving101";
import ChristStatueTour from "./pages/ChristStatueTour";
import ChristStatueTourNoSidebar from "./pages/ChristStatueTourNoSidebar";
import WooCommerceTour from "./pages/WooCommerceTour";
import TripsTours from "./pages/TripsTours";
import Certification from "./pages/Certification";
import DiveSites from "./pages/DiveSites";
import ScubaGear from "./pages/ScubaGear";
import Contact from "./pages/Contact";
import "./global.css";

// WordPress integration types
declare global {
  interface Window {
    klsdData: {
      apiUrl: string;
      nonce: string;
      woocommerce: {
        consumer_key: string;
        consumer_secret: string;
        api_url: string;
      };
      currentPage: string;
      siteUrl: string;
      themePath: string;
    };
    klsdHomepageData?: {
      isHomepage: boolean;
      businessInfo: {
        name: string;
        phone: string;
        address: string;
        hours: string;
      };
    };
    klsdTourDataThree?: {
      isWooCommerceProduct: boolean;
      isTourProduct: boolean;
      productId: number;
      productData: {
        id: number;
        name: string;
        price: number;
        regularPrice: number;
        salePrice: number | null;
        description: string;
        shortDescription: string;
        stockQuantity: number;
        inStock: boolean;
        onSale: boolean;
        featured: boolean;
        categories: string[];
        permalink: string;
        images: {
          main: string;
          gallery: string[];
        };
        attributes: Record<string, string[]>;
        meta: {
          duration: string;
          groupSize: string;
          difficulty: string;
          location: string;
          meetingPoint: string;
          included: string[];
          whatToBring: string[];
        };
      };
      woocommerce: {
        addToCartUrl: string;
        cartNonce: string;
        currencySymbol: string;
        taxRate: number;
      };
      siteData: {
        siteUrl: string;
        themePath: string;
        phone: string;
        businessName: string;
      };
    };
  }
}

function WordPressApp() {
  const currentPage = window.klsdData?.currentPage || "homepage";
  const isHomepage = !currentPage || currentPage === "homepage";

  // Debug: Log the current page
  console.log("WordPress React App - Current Page:", currentPage);
  console.log("WordPress React App - Available Data:", window.klsdData);

  // Route component mapping
  const getRouteComponent = () => {
    console.log("Rendering component for page:", currentPage);

    // Check if this is a WooCommerce tour product
    if (
      window.klsdTourDataThree?.isWooCommerceProduct &&
      window.klsdTourDataThree?.isTourProduct
    ) {
      console.log("Loading WooCommerce tour component");
      return <WooCommerceTour />;
    }

    switch (currentPage) {
      case "blog":
        return <Blog />;
      case "scuba-diving-101":
        return <ScubaDiving101 />;
      case "christ-statue-tour":
        return <ChristStatueTourNoSidebar />;
      case "trips-tours":
        return <TripsTours />;
      case "certification":
        return <Certification />;
      case "dive-sites":
        return <DiveSites />;
      case "scuba-gear":
        return <ScubaGear />;
      case "contact":
        return <Contact />;
      default:
        console.log("Defaulting to Homepage for page:", currentPage);
        return <Homepage />;
    }
  };

  return <div className="klsd-wordpress-app">{getRouteComponent()}</div>;
}

// Initialize the app when DOM is ready
function initWordPressApp() {
  console.log("Initializing WordPress React App...");

  const rootElement = document.getElementById("klsd-react-root");

  if (!rootElement) {
    console.error("KLSD React: Root element not found");
    return;
  }

  console.log("Root element found, checking WordPress data...");
  console.log("klsdData available:", !!window.klsdData);

  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log("React root created, rendering app...");

    root.render(<WordPressApp />);
    console.log("React app rendered successfully");

    // Remove loading state after a short delay
    setTimeout(() => {
      const loadingElement = rootElement.querySelector(".klsd-loading");
      if (loadingElement) {
        console.log("Removing loading state...");
        loadingElement.remove();
      }
    }, 1000);
  } catch (error) {
    console.error("KLSD React: Failed to initialize app", error);

    // Fallback error display
    rootElement.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">
        <h2 style="color: #dc2626;">React Loading Error</h2>
        <p>Error: ${error.message}</p>
        <p>Check browser console for details.</p>
        <button onclick="location.reload()" style="padding: 0.5rem 1rem; background: #2563eb; color: white; border: none; border-radius: 0.25rem; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    `;
  }
}

// Initialize when script loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWordPressApp);
} else {
  initWordPressApp();
}

// Export for potential external access
export { WordPressApp, initWordPressApp };
