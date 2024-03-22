import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CollapsibleFilterSection = ({ title, options, onSelect, selectedOption }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleSelectOption = (option) => {
    onSelect(selectedOption === option ? null : option);
  };

  return (
    <View style={styles.collapsibleContainer}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.filterButtonText}>{title}</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.collapsibleContent}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option && styles.selectedOptionButton,
              ]}
              onPress={() => handleSelectOption(option)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOption === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const FiltersUI = ({
  onSelectDifficulty,
  onSelectDuration,
  onSelectCourseType,
  onSelectFocusArea,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState(null);
  const [selectedDuration, setSelectedDuration] = React.useState(null);
  const [selectedCourseType, setSelectedCourseType] = React.useState(null);
  const [selectedFocusArea, setSelectedFocusArea] = React.useState(null);

  return (
    <View style={styles.filterContainer}>
      <CollapsibleFilterSection
        title="Difficulty"
        options={['Beginner', 'Intermediate', 'Advanced']}
        onSelect={(option) => {
          setSelectedDifficulty(option);
          onSelectDifficulty(option);
          console.log("Difficulty selected:", option);
        }}
        selectedOption={selectedDifficulty}
      />
      <CollapsibleFilterSection
        title="Duration"
        options={['Short (0-15 minutes)', 'Medium (16-30 minutes)', 'Long (31 minutes and above)']}
        onSelect={(option) => {
          setSelectedDuration(option);
          onSelectDuration(option);
        console.log("Duration selected:", option);
        }}
        selectedOption={selectedDuration}
      />
      <CollapsibleFilterSection
        title="Course Type"
        options={['Yoga', 'Cardio', 'Strength Training', 'Pilates', 'Kickboxing', 'Meditation & Mindfulness']}
        onSelect={(option) => {
          setSelectedCourseType(option);
          onSelectCourseType(option);
        }}
        selectedOption={selectedCourseType}
      />
      <CollapsibleFilterSection
        title="Focus Area"
        options={['Full Body', 'Upper Body', 'Lower Body', 'Core', 'Flexibility', 'Balance']}
        onSelect={(option) => {
          setSelectedFocusArea(option);
          onSelectFocusArea(option);
        }}
        selectedOption={selectedFocusArea}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 9,
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
    marginTop: 5,
    borderColor: '#221500',
    borderWidth: 1,
  },
  optionButtonText: {
    color: '#333',
  },
  selectedOptionButton: {
    backgroundColor: '#c0c0c0',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  filterButton: {
    borderColor: '#221500',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonText: {
    color: '#221500',
    fontSize: 13,
  },
   selectedFiltersContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      marginBottom: 20,
    },

});

export default FiltersUI;
