import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Favorites = ({ route }) => {
  const { likedItems } = route.params;

  return (
    <View style={styles.container}>
      {likedItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.noFavoritesText}> No Exercises Found! </Text>
        </View>
      ) : (
        <FlatList
          data={likedItems}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.recipeName}>{item.name}</Text>
                <Text style={styles.recipeAuthor}>Duration: {item.duration}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  noFavoritesText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 160,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 16,
    elevation: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#333",
    marginBottom: 4,
  },
  recipeAuthor: {
    fontSize: 14,
    color: "#666",
  },
});

export default Favorites;
