import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { wooCommerce, type WooCommerceProduct } from '@/lib/woocommerce';
import { FeaturedProductCard } from '@/components/FeaturedProductCard';
import { FeaturedSquareCardA, FeaturedSquareCardB, FeaturedSquareCardC } from '@/components/FeaturedSquareCards';
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
  Loader2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function ScubaGear() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'demo' | 'error'>('testing');
  // Design switch removed; this page uses Design B (Marketplace) by default
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const connectionTest = await wooCommerce.testConnection();

        if (connectionTest.success) {
          setConnectionStatus('connected');
          const response = await fetch('/api/woocommerce/products?category=scuba-gear&per_page=100');
          if (response.ok) {
            const wooProducts = await response.json();
            setProducts(wooProducts);
          } else {
            const directProducts = await loadProductsDirectly();
            setProducts(directProducts);
          }
        } else {
          setConnectionStatus(connectionTest.isCorsError ? 'demo' : 'error');
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

  function getFallbackProducts(): WooCommerceProduct[] {
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
  }

  const categories = React.useMemo(() => {
    const names = new Set<string>(['All']);

    if (connectionStatus === 'connected' && products.length > 0) {
      products.forEach((p: any) => p.categories?.forEach((c: any) => names.add(c.name)));
    } else {
      const demo = getFallbackProducts();
      demo.forEach((p: any) => p.categories?.forEach((c: any) => names.add(c.name)));
    }

    return Array.from(names);
  }, [products, connectionStatus]);

  const loadProductsDirectly = async () => {
    return [];
  };


  const convertToGearItem = (product: WooCommerceProduct) => {
    return {
      id: product.id,
      name: product.name,
      category: product.categories?.[0]?.name || 'Accessories',
      price: `$${parseFloat(product.sale_price || product.price || product.regular_price).toFixed(2)}`,
      originalPrice: product.sale_price && product.regular_price !== product.sale_price
        ? `$${parseFloat(product.regular_price).toFixed(2)}`
        : null,
      rating: 4.5,
      reviews: Math.floor(Math.random() * 30),
      image: product.images?.[0]?.src || "https://via.placeholder.com/300x200",
      badges: ["ScubaPro"],
      features: ["Professional grade", "High quality", "Durable construction"],
      tags: (product.categories?.[0]?.name || '').match(/mask/i) ? ["Most Popular"] : (product.categories?.[0]?.name || '').match(/fin/i) ? ["Pros Pick!"] : (product.categories?.[0]?.name || '').match(/snork/i) ? ["Dive Team Choice!"] : [],
      inStock: product.in_stock && product.stock_status === 'instock',
      description: product.name
    };
  };

  const legacyGearItems = [
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
      tags: ["Pros Pick!"],
      features: ["Advanced propulsion", "Pivot control technology", "Efficient kick", "Comfortable foot pocket"],
      inStock: true,
      description: "Advanced fin design with unique pivot control technology for maximum efficiency and comfort."
    }
  ];

  const filteredProducts = React.useMemo(() => {
    if (activeCategory === 'All') return products;

    return products.filter(product =>
      product.categories?.some((cat: any) => cat.name === activeCategory)
    );
  }, [products, activeCategory]);

  const allGearItems = () => {
    return connectionStatus === 'connected' && products.length > 0
      ? products.map(convertToGearItem)
      : legacyGearItems;
  };

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

  const hydrosPro = React.useMemo(() => {
    const all = allGearItems();
    return all.find(i => /hydros\s*pro/i.test(i.name)) || all.find(i => /hydrospro/i.test(i.name)) || all[0];
  }, [products, connectionStatus]);

  const toFeatured = (item: any) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    price: item.price,
    originalPrice: item.originalPrice,
    badges: item.badges,
    tags: item.tags,
    category: item.category,
    rating: item.rating,
    reviews: item.reviews,
    description: item.description,
    inStock: item.inStock,
  });

  const ProductCard: React.FC<{ item: any }> = ({ item }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
      <div className="relative overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {item.badges?.slice(0,2).map((badge: string, index: number) => (
            <Badge key={index} className="bg-coral text-white text-xs">{badge}</Badge>
          ))}
        </div>
        <div className="absolute top-4 right-4">
          <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white border-0 shadow-md">
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
          <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-ocean transition-colors">{item.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({item.reviews} {item.reviews === 1 ? 'review' : 'reviews'})</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-ocean">{item.price}</span>
            {item.originalPrice && <span className="text-lg text-muted-foreground line-through">{item.originalPrice}</span>}
          </div>
        </div>
        <div className="space-y-2">
          <Button className="w-full bg-ocean hover:bg-ocean/90 text-white font-semibold" disabled={!item.inStock}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs">View Details</Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs">Compare</Button>
          </div>
        </div>
        {item.features && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-foreground mb-2">Key Features:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              {item.features.slice(0, 2).map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const Row: React.FC<{ title: string; items: any[] }> = ({ title, items }) => (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold">{title}</h3>
        <Button variant="ghost" className="text-ocean">View all <ChevronRight className="w-4 h-4 ml-1" /></Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.slice(0,4).map((item) => (
          <FeaturedProductCard key={item.id} item={toFeatured(item)} />
        ))}
      </div>
    </div>
  );

  const DesignA = () => (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 text-white relative overflow-hidden">
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
            <Badge className="mb-4 bg-coral/20 text-coral border-coral/30 text-lg px-4 py-2">ScubaPro Platinum Dealer</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Professional<span className="block text-coral">Scuba Gear</span></h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">Premium diving equipment from trusted brands. Professional service, expert advice, and competitive prices.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-coral hover:bg-coral/90 text-white font-semibold text-lg px-8 py-4"><ShoppingCart className="w-5 h-5 mr-2" />Shop Now</Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ocean text-lg px-8 py-4"><Package className="w-5 h-5 mr-2" />View Packages</Button>
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
              <Button key={category} variant={activeCategory === category ? 'default' : 'outline'}
                className={`${activeCategory === category ? 'bg-ocean text-white' : 'border-ocean/20 text-ocean hover:bg-ocean hover:text-white'}`}
                onClick={() => setActiveCategory(category)}>
                {category}
              </Button>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-muted-foreground">Showing {filteredGear.length} products</p>
            {connectionStatus === 'connected' && (<div className="flex items-center justify-center gap-2 mt-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span className="text-xs text-green-600">Live from WooCommerce</span></div>)}
            {connectionStatus === 'demo' && (<div className="flex items-center justify-center gap-2 mt-2"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div><span className="text-xs text-yellow-600">Demo Mode - Sample Products</span></div>)}
            {loading && (<div className="flex items-center justify-center gap-2 mt-2"><Loader2 className="w-3 h-3 animate-spin text-ocean" /><span className="text-xs text-ocean">Connecting to WooCommerce...</span></div>)}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredGear.map((item) => (
              <FeaturedProductCard key={item.id} item={toFeatured(item)} />
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
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">We carry premium diving equipment from top manufacturers including ScubaPro and Ocean Reef. Contact us for current inventory, pricing, and professional equipment recommendations.</p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-6 border-ocean/20"><CardContent className="p-0 text-center"><Award className="w-8 h-8 text-ocean mx-auto mb-3" /><h3 className="font-bold text-foreground mb-2">ScubaPro Platinum Dealer</h3><p className="text-sm text-muted-foreground">Authorized dealer for the world's most trusted diving equipment</p></CardContent></Card>
                  <Card className="p-6 border-coral/20"><CardContent className="p-0 text-center"><Shield className="w-8 h-8 text-coral mx-auto mb-3" /><h3 className="font-bold text-foreground mb-2">Ocean Reef Platinum Dealer</h3><p className="text-sm text-muted-foreground">Professional full face masks and communication systems</p></CardContent></Card>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-ocean hover:bg-ocean/90 text-white font-semibold"><Phone className="w-5 h-5 mr-2" />Call (305) 391-4040</Button>
                  <Button size="lg" variant="outline" className="border-2 border-ocean text-ocean hover:bg-ocean hover:text-white"><Mail className="w-5 h-5 mr-2" />Email for Quote</Button>
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
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Professional service, expert advice, and the best gear selection in the Florida Keys.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mx-auto mb-4"><service.icon className="w-8 h-8 text-white" /></div>
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
            <p className="text-xl text-muted-foreground">We carry equipment from the world's leading dive manufacturers.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 items-center justify-center max-w-2xl mx-auto">
            <div className="text-center opacity-70 hover:opacity-100 transition-opacity"><div className="bg-gray-100 rounded-lg p-8 mb-2"><h3 className="text-2xl font-bold text-gray-600">ScubaPro</h3></div><p className="text-sm text-muted-foreground">Platinum Dealer</p></div>
            <div className="text-center opacity-70 hover:opacity-100 transition-opacity"><div className="bg-gray-100 rounded-lg p-8 mb-2"><h3 className="text-2xl font-bold text-gray-600">Ocean Reef</h3></div><p className="text-sm text-muted-foreground">Platinum Dealer</p></div>
          </div>
        </div>
      </section>
    </>
  );

  const DesignB = () => {
  const heroes = allGearItems().filter(i => /Hydros|MK|G2|Computer|Regulator|BCD|Nova/i.test(i.name)).slice(0, 5);
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (heroes.length <= 1) return;
    const id = setInterval(() => setHeroIndex(i => (i + 1) % heroes.length), 5000);
    return () => clearInterval(id);
  }, [heroes.length]);
  const current = heroes[heroIndex] || hydrosPro;
  const categoryChips = ['BCDs','Regulators','Wrist Computers','Console Computers','Dive Lights','Scuba Masks','Fins','Wetsuits','BCD Accessories','Dive Bags','Accessories','Octos','Dive Gauges','Computer Accessories','Dive Apparel','Full Face Masks','Underwater Communication'];
  const categoryImages: Record<string, string> = {
    'BCDs': 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-hydros-pro-bcd.jpg',
    'Regulators': 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/SP_12771550_G260Carbon_MK25_1-scaled-1.jpg',
    'Wrist Computers': 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-g2-dive-computer-with-transmitter-scaled.jpg',
    'Console Computers': 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-g2-dive-computer-console.jpg',
    'Dive Lights': 'https://keylargoscubadiving.com/wp-content/uploads/2024/03/scubapro-nova-850-r-dive-light.jpg',
    'Scuba Masks': 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-frameless-gorilla-mask.jpg',
    'Fins': 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-seawing-nova-fins.jpg',
    'Wetsuits': 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-definition-3mm-wetsuit.jpg',
    'BCD Accessories': 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-hydros-pro-ninja-pocket.png',
    'Dive Bags': 'https://keylargoscubadiving.com/wp-content/uploads/2024/03/scubapro-sport-mesh-bag.jpg',
    'Accessories': 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/SP_40312001_Surface_Marker_Buoy_01-scaled-1.jpg',
    'Octos': 'https://keylargoscubadiving.com/wp-content/uploads/2024/06/scubapro-r195-octopus.jpg',
    'Dive Gauges': 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-pressure-gauge.jpg',
    'Computer Accessories': 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-g2-smart-transmitter-scaled.jpg',
    'Dive Apparel': 'https://keylargoscubadiving.com/wp-content/uploads/2024/05/scubapro-hoodie-gray.jpg',
    'Full Face Masks': 'https://keylargoscubadiving.com/wp-content/uploads/2023/08/ocean-reef-neptune-iii-mask.jpg',
    'Underwater Communication': 'https://keylargoscubadiving.com/wp-content/uploads/2023/08/ocean-reef-mercury-gsm-communication-unit.png'
  };
  const featured = allGearItems().filter(i => activeCategory === 'All' || i.category === activeCategory).slice(0, 8);
  return (
    <>
      {/* Hero Slider */}
      <section className="pt-28 pb-10 bg-gradient-to-r from-ocean to-coral text-white min-h-[18rem]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge className="bg-white/20 text-white border-white/30 mb-3">Featured</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{current?.name || 'Scuba Gear'}</h1>
            <p className="text-lg text-white/90 mb-6">Premium gear from Platinum dealers. Explore top-rated products and expert-picked selections.</p>
            <div className="flex gap-3">
              <Button size="lg" className="bg-white text-ocean hover:bg-white/90"><ShoppingCart className="w-5 h-5 mr-2" />Shop Now</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ocean">Learn More</Button>
            </div>
            <div className="flex gap-2 mt-6" role="tablist" aria-label="Hero slides">
              {heroes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-pressed={i === heroIndex}
                  role="tab"
                  className={`h-2 w-2 rounded-full transition-opacity focus:outline-none focus:ring-2 focus:ring-white/80 ${i===heroIndex ? 'bg-white opacity-100' : 'bg-white/60 hover:opacity-90'}`}
                />
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={current?.image} alt={current?.name} className="w-full h-72 object-cover rounded-xl shadow-2xl" />
            <Badge className="absolute bottom-3 left-3 bg-black/60">Platinum ScubaPro Dealer</Badge>
          </div>
        </div>
      </section>

      {/* Categories (Card Blocks, Horizontal Scroll) */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-4 py-1">
              {categoryChips.map((dept) => (
                <Card key={dept} className="relative w-[246px] h-[108px] flex-shrink-0 overflow-hidden rounded-lg border-0 shadow-md hover:shadow-lg cursor-pointer" onClick={() => setActiveCategory(dept)}>
                  <img src={categoryImages[dept] || current?.image || ''} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-ocean/50 via-black/20 to-coral/50" />
                  <CardContent className="relative p-3 h-full flex flex-col justify-center">
                    <h3 className="text-white text-base font-semibold leading-tight">{dept}</h3>
                    <p className="text-xs text-white/90 line-clamp-1">Shop top {dept.toLowerCase()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products — Square Cards */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold mb-4">Featured Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {(() => {
              const list = featured.slice(0, 5);
              const designs = [FeaturedSquareCardA, FeaturedSquareCardB, FeaturedSquareCardC];
              return list.map((p, idx) => {
                const Cmp = designs[idx % designs.length];
                return <Cmp key={`sq-${p.id}-${idx}`} item={p} />;
              });
            })()}
          </div>
        </div>
      </section>

      {/* Browse Scuba Gear — 2 Rows with Filters */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <h3 className="text-xl font-semibold">Browse Scuba Gear</h3>
            <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar">
              {["All", ...categoryChips].map((category) => (
                <Button
                  key={`browse-${category}`}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  className={activeCategory === category ? '' : 'border-ocean/20 text-ocean hover:bg-ocean hover:text-white'}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            Showing {filteredGear.length} products
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGear.map((item) => (
              <FeaturedProductCard key={`browse-${item.id}`} item={toFeatured(item)} />
            ))}
          </div>
        </div>
      </section>


      {/* Dealer Assurance */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
          <Card className="p-6"><CardContent className="p-0"><div className="flex items-center gap-3"><Shield className="text-ocean" /><div><h3 className="font-bold">Platinum Ocean Reef Dealer</h3><p className="text-sm text-muted-foreground">Full Face Masks & Communications</p></div></div></CardContent></Card>
          <Card className="p-6"><CardContent className="p-0"><div className="flex items-center gap-3"><Award className="text-coral" /><div><h3 className="font-bold">Platinum ScubaPro Dealer</h3><p className="text-sm text-muted-foreground">Official warranty & service</p></div></div></CardContent></Card>
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
                  <Card className="p-6 border-ocean/20"><CardContent className="p-0 text-center"><Award className="w-8 h-8 text-ocean mx-auto mb-3" /><h3 className="font-bold text-foreground mb-2">ScubaPro Platinum Dealer</h3><p className="text-sm text-muted-foreground">Authorized dealer for the world's most trusted diving equipment</p></CardContent></Card>
                  <Card className="p-6 border-coral/20"><CardContent className="p-0 text-center"><Shield className="w-8 h-8 text-coral mx-auto mb-3" /><h3 className="font-bold text-foreground mb-2">Ocean Reef Platinum Dealer</h3><p className="text-sm text-muted-foreground">Professional full face masks and communication systems</p></CardContent></Card>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-ocean hover:bg-ocean/90 text-white font-semibold"><Phone className="w-5 h-5 mr-2" />Call (305) 391-4040</Button>
                  <Button size="lg" variant="outline" className="border-2 border-ocean text-ocean hover:bg-ocean hover:text-white"><Mail className="w-5 h-5 mr-2" />Email for Quote</Button>
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
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Professional service, expert advice, and the best gear selection in the Florida Keys.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mx-auto mb-4"><service.icon className="w-8 h-8 text-white" /></div>
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
            <p className="text-xl text-muted-foreground">We carry equipment from the world's leading dive manufacturers.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 items-center justify-center max-w-2xl mx-auto">
            <div className="text-center opacity-70 hover:opacity-100 transition-opacity"><div className="bg-gray-100 rounded-lg p-8 mb-2"><h3 className="text-2xl font-bold text-gray-600">ScubaPro</h3></div><p className="text-sm text-muted-foreground">Platinum Dealer</p></div>
            <div className="text-center opacity-70 hover:opacity-100 transition-opacity"><div className="bg-gray-100 rounded-lg p-8 mb-2"><h3 className="text-2xl font-bold text-gray-600">Ocean Reef</h3></div><p className="text-sm text-muted-foreground">Platinum Dealer</p></div>
          </div>
        </div>
      </section>
    </>
  );
};

  const DesignC = () => (
    <>
      {/* Minimal premium hero */}
      <section className="pt-28 pb-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-coral" /> Premium Dive Equipment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">Scuba Gear Headquarters</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">Authorized Platinum Dealers for ScubaPro and Ocean Reef. Shop curated gear trusted by professionals.</p>
        </div>
      </section>

      {/* Hydros Pro feature card */}
      <section className="py-8 bg-sage/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2"><FeaturedProductCard item={toFeatured(hydrosPro)} /></div>
            <div className="space-y-4">
              <Card className="p-5"><CardContent className="p-0"><h3 className="font-bold mb-1">Platinum ScubaPro Dealer</h3><p className="text-sm text-muted-foreground">Exclusive products, authentic parts, expert service.</p></CardContent></Card>
              <Card className="p-5"><CardContent className="p-0"><h3 className="font-bold mb-1">Platinum Ocean Reef Dealer</h3><p className="text-sm text-muted-foreground">Full face masks and professional communications.</p></CardContent></Card>
              <Card className="p-5"><CardContent className="p-0"><h3 className="font-bold mb-1">Free Advice</h3><p className="text-sm text-muted-foreground">Call (305) 391-4040 for expert recommendations.</p></CardContent></Card>
            </div>
          </div>
        </div>
      </section>

      {/* Curated collections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Row title="Top Picks" items={allGearItems().slice(0, 8)} />
          <Row title="Ocean Reef Essentials" items={allGearItems().filter(i => /ocean\s*reef/i.test(i.name)).slice(0, 8)} />
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage/5 to-white">
      <Navigation />
      <DesignB />
      <Footer />
    </div>
  );
}
