import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExerciseTimer = ({ route }) => {
  const durationString = route.params.duration;
  const durationInMinutes = parseInt(durationString);
  const [totalSeconds, setTotalSeconds] = useState(durationInMinutes * 60);
  const navigation = useNavigation();

  useEffect(() => {
    const intervalId = totalSeconds > 0 ? setInterval(() => {
      setTotalSeconds(prevTotalSeconds => prevTotalSeconds - 1);
    }, 1000) : null;

    return () => intervalId && clearInterval(intervalId);
  }, [totalSeconds]);

  useEffect(() => {
    if (totalSeconds === 0) {
      navigation.goBack();
    }
  }, [totalSeconds, navigation]);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatNumber = (number) => (`0${number}`).slice(-2);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>
          {`${formatNumber(hours)} : ${formatNumber(minutes)} : ${formatNumber(seconds)}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 10,
    padding: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    zIndex: 1,
    elevation: 3,
  },
  goBackText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default ExerciseTimer;
