// Mock WooCommerce data for testing when CORS blocks real API

export const MOCK_PRODUCTS = [
  {
    id: 34450,
    name: "Christ of the Abyss Snorkeling Tour",
    price: "89.00",
    regular_price: "89.00",
    sale_price: "",
    stock_quantity: 25,
    stock_status: "instock",
    manage_stock: true,
    in_stock: true,
    permalink: "https://staging13.keylargoscubadiving.com/product/christ-of-the-abyss-snorkeling-tour/",
    status: "publish",
    categories: [
      { id: 15, name: "Snorkeling Tours", slug: "snorkeling-tours" }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        alt: "Christ of the Abyss statue underwater"
      }
    ],
    attributes: []
  },
  {
    id: 34451,
    name: "Molasses Reef Diving Adventure",
    price: "125.00",
    regular_price: "125.00",
    sale_price: "",
    stock_quantity: 20,
    stock_status: "instock",
    manage_stock: true,
    in_stock: true,
    permalink: "https://staging13.keylargoscubadiving.com/product/molasses-reef-diving/",
    status: "publish",
    categories: [
      { id: 16, name: "Dive Trips", slug: "dive-trips" }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
        alt: "Coral reef diving"
      }
    ],
    attributes: []
  },
  {
    id: 34452,
    name: "PADI Open Water Certification",
    price: "499.00",
    regular_price: "499.00",
    sale_price: "",
    stock_quantity: 8,
    stock_status: "instock",
    manage_stock: true,
    in_stock: true,
    permalink: "https://staging13.keylargoscubadiving.com/product/padi-open-water/",
    status: "publish",
    categories: [
      { id: 17, name: "Dive Certifications", slug: "dive-certifications" }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        alt: "PADI certification course"
      }
    ],
    attributes: []
  },
  {
    id: 34453,
    name: "ScubaPro Mask & Snorkel Set",
    price: "89.99",
    regular_price: "99.99",
    sale_price: "89.99",
    stock_quantity: 15,
    stock_status: "instock",
    manage_stock: true,
    in_stock: true,
    permalink: "https://staging13.keylargoscubadiving.com/product/scubapro-mask-snorkel/",
    status: "publish",
    categories: [
      { id: 18, name: "Diving Equipment", slug: "diving-equipment" }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        alt: "Diving mask and snorkel"
      }
    ],
    attributes: []
  },
  {
    id: 34454,
    name: "Night Diving Adventure",
    price: "95.00",
    regular_price: "95.00",
    sale_price: "",
    stock_quantity: 12,
    stock_status: "instock",
    manage_stock: true,
    in_stock: true,
    permalink: "https://staging13.keylargoscubadiving.com/product/night-diving/",
    status: "publish",
    categories: [
      { id: 16, name: "Dive Trips", slug: "dive-trips" }
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
        alt: "Night diving adventure"
      }
    ],
    attributes: []
  }
];

export const MOCK_CATEGORIES = [
  { id: 15, name: "Snorkeling Tours", slug: "snorkeling-tours", count: 5 },
  { id: 16, name: "Dive Trips", slug: "dive-trips", count: 8 },
  { id: 17, name: "Dive Certifications", slug: "dive-certifications", count: 4 },
  { id: 18, name: "Diving Equipment", slug: "diving-equipment", count: 12 }
];

export const MOCK_ORDERS = [
  {
    id: 1001,
    status: "completed",
    total: "89.00",
    date_created: "2024-01-15T10:30:00",
    billing: {
      first_name: "John",
      last_name: "Smith",
      email: "john.smith@email.com"
    }
  }
];
