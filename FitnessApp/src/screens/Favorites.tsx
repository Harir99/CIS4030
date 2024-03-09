import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Favorites = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.noFavoritesText}>You haven't added any favorites yet</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // A light grey background for subtle contrast
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 32, // Provide ample horizontal space
    marginTop: -100,
  },
  noFavoritesText: {
    fontSize: 18, // A slightly larger size for emphasis
    fontWeight: 'bold',
    color: '#333', // Darker text for better readability
    textAlign: 'center', // Center-align text
    marginBottom: 8, // Spacing between this text and hint text
  },
  hintText: {
    fontSize: 16, // A size smaller than the main text
    color: '#666', // A lighter color for the hint text
    textAlign: 'center', // Center-align text
    marginTop: 4, // Spacing from the main text
    lineHeight: 24, // Spacing between lines
    maxWidth: '80%', // Max width for better readability on tablets and large devices
  },
});

export default Favorites;
