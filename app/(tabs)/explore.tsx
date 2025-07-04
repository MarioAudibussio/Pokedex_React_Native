import { CharacterItem } from '@/components/characterItem';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getFavorites, removeFromFavorites } from '../services/favorites';
import { Character } from '../types/Character';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const router = useRouter();

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleToggleFavorite = (character: Character) => {
    removeFromFavorites(character.id);
    loadFavorites();
  };

  const handleCharacterPress = (character: Character) => {
    router.push({
      pathname: '/character-detail',
      params: { characterId: character.id.toString() }
    });
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nessun personaggio nei preferiti</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterItem
            character={item}
            onPress={() => handleCharacterPress(item)}
            onToggleFavorite={() => handleToggleFavorite(item)}
            isFavorite={true}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingVertical: 8,
  },
});