import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CollapsibleFilterSection = ({ title, options, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.collapsibleContainer}>
      <TouchableOpacity style={styles.filterButton} onPress={() => setIsVisible(!isVisible)}>
        <Text style={styles.filterButtonText}>{title}</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.collapsibleContent}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionButton} onPress={() => onSelect(option)}>
              <Text style={styles.optionButtonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const FiltersUI = () => {
  const handleSelect = (option) => {
    console.log(option); // Here you will handle the selection
  };

  return (
    <View style={styles.filterContainer}>
      <CollapsibleFilterSection
        title="Difficulty"
        options={['Beginner', 'Intermediate', 'Advanced']}
        onSelect={handleSelect}
      />
      <CollapsibleFilterSection
        title="Duration"
        options={['Short (0-15 minutes)', 'Medium (16-30 minutes)', 'Long (31 minutes and above)']}
        onSelect={handleSelect}
      />
      <CollapsibleFilterSection
        title="Course Type"
        options={['Yoga', 'Cardio', 'Strength Training', 'Pilates', 'Kickboxing', 'Meditation & Mindfulness']}
        onSelect={handleSelect}
      />
      <CollapsibleFilterSection
        title="Focus Area"
        options={['Full Body', 'Upper Body', 'Lower Body', 'Core', 'Flexibility', 'Balance']}
        onSelect={handleSelect}
      />
    </View>
  );
};
const styles = StyleSheet.create({
 filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 9, // Adjust the margin as needed
  },
  collapsibleContainer: {
    marginBottom: 10,
  },
  collapsibleContent: {
    padding: 10,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    marginTop: 5
  },
  optionButtonText: {
    color: '#333',
  },
   filterButton: {
        borderColor: '#221500', // Example background color for filter buttons
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8, // Space between buttons

    },
    filterButtonText: {
        color: '#221500', // Text color for filter buttons
        fontSize: 13
    },
});

export default FiltersUI;
