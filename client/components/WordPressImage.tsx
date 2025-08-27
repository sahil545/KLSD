"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { wpImages, OptimizedImageData } from "../lib/wordpress-images";

interface WordPressImageProps {
  // Option 1: Use image ID
  imageId?: number;

  // Option 2: Search by filename/slug
  filename?: string;

  // Option 3: Search by keyword
  searchTerm?: string;

  // Standard image props
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";

  // SEO props
  alt?: string; // Override alt text if needed
  title?: string; // Override title if needed

  // Responsive props
  sizes?: string;

  // Fallback
  fallbackSrc?: string;

  // Callback when image loads
  onLoad?: (imageData: OptimizedImageData) => void;
}

export function WordPressImage({
  imageId,
  filename,
  searchTerm,
  width,
  height,
  className = "",
  priority = false,
  loading = "lazy",
  alt,
  title,
  sizes,
  fallbackSrc = "/placeholder.svg",
  onLoad,
}: WordPressImageProps) {
  const [imageData, setImageData] = useState<OptimizedImageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchImage() {
      setIsLoading(true);
      setError(false);

      try {
        let result: OptimizedImageData | null = null;

        if (imageId) {
          result = await wpImages.getImageById(imageId);
        } else if (filename) {
          const results = await wpImages.getImagesByFilename(filename);
          result = results[0] || null;
        } else if (searchTerm) {
          const results = await wpImages.searchImages(searchTerm, 1);
          result = results[0] || null;
        }

        if (result) {
          setImageData(result);
          onLoad?.(result);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch WordPress image:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (imageId || filename || searchTerm) {
      fetchImage();
    }
  }, [imageId, filename, searchTerm, onLoad]);

  if (isLoading) {
    return (
      <div
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
        aria-label="Loading image..."
      />
    );
  }

  if (error || !imageData) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt || "Image not available"}
        width={width}
        height={height}
        className={className}
        loading={loading}
        priority={priority}
      />
    );
  }

  // Get the best image size for the requested dimensions
  const optimizedSrc = wpImages.getBestImageSize(imageData, width);

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || `(max-width: 768px) 100vw, ${width}px`;

  return (
    <Image
      src={optimizedSrc}
      alt={alt || imageData.alt}
      title={title || imageData.title}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : loading}
      priority={priority}
      sizes={responsiveSizes}
      // SEO optimization: provide srcSet for different sizes
      {...(imageData.sizes.medium &&
        imageData.sizes.large && {
          placeholder: "blur",
          blurDataURL: `data:image/svg+xml;base64,${Buffer.from(
            `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>`,
          ).toString("base64")}`,
        })}
    />
  );
}

// Specialized components for common use cases
export function ScubaCertificationImage(
  props: Omit<WordPressImageProps, "filename">,
) {
  return (
    <WordPressImage
      {...props}
      filename="scuba-diving-certification-florida-keys"
      alt={props.alt || "PADI Scuba Diving Certification in Florida Keys"}
    />
  );
}

export function SnorkelingTourImage(
  props: Omit<WordPressImageProps, "searchTerm">,
) {
  return (
    <WordPressImage
      {...props}
      searchTerm="snorkeling tour key largo"
      alt={props.alt || "Snorkeling tours in Key Largo, Florida"}
    />
  );
}

export function ChristStatueImage(
  props: Omit<WordPressImageProps, "searchTerm">,
) {
  return (
    <WordPressImage
      {...props}
      searchTerm="christ of the abyss statue"
      alt={props.alt || "Christ of the Abyss underwater statue in Key Largo"}
    />
  );
}

// Hook for programmatic access to image data
export function useWordPressImage(
  imageId?: number,
  filename?: string,
  searchTerm?: string,
) {
  const [imageData, setImageData] = useState<OptimizedImageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchImage() {
      if (!imageId && !filename && !searchTerm) return;

      setIsLoading(true);
      setError(false);

      try {
        let result: OptimizedImageData | null = null;

        if (imageId) {
          result = await wpImages.getImageById(imageId);
        } else if (filename) {
          const results = await wpImages.getImagesByFilename(filename);
          result = results[0] || null;
        } else if (searchTerm) {
          const results = await wpImages.searchImages(searchTerm, 1);
          result = results[0] || null;
        }

        setImageData(result);
        if (!result) setError(true);
      } catch (err) {
        console.error("Failed to fetch WordPress image:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImage();
  }, [imageId, filename, searchTerm]);

  return { imageData, isLoading, error };
}
