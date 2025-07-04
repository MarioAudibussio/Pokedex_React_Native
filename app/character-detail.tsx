import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchCharacters } from './services/api';
import { addToFavorites, isFavorite, removeFromFavorites } from './services/favorites';
import { Character } from './types/Character';

export default function CharacterDetailScreen() {
  const { characterId } = useLocalSearchParams<{ characterId: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCharacterFavorite, setIsCharacterFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadCharacter();
  }, [characterId]);

  const loadCharacter = async () => {
    try {
      const characters = await fetchCharacters();
      const foundCharacter = characters.find(c => c.id.toString() === characterId);
      if (foundCharacter) {
        setCharacter(foundCharacter);
        setIsCharacterFavorite(isFavorite(foundCharacter.id));
      }
    } catch (error) {
      console.error('Error loading character:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (!character) return;
    
    if (isCharacterFavorite) {
      removeFromFavorites(character.id);
    } else {
      addToFavorites(character);
    }
    setIsCharacterFavorite(!isCharacterFavorite);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Caricamento...</Text>
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.errorContainer}>
        <Text>Personaggio non trovato</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{character.fullName}</Text>
        <Text style={styles.title}>{character.title}</Text>
        <Text style={styles.family}>Casa: {character.family}</Text>
        
        <TouchableOpacity
          style={[styles.favoriteButton, isCharacterFavorite && styles.favoriteActive]}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.favoriteText}>
            {isCharacterFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  family: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  favoriteButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  favoriteActive: {
    backgroundColor: '#FF3B30',
  },
  favoriteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});