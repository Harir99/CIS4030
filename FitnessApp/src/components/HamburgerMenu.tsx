import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const HamburgerMenu = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigateToScreen = (screenName, params) => {
    toggleMenu();
    navigation.navigate(screenName, params);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Icon name={menuOpen ? 'close' : 'navicon'} size={30} color="black" />
      </TouchableOpacity>
      {menuOpen && isFocused && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigateToScreen('Courses')}>
            <Text style={styles.menuItem}><Icon name={'list-alt'} size={14} color="black" />     Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('Favorites')}>
            <Text style={styles.menuItem}><Icon name={'heart'} size={14} color="black" />     Favorites </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('Login')}>
            <Text style={styles.menuItem}><Icon name={'gear'} size={14} color="black" />     Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // Ensure relative positioning for child elements
  },
  menuButton: {
    padding: 8,
  },
  menu: {
    position: 'absolute',
    top: 56, // Adjust top according to your header height
    backgroundColor: '#f0f0f0',
    elevation: 1,
    zIndex: 2, // Ensure the menu is on top of other content
    height: '10000%',
    left: -20
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 30,
    color: 'black',
    marginTop: 35
  },
});

export default HamburgerMenu;