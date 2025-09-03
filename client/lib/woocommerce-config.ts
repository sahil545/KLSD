// WooCommerce configuration for Key Largo Scuba Diving
// Uses environment variables for security

export const WOOCOMMERCE_CONFIG = {
  url: "https://keylargoscubadiving.com",
  // API credentials should be set in environment variables
  consumerKey: "ck_d0e9e6f20a1ecc40f797058c27e46aee21bf10b9",
  consumerSecret: "cs_3d3aa1c520bd3687d83ae3932b70683a7126af28",
};

// Helper function to get config with environment variable fallbacks
export const getWooCommerceConfig = {
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || WOOCOMMERCE_CONFIG.url,
  consumerKey:
    process.env.NEXT_PUBLIC_WOOCOMMERCE_KEY || WOOCOMMERCE_CONFIG.consumerKey,
  consumerSecret:
    process.env.WOOCOMMERCE_SECRET || WOOCOMMERCE_CONFIG.consumerSecret,
};

export const auth = btoa(
  `${getWooCommerceConfig.consumerKey}:${getWooCommerceConfig.consumerSecret}`,
);
