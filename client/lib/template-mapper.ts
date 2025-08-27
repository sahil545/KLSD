/**
 * Template Mapper - Maps WooCommerce product categories to specific templates
 * This system determines which template to use based on product categories
 */

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parent?: number;
}

export interface TemplateMapping {
  templatePath: string;
  templateName: string;
  description: string;
  categories: string[];
  parentCategories: string[];
}

// Template mappings configuration
export const TEMPLATE_MAPPINGS: TemplateMapping[] = [
  {
    templatePath: "/christ-statue-tour",
    templateName: "Christ Statue Tour (Snorkeling Template)",
    description: "For snorkeling tours, diving trips, and water activities",
    categories: [
      "snorkeling",
      "snorkel",
      "tours",
      "trips",
      "diving",
      "dive",
      "water-activities",
      "marine-tours",
    ],
    parentCategories: ["all-tours-trips", "tours-trips", "all-tours-and-trips"],
  },
  {
    templatePath: "/product-template-1a",
    templateName: "Scuba Gear Template",
    description: "For diving equipment, gear, and accessories",
    categories: [
      "scuba-gear",
      "diving-gear",
      "equipment",
      "gear",
      "accessories",
      "diving-equipment",
      "underwater-gear",
    ],
    parentCategories: ["scuba-gear", "diving-gear", "equipment"],
  },
  {
    templatePath: "/certification-template",
    templateName: "Certification Template",
    description: "For PADI courses, certifications, and training",
    categories: [
      "certification",
      "certifications",
      "courses",
      "training",
      "padi",
      "education",
      "certification-courses",
    ],
    parentCategories: ["certification-courses", "certifications", "training"],
  },
];

/**
 * Get template mapping for a product based on its categories
 * @param categories Array of product categories
 * @returns Template mapping or null if no match found
 */
export function getTemplateForProduct(
  categories: ProductCategory[],
): TemplateMapping | null {
  if (!categories || categories.length === 0) {
    return null;
  }

  // Convert category names to lowercase for comparison
  const categoryNames = categories.map((cat) => cat.name.toLowerCase());
  const categorySlugs = categories.map((cat) => cat.slug.toLowerCase());

  // Find parent categories (categories with no parent or parent = 0)
  const parentCategories = categories
    .filter((cat) => !cat.parent || cat.parent === 0)
    .map((cat) => cat.name.toLowerCase());

  // Check each template mapping
  for (const mapping of TEMPLATE_MAPPINGS) {
    // Check if any category matches the template's category patterns
    const categoryMatch = mapping.categories.some(
      (pattern) =>
        categoryNames.some((name) => name.includes(pattern)) ||
        categorySlugs.some((slug) => slug.includes(pattern)),
    );

    // Check if any parent category matches the template's parent category patterns
    const parentCategoryMatch = mapping.parentCategories.some((pattern) =>
      parentCategories.some(
        (name) =>
          name.includes(pattern) ||
          name.replace(/[-\s]/g, "").includes(pattern.replace(/[-\s]/g, "")),
      ),
    );

    if (categoryMatch || parentCategoryMatch) {
      return mapping;
    }
  }

  return null;
}

/**
 * Check if a product belongs to Tours & Trips category (enhanced version)
 * @param categories Array of product categories
 * @returns boolean
 */
export function isTourProduct(categories: ProductCategory[]): boolean {
  const mapping = getTemplateForProduct(categories);
  return mapping?.templatePath === "/christ-statue-tour";
}

/**
 * Check if a product belongs to Scuba Gear category
 * @param categories Array of product categories
 * @returns boolean
 */
export function isScubaGearProduct(categories: ProductCategory[]): boolean {
  const mapping = getTemplateForProduct(categories);
  return mapping?.templatePath === "/product-template-1a";
}

/**
 * Check if a product belongs to Certification category
 * @param categories Array of product categories
 * @returns boolean
 */
export function isCertificationProduct(categories: ProductCategory[]): boolean {
  const mapping = getTemplateForProduct(categories);
  return mapping?.templatePath === "/certification-template";
}

/**
 * Get all available templates
 * @returns Array of all template mappings
 */
export function getAllTemplates(): TemplateMapping[] {
  return TEMPLATE_MAPPINGS;
}

/**
 * Get template by path
 * @param templatePath Template path to search for
 * @returns Template mapping or null
 */
export function getTemplateByPath(
  templatePath: string,
): TemplateMapping | null {
  return (
    TEMPLATE_MAPPINGS.find(
      (mapping) => mapping.templatePath === templatePath,
    ) || null
  );
}
