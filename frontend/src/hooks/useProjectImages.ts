import { useState, useEffect, useCallback } from 'react';
import { 
  StoredImage, 
  fetchProjectImages, 
  getImageUrlWithFallback, 
  getThumbnailUrlWithFallback,
  clearImageCache 
} from '@/lib/imageUtils';

interface UseProjectImagesOptions {
  projectId: string;
  autoFetch?: boolean;
}

interface UseProjectImagesReturn {
  images: StoredImage[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getImageUrl: (fallbackUrl: string, searchName?: string, searchType?: string) => string;
  getThumbnailUrl: (fallbackUrl: string, searchName?: string, searchType?: string) => string;
  findImageByName: (name: string) => StoredImage | undefined;
  findImagesByCategory: (category: string) => StoredImage[];
  clearCache: () => void;
}

export function useProjectImages({ 
  projectId, 
  autoFetch = true 
}: UseProjectImagesOptions): UseProjectImagesReturn {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const fetchedImages = await fetchProjectImages(projectId);
      setImages(fetchedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
      console.error('Error fetching project images:', err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (autoFetch) {
      fetchImages();
    }
  }, [fetchImages, autoFetch]);

  const getImageUrl = useCallback((
    fallbackUrl: string, 
    searchName?: string, 
    searchType?: string
  ) => {
    return getImageUrlWithFallback(images, fallbackUrl, searchName, searchType);
  }, [images]);

  const getThumbnailUrl = useCallback((
    fallbackUrl: string, 
    searchName?: string, 
    searchType?: string
  ) => {
    return getThumbnailUrlWithFallback(images, fallbackUrl, searchName, searchType);
  }, [images]);

  const findImageByName = useCallback((name: string) => {
    return images.find(img => 
      img.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(img.name.toLowerCase())
    );
  }, [images]);

  const findImagesByCategory = useCallback((category: string) => {
    return images.filter(img => 
      img.categories.toLowerCase().includes(category.toLowerCase())
    );
  }, [images]);

  const clearCache = useCallback(() => {
    clearImageCache(projectId);
  }, [projectId]);

  return {
    images,
    loading,
    error,
    refetch: fetchImages,
    getImageUrl,
    getThumbnailUrl,
    findImageByName,
    findImagesByCategory,
    clearCache,
  };
}

// Hook for specific image types
export function useImageByType(projectId: string, type: string) {
  const { images, loading, error } = useProjectImages({ projectId });
  
  const image = images.find(img => {
    const typeMap: { [key: string]: string[] } = {
      'Character': ['character', 'portrait', 'cyber', 'space', 'ocean'],
      'Environment': ['environment', 'city', 'space', 'ocean', 'interior'],
      'Prop': ['prop', 'weapon', 'shield', 'technology'],
      'Vehicle': ['vehicle', 'transportation', 'hover'],
      'Scene': ['scene', 'establishing', 'storyboard'],
    };
    
    const searchTerms = typeMap[type] || [type.toLowerCase()];
    
    return searchTerms.some(term => 
      img.name.toLowerCase().includes(term) ||
      img.categories.toLowerCase().includes(term)
    );
  });

  return {
    image,
    loading,
    error,
    imageUrl: image ? `/api/assets/${image.id}/image/` : null,
    thumbnailUrl: image ? `/api/assets/${image.id}/thumbnail/` : null,
  };
}

// Hook for project background images
export function useProjectBackgroundImage(projectId: string, projectName: string) {
  const { images, loading, error } = useProjectImages({ projectId });
  
  const backgroundImage = images.find(img => {
    const projectMap: { [key: string]: string[] } = {
      'Cyber Nexus': ['cyber', 'nexus', 'city', 'cyberpunk'],
      'Ocean Depths': ['ocean', 'depths', 'underwater'],
      'Space Odyssey': ['space', 'odyssey', 'station'],
    };
    
    const searchTerms = projectMap[projectName] || [projectName.toLowerCase()];
    
    return searchTerms.some(term => 
      img.name.toLowerCase().includes(term) ||
      img.categories.toLowerCase().includes(term)
    );
  });

  return {
    backgroundImage,
    loading,
    error,
    imageUrl: backgroundImage ? `/api/assets/${backgroundImage.id}/image/` : null,
  };
}
