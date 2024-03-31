import React, { useState, useEffect, useCallback } from 'react';
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
import ExerciseTimer from './src/screens/ExerciseTimer'
import Finished from './src/screens/Finished'

import {
  connectToDatabase,
  createTables,
  getTableNames,
  removeTable,
  addLogin,
  getLogins,
  updateLogin,
  deleteLogin,
  updateCourseData,
  getCoursesData
} from './src/db/db'
import data from './src/assets/data/courses_list.json';

const Stack = createNativeStackNavigator();

const App = () => {
  const [likedItems, setLikedItems] = useState([]);
  
  const handleToggleLike = (item: any) => {
    if (likedItems.includes(item)) {
      setLikedItems(likedItems.filter((likedItem) => likedItem !== item));
    } else {
      setLikedItems([...likedItems, item]);
    }
  };

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase()
      removeTable(db, "Courses")
      await createTables(db)
      updateCourseData(db, JSON.stringify(data)).then(
        // do nothing
        (result) => { 
          // console.log(result[0]); 
        },
        (error) => { 
          // console.log(error); 
        }
      )
    } catch (error) {
      console.error(error)
    }
  }, [])
  
  useEffect(() => {
    loadData()
  }, [loadData])

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
                likedItems={likedItems}
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
          <Stack.Screen name="Exercises">
            {(props) => <Exercises {...props} likedItems={likedItems} handleToggleLike={handleToggleLike} />}
          </Stack.Screen>
          <Stack.Screen name="Favorites" component={Favorites} likedItems={likedItems}/>
          <Stack.Screen name="HelpScreen" component={HelpScreen}/>
          <Stack.Screen name="ExerciseTimer" component={ExerciseTimer} />
          <Stack.Screen name="Finished" component={Finished} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const getTitle = (route: any) => {
  if (route.name === 'Exercises') {
    return 'Course Details';
  }
  return route.name;
};

const screensWithBackButton = ['Exercises', 'HelpScreen']; // Add other screen names as needed

const shouldShowBackButton = (route: any) => {
  return screensWithBackButton.includes(route.name);
};

export default App;