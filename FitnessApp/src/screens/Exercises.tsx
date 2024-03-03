import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import YoutubePlayer from 'react-native-youtube-iframe';

const Exercises = () => {
  const [playing, setPlaying] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const togglePlaying = (id) => {
    setSelectedId(selectedId === id ? null : id); // Toggle play state based on exercise ID
  };

  const renderExerciseItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.exerciseImage}/>
      <View style={styles.textContainer}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseDetail}>{item.duration}</Text>
      </View>
      <TouchableOpacity style={styles.likeButton}>
        <Icon name="heart-o" size={24} color="#900" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: courseData.image }} style={styles.headerImage} />
      <View style={styles.courseDetailsContainer}>
        <Text style={styles.headerTitle}>{courseData.name}</Text>
        <Text style={styles.courseDetailText}>Difficulty: {courseData.difficulty}</Text>
        <Text style={styles.courseDetailText}>{courseData.totalPoses} Poses | {courseData.totalDuration}</Text>
        <Text style={styles.sectionTitle}>Exercises</Text>
      </View>
      <FlatList
        data={courseData.exercises}
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
  likeButton: {
    padding: 8,
  },

});

const courseData = {
  "id": "course1",
  "name": "Beginner Yoga",
  "totalPoses": 5,
  "totalDuration": "25 minutes",
  "image": "https://t4.ftcdn.net/jpg/03/64/05/57/360_F_364055747_jzJEWq4Qn54oS6aOfLxZbRPkY4sreYKD.jpg",
  "difficulty": "Beginner",
  "totalLikes": 150,
  "courseType": "Yoga",
  "focusArea": "Flexibility, Balance",
  "exercises": [
    {
      "id": "exercise1",
      "name": "Sun Salutation",
      "duration": "5 minutes",
      "imageUrl": "https://images.squarespace-cdn.com/content/v1/6036da40e5934b79b3bc842c/1632341830694-DPSQ77ZFJT71318XWR0P/Sun+Salutation+dreamstime_s_19987380.jpg"
    },
    {
      "id": "exercise2",
      "name": "Downward Dog",
      "duration": "4 minutes",
      "imageUrl": "https://www.ekhartyoga.com/media/images/articles/content/Downward-Facing-Dog-Pose-Adho-Mukha-Svanasana.jpg"
    },
    {
      "id": "exercise3",
      "name": "Warrior Pose",
      "duration": "5 minutes",
      "imageUrl": "https://www.ekhartyoga.com/media/images/articles/content/Warrior-2-yoga-pose-Virabhadrasana-II-Ekhart-Yoga.jpg"
    },
    {
      "id": "exercise4",
      "name": "Tree Pose",
      "duration": "6 minutes",
      "imageUrl": "https://www.ekhartyoga.com/media/images/articles/content/Tree-pose-Vrksasana-Ekhart-Yoga.jpg"
    },
    {
      "id": "exercise5",
      "name": "Seated Forward Bend",
      "duration": "5 minutes",
      "imageUrl": "data:image/jpeg;base64,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"
    }
  ]
};

export default Exercises;
