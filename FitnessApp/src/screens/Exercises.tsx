import React, { useState } from 'react';
import { Button, View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CountdownTimer from './CountdownTimer';
import { useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const Exercises = ({ likedItems, handleToggleLike, route, navigation }) => {
    const [completedExercises, setCompletedExercises] = useState([]);
    const { course } = route.params;

    const handleStartExercise = (exercise) => {
      navigation.navigate('ExerciseTimer', { duration: calculateDurationInSeconds(exercise.duration) });
    };
      const handleCompleteExercise = (exercise) => {
        // Check if the exercise is already completed
        const isCompleted = completedExercises.includes(exercise.id);
        let newCompletedExercises;
        if (isCompleted) {
          // If the exercise is completed, remove it from the completedExercises array
          newCompletedExercises = completedExercises.filter((id) => id !== exercise.id);
        } else {
          // If the exercise is not completed, add it to the completedExercises array
          newCompletedExercises = [...completedExercises, exercise.id];
        }
        // Update the state with the new completedExercises array
        setCompletedExercises(newCompletedExercises);
        // Check if all exercises are completed
        if (newCompletedExercises.length === course.exercises.length) {
          // Pass the course image URI to the "Finished" screen
          navigation.navigate('Finished', { courseImage: course.image });
        }
      };

    const calculateDurationInSeconds = (duration) => {
        const [minutes, seconds] = duration.split(':').map(Number);
        return minutes * 60 + seconds;
    };

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleStartExercise(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.exerciseImage}/>
      <View style={styles.textContainer}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseDetail}>{item.duration}</Text>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.iconColumn}>
          <TouchableOpacity style={styles.likeButton} onPress={() => handleToggleLike(item)}>
            <Icon name={likedItems.includes(item) ? 'heart' : 'heart-o'} size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.completeButton} onPress={() => handleCompleteExercise(item)}>
            <Icon2 name={completedExercises.includes(item.id) ? 'check-bold' : 'check-outline'} size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Calculate duration in seconds for each exercise
  const exercisesWithDurationInSeconds = course.exercises.map(exercise => ({
    ...exercise,
    durationInSeconds: calculateDurationInSeconds(exercise.duration)
  }));

  return (
    <View style={styles.container}>
      <Image source={{ uri: course.image }} style={styles.headerImage} />
      <View style={styles.courseDetailsContainer}>
        <Text style={styles.headerTitle}>{course.name}</Text>
        <Text style={styles.courseDetailText}>Difficulty: {course.difficulty}</Text>
        <Text style={styles.courseDetailText}>{course.totalPoses} Poses | {course.totalDuration}</Text>
        <Text style={styles.sectionTitle}>Exercises</Text>
      </View>
      <FlatList
        data={course.exercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 220,
  },
  courseDetailsContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  courseDetailText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  exerciseImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  exerciseDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  iconContainer: {
     flexDirection: 'row',
     alignItems: 'center',
   },

   iconColumn: {
     flexDirection: 'row',
     marginRight: 10,
   },

   likeButton: {
     padding: 8,
   },

   completeButton: {
     padding: 8,
   },

});

export default Exercises;
