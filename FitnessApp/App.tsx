import React, { useState } from 'react';
import { View, SafeAreaView, Text} from 'react-native';
import Courses from './src/screens/Courses';
import Exercises from './src/screens/Exercises';

const App = () => {
  return (
      <SafeAreaView style={{ flex: 1 }}>
      <Exercises />
      {/*   <Courses /> <Exercises /> */}

       </SafeAreaView>
  );
};
export default App;