import { CharacterItem } from '@/components/characterItem';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { fetchCharacters } from '../services/api';
import { addToFavorites, getFavorites, isFavorite, removeFromFavorites } from '../services/favorites';
import { Character } from '../types/Character';

export default function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Character[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadCharacters();
    loadFavorites();
  }, []);

  const loadCharacters = async () => {
    try {
      const data = await fetchCharacters();
      setCharacters(data);
    } catch (error) {
      console.error('Error loading characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  const handleToggleFavorite = (character: Character) => {
    if (isFavorite(character.id)) {
      removeFromFavorites(character.id);
    } else {
      addToFavorites(character);
    }
    loadFavorites();
  };

  const handleCharacterPress = (character: Character) => {
    router.push({
      pathname: '/character-detail',
      params: { characterId: character.id.toString() }
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Caricamento personaggi...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterItem
            character={item}
            onPress={() => handleCharacterPress(item)}
            onToggleFavorite={() => handleToggleFavorite(item)}
            isFavorite={isFavorite(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingVertical: 8,
  },
});