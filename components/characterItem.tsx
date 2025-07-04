import { Character } from '@/app/types/Character';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CharacterItemProps {
  character: Character;
  onPress: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export const CharacterItem: React.FC<CharacterItemProps> = ({
  character,
  onPress,
  onToggleFavorite,
  isFavorite,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{character.fullName}</Text>
        <Text style={styles.title}>{character.title}</Text>
        <Text style={styles.family}>Casa: {character.family}</Text>
      </View>
      <TouchableOpacity
        style={[styles.favoriteButton, isFavorite && styles.favoriteActive]}
        onPress={onToggleFavorite}
      >
        <Text style={styles.favoriteText}>
          {isFavorite ? 'Rimuovi' : 'Aggiungi'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  family: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  favoriteButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: 'center',
  },
  favoriteActive: {
    backgroundColor: '#FF3B30',
  },
  favoriteText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});