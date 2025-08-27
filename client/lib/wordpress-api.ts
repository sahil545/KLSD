/**
 * WordPress/WooCommerce API utilities for content management
 */

interface WordPressConfig {
  baseUrl: string;
  consumerKey?: string;
  consumerSecret?: string;
  username?: string;
  password?: string;
}

class WordPressAPI {
  private config: WordPressConfig;

  constructor(config: WordPressConfig) {
    this.config = config;
  }

  async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.config.baseUrl}/wp-json${endpoint}`;
    
    // Basic auth for REST API
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add authentication if available
    if (this.config.username && this.config.password) {
      const credentials = btoa(`${this.config.username}:${this.config.password}`);
      headers['Authorization'] = `Basic ${credentials}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('WordPress API Request Failed:', error);
      throw error;
    }
  }

  // Get all products
  async getProducts(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.makeRequest(`/wc/v3/products?${queryString}`);
  }

  // Get single product
  async getProduct(productId: number) {
    return await this.makeRequest(`/wc/v3/products/${productId}`);
  }

  // Get product categories
  async getProductCategories() {
    return await this.makeRequest('/wc/v3/products/categories');
  }

  // Get products by category
  async getProductsByCategory(categorySlug: string) {
    return await this.makeRequest(`/wc/v3/products?category=${categorySlug}`);
  }

  // Get all posts
  async getPosts(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.makeRequest(`/wp/v2/posts?${queryString}`);
  }

  // Get single post
  async getPost(postId: number) {
    return await this.makeRequest(`/wp/v2/posts/${postId}`);
  }

  // Get all pages
  async getPages(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.makeRequest(`/wp/v2/pages?${queryString}`);
  }

  // Get single page
  async getPage(pageId: number) {
    return await this.makeRequest(`/wp/v2/pages/${pageId}`);
  }

  // Get post categories
  async getPostCategories() {
    return await this.makeRequest('/wp/v2/categories');
  }

  // Get page parent pages (for hierarchical structure)
  async getPageHierarchy() {
    return await this.makeRequest('/wp/v2/pages?per_page=100&orderby=menu_order&order=asc');
  }

  // Update product meta data
  async updateProductMeta(productId: number, metaData: any) {
    return await this.makeRequest(`/wc/v3/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({
        meta_data: Object.entries(metaData).map(([key, value]) => ({
          key,
          value: typeof value === 'object' ? JSON.stringify(value) : value
        }))
      })
    });
  }

  // Get product meta data
  async getProductMeta(productId: number) {
    const product = await this.getProduct(productId);
    const metaData: any = {};
    
    if (product.meta_data) {
      product.meta_data.forEach((meta: any) => {
        try {
          // Try to parse JSON, fallback to string
          metaData[meta.key] = JSON.parse(meta.value);
        } catch {
          metaData[meta.key] = meta.value;
        }
      });
    }
    
    return metaData;
  }

  // Save tour content data
  async saveTourContent(productId: number, tourData: any) {
    return await this.updateProductMeta(productId, {
      '_klsd_comprehensive_tour_data': tourData
    });
  }

  // Get tour content data
  async getTourContent(productId: number) {
    const metaData = await this.getProductMeta(productId);
    return metaData['_klsd_comprehensive_tour_data'] || this.getDefaultTourData();
  }

  // Default tour data structure
  private getDefaultTourData() {
    return {
      // Hero Section
      hero_title: '',
      hero_description: '',
      hero_rating: '4.9',
      hero_review_count: '487',
      hero_badges: [
        'Best Seller',
        'Small Groups',
        'Expert Guide'
      ],
      
      // Quick Info
      duration: '4 Hours',
      group_size: '25 Max',
      location: 'Key Largo',
      difficulty: 'All Levels',
      gear_included: 'yes',
      meeting_point: 'John Pennekamp Coral Reef State Park',
      
      // Highlights/What's Included
      highlights: [
        'Famous 9-foot bronze Christ statue in crystal-clear water',
        'All snorkeling equipment included',
        'PADI certified guides',
        'Small group experience',
        'Underwater photography opportunities',
        'Transportation to/from snorkel sites',
        'Light refreshments and water'
      ],
      
      // Experience Cards
      experience_cards: [
        {
          icon: '🐠',
          title: 'Marine Life',
          description: 'Encounter tropical fish, sea turtles, and vibrant coral formations'
        },
        {
          icon: '📸',
          title: 'Photography',
          description: 'Capture unforgettable underwater moments with our guide assistance'
        },
        {
          icon: '����️',
          title: 'Safety First',
          description: 'Comprehensive safety briefing and constant guide supervision'
        },
        {
          icon: '🌊',
          title: 'Crystal Waters',
          description: 'Experience the clearest waters in the Florida Keys'
        }
      ],
      
      // Journey Timeline
      journey_timeline: [
        {
          time: '8:00 AM',
          title: 'Check-in & Safety Briefing',
          description: 'Meet your guide, get fitted for equipment, and learn safety procedures'
        },
        {
          time: '8:30 AM',
          title: 'Boat Departure',
          description: 'Short scenic boat ride to the Christ statue location'
        },
        {
          time: '9:00 AM',
          title: 'First Snorkel Session',
          description: 'Explore the famous Christ of the Abyss statue and surrounding reef'
        },
        {
          time: '10:30 AM',
          title: 'Surface Break',
          description: 'Rest, hydrate, and share your experience with fellow snorkelers'
        },
        {
          time: '11:00 AM',
          title: 'Second Dive Site',
          description: 'Visit additional coral formations and marine life habitats'
        },
        {
          time: '12:00 PM',
          title: 'Return to Shore',
          description: 'Head back with memories and photos of your underwater adventure'
        }
      ],
      
      // Marine Life Section
      marine_life: {
        title: 'Marine Life You\'ll Encounter',
        description: 'The waters around the Christ statue teem with diverse marine life',
        species: [
          'Tropical Fish (Angelfish, Parrotfish, Sergeant Major)',
          'Sea Turtles (Green and Loggerhead)',
          'Coral Formations (Brain Coral, Staghorn Coral)',
          'Rays (Southern Stingray)',
          'Moray Eels',
          'Grouper and Snapper'
        ]
      },
      
      // Business Information
      business_name: 'Key Largo Scuba Diving',
      business_phone: '(305) 391-4040',
      business_email: 'info@keylargoscuba.com',
      experience_years: '25+',
      happy_guests: '50,000+',
      safety_record: '100% Safety Record',
      certifications: 'PADI Certified Guides',
      
      // Pricing & CTA
      pricing_title: 'Secure Your Underwater Adventure',
      pricing_description: 'Book now to guarantee your spot on this once-in-a-lifetime experience',
      trust_signals: [
        'Free Cancellation up to 24 hours',
        'Instant Confirmation',
        'Best Price Guarantee',
        'Expert Local Guides'
      ],
      cta_primary: 'Book Your Adventure Now',
      cta_secondary: 'Call for Questions',
      
      // Special Features
      special_features: {
        title: 'What Makes This Experience Special',
        description: 'This isn\'t just snorkeling – it\'s a spiritual and natural experience that combines art, marine conservation, and the beauty of the Florida Keys.',
        features: [
          'Only underwater statue of its kind in North America',
          'Installed in 1965 as a symbol of peace and protection',
          'Located in John Pennekamp Coral Reef State Park',
          'Part of the Florida Keys National Marine Sanctuary'
        ]
      }
    };
  }
}

// Default WordPress configuration
const defaultConfig: WordPressConfig = {
  baseUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://your-wordpress-site.com',
  username: process.env.NEXT_PUBLIC_WORDPRESS_USERNAME,
  password: process.env.NEXT_PUBLIC_WORDPRESS_PASSWORD,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
};

export const wordpressAPI = new WordPressAPI(defaultConfig);
export { WordPressAPI, type WordPressConfig };
