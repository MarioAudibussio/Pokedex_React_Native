import { MMKV } from 'react-native-mmkv';
import { Character } from '../types/Character';

const storage = new MMKV();
const FAVORITES_KEY = 'favorites';

export const getFavorites = (): Character[] => {
  try {
    const favorites = storage.getString(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addToFavorites = (character: Character): void => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = [...favorites, character];
    storage.set(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const removeFromFavorites = (characterId: number): void => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(char => char.id !== characterId);
    storage.set(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

export const isFavorite = (characterId: number): boolean => {
  try {
    const favorites = getFavorites();
    return favorites.some(char => char.id === characterId);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};