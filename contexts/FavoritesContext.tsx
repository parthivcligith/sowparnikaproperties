import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (propertyId: string) => void;
  removeFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  toggleFavorite: (propertyId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  // Get storage key based on user ID
  const getStorageKey = useCallback(() => {
    if (user) {
      return `favorites_${user.id}`;
    }
    return 'favorites_guest';
  }, [user]);

  // Load favorites from localStorage on mount and when user changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storageKey = getStorageKey();
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, [getStorageKey]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storageKey = getStorageKey();
    try {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites, getStorageKey]);

  const addFavorite = useCallback((propertyId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(propertyId)) {
        return [...prev, propertyId];
      }
      return prev;
    });
  }, []);

  const removeFavorite = useCallback((propertyId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== propertyId));
  }, []);

  const isFavorite = useCallback((propertyId: string) => {
    return favorites.includes(propertyId);
  }, [favorites]);

  const toggleFavorite = useCallback((propertyId: string) => {
    setFavorites((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

