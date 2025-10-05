// Image utility functions for integrating stored UXCanvas images
export interface StoredImage {
  id: number;
  name: string;
  description: string;
  categories: string;
  ai_enhanced: boolean;
  is_rendered: boolean;
  created_at: string;
  updated_at: string;
  image_url: string;
  thumbnail_url: string;
}

export interface ProjectImagesResponse {
  project: string;
  images: StoredImage[];
  count: number;
}

// Cache for storing image metadata
let imageCache: Map<string, StoredImage[]> = new Map();

/**
 * Fetch all images for a specific project
 */
export async function fetchProjectImages(projectId: string): Promise<StoredImage[]> {
  const cacheKey = projectId;
  
  // Check cache first
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }
  
  try {
    const response = await fetch(`/api/assets/project-images/?project=${projectId}`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }
    
    const data: ProjectImagesResponse = await response.json();
    imageCache.set(cacheKey, data.images);
    return data.images;
  } catch (error) {
    console.error('Error fetching project images:', error);
    return [];
  }
}

/**
 * Get image URL for a specific asset ID
 */
export function getAssetImageUrl(assetId: number): string {
  return `/api/assets/${assetId}/image/`;
}

/**
 * Get thumbnail URL for a specific asset ID
 */
export function getAssetThumbnailUrl(assetId: number): string {
  return `/api/assets/${assetId}/thumbnail/`;
}

/**
 * Find an image by name in the project images
 */
export function findImageByName(images: StoredImage[], name: string): StoredImage | undefined {
  return images.find(img => 
    img.name.toLowerCase().includes(name.toLowerCase()) ||
    name.toLowerCase().includes(img.name.toLowerCase())
  );
}

/**
 * Find images by category
 */
export function findImagesByCategory(images: StoredImage[], category: string): StoredImage[] {
  return images.filter(img => 
    img.categories.toLowerCase().includes(category.toLowerCase())
  );
}

/**
 * Get image by type (Character, Environment, Prop, Vehicle, etc.)
 */
export function getImageByType(images: StoredImage[], type: string): StoredImage | undefined {
  const typeMap: { [key: string]: string[] } = {
    'Character': ['character', 'portrait', 'cyber', 'space', 'ocean'],
    'Environment': ['environment', 'city', 'space', 'ocean', 'interior'],
    'Prop': ['prop', 'weapon', 'shield', 'technology'],
    'Vehicle': ['vehicle', 'transportation', 'hover'],
    'Scene': ['scene', 'establishing', 'storyboard'],
  };
  
  const searchTerms = typeMap[type] || [type.toLowerCase()];
  
  for (const term of searchTerms) {
    const found = images.find(img => 
      img.name.toLowerCase().includes(term) ||
      img.categories.toLowerCase().includes(term)
    );
    if (found) return found;
  }
  
  return undefined;
}

/**
 * Fallback to UXCanvas URL if stored image not found
 */
export function getImageUrlWithFallback(
  images: StoredImage[], 
  fallbackUrl: string, 
  searchName?: string,
  searchType?: string
): string {
  let storedImage: StoredImage | undefined;
  
  if (searchName) {
    storedImage = findImageByName(images, searchName);
  } else if (searchType) {
    storedImage = getImageByType(images, searchType);
  }
  
  if (storedImage) {
    return getAssetImageUrl(storedImage.id);
  }
  
  return fallbackUrl;
}

/**
 * Get thumbnail URL with fallback
 */
export function getThumbnailUrlWithFallback(
  images: StoredImage[], 
  fallbackUrl: string, 
  searchName?: string,
  searchType?: string
): string {
  let storedImage: StoredImage | undefined;
  
  if (searchName) {
    storedImage = findImageByName(images, searchName);
  } else if (searchType) {
    storedImage = getImageByType(images, searchType);
  }
  
  if (storedImage) {
    return getAssetThumbnailUrl(storedImage.id);
  }
  
  return fallbackUrl;
}

/**
 * Clear image cache (useful for refreshing data)
 */
export function clearImageCache(projectId?: string): void {
  if (projectId) {
    imageCache.delete(projectId);
  } else {
    imageCache.clear();
  }
}
