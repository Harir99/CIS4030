import React, { useState } from 'react';
import { View, SafeAreaView, Text} from 'react-native';
import Courses from './src/screens/Courses';
import Exercises from './src/screens/Exercises';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Register />
    </SafeAreaView>
  );
};
export default App;