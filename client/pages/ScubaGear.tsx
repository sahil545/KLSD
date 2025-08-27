import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { wooCommerce, type WooCommerceProduct } from '@/lib/woocommerce';
import {
  ShoppingCart,
  Star,
  Award,
  Shield,
  Truck,
  Package,
  Settings,
  Filter,
  Heart,
  CheckCircle,
  Mail,
  Phone,
  Loader2
} from 'lucide-react';

export default function ScubaGear() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'demo' | 'error'>('testing');
  
  // Load products from WooCommerce on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Test WooCommerce connection first
        const connectionTest = await wooCommerce.testConnection();

        if (connectionTest.success) {
          setConnectionStatus('connected');
          // Load actual products from WooCommerce
          const response = await fetch('/api/woocommerce/products?category=scuba-gear&per_page=100');
          if (response.ok) {
            const wooProducts = await response.json();
            setProducts(wooProducts);
          } else {
            // Fallback to direct API call
            const directProducts = await loadProductsDirectly();
            setProducts(directProducts);
          }
        } else {
          setConnectionStatus(connectionTest.isCorsError ? 'demo' : 'error');
          // Use mock/fallback data in demo mode
          setProducts(getFallbackProducts());
        }
      } catch (err) {
        setConnectionStatus('demo');
        setError('Using demo data - WooCommerce integration will work when deployed');
        setProducts(getFallbackProducts());
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Extract categories from actual products
  const categories = React.useMemo(() => {
    const productCategories = new Set(['All']);

    products.forEach(product => {
      // Extract categories from WooCommerce product data
      if (product.categories) {
        product.categories.forEach((cat: any) => {
          productCategories.add(cat.name);
        });
      }
    });

    return Array.from(productCategories);
  }, [products]);

  // Helper function to load products directly from WooCommerce API
  const loadProductsDirectly = async () => {
    // This would make direct API calls to WooCommerce
    // For now, return empty array - will be implemented when credentials are available
    return [];
  };

  // Fallback products for demo mode (subset of original data)
  const getFallbackProducts = (): WooCommerceProduct[] => {
    return [
      {
        id: 1,
        name: "Ocean Reef GSM Mercury Underwater Communication Unit",
        price: "799.95",
        regular_price: "1000.00",
        sale_price: "799.95",
        stock_quantity: 1,
        stock_status: "instock",
        manage_stock: true,
        in_stock: true,
        permalink: "https://keylargoscubadiving.com/product/ocean-reef-gsm-mercury-underwater-communication-unit/",
        images: [{
          src: "https://keylargoscubadiving.com/wp-content/uploads/2023/08/ocean-reef-mercury-gsm-communication-unit.png",
          alt: "Ocean Reef GSM Mercury Underwater Communication Unit"
        }],
        attributes: [],
        categories: [{ name: "Underwater Communication", slug: "underwater-communication" }]
      },
      {
        id: 2,
        name: "ScubaPro Frameless Gorilla Dive Mask",
        price: "159.00",
        regular_price: "159.00",
        sale_price: "",
        stock_quantity: 2,
        stock_status: "instock",
        manage_stock: true,
        in_stock: true,
        permalink: "https://keylargoscubadiving.com/product/scubapro-frameless-gorilla-dive-mask/",
        images: [{
          src: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-frameless-gorilla-mask.jpg",
          alt: "ScubaPro Frameless Gorilla Dive Mask"
        }],
        attributes: [],
        categories: [{ name: "Scuba Masks", slug: "scuba-masks" }]
      }
    ] as WooCommerceProduct[];
  };

  // Filter products based on active category
  const filteredProducts = React.useMemo(() => {
    if (activeCategory === 'All') return products;

    return products.filter(product =>
      product.categories?.some((cat: any) => cat.name === activeCategory)
    );
  }, [products, activeCategory]);

  // Convert WooCommerce product to gear item format for rendering
  const convertToGearItem = (product: WooCommerceProduct) => {
    return {
      id: product.id,
      name: product.name,
      category: product.categories?.[0]?.name || 'Accessories',
      price: `$${parseFloat(product.sale_price || product.price || product.regular_price).toFixed(2)}`,
      originalPrice: product.sale_price && product.regular_price !== product.sale_price
        ? `$${parseFloat(product.regular_price).toFixed(2)}`
        : null,
      rating: 4.5, // Default rating - could be enhanced with review data
      reviews: Math.floor(Math.random() * 30), // Random for demo
      image: product.images?.[0]?.src || "https://via.placeholder.com/300x200",
      badges: ["ScubaPro"], // Could extract from product attributes
      features: ["Professional grade", "High quality", "Durable construction"], // Could extract from description
      inStock: product.in_stock && product.stock_status === 'instock',
      description: product.name // Could use short_description if available
    };
  };

  // Legacy hardcoded products - used as fallback when WooCommerce unavailable
  const legacyGearItems = [
    // Ocean Reef Communication Equipment
    {
      id: 1,
      name: "Ocean Reef GSM Mercury Underwater Communication Unit",
      category: "Underwater Communication",
      price: "$799.95",
      originalPrice: "$1000",
      rating: 4.9,
      reviews: 2,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/08/ocean-reef-mercury-gsm-communication-unit.png",
      badges: ["Ocean Reef", "Best Seller"],
      features: ["2 earpieces included", "1 new Blue Mic", "2 channels", "Easy foldable storage"],
      inStock: true,
      description: "Ocean Reef GSM Mercury underwater communication unit includes 2 earpieces, 1 new Blue Mic, 2 channels, and easy foldable storage."
    },
    {
      id: 2,
      name: "Ocean Reef Snorkie Talkie Combo Kit",
      category: "Underwater Communication",
      price: "$99.95",
      originalPrice: null,
      rating: 4.5,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-snorkie-talkie-combo-unit.png",
      badges: ["Ocean Reef", "Popular"],
      features: ["Surface unit included", "Snorkie Talkie unit", "Best snorkeling communications"],
      inStock: true,
      description: "Ocean Reef Snorkie Talkie Combo kit includes both the Snorkie Talkie and the Surface Communication unit."
    },
    {
      id: 3,
      name: "Ocean Reef Alpha Pro X-Divers Combo Kit",
      category: "Underwater Communication",
      price: "$1995.95",
      originalPrice: "$2250",
      rating: 4.8,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/Ocean-reef-alpha-pro-x-divers-combo-kit.png",
      badges: ["Ocean Reef", "Professional"],
      features: ["Surface unit included", "Alpha Pro 2.0 underwater unit", "Audio & video cable"],
      inStock: true,
      description: "Alpha Pro X Divers Underwater Communication Combo Kit. Includes Surface Unit, Alpha Pro 2.0 Underwater communication unit."
    },
    {
      id: 4,
      name: "Ocean Reef M-105 Digital Dual Channel Transceiver Unit",
      category: "Underwater Communication",
      price: "$1549",
      originalPrice: "$1590",
      rating: 4.8,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-m-105-digital-wireless-communication-underwater.png",
      badges: ["Ocean Reef", "Digital"],
      features: ["Digital dual channel", "Wireless communication", "Professional grade"],
      inStock: true,
      description: "Advanced digital wireless underwater communication system with dual channel capability."
    },
    // ScubaPro Regulators
    {
      id: 5,
      name: "MK25 EVO BT/G260 Carbon Dive Regulator System",
      category: "Regulators",
      price: "$1516",
      originalPrice: null,
      rating: 4.9,
      reviews: 3,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/SP_12771550_G260Carbon_MK25_1-scaled-1.jpg",
      badges: ["ScubaPro", "Premium"],
      features: ["Carbon fiber cover", "Black Tech finish", "Balanced piston", "G260 Carbon BT second stage"],
      inStock: true,
      description: "An upgrade to the popular G260 technical diving system, delivers greater durability with a carbon fiber cover and Black Tech finish."
    },
    {
      id: 6,
      name: "MK25 EVO/S620 Ti Dive Regulator System",
      category: "Regulators",
      price: "$1185",
      originalPrice: null,
      rating: 4.9,
      reviews: 5,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-mk-25-620ti-regulator-package-scaled.jpg",
      badges: ["ScubaPro", "Professional"],
      features: ["Premium MK25 EVO", "S620 Ti second stage", "Titanium inlet tube", "All weather"],
      inStock: true,
      description: "SCUBAPRO combines its premium high-performance MK25 EVO first stage with its high-performance S620 Ti second stage."
    },
    {
      id: 7,
      name: "MK11/C370 EVO Dive Regulator System",
      category: "Regulators",
      price: "$719",
      originalPrice: null,
      rating: 4.7,
      reviews: 7,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-mk-11-c-370-regulator-scaled.jpg",
      badges: ["ScubaPro", "Travel"],
      features: ["Balanced diaphragm", "Chrome-plated brass", "Compact design", "Travel friendly"],
      inStock: true,
      description: "Great choice for dive-trekkers. Balanced diaphragm MK11 with chrome-plated brass body designed to reduce size and weight."
    },
    {
      id: 8,
      name: "MK25T EVO/S620 X-Ti Dive Regulator System",
      category: "Regulators",
      price: "$2785",
      originalPrice: null,
      rating: 4.9,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-mk25-t-620-ti-x.jpg",
      badges: ["ScubaPro", "Titanium", "Premium"],
      features: ["Solid titanium block", "Corrosion resistant", "Ultralight", "Premium technology"],
      inStock: true,
      description: "Top regulator technology in high-tech, ultralight reg system. MK25T EVO machined from solid titanium block."
    },
    // Dive Computers - Wrist
    {
      id: 9,
      name: "G2 Tek Wrist Dive Computer",
      category: "Wrist Computers",
      price: "$1026",
      originalPrice: null,
      rating: 4.8,
      reviews: 2,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-g2-tek-dive-computer-scaled.jpg",
      badges: ["ScubaPro", "Technical"],
      features: ["Full-color display", "Technical diving", "Multiple gas mixes", "Advanced algorithms"],
      inStock: true,
      description: "Advanced technical diving computer with full-color display and comprehensive features for serious divers."
    },
    {
      id: 10,
      name: "G2 Wrist Dive Computer w/ Transmitter Smart + Pro",
      category: "Wrist Computers",
      price: "$1366",
      originalPrice: null,
      rating: 4.8,
      reviews: 6,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-g2-dive-computer-with-transmitter-scaled.jpg",
      badges: ["ScubaPro", "Air Integrated"],
      features: ["Wireless air integration", "Full-color display", "Smart transmitter", "Professional grade"],
      inStock: true,
      description: "Professional dive computer with wireless air integration and Smart+ Pro transmitter included."
    },
    {
      id: 11,
      name: "G3 Dive Computer with Transmitter",
      category: "Wrist Computers",
      price: "$1050",
      originalPrice: null,
      rating: 4.8,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/05/scubapro-g3-computer.jpg",
      badges: ["ScubaPro", "Latest Model"],
      features: ["Next generation display", "Air integration", "Modern interface", "Advanced features"],
      inStock: true,
      description: "Latest generation ScubaPro dive computer with advanced features and modern interface."
    },
    {
      id: 12,
      name: "Scubapro Luna 2.0 Air Integrated Dive Computer",
      category: "Wrist Computers",
      price: "$430",
      originalPrice: null,
      rating: 4.6,
      reviews: 9,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/12/scubapro-luna-2-computer.jpg",
      badges: ["ScubaPro", "Value"],
      features: ["Air integration capable", "Easy to use", "Reliable performance", "Affordable option"],
      inStock: true,
      description: "Reliable and affordable air-integrated dive computer perfect for recreational diving."
    },
    // Console Computers
    {
      id: 13,
      name: "G2 Console Dive Computer w/Quick Release",
      category: "Console Computers",
      price: "$1299",
      originalPrice: null,
      rating: 4.7,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-g2-dive-computer-console.jpg",
      badges: ["ScubaPro", "Console"],
      features: ["Quick release system", "Full-color display", "Console mounted", "Easy to read"],
      inStock: true,
      description: "Professional console-mounted dive computer with quick release system and full-color display."
    },
    {
      id: 14,
      name: "Scubapro Aladin H Matrix Air Integrated Dive Computer",
      category: "Console Computers",
      price: "$790",
      originalPrice: null,
      rating: 4.6,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/03/scubapro-aladin-h-matrix.jpg",
      badges: ["ScubaPro", "Matrix Display"],
      features: ["Matrix display", "Air integration", "Hoseless option", "Reliable performance"],
      inStock: true,
      description: "Advanced console computer with matrix display and air integration capabilities."
    },
    // Scuba Masks
    {
      id: 15,
      name: "ScubaPro Frameless Gorilla Dive Mask",
      category: "Scuba Masks",
      price: "$159",
      originalPrice: null,
      rating: 4.6,
      reviews: 21,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-frameless-gorilla-mask.jpg",
      badges: ["ScubaPro", "Popular"],
      features: ["Frameless design", "Low volume", "Comfortable skirt", "Wide field of vision"],
      inStock: true,
      description: "Professional frameless diving mask with excellent field of vision and comfortable fit."
    },
    {
      id: 16,
      name: "Scubapro Mini Frameless Dive Mask",
      category: "Scuba Masks",
      price: "$122",
      originalPrice: null,
      rating: 4.5,
      reviews: 3,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/scubapro-mini-frameless.jpg",
      badges: ["ScubaPro", "Compact"],
      features: ["Compact design", "Frameless", "Low profile", "Comfortable fit"],
      inStock: true,
      description: "Compact frameless mask perfect for travel and smaller faces."
    },
    // Dive Lights
    {
      id: 17,
      name: "Scubapro Nova 850r Dive Light",
      category: "Dive Lights",
      price: "$220",
      originalPrice: null,
      rating: 4.7,
      reviews: 8,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/scubapro-nova-850-r-dive-light.jpg",
      badges: ["ScubaPro", "850 Lumens"],
      features: ["850 lumen output", "Rechargeable battery", "Compact design", "Includes case"],
      inStock: true,
      description: "High-performance 850 lumen dive light with rechargeable battery and compact design."
    },
    {
      id: 18,
      name: "Scubapro Nova 850 Wide Dive Light",
      category: "Dive Lights",
      price: "$220",
      originalPrice: null,
      rating: 4.7,
      reviews: 9,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/scubapro-nova-850-r-dive-light.jpg",
      badges: ["ScubaPro", "Wide Beam"],
      features: ["850 lumens", "Wide beam pattern", "Rechargeable", "Professional grade"],
      inStock: true,
      description: "Professional dive light with wide beam pattern for maximum coverage underwater."
    },
    {
      id: 19,
      name: "Ocean Reef Vesper Dive Light",
      category: "Dive Lights",
      price: "$299.95",
      originalPrice: "$350",
      rating: 4.6,
      reviews: 3,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-vesper-dive-light.png",
      badges: ["Ocean Reef", "FFM Compatible"],
      features: ["Neptune III compatible", "Professional mounting", "High output", "Easy attachment"],
      inStock: false,
      description: "Professional dive light designed for Ocean Reef Neptune III full face masks."
    },
    // Knives
    {
      id: 20,
      name: "White Tip Dive Knife",
      category: "Knives",
      price: "$89",
      originalPrice: null,
      rating: 4.5,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-white-tip-dive-knife.png",
      badges: ["ScubaPro", "Stainless Steel"],
      features: ["Stainless steel blade", "Secure sheath", "Comfortable grip", "Corrosion resistant"],
      inStock: true,
      description: "Professional dive knife with stainless steel blade and secure mounting system."
    },
    {
      id: 21,
      name: "Mako SS Dive Knife, 3.5\" blade",
      category: "Knives",
      price: "$89",
      originalPrice: null,
      rating: 4.6,
      reviews: 20,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-hydros-pro-bcd-mako-knife.png",
      badges: ["ScubaPro", "3.5 inch"],
      features: ["3.5 inch blade", "Stainless steel", "Sheath included", "Strap attachment"],
      inStock: true,
      description: "Professional 3.5 inch dive knife with stainless steel construction and secure sheath."
    },
    {
      id: 22,
      name: "Mako SS Dive Knife, 3.5\" blade Titanium",
      category: "Knives",
      price: "$155",
      originalPrice: null,
      rating: 4.8,
      reviews: 17,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-mako-knife-sheath.png",
      badges: ["ScubaPro", "Titanium"],
      features: ["Titanium construction", "3.5 inch blade", "Corrosion proof", "Premium quality"],
      inStock: true,
      description: "Premium titanium dive knife offering superior corrosion resistance and durability."
    },
    // BCD Accessories
    {
      id: 23,
      name: "BCD Carry Bag",
      category: "BCD Accessories",
      price: "$90",
      originalPrice: null,
      rating: 4.4,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/SP_-21746007_Hydros_Bag_1-scaled-1.jpg",
      badges: ["ScubaPro", "Protection"],
      features: ["Durable construction", "Easy transport", "Protective padding", "Hydros compatible"],
      inStock: true,
      description: "Protective carry bag designed for BCD storage and transport."
    },
    {
      id: 24,
      name: "HYDROS PRO Ninja Pocket, Black",
      category: "BCD Accessories",
      price: "$48",
      originalPrice: null,
      rating: 4.7,
      reviews: 18,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-hydros-pro-ninja-pocket.png",
      badges: ["ScubaPro", "Modular"],
      features: ["Modular attachment", "Secure storage", "Easy access", "Durable construction"],
      inStock: true,
      description: "Modular ninja pocket for additional storage on Hydros Pro BCD systems."
    },
    {
      id: 25,
      name: "HYDROS PRO Bungee Set, Black, L",
      category: "BCD Accessories",
      price: "$23",
      originalPrice: null,
      rating: 4.6,
      reviews: 30,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/scubapro-hydros-pro-bungee-large.jpg",
      badges: ["ScubaPro", "Large"],
      features: ["Large size bungees", "Secure attachment", "Streamline hoses", "Easy installation"],
      inStock: true,
      description: "Accessory bungee set for securing dive lights and streamlining hose routing."
    },
    {
      id: 26,
      name: "Gearkeeper Micro Scuba Retractor Snap Clip",
      category: "BCD Accessories",
      price: "$21.95",
      originalPrice: null,
      rating: 4.3,
      reviews: 29,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/02/gearkeeper-micro-retractor.jpg",
      badges: ["Gearkeeper", "Micro"],
      features: ["Snap clip attachment", "Retractable design", "Secure hold", "Compact size"],
      inStock: true,
      description: "Compact and reliable gear retractor with snap clip for securing essential dive accessories."
    },
    // Scuba Weights
    {
      id: 27,
      name: "Soft Weight 5lb",
      category: "Scuba Weights",
      price: "$30.99",
      originalPrice: null,
      rating: 4.5,
      reviews: 16,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/09/soft-weight-5lb.jpg",
      badges: ["5 Pounds", "Comfortable"],
      features: ["5lb weight", "Soft construction", "Comfortable wear", "Various sizes"],
      inStock: true,
      description: "Comfortable 5lb soft weight for diving weight distribution."
    },
    {
      id: 28,
      name: "Soft Weight 4lb",
      category: "Scuba Weights",
      price: "$24.99",
      originalPrice: null,
      rating: 4.4,
      reviews: 18,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/05/soft-weight-4lb.jpg",
      badges: ["4 Pounds", "Comfortable"],
      features: ["4lb weight", "Soft material", "Flexible design", "Size options"],
      inStock: false,
      description: "Comfortable 4lb soft weight ideal for balanced diving."
    },
    {
      id: 29,
      name: "Soft Weight 3lb",
      category: "Scuba Weights",
      price: "$18.99",
      originalPrice: null,
      rating: 4.4,
      reviews: 16,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/05/soft-weight-3lb.jpg",
      badges: ["3 Pounds", "Popular"],
      features: ["3lb weight", "Soft construction", "Comfortable wear", "Multiple sizes"],
      inStock: true,
      description: "Comfortable 3lb soft weight ideal for diving weight distribution."
    },
    {
      id: 30,
      name: "Soft Weight 2lb",
      category: "Scuba Weights",
      price: "$12.99",
      originalPrice: null,
      rating: 4.2,
      reviews: 18,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/05/soft-weight-2lb.jpg",
      badges: ["2 Pounds", "Light"],
      features: ["2lb weight", "Lightweight option", "Soft design", "Flexible use"],
      inStock: false,
      description: "Lightweight 2lb soft weight for fine-tuning buoyancy."
    },
    // Mask & Snorkel Sets
    {
      id: 34,
      name: "ScubaPro Mask & Snorkel Set",
      category: "Mask & Snorkel Sets",
      price: "$89.99",
      originalPrice: "$99.99",
      rating: 4.6,
      reviews: 15,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-mask-snorkel-set.jpg",
      badges: ["ScubaPro", "Combo Set"],
      features: ["Professional mask", "Dry snorkel", "Travel bag included", "Perfect for beginners"],
      inStock: true,
      description: "Complete ScubaPro mask and snorkel set perfect for snorkeling and diving. Includes travel bag."
    },
    // BCDs
    {
      id: 35,
      name: "ScubaPro Hydros Pro BCD",
      category: "BCDs",
      price: "$699",
      originalPrice: null,
      rating: 4.8,
      reviews: 23,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-hydros-pro-bcd.jpg",
      badges: ["ScubaPro", "Modular"],
      features: ["Modular design", "Neutrally buoyant", "Lightweight", "Maximum comfort"],
      inStock: true,
      description: "Revolutionary modular BCD system offering unparalleled comfort and performance underwater."
    },
    {
      id: 36,
      name: "ScubaPro Hydros Pro Women's BCD",
      category: "BCDs",
      price: "$699",
      originalPrice: null,
      rating: 4.9,
      reviews: 18,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-hydros-pro-womens-bcd.jpg",
      badges: ["ScubaPro", "Women's Fit"],
      features: ["Women's specific fit", "Modular design", "Neutrally buoyant", "Comfortable harness"],
      inStock: true,
      description: "Women's specific Hydros Pro BCD designed for optimal fit and comfort for female divers."
    },
    // Fins
    {
      id: 37,
      name: "ScubaPro Seawing Nova Fins",
      category: "Fins",
      price: "$199",
      originalPrice: null,
      rating: 4.7,
      reviews: 31,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-seawing-nova-fins.jpg",
      badges: ["ScubaPro", "Advanced Propulsion"],
      features: ["Advanced propulsion", "Pivot control technology", "Efficient kick", "Comfortable foot pocket"],
      inStock: true,
      description: "Advanced fin design with unique pivot control technology for maximum efficiency and comfort."
    },
    {
      id: 38,
      name: "ScubaPro Jet Fins",
      category: "Fins",
      price: "$129",
      originalPrice: null,
      rating: 4.6,
      reviews: 45,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-jet-fins.jpg",
      badges: ["ScubaPro", "Classic"],
      features: ["Heavy duty rubber", "Excellent control", "Durable construction", "Professional choice"],
      inStock: true,
      description: "Classic heavy-duty fins preferred by professional divers for precision and durability."
    },
    {
      id: 39,
      name: "ScubaPro Go Travel Fins",
      category: "Fins",
      price: "$89",
      originalPrice: null,
      rating: 4.4,
      reviews: 27,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-go-travel-fins.jpg",
      badges: ["ScubaPro", "Travel"],
      features: ["Lightweight", "Compact design", "Travel friendly", "Open heel"],
      inStock: true,
      description: "Lightweight travel fins perfect for vacation diving and easy packing."
    },
    // Wetsuits
    {
      id: 40,
      name: "ScubaPro Definition 3mm Wetsuit",
      category: "Wetsuits",
      price: "$329",
      originalPrice: null,
      rating: 4.7,
      reviews: 19,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-definition-3mm-wetsuit.jpg",
      badges: ["ScubaPro", "3mm"],
      features: ["3mm neoprene", "Tropical diving", "Comfortable fit", "Flexible design"],
      inStock: true,
      description: "Premium 3mm wetsuit perfect for tropical diving with excellent comfort and flexibility."
    },
    {
      id: 41,
      name: "ScubaPro Definition 5mm Wetsuit",
      category: "Wetsuits",
      price: "$399",
      originalPrice: null,
      rating: 4.8,
      reviews: 22,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-definition-5mm-wetsuit.jpg",
      badges: ["ScubaPro", "5mm"],
      features: ["5mm neoprene", "Temperate water", "Premium materials", "Ergonomic design"],
      inStock: true,
      description: "Professional 5mm wetsuit for temperate water diving with superior thermal protection."
    },
    {
      id: 42,
      name: "ScubaPro Definition Women's 3mm Wetsuit",
      category: "Wetsuits",
      price: "$329",
      originalPrice: null,
      rating: 4.9,
      reviews: 16,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-definition-womens-3mm.jpg",
      badges: ["ScubaPro", "Women's Fit"],
      features: ["Women's specific cut", "3mm neoprene", "Flattering design", "Tropical waters"],
      inStock: true,
      description: "Women's specific 3mm wetsuit designed for optimal fit and style in tropical waters."
    },
    // Additional Ocean Reef Products
    {
      id: 43,
      name: "Ocean Reef Snorkie Talkie",
      category: "Underwater Communication",
      price: "$79.95",
      originalPrice: null,
      rating: 4.5,
      reviews: 2,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-snorkie-talkie.png",
      badges: ["Ocean Reef", "Snorkeling"],
      features: ["Aria FFM compatible", "Snorkeling communication", "Easy setup", "Multiple uses"],
      inStock: false,
      description: "Ocean Reef Snorkie Talkie for Ocean Reef Aria Full Face Snorkeling Mask. Snorkeling communication system with many different uses."
    },
    {
      id: 44,
      name: "Ocean Reef Alpha Pro X-Divers Surface Unit",
      category: "Underwater Communication",
      price: "$1110.95",
      originalPrice: "$1234",
      rating: 4.8,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-alpha-pro-x-divers-surface-unit.png",
      badges: ["Ocean Reef", "Professional"],
      features: ["Surface communication", "Alpha Pro compatible", "Professional grade", "High quality"],
      inStock: true,
      description: "Alpha Pro X Divers Underwater Communication Surface Unit for professional diving operations."
    },
    {
      id: 45,
      name: "Ocean Reef M-100 Portable Transceiver Surface Unit",
      category: "Underwater Communication",
      price: "$769",
      originalPrice: "$799",
      rating: 4.8,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-m-100-portable-transceiver-unit.png",
      badges: ["Ocean Reef", "Portable"],
      features: ["Portable design", "Wireless transceiver", "Surface unit", "Easy operation"],
      inStock: true,
      description: "Portable transceiver surface unit for wireless underwater communication systems."
    },
    {
      id: 46,
      name: "Ocean Reef Gamma Alpha HD",
      category: "Underwater Communication",
      price: "$6950",
      originalPrice: null,
      rating: 4.9,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/08/Ocean-reef-gamma-alpha-hd.png",
      badges: ["Ocean Reef", "HD Quality"],
      features: ["HD quality", "Professional grade", "Advanced features", "High performance"],
      inStock: true,
      description: "Premium HD underwater communication system for professional diving operations."
    },
    {
      id: 47,
      name: "Ocean Reef GSM G-Divers Communication Unit",
      category: "Underwater Communication",
      price: "$846",
      originalPrice: null,
      rating: 4.7,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-gsm-g-divers-underwater-communications.png",
      badges: ["Ocean Reef", "G-Divers"],
      features: ["G-Divers system", "Wireless communication", "Professional grade", "Easy operation"],
      inStock: true,
      description: "GSM G-Divers underwater communication unit for professional diving applications."
    },
    // Ocean Reef Accessories & Mounts
    {
      id: 48,
      name: "Ocean Reef Pro Accessories Rail Mount Kit (Left+Right)",
      category: "Full Face Masks",
      price: "$439.95",
      originalPrice: "$457",
      rating: 4.6,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-professional-accessories-mount-kit.png",
      badges: ["Ocean Reef", "Professional"],
      features: ["Left and right rails", "Professional mounting", "Universal compatibility", "Durable construction"],
      inStock: false,
      description: "Professional accessories mounting rail kit for both left and right sides of Ocean Reef masks."
    },
    {
      id: 49,
      name: "Ocean Reef Pro Mount Rail Kit Right Side",
      category: "Full Face Masks",
      price: "$385",
      originalPrice: null,
      rating: 4.5,
      reviews: 2,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-pro-accessories-rail-mount-right-side-only.png",
      badges: ["Ocean Reef", "Right Side"],
      features: ["Right side only", "Professional mounting", "Easy installation", "Secure attachment"],
      inStock: false,
      description: "Professional accessories mounting rail for right side of Ocean Reef full face masks."
    },
    {
      id: 50,
      name: "Ocean Reef Shearwater Nerd2 HUD IDM Mount",
      category: "Full Face Masks",
      price: "$220",
      originalPrice: null,
      rating: 4.8,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-nerd-2-hud-mount.png",
      badges: ["Ocean Reef", "Shearwater"],
      features: ["Nerd2 compatible", "HUD mounting", "IDM bracket", "Secure fit"],
      inStock: true,
      description: "Mounting bracket for Shearwater Nerd2 HUD on Ocean Reef full face masks."
    },
    {
      id: 51,
      name: "Ocean Reef Camera or Torch Support",
      category: "Full Face Masks",
      price: "$41",
      originalPrice: null,
      rating: 4.5,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-camera-or-torch-mount.png",
      badges: ["Ocean Reef", "Multi-Mount"],
      features: ["Camera mount", "Torch support", "Universal fit", "Easy attachment"],
      inStock: true,
      description: "Universal camera or torch support mount for Ocean Reef full face masks."
    },
    {
      id: 52,
      name: "Ocean Reef Cable Fleeter",
      category: "Underwater Communication",
      price: "$200",
      originalPrice: null,
      rating: 4.6,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-cable-fleeter-communication-cable.png",
      badges: ["Ocean Reef", "Cable Management"],
      features: ["Cable management", "Communication cables", "Professional grade", "Easy handling"],
      inStock: true,
      description: "Cable fleeter for managing underwater communication cables during diving operations."
    },
    {
      id: 53,
      name: "Ocean Reef Optical Lens Support 2.0",
      category: "Full Face Masks",
      price: "$39.95",
      originalPrice: "$45",
      rating: 4.7,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-glasses-attachment-snorkel-mask.png",
      badges: ["Ocean Reef", "Optical"],
      features: ["Prescription lens support", "2.0 version", "Easy installation", "Multiple mask compatibility"],
      inStock: true,
      description: "Optical lens support system 2.0 for prescription lenses in Ocean Reef masks."
    },
    {
      id: 54,
      name: "Ocean Reef Duo Snorkeling Fins",
      category: "Fins",
      price: "$39.95",
      originalPrice: null,
      rating: 4.4,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/12/ocean-reef-duo-snorkeling-fins.jpg",
      badges: ["Ocean Reef", "Snorkeling"],
      features: ["Multiple colors", "Different sizes", "Color coordination", "Comfortable fit"],
      inStock: false,
      description: "Ocean Reef Duo Snorkeling fins come in different colors and sizes for coordinated snorkeling."
    },
    // Additional ScubaPro Products
    {
      id: 55,
      name: "ScubaPro S-Tek Bolt Snap Double M 4in/105mm",
      category: "BCD Accessories",
      price: "$26",
      originalPrice: null,
      rating: 4.6,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/SP_01132105_S-Tek_Bolt_Snap-scaled-1.jpg",
      badges: ["ScubaPro", "S-Tek"],
      features: ["4 inch length", "Double gate", "Stainless steel", "Professional grade"],
      inStock: true,
      description: "Professional S-Tek bolt snap with double gate design for secure attachments."
    },
    {
      id: 56,
      name: "ScubaPro Surface Marker Buoy 210D Nylon Orange 4.5ft",
      category: "Accessories",
      price: "$86",
      originalPrice: null,
      rating: 4.5,
      reviews: 28,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/SP_40312001_Surface_Marker_Buoy_01-scaled-1.jpg",
      badges: ["ScubaPro", "Orange"],
      features: ["210D Nylon", "4.5ft length", "High visibility", "Safety equipment"],
      inStock: true,
      description: "Professional surface marker buoy in bright orange for dive safety and visibility."
    },
    {
      id: 57,
      name: "ScubaPro Surface Marker Buoy PVC Orange 4.3ft",
      category: "Accessories",
      price: "$38",
      originalPrice: null,
      rating: 4.3,
      reviews: 5,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/SP_40314000_SMB_PVC_01-scaled-1.jpg",
      badges: ["ScubaPro", "PVC"],
      features: ["PVC construction", "4.3ft length", "Orange color", "Affordable option"],
      inStock: true,
      description: "PVC surface marker buoy for basic dive safety and surface signaling."
    },
    {
      id: 58,
      name: "ScubaPro Go Sport Keychain",
      category: "Accessories",
      price: "$9.95",
      originalPrice: null,
      rating: 4.2,
      reviews: 14,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/1109463_primary-1.jpg",
      badges: ["ScubaPro", "Keychain"],
      features: ["Multiple colors", "Compact design", "Durable material", "ScubaPro branding"],
      inStock: true,
      description: "Durable ScubaPro keychain available in multiple colors."
    },
    {
      id: 59,
      name: "ScubaPro Dry Bag 5L",
      category: "Dive Bags",
      price: "$28",
      originalPrice: null,
      rating: 4.4,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/1099535_primary-1.jpg",
      badges: ["ScubaPro", "5L"],
      features: ["5 liter capacity", "Waterproof seal", "Lightweight", "Compact size"],
      inStock: true,
      description: "Compact 5-liter dry bag perfect for keeping essentials dry during water activities."
    },
    {
      id: 60,
      name: "ScubaPro S-Tek Bungee Regulator Necklace",
      category: "Regulator Accessories",
      price: "$16",
      originalPrice: null,
      rating: 4.6,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-bungee-necklace.jpg",
      badges: ["ScubaPro", "S-Tek"],
      features: ["Bungee construction", "Regulator retention", "Comfortable wear", "Professional grade"],
      inStock: true,
      description: "Professional bungee necklace for secure regulator retention during diving."
    },
    {
      id: 61,
      name: "ScubaPro Smart+ Galileo Transmitter",
      category: "Computer Accessories",
      price: "$399",
      originalPrice: null,
      rating: 4.8,
      reviews: 3,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-g2-smart-transmitter-scaled.jpg",
      badges: ["ScubaPro", "Smart+"],
      features: ["Wireless transmission", "Galileo compatible", "Reliable signal", "Easy setup"],
      inStock: true,
      description: "Wireless air integration transmitter for ScubaPro Galileo dive computers."
    },
    {
      id: 62,
      name: "ScubaPro R095 Octopus",
      category: "Octos",
      price: "$199",
      originalPrice: null,
      rating: 4.5,
      reviews: 3,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-r095-octopus.jpg",
      badges: ["ScubaPro", "R095"],
      features: ["Balanced valve", "Easy breathing", "Bright color", "Reliable performance"],
      inStock: true,
      description: "Reliable R095 octopus second stage for emergency breathing situations."
    },
    {
      id: 63,
      name: "ScubaPro S-Tek Low Profile Stage Kit 40cu ft",
      category: "BCD Accessories",
      price: "$83",
      originalPrice: null,
      rating: 4.4,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-stage-kit.jpg",
      badges: ["ScubaPro", "S-Tek"],
      features: ["40 cu ft", "Low profile", "Stage rigging", "Technical diving"],
      inStock: true,
      description: "Low profile stage rigging kit for 40 cubic foot tanks in technical diving."
    },
    {
      id: 64,
      name: "ScubaPro S-Tek Stage Kit Cold Water 40cu ft",
      category: "BCD Accessories",
      price: "$83",
      originalPrice: null,
      rating: 4.5,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-s-tek-stage-kit-cold-water-scaled.jpg",
      badges: ["ScubaPro", "Cold Water"],
      features: ["Cold water rated", "40 cu ft", "Stage rigging", "Reliable performance"],
      inStock: true,
      description: "Cold water stage rigging kit designed for harsh diving conditions."
    },
    {
      id: 65,
      name: "ScubaPro S-Tek Spinner Spool 50ft/15m",
      category: "Accessories",
      price: "$71",
      originalPrice: null,
      rating: 4.6,
      reviews: 2,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-spinner-spool.jpg",
      badges: ["ScubaPro", "50ft"],
      features: ["50ft line", "Spinner design", "Technical diving", "Easy deployment"],
      inStock: true,
      description: "Professional spinner spool with 50 feet of line for technical diving operations."
    },
    {
      id: 66,
      name: "ScubaPro S-Tek Spinner Spool 100ft/30m",
      category: "Accessories",
      price: "$75",
      originalPrice: null,
      rating: 4.7,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-spinner-spool.jpg",
      badges: ["ScubaPro", "100ft"],
      features: ["100ft line", "Extended range", "Professional grade", "Smooth operation"],
      inStock: true,
      description: "Extended range spinner spool with 100 feet of line for deep diving operations."
    },
    {
      id: 67,
      name: "ScubaPro S-Tek Spinner Spool 150ft/45m",
      category: "Accessories",
      price: "$79.95",
      originalPrice: null,
      rating: 4.8,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-spinner-spool.jpg",
      badges: ["ScubaPro", "150ft"],
      features: ["150ft line", "Maximum range", "Technical diving", "Professional grade"],
      inStock: true,
      description: "Maximum range spinner spool with 150 feet of line for advanced technical diving."
    },
    {
      id: 68,
      name: "ScubaPro Dive Beanie Black",
      category: "Dive Apparel",
      price: "$26",
      originalPrice: null,
      rating: 4.3,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-dive-beanie.jpg",
      badges: ["ScubaPro", "Black"],
      features: ["Thermal protection", "Comfortable fit", "Quick dry", "One size fits all"],
      inStock: true,
      description: "Comfortable dive beanie for thermal protection during surface intervals."
    },
    {
      id: 69,
      name: "ScubaPro Trucker Hat Black/White",
      category: "Dive Apparel",
      price: "$32",
      originalPrice: null,
      rating: 4.4,
      reviews: 2,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-trucker-hat.jpg",
      badges: ["ScubaPro", "Trucker"],
      features: ["Black and white", "Adjustable fit", "Mesh back", "ScubaPro logo"],
      inStock: true,
      description: "Classic trucker hat with ScubaPro branding in black and white design."
    },
    {
      id: 70,
      name: "ScubaPro Dry Bag 15L",
      category: "Dive Bags",
      price: "$111",
      originalPrice: null,
      rating: 4.5,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-dry-bag-15.jpg",
      badges: ["ScubaPro", "15L"],
      features: ["15 liter capacity", "Waterproof seal", "Roll-top closure", "Carry handle"],
      inStock: true,
      description: "Medium capacity 15-liter dry bag for extended trips and gear protection."
    },
    {
      id: 71,
      name: "ScubaPro Dry Bag 45L",
      category: "Dive Bags",
      price: "$152",
      originalPrice: null,
      rating: 4.6,
      reviews: 2,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-dry-bag-45.jpg",
      badges: ["ScubaPro", "45L"],
      features: ["45 liter capacity", "Large size", "Waterproof construction", "Durable materials"],
      inStock: true,
      description: "Large capacity 45-liter dry bag perfect for extended dive trips and equipment storage."
    },
    {
      id: 72,
      name: "ScubaPro Standard Pressure Gauge Imperial",
      category: "Dive Gauges",
      price: "$166",
      originalPrice: null,
      rating: 4.7,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-pressure-gauge.jpg",
      badges: ["ScubaPro", "Imperial"],
      features: ["Imperial units", "High visibility", "Accurate readings", "Professional grade"],
      inStock: true,
      description: "Professional pressure gauge with imperial measurements for dive monitoring."
    },
    {
      id: 73,
      name: "ScubaPro Low Pressure Inflator Hose w/ Quick Connect",
      category: "BCD Accessories",
      price: "$79.95",
      originalPrice: null,
      rating: 4.5,
      reviews: 2,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-lp-hose.jpg",
      badges: ["ScubaPro", "Quick Connect"],
      features: ["Quick connect", "Low pressure", "BCD inflation", "Easy setup"],
      inStock: false,
      description: "Low pressure inflator hose with quick connect fitting for BCD systems."
    },
    {
      id: 74,
      name: "ScubaPro Hydros Pro Dive Knife & Accessory Plate Black",
      category: "BCD Accessories",
      price: "$22",
      originalPrice: null,
      rating: 4.8,
      reviews: 19,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-hydros-pro-knife-accessory-mount-plate.jpg",
      badges: ["ScubaPro", "Hydros Pro"],
      features: ["Knife mounting", "Accessory plate", "Hydros Pro compatible", "Secure attachment"],
      inStock: true,
      description: "Mounting accessory plate for attaching dive knives to Hydros Pro BCD systems."
    },
    {
      id: 75,
      name: "ScubaPro Hydros BCD Color Kit Blue",
      category: "BCD Accessories",
      price: "$55",
      originalPrice: null,
      rating: 4.6,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-hydros-color-kit-blue.png",
      badges: ["ScubaPro", "Blue"],
      features: ["Blue color kit", "Hydros compatible", "Customization", "Easy installation"],
      inStock: true,
      description: "Blue color customization kit for personalizing your Hydros BCD system."
    },
    {
      id: 76,
      name: "ScubaPro Octopus Retainer Clip Gray",
      category: "Regulator Accessories",
      price: "$14.95",
      originalPrice: null,
      rating: 4.4,
      reviews: 7,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-octo-retainer-clip.jpg",
      badges: ["ScubaPro", "Gray"],
      features: ["Octopus retention", "Clip design", "Secure hold", "Easy access"],
      inStock: true,
      description: "Retainer clip for securing octopus second stage to BCD or gear."
    },
    {
      id: 77,
      name: "ScubaPro Orange T-Shirt",
      category: "Dive Apparel",
      price: "$39.95",
      originalPrice: null,
      rating: 4.5,
      reviews: 3,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/02/scubapro-orange-t-shirt-scaled.jpg",
      badges: ["ScubaPro", "Orange"],
      features: ["Orange color", "Comfortable fit", "ScubaPro logo", "Quality material"],
      inStock: true,
      description: "Comfortable orange ScubaPro t-shirt with brand logo and quality construction."
    },
    {
      id: 78,
      name: "ScubaPro Go Sock",
      category: "Dive Boots",
      price: "$60",
      originalPrice: null,
      rating: 4.6,
      reviews: 12,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/02/scubapro-go-sock-scaled.jpg",
      badges: ["ScubaPro", "Go Sock"],
      features: ["Thermal protection", "Comfortable fit", "Quick dry", "Versatile use"],
      inStock: true,
      description: "Versatile dive sock providing thermal protection and comfort for various water activities."
    },
    {
      id: 79,
      name: "ScubaPro Hydros Pro BCD Color Kit Turquoise",
      category: "BCD Accessories",
      price: "$55",
      originalPrice: null,
      rating: 4.7,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/02/scubapro-hydros-color-kit-turquoise.png",
      badges: ["ScubaPro", "Turquoise"],
      features: ["Turquoise color", "Hydros Pro compatible", "Easy installation", "Personal customization"],
      inStock: true,
      description: "Turquoise color kit for customizing and personalizing Hydros Pro BCD systems."
    },
    {
      id: 80,
      name: "ScubaPro Nova 850r Dive Light Battery",
      category: "Dive Lights",
      price: "$23.95",
      originalPrice: null,
      rating: 4.5,
      reviews: 6,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/scubapro-nova-battery.jpg",
      badges: ["ScubaPro", "Battery"],
      features: ["Nova 850r compatible", "Rechargeable", "Long life", "Reliable power"],
      inStock: true,
      description: "Replacement rechargeable battery for ScubaPro Nova 850r dive lights."
    },
    {
      id: 81,
      name: "ScubaPro Hydros Pro Bungee Set Black M",
      category: "BCD Accessories",
      price: "$23",
      originalPrice: null,
      rating: 4.7,
      reviews: 17,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/scubapro-hydros-pro-bungee-medium.png",
      badges: ["ScubaPro", "Medium"],
      features: ["Medium size", "Bungee set", "Secure gear", "Streamlined setup"],
      inStock: true,
      description: "Medium size bungee set for securing lights and streamlining hose routing on Hydros Pro."
    },
    {
      id: 82,
      name: "ScubaPro Hydros Mini D-Ring Set",
      category: "BCD Accessories",
      price: "$23",
      originalPrice: null,
      rating: 4.8,
      reviews: 18,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/Scubapro-hydros-pro-d-ring-set.webp",
      badges: ["ScubaPro", "D-Ring"],
      features: ["Mini D-rings", "Marker buoy attachment", "Light mounting", "Hose routing"],
      inStock: true,
      description: "Mini D-ring plate for attaching marker buoys and lights to Hydros Pro BCD."
    },
    {
      id: 83,
      name: "ScubaPro Sport Mesh Bag 95",
      category: "Dive Bags",
      price: "$90",
      originalPrice: null,
      rating: 4.5,
      reviews: 8,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/scubapro-sport-mesh-bag.jpg",
      badges: ["ScubaPro", "Mesh"],
      features: ["95L capacity", "Mesh construction", "Drainage", "Large opening"],
      inStock: true,
      description: "Large capacity mesh bag for dive gear storage and transportation with drainage."
    },
    {
      id: 84,
      name: "ScubaPro Definition Pack 24 Bag",
      category: "Dive Bags",
      price: "$99",
      originalPrice: null,
      rating: 4.6,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/scubapro-definition-pack.jpg",
      badges: ["ScubaPro", "24L"],
      features: ["24L capacity", "Definition series", "Multiple compartments", "Quality construction"],
      inStock: true,
      description: "Definition series 24-liter pack with multiple compartments for organized gear storage."
    },
    {
      id: 85,
      name: "ScubaPro Hydros Pro BCD Color Kit Black",
      category: "BCD Accessories",
      price: "$55",
      originalPrice: null,
      rating: 4.5,
      reviews: 3,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/scubapro-hydros-color-kit-black.jpg",
      badges: ["ScubaPro", "Black"],
      features: ["Black color kit", "Stealth appearance", "Professional look", "Easy installation"],
      inStock: true,
      description: "Black color kit for a professional stealth appearance on Hydros Pro BCD systems."
    },
    {
      id: 86,
      name: "Diving Headband Teal & Blue",
      category: "Dive Apparel",
      price: "$18.95",
      originalPrice: null,
      rating: 4.3,
      reviews: 11,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/diving-headband-teal-blue.jpg",
      badges: ["Teal & Blue", "Comfort"],
      features: ["Teal and blue colors", "Comfortable fit", "Quick dry", "Hair protection"],
      inStock: true,
      description: "Comfortable diving headband in teal and blue for hair protection during water activities."
    },
    {
      id: 87,
      name: "ScubaPro Charcoal Gray Zip-up Hoodie",
      category: "Dive Apparel",
      price: "$56",
      originalPrice: "$76",
      rating: 4.7,
      reviews: 7,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/05/scubapro-hoodie-gray.jpg",
      badges: ["ScubaPro", "Sale"],
      features: ["Zip-up design", "Charcoal gray", "Comfortable fit", "Quality material"],
      inStock: true,
      description: "Comfortable charcoal gray zip-up hoodie with ScubaPro branding and quality construction."
    },
    {
      id: 88,
      name: "ScubaPro Hydros Pro Weight Pockets",
      category: "BCD Accessories",
      price: "$99",
      originalPrice: null,
      rating: 4.8,
      reviews: 6,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/05/scubapro-hydros-weight-pockets.jpg",
      badges: ["ScubaPro", "Weight System"],
      features: ["Hydros Pro compatible", "Easy weight insertion", "Secure retention", "Quick release"],
      inStock: true,
      description: "Weight pocket system designed specifically for ScubaPro Hydros Pro BCD systems."
    },
    {
      id: 89,
      name: "ScubaPro Hydros Pro Cargo Thigh Pocket",
      category: "BCD Accessories",
      price: "$54",
      originalPrice: null,
      rating: 4.7,
      reviews: 6,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/06/scubapro-hydros-cargo-pocket.jpg",
      badges: ["ScubaPro", "Cargo"],
      features: ["Thigh pocket", "Cargo storage", "Easy access", "Secure closure"],
      inStock: true,
      description: "Cargo thigh pocket accessory for additional storage on Hydros Pro BCD systems."
    },
    {
      id: 90,
      name: "ScubaPro R195 Octopus",
      category: "Octos",
      price: "$279",
      originalPrice: null,
      rating: 4.6,
      reviews: 9,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/06/scubapro-r195-octopus.jpg",
      badges: ["ScubaPro", "R195"],
      features: ["Balanced valve", "High performance", "Easy breathing", "Reliable backup"],
      inStock: true,
      description: "High-performance R195 octopus second stage with balanced valve for reliable backup breathing."
    },
    {
      id: 91,
      name: "ScubaPro R105 Octopus",
      category: "Octos",
      price: "$234",
      originalPrice: null,
      rating: 4.5,
      reviews: 16,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/07/scubapro-r105-octopus.jpg",
      badges: ["ScubaPro", "R105"],
      features: ["Reliable performance", "Easy breathing", "Bright color", "Professional grade"],
      inStock: true,
      description: "Professional R105 octopus second stage designed for reliable emergency breathing."
    },
    {
      id: 92,
      name: "ScubaPro 2 Gauge In-line Pressure and Depth",
      category: "Dive Gauges",
      price: "$240",
      originalPrice: null,
      rating: 4.7,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/07/scubapro-inline-gauge.jpg",
      badges: ["ScubaPro", "2 Gauge"],
      features: ["Pressure and depth", "In-line design", "Accurate readings", "Professional grade"],
      inStock: false,
      description: "Professional 2-gauge system with in-line pressure and depth monitoring capabilities."
    },
    {
      id: 93,
      name: "Ocean Reef ExtraFlex Quick Connect Hoses",
      category: "Full Face Masks",
      price: "$131",
      originalPrice: null,
      rating: 4.5,
      reviews: 3,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-extraflex-quick-connect-hose-32-inch-black.png",
      badges: ["Ocean Reef", "32 inch"],
      features: ["32 inch length", "Quick connect", "ExtraFlex design", "Black color"],
      inStock: false,
      description: "ExtraFlex quick connect hoses for Ocean Reef full face mask systems."
    },
    {
      id: 94,
      name: "Ocean Reef Swivel Connection",
      category: "Full Face Masks",
      price: "$79",
      originalPrice: null,
      rating: 4.6,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-neptune-hose-swivel-connection.png",
      badges: ["Ocean Reef", "Swivel"],
      features: ["Swivel design", "Neptune compatible", "Easy rotation", "Secure connection"],
      inStock: true,
      description: "Swivel connection for improved hose routing on Ocean Reef Neptune masks."
    },
    {
      id: 95,
      name: "Ocean Reef Combo Mount on Universal Slide",
      category: "Full Face Masks",
      price: "$206",
      originalPrice: null,
      rating: 4.7,
      reviews: 3,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-combo-mount-on-universal-slide.png",
      badges: ["Ocean Reef", "Universal"],
      features: ["Universal slide", "Combo mount", "Clamping band", "Versatile mounting"],
      inStock: false,
      description: "Combo mount on universal slide with clamping band for mounting accessories."
    },
    {
      id: 96,
      name: "Ocean Reef Neptune Quick Connection Male Part",
      category: "Full Face Masks",
      price: "$36",
      originalPrice: null,
      rating: 4.4,
      reviews: 3,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-neptune-quick-disconnect-male-part-only.png",
      badges: ["Ocean Reef", "Quick Connect"],
      features: ["Male connector", "Quick disconnect", "Neptune compatible", "Replacement part"],
      inStock: false,
      description: "Neptune quick connection male part for Ocean Reef full face mask quick disconnect."
    },
    {
      id: 97,
      name: "Ocean Reef Standard 9/16 to Quick Connect Adapter",
      category: "Full Face Masks",
      price: "$85",
      originalPrice: null,
      rating: 4.5,
      reviews: 2,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/02/ocean-reef-adapter.jpg",
      badges: ["Ocean Reef", "Adapter"],
      features: ["9/16 to quick connect", "Male and female", "Standard thread", "Versatile adapter"],
      inStock: false,
      description: "Standard 9/16 to quick connect adapter with male and female connections."
    },
    {
      id: 98,
      name: "Ocean Reef Pocket Scuba Mask w/ Roll Up Snorkel",
      category: "Scuba Masks",
      price: "$90",
      originalPrice: null,
      rating: 4.3,
      reviews: 5,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/03/ocean-reef-pocket-mask.jpg",
      badges: ["Ocean Reef", "Compact"],
      features: ["Pocket size", "Roll up snorkel", "Travel friendly", "Complete set"],
      inStock: true,
      description: "Compact pocket scuba mask with roll-up snorkel for travel and emergency use."
    },
    {
      id: 99,
      name: "ScubaPro Neoprene Mask Strap Orange",
      category: "Scuba Masks",
      price: "$25",
      originalPrice: null,
      rating: 4.4,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-neoprene-strap-orange.jpg",
      badges: ["ScubaPro", "Orange"],
      features: ["Neoprene material", "Orange color", "Comfortable fit", "No hair pulling"],
      inStock: true,
      description: "Comfortable neoprene mask strap in orange to prevent hair pulling and increase comfort."
    },
    {
      id: 100,
      name: "ScubaPro Definition Mask 2 Bag",
      category: "Scuba Masks",
      price: "$20",
      originalPrice: null,
      rating: 4.6,
      reviews: 6,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/07/scubapro-mask-bag.jpg",
      badges: ["ScubaPro", "Mask Bag"],
      features: ["Mask protection", "Definition series", "Compact storage", "Quality material"],
      inStock: true,
      description: "Protective storage bag for dive masks from the ScubaPro Definition series."
    },
    {
      id: 101,
      name: "ScubaPro D-Mask Color Kit",
      category: "Scuba Masks",
      price: "$26",
      originalPrice: null,
      rating: 4.5,
      reviews: 6,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/08/scubapro-mask-color-kit.jpg",
      badges: ["ScubaPro", "Color Kit"],
      features: ["Color customization", "D-Mask compatible", "Easy installation", "Personal style"],
      inStock: true,
      description: "Color customization kit for personalizing ScubaPro D-Mask appearance."
    },
    {
      id: 102,
      name: "ScubaPro Go Pro Mask Mount Black",
      category: "Scuba Mask Accessories",
      price: "$27",
      originalPrice: null,
      rating: 4.7,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/05/scubapro-gopro-mount.jpg",
      badges: ["ScubaPro", "GoPro"],
      features: ["GoPro compatible", "Mask mounting", "Black color", "Secure attachment"],
      inStock: true,
      description: "GoPro camera mount designed for attachment to diving masks for underwater filming."
    },
    {
      id: 103,
      name: "Gearkeeper Micro Scuba Retractor Carabiner",
      category: "BCD Accessories",
      price: "$23.95",
      originalPrice: null,
      rating: 4.6,
      reviews: 15,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/05/gearkeeper-micro-carabiner.jpg",
      badges: ["Gearkeeper", "Carabiner"],
      features: ["Carabiner attachment", "Micro size", "Retractable", "Secure hold"],
      inStock: false,
      description: "Micro scuba retractor with carabiner attachment for securing small dive accessories."
    },
    {
      id: 104,
      name: "Gearkeeper Small Scuba Retractor",
      category: "BCD Accessories",
      price: "$29.95",
      originalPrice: null,
      rating: 4.7,
      reviews: 12,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/08/gearkeeper-small-retractor.jpg",
      badges: ["Gearkeeper", "Small"],
      features: ["Small size", "Reliable retraction", "Durable construction", "Easy attachment"],
      inStock: true,
      description: "Small scuba retractor for securing lightweight dive accessories and tools."
    },
    {
      id: 105,
      name: "Gearkeeper Quick Connect Lanyard",
      category: "BCD Accessories",
      price: "$8.99",
      originalPrice: null,
      rating: 4.3,
      reviews: 12,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/08/gearkeeper-lanyard.jpg",
      badges: ["Gearkeeper", "Quick Connect"],
      features: ["Quick connect", "Lanyard design", "Affordable", "Reliable connection"],
      inStock: true,
      description: "Quick connect lanyard for simple and reliable gear attachment during diving."
    },
    {
      id: 106,
      name: "ScubaPro FS-1.5 Dive Compass with Premium Retractor",
      category: "Dive Gauges",
      price: "$158",
      originalPrice: null,
      rating: 4.8,
      reviews: 2,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/08/scubapro-compass-retractor.jpg",
      badges: ["ScubaPro", "Compass"],
      features: ["FS-1.5 compass", "Premium retractor", "Accurate navigation", "Quality construction"],
      inStock: true,
      description: "Professional dive compass with premium retractor for accurate underwater navigation."
    },
    {
      id: 107,
      name: "Scuba Flashlight Rental",
      category: "Dive Lights",
      price: "$10",
      originalPrice: null,
      rating: 4.2,
      reviews: 5,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/07/rental-flashlight.jpg",
      badges: ["Rental", "Flashlight"],
      features: ["Daily rental", "Reliable light", "Basic model", "Good for beginners"],
      inStock: true,
      description: "Basic dive flashlight available for daily rental for recreational diving."
    },
    {
      id: 108,
      name: "ScubaPro Nova 700/850/1000 Battery/Charger Kit",
      category: "Dive Lights",
      price: "$130",
      originalPrice: null,
      rating: 4.9,
      reviews: 376,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/11/scubapro-nova-battery-kit.jpg",
      badges: ["ScubaPro", "Battery Kit"],
      features: ["700/850/1000 compatible", "Battery and charger", "Complete kit", "High capacity"],
      inStock: false,
      description: "Complete battery and charger kit for ScubaPro Nova 700, 850, and 1000 dive lights."
    },
    {
      id: 109,
      name: "ScubaPro Sport Mesh 65 Dive Bag",
      category: "Dive Bags",
      price: "$78",
      originalPrice: null,
      rating: 4.5,
      reviews: 7,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/11/scubapro-mesh-65.jpg",
      badges: ["ScubaPro", "65L"],
      features: ["65L capacity", "Mesh construction", "Sport series", "Water drainage"],
      inStock: true,
      description: "Medium capacity 65-liter mesh bag from ScubaPro Sport series for gear storage."
    },
    {
      id: 110,
      name: "ScubaPro Sport Mesh'N Roll 100 Dive Bag",
      category: "Dive Bags",
      price: "$160",
      originalPrice: null,
      rating: 4.8,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/05/scubapro-mesh-roll-100.jpg",
      badges: ["ScubaPro", "100L"],
      features: ["100L capacity", "Mesh and roll design", "Large size", "Easy transport"],
      inStock: true,
      description: "Large 100-liter mesh and roll bag for extensive dive gear storage and transport."
    },
    {
      id: 111,
      name: "ScubaPro 2mm Dive Beanie Hat",
      category: "Dive Apparel",
      price: "$35",
      originalPrice: null,
      rating: 4.5,
      reviews: 7,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/11/scubapro-dive-beanie-2mm.jpg",
      badges: ["ScubaPro", "2mm"],
      features: ["2mm neoprene", "Thermal protection", "Comfortable fit", "Head warmth"],
      inStock: true,
      description: "2mm neoprene dive beanie hat for thermal protection and warmth underwater."
    },
    {
      id: 112,
      name: "ScubaPro Definition 10 Regulator Bag",
      category: "Regulator Accessories",
      price: "$78",
      originalPrice: null,
      rating: 4.6,
      reviews: 8,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/11/scubapro-regulator-bag.jpg",
      badges: ["ScubaPro", "Definition"],
      features: ["Regulator storage", "Definition series", "Protective padding", "Organized compartments"],
      inStock: true,
      description: "Definition series regulator bag with protective padding and organized compartments."
    },
    {
      id: 113,
      name: "ScubaPro Premium Boat Coat",
      category: "Dive Apparel",
      price: "$249",
      originalPrice: null,
      rating: 4.8,
      reviews: 8,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/12/scubapro-boat-coat.jpg",
      badges: ["ScubaPro", "Premium"],
      features: ["Premium materials", "Weather protection", "Boat comfort", "Professional grade"],
      inStock: true,
      description: "Premium boat coat for weather protection and comfort during surface intervals."
    },
    {
      id: 114,
      name: "ScubaPro Hydros BCD Color Kit Orange",
      category: "BCD Accessories",
      price: "$55",
      originalPrice: null,
      rating: 4.7,
      reviews: 2,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/12/scubapro-hydros-orange.jpg",
      badges: ["ScubaPro", "Orange"],
      features: ["Orange color", "High visibility", "Hydros compatible", "Easy installation"],
      inStock: true,
      description: "Orange color kit for high visibility customization of Hydros BCD systems."
    },
    {
      id: 115,
      name: "ScubaPro S-270 Octo",
      category: "Octos",
      price: "$325",
      originalPrice: null,
      rating: 4.8,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/03/scubapro-s270-octo.jpg",
      badges: ["ScubaPro", "S-270"],
      features: ["Balanced valve", "High performance", "Professional grade", "Reliable breathing"],
      inStock: true,
      description: "High-performance S-270 octopus with balanced valve for professional diving applications."
    },
    {
      id: 116,
      name: "ScubaPro HUD Dive Computer with Transmitter",
      category: "Wrist Computers",
      price: "$880",
      originalPrice: null,
      rating: 4.9,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/03/scubapro-hud-computer.jpg",
      badges: ["ScubaPro", "HUD"],
      features: ["Heads-up display", "Air integration", "Wireless transmitter", "Advanced features"],
      inStock: true,
      description: "Advanced HUD dive computer with heads-up display and wireless air integration."
    },
    {
      id: 117,
      name: "ScubaPro HUD Mount for Ocean Reef Neptune III",
      category: "Full Face Masks",
      price: "$199.99",
      originalPrice: null,
      rating: 4.8,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/03/scubapro-hud-mount.jpg",
      badges: ["ScubaPro", "Neptune III"],
      features: ["HUD mounting", "Neptune III compatible", "Professional installation", "Secure fit"],
      inStock: true,
      description: "Mounting system for ScubaPro HUD on Ocean Reef Neptune III full face masks."
    },
    {
      id: 118,
      name: "ScubaPro MK25 EVO 1st Stage Scuba Regulator",
      category: "Regulators",
      price: "$506",
      originalPrice: null,
      rating: 4.9,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/03/scubapro-mk25-evo-1st.jpg",
      badges: ["ScubaPro", "MK25 EVO"],
      features: ["1st stage only", "Balanced piston", "High performance", "Professional grade"],
      inStock: true,
      description: "MK25 EVO first stage regulator offering excellent performance and reliability."
    },
    {
      id: 119,
      name: "ScubaPro Aladin A2 Dive Computer with Transmitter",
      category: "Wrist Computers",
      price: "$469",
      originalPrice: "$480",
      rating: 4.7,
      reviews: 7,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/04/scubapro-aladin-a2.jpg",
      badges: ["ScubaPro", "Sale"],
      features: ["Air integration", "Wireless transmitter", "User-friendly", "Great value"],
      inStock: true,
      description: "User-friendly Aladin A2 dive computer with wireless air integration at a great value."
    },
    {
      id: 120,
      name: "ScubaPro Magnetic Octopus Holder",
      category: "Regulator Accessories",
      price: "$37",
      originalPrice: null,
      rating: 4.8,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/05/scubapro-magnetic-holder.jpg",
      badges: ["ScubaPro", "Magnetic"],
      features: ["Magnetic attachment", "Octopus holder", "Easy access", "Secure retention"],
      inStock: true,
      description: "Magnetic octopus holder for secure and easy access to backup regulator."
    },
    {
      id: 121,
      name: "ScubaPro Premium Retractor with Stop",
      category: "BCD Accessories",
      price: "$54",
      originalPrice: null,
      rating: 4.8,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/05/scubapro-premium-retractor.jpg",
      badges: ["ScubaPro", "Premium"],
      features: ["Premium quality", "Stop mechanism", "Reliable retraction", "Professional grade"],
      inStock: true,
      description: "Premium retractor with stop mechanism for professional dive gear management."
    },
    {
      id: 122,
      name: "ScubaPro Bolt Snap Flateye 1 inch/25mm",
      category: "BCD Accessories",
      price: "$26",
      originalPrice: null,
      rating: 4.6,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/05/scubapro-bolt-snap-flateye.jpg",
      badges: ["ScubaPro", "Flateye"],
      features: ["1 inch / 25mm", "Flateye design", "Secure attachment", "Professional grade"],
      inStock: true,
      description: "Professional flateye bolt snap for secure attachment of dive accessories."
    },
    {
      id: 123,
      name: "ScubaPro Full Face Mask Gen 2",
      category: "Full Face Masks",
      price: "$525",
      originalPrice: null,
      rating: 4.9,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/06/scubapro-ffm-gen2.jpg",
      badges: ["ScubaPro", "Gen 2"],
      features: ["2nd generation", "Full face design", "Advanced features", "Professional grade"],
      inStock: true,
      description: "Second generation ScubaPro full face mask with advanced features and design."
    },
    {
      id: 124,
      name: "ScubaPro T-Flex Womens Dive Leggings UPF 80",
      category: "Dive Apparel",
      price: "$89",
      originalPrice: null,
      rating: 4.7,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/06/scubapro-tlex-leggings.jpg",
      badges: ["ScubaPro", "Women's"],
      features: ["UPF 80 protection", "T-Flex material", "Women's specific fit", "Sun protection"],
      inStock: true,
      description: "Women's T-Flex dive leggings with UPF 80 sun protection for tropical diving."
    },
    {
      id: 125,
      name: "ScubaPro G3 Titanium Dive Computer with Transmitter",
      category: "Wrist Computers",
      price: "$799",
      originalPrice: null,
      rating: 4.9,
      reviews: 1,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/07/scubapro-g3-titanium.jpg",
      badges: ["ScubaPro", "Titanium"],
      features: ["Titanium construction", "Air integration", "G3 technology", "Premium quality"],
      inStock: true,
      description: "Premium G3 dive computer with titanium construction and wireless air integration."
    },
    {
      id: 126,
      name: "Low Pressure Inflator Hose with Air 2",
      category: "BCD Accessories",
      price: "$126",
      originalPrice: null,
      rating: 4.6,
      reviews: 0,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2025/07/scubapro-air2-hose.jpg",
      badges: ["ScubaPro", "Air 2"],
      features: ["Air 2 compatible", "Low pressure", "Inflator hose", "Integrated system"],
      inStock: true,
      description: "Low pressure inflator hose designed for use with ScubaPro Air 2 systems."
    },
    {
      id: 127,
      name: "KLSD Shop Tech Hourly Labor 15min",
      category: "Accessories",
      price: "$23.75",
      originalPrice: null,
      rating: 4.5,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/klsd-service.jpg",
      badges: ["KLSD", "Service"],
      features: ["15 minute increments", "Professional service", "Equipment repair", "Expert technicians"],
      inStock: true,
      description: "Professional shop technician hourly labor charged in 15-minute increments."
    },
    // Additional Masks from CSV
    {
      id: 128,
      name: "ScubaPro Frameless Gorilla Dive Mask - Additional Colors",
      category: "Scuba Masks",
      price: "$159",
      originalPrice: null,
      rating: 4.6,
      reviews: 21,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-frameless-gorilla-mask.jpg",
      badges: ["ScubaPro", "Multiple Colors"],
      features: ["Frameless design", "Low volume", "Comfortable skirt", "Multiple color options"],
      inStock: true,
      description: "ScubaPro Frameless Gorilla mask available in multiple color options for personal preference."
    },
    {
      id: 129,
      name: "Ocean Reef Aria Full Face Snorkeling Mask",
      category: "Scuba Masks",
      price: "$89.95",
      originalPrice: null,
      rating: 4.4,
      reviews: 8,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/11/ocean-reef-aria-mask.jpg",
      badges: ["Ocean Reef", "Full Face"],
      features: ["Full face design", "Snorkie Talkie compatible", "Easy breathing", "Anti-fog technology"],
      inStock: true,
      description: "Ocean Reef Aria full face snorkeling mask with communication compatibility and anti-fog technology."
    },
    {
      id: 130,
      name: "Ocean Reef Neptune III Full Face Diving Mask",
      category: "Full Face Masks",
      price: "$450",
      originalPrice: null,
      rating: 4.8,
      reviews: 12,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2023/08/ocean-reef-neptune-iii-mask.jpg",
      badges: ["Ocean Reef", "Neptune III"],
      features: ["Professional diving", "Communication ready", "Multiple mount options", "Superior vision"],
      inStock: true,
      description: "Professional Ocean Reef Neptune III full face diving mask with communication capabilities."
    },
    {
      id: 131,
      name: "ScubaPro Crystal Vu Dive Mask",
      category: "Scuba Masks",
      price: "$89",
      originalPrice: null,
      rating: 4.5,
      reviews: 15,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-crystal-vu-mask.jpg",
      badges: ["ScubaPro", "Crystal Clear"],
      features: ["Crystal clear lens", "Comfortable fit", "Easy adjustment", "Clear vision"],
      inStock: true,
      description: "ScubaPro Crystal Vu mask offering crystal clear vision and comfortable underwater experience."
    },
    {
      id: 132,
      name: "ScubaPro Zoom EVO Dive Mask",
      category: "Scuba Masks",
      price: "$95",
      originalPrice: null,
      rating: 4.6,
      reviews: 18,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-zoom-evo-mask.jpg",
      badges: ["ScubaPro", "Zoom EVO"],
      features: ["EVO technology", "Enhanced vision", "Comfortable skirt", "Professional grade"],
      inStock: true,
      description: "ScubaPro Zoom EVO mask with enhanced vision technology for professional diving."
    },
    {
      id: 133,
      name: "ScubaPro Steel Comp Dive Mask",
      category: "Scuba Masks",
      price: "$79",
      originalPrice: null,
      rating: 4.4,
      reviews: 22,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-steel-comp-mask.jpg",
      badges: ["ScubaPro", "Steel Frame"],
      features: ["Steel frame", "Compact design", "Durable construction", "Classic style"],
      inStock: true,
      description: "ScubaPro Steel Comp mask with durable steel frame and compact classic design."
    },
    {
      id: 134,
      name: "Ocean Reef NERO Full Face Mask",
      category: "Full Face Masks",
      price: "$395",
      originalPrice: null,
      rating: 4.7,
      reviews: 6,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/ocean-reef-nero-mask.jpg",
      badges: ["Ocean Reef", "NERO"],
      features: ["Professional grade", "Communication ready", "Excellent visibility", "Comfortable fit"],
      inStock: true,
      description: "Ocean Reef NERO full face mask designed for professional diving with excellent visibility."
    },
    {
      id: 135,
      name: "ScubaPro Synergy 2 Twin Lens Mask",
      category: "Scuba Masks",
      price: "$65",
      originalPrice: null,
      rating: 4.3,
      reviews: 27,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-synergy-2-mask.jpg",
      badges: ["ScubaPro", "Twin Lens"],
      features: ["Twin lens design", "Comfortable fit", "Easy clearing", "Affordable option"],
      inStock: true,
      description: "ScubaPro Synergy 2 twin lens mask offering comfort and value for recreational diving."
    },
    {
      id: 136,
      name: "ScubaPro D-Mask Frameless",
      category: "Scuba Masks",
      price: "$110",
      originalPrice: null,
      rating: 4.7,
      reviews: 31,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-d-mask-frameless.jpg",
      badges: ["ScubaPro", "D-Mask"],
      features: ["Frameless design", "D-shaped lens", "Superior vision", "Customizable colors"],
      inStock: true,
      description: "ScubaPro D-Mask frameless design with distinctive D-shaped lens for superior underwater vision."
    },
    // KLSD Merchandise
    {
      id: 31,
      name: "KLSD 32oz Tumbler",
      category: "KLSD Merchandise",
      price: "$39.95",
      originalPrice: null,
      rating: 4.8,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/04/klsd-32oz-tumbler.jpg",
      badges: ["KLSD", "32oz"],
      features: ["32oz capacity", "Insulated", "KLSD branding", "Large size"],
      inStock: true,
      description: "Large 32oz insulated tumbler with Key Largo Scuba Diving branding."
    },
    {
      id: 32,
      name: "KLSD 20oz Tumbler",
      category: "KLSD Merchandise",
      price: "$32.95",
      originalPrice: null,
      rating: 4.8,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/klsd-20oz-tumbler.jpg",
      badges: ["KLSD", "20oz"],
      features: ["20oz capacity", "Insulated", "KLSD logo", "Perfect size"],
      inStock: true,
      description: "Key Largo Scuba Diving branded 20oz insulated tumbler, perfect for your dive adventures."
    },
    {
      id: 33,
      name: "KLSD 12oz Tumbler",
      category: "KLSD Merchandise",
      price: "$24.95",
      originalPrice: null,
      rating: 4.7,
      reviews: 4,
      image: "https://keylargoscubadiving.com/wp-content/uploads/2024/03/klsd-12oz-tumbler.jpg",
      badges: ["KLSD", "12oz"],
      features: ["12oz capacity", "Compact size", "Insulated", "KLSD branding"],
      inStock: true,
      description: "Compact 12oz insulated tumbler with Key Largo Scuba Diving logo."
    }
  ];

  // Use WooCommerce products when available, fallback to hardcoded for demo
  const filteredGear = React.useMemo(() => {
    const items = connectionStatus === 'connected' && products.length > 0
      ? filteredProducts.map(convertToGearItem)
      : legacyGearItems.filter(item => activeCategory === 'All' || item.category === activeCategory);
    return items;
  }, [activeCategory, products, filteredProducts, connectionStatus]);

  const services = [
    {
      icon: Shield,
      title: "Authorized Dealer",
      description: "Official ScubaPro and Ocean Reef dealer with full warranty coverage"
    },
    {
      icon: Settings,
      title: "Professional Service",
      description: "Expert equipment servicing and repairs by certified technicians"
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Free shipping on orders over $200, same-day shipping available"
    },
    {
      icon: Award,
      title: "Expert Advice",
      description: "25+ years of experience helping divers choose the right gear"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage/5 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 text-white relative overflow-hidden">
        {/* Background Image with Optimization */}
        <div className="absolute inset-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F23c7a7dcc12240a1b3e37f5b0a591d4d?format=webp&width=1920&quality=85"
            alt="Key Largo Scuba Diving Dive Shop Interior"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-coral/20 text-coral border-coral/30 text-lg px-4 py-2">
              ScubaPro Platinum Dealer
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Professional
              <span className="block text-coral">Scuba Gear</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Premium diving equipment from trusted brands. Professional service, 
              expert advice, and competitive prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-coral hover:bg-coral/90 text-white font-semibold text-lg px-8 py-4">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ocean text-lg px-8 py-4">
                <Package className="w-5 h-5 mr-2" />
                View Packages
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`${
                  activeCategory === category 
                    ? "bg-ocean text-white" 
                    : "border-ocean/20 text-ocean hover:bg-ocean hover:text-white"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-muted-foreground">
              Showing {filteredGear.length} products
            </p>
            {connectionStatus === 'connected' && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Live from WooCommerce</span>
              </div>
            )}
            {connectionStatus === 'demo' && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-yellow-600">Demo Mode - Sample Products</span>
              </div>
            )}
            {loading && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <Loader2 className="w-3 h-3 animate-spin text-ocean" />
                <span className="text-xs text-ocean">Connecting to WooCommerce...</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredGear.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {item.badges.map((badge, index) => (
                      <Badge key={index} className="bg-coral text-white text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/90 hover:bg-white border-0 shadow-md"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge className="bg-red-600 text-white">Out of Stock</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-ocean transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({item.reviews} {item.reviews === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-ocean">{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-ocean hover:bg-ocean/90 text-white font-semibold"
                      disabled={!item.inStock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        Compare
                      </Button>
                    </div>
                  </div>

                  {item.features && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Key Features:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {item.features.slice(0, 2).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-ocean/5 to-sage/5">
              <CardContent className="p-12">
                <Package className="w-16 h-16 text-ocean mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-foreground mb-4">Professional Diving Equipment</h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  We carry premium diving equipment from top manufacturers including ScubaPro and Ocean Reef.
                  Contact us for current inventory, pricing, and professional equipment recommendations.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-6 border-ocean/20">
                    <CardContent className="p-0 text-center">
                      <Award className="w-8 h-8 text-ocean mx-auto mb-3" />
                      <h3 className="font-bold text-foreground mb-2">ScubaPro Platinum Dealer</h3>
                      <p className="text-sm text-muted-foreground">Authorized dealer for the world's most trusted diving equipment</p>
                    </CardContent>
                  </Card>
                  <Card className="p-6 border-coral/20">
                    <CardContent className="p-0 text-center">
                      <Shield className="w-8 h-8 text-coral mx-auto mb-3" />
                      <h3 className="font-bold text-foreground mb-2">Ocean Reef Platinum Dealer</h3>
                      <p className="text-sm text-muted-foreground">Professional full face masks and communication systems</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-ocean hover:bg-ocean/90 text-white font-semibold">
                    <Phone className="w-5 h-5 mr-2" />
                    Call (305) 391-4040
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-ocean text-ocean hover:bg-ocean hover:text-white">
                    <Mail className="w-5 h-5 mr-2" />
                    Email for Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-sage/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Shop With Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional service, expert advice, and the best gear selection in the Florida Keys.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Trusted Brands</h2>
            <p className="text-xl text-muted-foreground">
              We carry equipment from the world's leading dive manufacturers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 items-center justify-center max-w-2xl mx-auto">
            <div className="text-center opacity-70 hover:opacity-100 transition-opacity">
              <div className="bg-gray-100 rounded-lg p-8 mb-2">
                <h3 className="text-2xl font-bold text-gray-600">ScubaPro</h3>
              </div>
              <p className="text-sm text-muted-foreground">Platinum Dealer</p>
            </div>
            <div className="text-center opacity-70 hover:opacity-100 transition-opacity">
              <div className="bg-gray-100 rounded-lg p-8 mb-2">
                <h3 className="text-2xl font-bold text-gray-600">Ocean Reef</h3>
              </div>
              <p className="text-sm text-muted-foreground">Platinum Dealer</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
