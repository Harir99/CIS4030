import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import data from '../assets/data/courses_list.json';

import FiltersUI from "../components/FiltersUI"

const Courses = ({ navigation }) => {

  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedCourseType, setSelectedCourseType] = useState(null);
  const [selectedFocusArea, setSelectedFocusArea] = useState(null);
  const [filteredData, setFilteredData] = useState(data.courses);

    useEffect(() => {
        const filterCourses = () => {
          return data.courses.filter(course => {
            const duration = parseInt(course.totalDuration.split(' ')[0], 10);
            return (
              (!selectedDifficulty || course.difficulty === selectedDifficulty) &&
              (!selectedDuration ||
                (selectedDuration === 'Short (0-15 minutes)' && duration <= 15) ||
                (selectedDuration === 'Medium (16-30 minutes)' && duration > 15 && duration <= 30) ||
                (selectedDuration === 'Long (31 minutes and above)' && duration > 30)) &&
              (!selectedCourseType || course.courseType === selectedCourseType) &&
              (!selectedFocusArea || course.focusArea.includes(selectedFocusArea))
            );
          });
        };

        setFilteredData(filterCourses());
  }, [selectedDifficulty, selectedDuration, selectedCourseType, selectedFocusArea]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Exercises', { course: item,  name: item.name })}>
      <Card containerStyle={styles.cardContainer}>
        <ImageBackground source={{ uri: item.image }} style={styles.image}>
          <View style={styles.overlay}>

            <View style={styles.topRow}>
             <Text style={styles.mainHeading}>{item.name}</Text>
              <Text style={styles.subHeading}>{item.totalDuration}</Text>
            </View>
            <View style={styles.iconRow}>
              <View style={styles.iconContainer}>
                 <TouchableOpacity style={styles.TagButton}>
                    <Text style={styles.TagText}>{item.difficulty}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={() => (
          <View style={styles.header}>
             <FiltersUI
               onSelectDifficulty={setSelectedDifficulty}
               onSelectDuration={setSelectedDuration}
               onSelectCourseType={setSelectedCourseType}
               onSelectFocusArea={setSelectedFocusArea}
             />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 3,
  },
  headerTitle: {
    color: '#221500',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 8,
    marginTop: 10
  },
  TagButton: {
    backgroundColor: '#221500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
   TagText: {
      color: 'white',
      fontSize: 10,
   },
  cardContainer: {
    flex: 1,
    marginRight: 0,
    borderRadius: 8,
    overflow: 'hidden',
    padding: 0,
    marginBottom: 20,
    marginTop: 2,
    elevation: 6,
  },
  image: {
    width:180,
    height: 260,
    borderRadius: 8,
    overflow: 'hidden',
  },
  subHeading: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 4,
  },
  mainHeading: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: 8,
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
    marginRight: 3,
  },
  heartIcon: {
    color: 'red',
  },
  topRow: {
    justifyContent: 'space-between',
    alignItems: 'left',
    paddingHorizontal: 8,
    marginTop: 8,
  },
});

export default function(props) {
  const { navigation } = props;
  return <Courses navigation={navigation} />;
}
