import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const Favorites = ({ route }) => {
  const { likedItems } = route.params;
  return (
      <View style={styles.container}>

        {likedItems.length === 0 ? (
            <View style={styles.TextContainer}>
                <Text style={styles.noFavoritesText}>You haven't added any favorites yet</Text>
            </View>
              ) : (
              <FlatList
                data={likedItems}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    <View style={styles.textContainer}>
                      <Text style={styles.recipeName}>{item.name}</Text>
                      <Text style={styles.recipeAuthor}>{item.duration}</Text>
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
   TextContainer: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      justifyContent: 'center',
      alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
    noFavoritesText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    hintText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 4,
        lineHeight: 24,
        maxWidth: '80%',
    },
    itemContainer: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    image: {
      width: 100,
      height: 50,
      borderRadius: 8,
      marginRight: 16,
    },
    recipeName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: "#666"
    },
    recipeAuthor: {
      fontSize: 14,
      color: "#666"
    },
});

export default Favorites;
