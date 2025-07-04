import { Character } from '../types/Character';

const API_BASE_URL = 'https://thronesapi.com/api/v2';

export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Characters`);
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};