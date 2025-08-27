// WordPress Images API with SEO optimization
interface WordPressImage {
  id: number;
  title: {
    rendered: string;
  };
  alt_text: string;
  caption: {
    rendered: string;
  };
  description: {
    rendered: string;
  };
  media_type: string;
  mime_type: string;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      [key: string]: {
        file: string;
        width: number;
        height: number;
        source_url: string;
      };
    };
  };
  slug: string;
  date: string;
}

interface OptimizedImageData {
  id: number;
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  caption?: string;
  description?: string;
  sizes: {
    thumbnail?: string;
    medium?: string;
    large?: string;
    full: string;
  };
  slug: string;
  seoFilename: string;
}

export class WordPressImageAPI {
  private baseUrl = "https://keylargoscubadiving.com";

  /**
   * Fetch image by ID with full SEO data
   */
  async getImageById(id: number): Promise<OptimizedImageData | null> {
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/media/${id}`);
      if (!response.ok) return null;

      const image: WordPressImage = await response.json();
      return this.optimizeImageData(image);
    } catch (error) {
      console.error(`Failed to fetch image ${id}:`, error);
      return null;
    }
  }

  /**
   * Search images by filename, alt text, or title
   */
  async searchImages(
    query: string,
    limit: number = 10,
  ): Promise<OptimizedImageData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/media?search=${encodeURIComponent(query)}&per_page=${limit}`,
      );
      if (!response.ok) return [];

      const images: WordPressImage[] = await response.json();
      return images
        .map((img) => this.optimizeImageData(img))
        .filter(Boolean) as OptimizedImageData[];
    } catch (error) {
      console.error(`Failed to search images for "${query}":`, error);
      return [];
    }
  }

  /**
   * Get images by filename pattern (e.g., "scuba-diving-certification")
   */
  async getImagesByFilename(filename: string): Promise<OptimizedImageData[]> {
    return this.searchImages(filename);
  }

  /**
   * Get recent images
   */
  async getRecentImages(limit: number = 20): Promise<OptimizedImageData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/media?per_page=${limit}&orderby=date&order=desc`,
      );
      if (!response.ok) return [];

      const images: WordPressImage[] = await response.json();
      return images
        .map((img) => this.optimizeImageData(img))
        .filter(Boolean) as OptimizedImageData[];
    } catch (error) {
      console.error("Failed to fetch recent images:", error);
      return [];
    }
  }

  /**
   * Convert WordPress image data to SEO-optimized format
   */
  private optimizeImageData(image: WordPressImage): OptimizedImageData {
    // Extract SEO-friendly filename from URL
    const urlParts = image.source_url.split("/");
    const filename = urlParts[urlParts.length - 1];
    const seoFilename = filename.replace(/\.[^/.]+$/, ""); // Remove extension

    // Build responsive image sizes
    const sizes: OptimizedImageData["sizes"] = {
      full: image.source_url,
    };

    if (image.media_details?.sizes) {
      Object.entries(image.media_details.sizes).forEach(([key, size]) => {
        if (["thumbnail", "medium", "large"].includes(key)) {
          sizes[key as keyof typeof sizes] = size.source_url;
        }
      });
    }

    // Use alt text, fallback to title, fallback to SEO filename
    const altText =
      image.alt_text ||
      image.title?.rendered ||
      seoFilename.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    return {
      id: image.id,
      src: image.source_url,
      alt: altText,
      title: image.title?.rendered || altText,
      width: image.media_details?.width || 800,
      height: image.media_details?.height || 600,
      caption: image.caption?.rendered || undefined,
      description: image.description?.rendered || undefined,
      sizes,
      slug: image.slug,
      seoFilename,
    };
  }

  /**
   * Get the best image size for a given container width
   */
  getBestImageSize(
    imageData: OptimizedImageData,
    containerWidth: number,
  ): string {
    if (containerWidth <= 150 && imageData.sizes.thumbnail) {
      return imageData.sizes.thumbnail;
    }
    if (containerWidth <= 300 && imageData.sizes.medium) {
      return imageData.sizes.medium;
    }
    if (containerWidth <= 600 && imageData.sizes.large) {
      return imageData.sizes.large;
    }
    return imageData.sizes.full;
  }
}

// Singleton instance
export const wpImages = new WordPressImageAPI();

// Helper function to quickly get an image by searching filename
export async function getImageByFilename(
  filename: string,
): Promise<OptimizedImageData | null> {
  const results = await wpImages.getImagesByFilename(filename);
  return results.length > 0 ? results[0] : null;
}

// Helper function for common scuba diving images
export async function getScubaImage(
  type: "certification" | "snorkeling" | "diving" | "gear" | "tours",
): Promise<OptimizedImageData | null> {
  const searchTerms = {
    certification: "scuba-diving-certification",
    snorkeling: "snorkeling-tour",
    diving: "scuba-diving",
    gear: "scuba-gear",
    tours: "key-largo-tours",
  };

  return getImageByFilename(searchTerms[type]);
}

export type { OptimizedImageData };
