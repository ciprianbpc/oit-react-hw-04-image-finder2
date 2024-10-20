import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'your_key_here'; // Introdu aici cheia API

export const useImageSearch = (query, page) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const newImages = response.data.hits;
        setImages((prevImages) => (page === 1 ? newImages : [...prevImages, ...newImages]));
        setHasMore(newImages.length > 0);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  return { images, isLoading, hasMore };
};
