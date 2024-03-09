import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Favorites from './src/screens/Favorites';
import CustomHeader from './src/components/CustomHeader';
import Courses from './src/screens/Courses';
import Exercises from './src/screens/Exercises';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import HelpScreen from './src/screens/HelpScreen'

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
            screenOptions={{
            headerTitleAlign: 'center',
            header: ({ route, navigation }) => (
              <CustomHeader
                title={getTitle(route)}
                showBackButton={shouldShowBackButton(route)}
                navigation={navigation}
              />
            ),
          }}>

          <Stack.Screen name="Login"
          name="Login"
          component={Login}
          options={{ headerShown: false}}
          />
          <Stack.Screen name="Register"
          name="Register"
          component={Register}
          options={{ headerShown: false}}
          />
          <Stack.Screen name="Courses" component={Courses} />
          <Stack.Screen name="Exercises" component={Exercises}/>
          {/* {(props) => <Exercises {...props} setTitle={props.route.params.setTitle} />}
          </Stack.Screen>*/}
          <Stack.Screen name="Favorites" component={Favorites}/>
          <Stack.Screen name="HelpScreen" component={HelpScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const getTitle = (route) => {
  if (route.name === 'Exercises') {
    return 'Course Details';
  }
  return route.name;
};

const screensWithBackButton = ['Exercises', 'HelpScreen']; // Add other screen names as needed

const shouldShowBackButton = (route) => {
  return screensWithBackButton.includes(route.name);
};

export default App;