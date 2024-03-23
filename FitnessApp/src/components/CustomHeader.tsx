import HamburgerMenu from './HamburgerMenu';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomHeader = ({ title, showBackButton, navigation, likedItems }) => {
  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      ) : (
            <HamburgerMenu likedItems={likedItems} />
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    elevation: 1,
    zIndex: 1,
  },
  title: {
    flex: 1,
    fontSize: 24, // Adjust if necessary to match your design
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 60, // Center the title vertically in the navbar
    color: '#221500',
  },
  backButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
});

export default CustomHeader;
