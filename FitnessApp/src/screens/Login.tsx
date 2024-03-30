import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ImageBackground} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Courses from './Courses';
import Register from './Register';
import HelpScreen from './HelpScreen'

import {
  connectToDatabase,
  createTables,
  getTableNames,
  removeTable,
  addLogin,
  getLogins,
  updateLogin,
  deleteLogin,
} from '../db/db'

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [flag, setFlag] = useState(false)

  const navigateToScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

   const validateLoginForm = () => {
    if (email.length>0 && password.length>0) {
      return(true)
    } else {
      return(false)
    }
   }

   const registerLogin = async () => {
    if (validateLoginForm())  {
      const login = {
        userName: email,
        passWord: password
      }
      try {
        const db = await connectToDatabase()
        const logins = await getLogins(db)

        logins.some((login) => {
          if (login.userName===email && login.passWord===password) {
            setFlag(false)
            navigateToScreen('Courses')
            // to break from loop early
            return(2)
          } else {
            setFlag(true)
          }
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      console.log("Invalid Input")
    } 
  }

  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>FitNow</Text>
      </View>
      <Text style={styles.Header}>Sign In</Text>
      <View style={styles.LoginForm}>
        <View style={styles.UserForm}>
          <Image
            style={styles.ProfileImage}
            source={{
              uri: "https://img.icons8.com/material/24/person-male.png"
            }}
          />
          <TextInput
            placeholder='Username'
            placeholderTextColor='grey'
            onChangeText={text =>setEmail(text)}
          />
        </View>
        <View style={styles.PassForm}>
          <Image
            style={styles.ProfileImage}
            source={{
              uri: "https://img.icons8.com/ios-glyphs/30/lock--v1.png"
            }}
          />
          <TextInput
            placeholder='Password'
            placeholderTextColor='grey'
            secureTextEntry
            onChangeText={text =>setPassword(text)}
          />
        </View>
        {flag? 
        <View style={styles.flagContainer}>
          <Text style={styles.flagText}>Username or Password incorrect</Text>
        </View>
        :
        ""
        }
        <View style={styles.InputContainer}>
          <TouchableOpacity 
            style={styles.LoginButton}
            onPress={()=> registerLogin()}
          >
            <Text style={{ color:'black' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> navigateToScreen('HelpScreen')}
          >
            <Text style={{ color:'black' }}>Need Help?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.RegisterContainer}>
          <Text style={{ color:'black' }}>New? </Text>
          <TouchableOpacity
            onPress={()=> navigateToScreen('Register')}
          >
            <Text style={{ color:'black' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ImageContainer}>
        <ImageBackground
          style={styles.BackgroundImage}
          source={
            require('../assets/Images/login/loginImage.png')
          }
        />
      </View>  
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: 100,
  },
  TitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 40,
    padding: 10,
    paddingHorizontal: 40,
    color: 'black',
  },
  Header: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 40,
    color: 'black',
  },
  LoginForm: {
    gap: 10,
    paddingHorizontal: 25,
  },
  UserForm: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 30,
    paddingHorizontal: 10,
    gap: 5,
  },
  ProfileImage: {
    width: 20,
    height: 20,
  },
  PassForm: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 30,
    paddingHorizontal: 10,
    gap: 5,
  },
  InputContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  LoginButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  ImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding:20
  },
  BackgroundImage: {
    width: 400,
    height: 400,
  },
  RegisterContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    paddingTop: 10
  },
  flagContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagText: {
    color: 'red'
  }
});

export default Login;
