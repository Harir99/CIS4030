// HelpScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How Can We Help?</Text>
      <Text style={styles.description}>Trouble logging in? Here’s what you can do:</Text>

      <View style={styles.stepContainer}>
        <Icon name="user-circle-o" size={20} color="#6b6b6b" />
        <Text style={styles.step}> Check your username and password.</Text>
      </View>

      <View style={styles.stepContainer}>
        <Icon name="wifi" size={20} color="#6b6b6b" />
        <Text style={styles.step}> Verify your internet connection.</Text>
      </View>
        <View style={styles.space}>
          <TouchableOpacity style={styles.TagButton} onPress={() => Linking.openURL('mailto:halrubay@uoguelph.ca')}>
            <Text style={styles.TagText}>Contact Support</Text>
          </TouchableOpacity>
        </View >
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginLeft: 80
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  space: {
    marginTop: 18
  },
  step: {
    fontSize: 18,
    color: '#666',
    marginLeft: 20,
  },
  link: {
    fontSize: 18,
    color: '#1a73e8',
  },
  button: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#1a73e8',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
  TagButton: {
      flexDirection: 'row',
      backgroundColor: '#221500',
      paddingHorizontal: 16,
      paddingVertical: 6,
       padding: 20,
       borderRadius: 5,
      alignItems: 'center',
      marginLeft: 100,
      marginBottom: 100
    },
 TagText: {
    color: 'white',
    fontSize: 13,
 },
});

export default HelpScreen;
