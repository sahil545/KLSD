// WooCommerce API Integration for Key Largo Scuba Diving
import { getWooCommerceConfig } from "./woocommerce-config";

interface WooCommerceConfig {
  url: string;
  consumerKey: string;
  consumerSecret: string;
}

export interface WooCommerceProduct {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description?: string;
  short_description?: string;
  stock_quantity: number;
  stock_status: string;
  manage_stock: boolean;
  in_stock: boolean;
  permalink: string;
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  images: Array<{
    src: string;
    alt: string;
  }>;
  attributes: Array<{
    name: string;
    options: string[];
  }>;
  meta_data?: Array<{
    key: string;
    value: string | number | boolean;
  }>;
}

interface CartItem {
  product_id: number;
  quantity: number;
  variation_id?: number;
  variation?: Record<string, string>;
}

interface OrderData {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
  line_items: Array<{
    product_id: number;
    quantity: number;
    variation_id?: number;
  }>;
  meta_data?: Array<{
    key: string;
    value: string;
  }>;
}

interface TourBookingData {
  productId: number;
  quantity: number;
  tourDate: string;
  tourTime: string;
  customerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location?: string;
    specialRequests?: string;
  };
}

// Define the interface for the WooCommerceAPI class
export interface WooCommerceAPIInterface {
  getProduct(productId: number): Promise<WooCommerceProduct>;
  getProductBySlug(slug: string): Promise<WooCommerceProduct | null>;
  getProductStock(productId: number): Promise<{
    stock_quantity: number;
    stock_status: string;
    in_stock: boolean;
  }>;
  updateProductStock(
    productId: number,
    stockQuantity: number,
  ): Promise<WooCommerceProduct>;
  createOrder(orderData: OrderData): Promise<any>;
  getOrder(orderId: number): Promise<any>;
  getRecentOrders(limit?: number): Promise<any[]>;
  getOrdersByEmail(email: string): Promise<any[]>;
  getCustomer(customerId: number): Promise<any>;
  searchCustomers(search: string): Promise<any[]>;
  addToCart(
    productId: number,
    quantity?: number,
    variationId?: number,
  ): Promise<any>;
  testConnection(): Promise<{
    success: boolean;
    error?: string;
    message: string;
    isCorsError: boolean;
  }>;
  getTourAvailability(
    productId: number,
    date: string,
  ): Promise<{
    available: boolean;
    spotsLeft: number;
    timeSlots: Array<{
      time: string;
      available: boolean;
      spotsLeft: number;
    }>;
  }>;
  createTourBooking(bookingData: TourBookingData): Promise<any>;
  makeRequest(endpoint: string, options?: RequestInit): Promise<any>;
}

class WooCommerceAPI implements WooCommerceAPIInterface {
  private config: WooCommerceConfig;
  private baseUrl: string;

  constructor() {
    // Get configuration from environment variables or fallback config
    this.config = getWooCommerceConfig;
    this.baseUrl = `${this.config.url}/wp-json/wc/v3`;
  }

  async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const auth = btoa(
      `${this.config.consumerKey}:${this.config.consumerSecret}`,
    );

    try {
      const response = await fetch(url, {
        cache: "no-store",
        ...options,
        mode: "cors", // Explicitly set CORS mode
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        // Use clone to safely read error details
        const responseClone = response.clone();
        let errorText: string;

        try {
          errorText = await responseClone.text();
        } catch {
          errorText = `HTTP ${response.status} ${response.statusText}`;
        }

        throw new Error(
          `WooCommerce API Error: ${response.status} - ${errorText}`,
        );
      }

      return response.json();
    } catch (error) {
      // Check for network/CORS errors that are expected during development
      if (
        error instanceof TypeError &&
        (error.message.includes("fetch") ||
          error.message.includes("Failed to fetch") ||
          error.message.includes("NetworkError") ||
          error.name === "TypeError")
      ) {
        // This is a CORS/network error - expected during development
        throw new Error(
          `CORS Error: Cannot connect to ${this.config.url}. This is likely due to Cross-Origin restrictions. When deployed to the same domain, this will work.`,
        );
      }
      throw error;
    }
  }

  // Get product details
  async getProduct(productId: number): Promise<WooCommerceProduct> {
    return this.makeRequest(
      `/products/${productId}?_fields=id,name,price,regular_price,sale_price,description,short_description,stock_quantity,stock_status,in_stock,permalink,categories,images,attributes,meta_data,wcf_tour_data`,
    );
  }

  // Search for product by slug
  async getProductBySlug(slug: string): Promise<WooCommerceProduct | null> {
    try {
      const products = await this.makeRequest(
        `/products?slug=${encodeURIComponent(slug)}&per_page=1&_fields=id,name,price,regular_price,sale_price,description,short_description,stock_quantity,stock_status,in_stock,permalink,categories,images,attributes,meta_data,wcf_tour_data`,
      );
      return products.length > 0 ? products[0] : null;
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      return null;
    }
  }

  // Get product stock status
  async getProductStock(productId: number): Promise<{
    stock_quantity: number;
    stock_status: string;
    in_stock: boolean;
  }> {
    const product = await this.getProduct(productId);
    return {
      stock_quantity: product.stock_quantity,
      stock_status: product.stock_status,
      in_stock: product.in_stock,
    };
  }

  // Update product stock
  async updateProductStock(
    productId: number,
    stockQuantity: number,
  ): Promise<WooCommerceProduct> {
    return this.makeRequest(`/products/${productId}`, {
      method: "PUT",
      body: JSON.stringify({
        stock_quantity: stockQuantity,
        manage_stock: true,
      }),
    });
  }

  // Create an order
  async createOrder(orderData: OrderData): Promise<{
    id: number;
    status: string;
    total: string;
    billing: OrderData["billing"];
    line_items: OrderData["line_items"];
  }> {
    return this.makeRequest("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  // Get order details
  async getOrder(orderId: number): Promise<any> {
    return this.makeRequest(`/orders/${orderId}`);
  }

  // Get recent orders
  async getRecentOrders(limit: number = 5): Promise<any[]> {
    return this.makeRequest(
      `/orders?per_page=${limit}&orderby=date&order=desc`,
    );
  }

  // Search orders by customer email
  async getOrdersByEmail(email: string): Promise<any[]> {
    return this.makeRequest(`/orders?search=${encodeURIComponent(email)}`);
  }

  // Get customer data
  async getCustomer(customerId: number): Promise<any> {
    return this.makeRequest(`/customers/${customerId}`);
  }

  // Search customers
  async searchCustomers(search: string): Promise<any[]> {
    return this.makeRequest(`/customers?search=${encodeURIComponent(search)}`);
  }

  // Add product to cart (using WooCommerce Store API)
  async addToCart(
    productId: number,
    quantity: number = 1,
    variationId?: number,
  ): Promise<any> {
    const cartData: {
      id: number;
      quantity: number;
      variation_id?: number;
    } = {
      id: productId,
      quantity: quantity,
    };

    if (variationId) {
      cartData.variation_id = variationId;
    }

    // Note: This uses the Store API which requires different authentication
    const storeApiUrl = `${this.config.url}/wp-json/wc/store/v1/cart/add-item`;

    const response = await fetch(storeApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Nonce: await this.getNonce(), // You'll need to implement nonce handling
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add to cart: ${response.statusText}`);
    }

    return response.json();
  }

  // Get WordPress nonce (needed for Store API)
  private async getNonce(): Promise<string> {
    // This would typically be retrieved from your WordPress site
    // For now, return empty string - you may need to implement proper nonce handling
    return "";
  }

  // Test connection
  async testConnection(): Promise<{
    success: boolean;
    error?: string;
    message: string;
    isCorsError: boolean;
  }> {
    try {
      const response = await this.makeRequest("/products?per_page=1");
      return {
        success: Array.isArray(response),
        message: `Successfully connected! Found ${response.length} products.`,
        isCorsError: false,
      };
    } catch (error) {
      const isCorsError =
        error instanceof Error &&
        (error.message.includes("CORS Error") ||
          error.message.includes("Failed to fetch") ||
          error.name === "TypeError");

      if (isCorsError) {
        // Don't log CORS errors to console - they're expected during development
        return {
          success: false,
          error: "CORS_BLOCKED",
          message: "Demo mode active (CORS blocked during development)",
          isCorsError: true,
        };
      }

      console.error("WooCommerce connection error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Connection failed. Check credentials and network.",
        isCorsError: false,
      };
    }
  }

  // Get tour availability (custom implementation)
  async getTourAvailability(
    productId: number,
    date: string,
  ): Promise<{
    available: boolean;
    spotsLeft: number;
    timeSlots: Array<{
      time: string;
      available: boolean;
      spotsLeft: number;
    }>;
  }> {
    // This would typically check your booking system
    // For now, return mock data with real stock info
    const stock = await this.getProductStock(productId);

    return {
      available: stock.in_stock,
      spotsLeft: stock.stock_quantity,
      timeSlots: [
        {
          time: "8:00 AM",
          available: true,
          spotsLeft: Math.floor(stock.stock_quantity / 2),
        },
        {
          time: "1:00 PM",
          available: stock.stock_quantity > 5,
          spotsLeft: Math.max(0, stock.stock_quantity - 10),
        },
      ],
    };
  }

  // Create booking order with tour-specific metadata
  async createTourBooking(bookingData: TourBookingData): Promise<any> {
    const orderData: OrderData = {
      payment_method: "pending",
      payment_method_title: "Pending Payment",
      set_paid: false,
      billing: {
        first_name: bookingData.customerData.firstName,
        last_name: bookingData.customerData.lastName,
        email: bookingData.customerData.email,
        phone: bookingData.customerData.phone,
        address_1: bookingData.customerData.location || "",
        city: "Key Largo",
        state: "FL",
        postcode: "33037",
        country: "US",
      },
      shipping: {
        first_name: bookingData.customerData.firstName,
        last_name: bookingData.customerData.lastName,
        address_1: bookingData.customerData.location || "",
        city: "Key Largo",
        state: "FL",
        postcode: "33037",
        country: "US",
      },
      line_items: [
        {
          product_id: bookingData.productId,
          quantity: bookingData.quantity,
        },
      ],
      meta_data: [
        {
          key: "_tour_date",
          value: bookingData.tourDate,
        },
        {
          key: "_tour_time",
          value: bookingData.tourTime,
        },
        {
          key: "_guest_location",
          value: bookingData.customerData.location || "",
        },
        {
          key: "_special_requests",
          value: bookingData.customerData.specialRequests || "",
        },
        {
          key: "_booking_source",
          value: "Conversion Optimized Page",
        },
      ],
    };

    return this.createOrder(orderData);
  }
}

// Export singleton instance with proper typing
export const wooCommerce: WooCommerceAPIInterface = new WooCommerceAPI();

// Export types for use in components
export type { CartItem, OrderData, TourBookingData };
