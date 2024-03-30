import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ImageBackground} from 'react-native';
import Courses from './Courses';
import Login from './Login';
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

type Login =  {
  userName: string,
  passWord: string,
}

const Register = ({ navigation }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [match, setMatch] = useState(false)
  const [flag, setFlag] = useState(false)
  const [nameFlag, setNameFlag] = useState(false)

  const checkPasswordMatch = (text: string) => {
    // by defaul from first input passwords do not match
    setFlag(true)

    if (password===text) {
      // console.log("match")
      setMatch(true)
      setFlag(false)
    } else {
      // console.log("mismatch")
      setMatch(false)
    }
  }

  const navigateToScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  const validateRegisterForm = () => {
    if (email.length>0 && password.length>0) {
      setNameFlag(false)
      return(true)
    } else {
      setNameFlag(true)
      return(false)
    }
  }

  const registerLogin = async () => {
    if (match === true && validateRegisterForm())  {
      const login = {
        userName: email,
        passWord: password
      }
  
      try {
        const db = await connectToDatabase()
        addLogin(db, login)
        // console.log(await getLogins(db))
      } catch (error) {
        console.error(error)
      }
      navigateToScreen('Courses')
    } else {
      console.log("password did not match or input failed validation")
    } 
  }

  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>FitNow</Text>
      </View>
      <Text style={styles.Header}>Sign Up</Text>
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
        <View style={styles.PassForm}>
          <Image
            style={styles.ProfileImage}
            source={{
              uri: "https://img.icons8.com/ios-glyphs/30/lock--v1.png"
            }}
          />
          <TextInput
            placeholder='Repeat'
            placeholderTextColor='grey'
            secureTextEntry
            onChangeText={text => checkPasswordMatch(text)}
          />
        </View>
        {nameFlag? 
        <View style={styles.flagContainer}>
          <Text style={styles.flagText}>Username cannot be empty</Text>
        </View>
        :
        ""
        }
        {flag? 
        <View style={styles.flagContainer}>
          <Text style={styles.flagText}>Passwords do not match</Text>
        </View>
        :
        ""
        }
        <View style={styles.InputContainer}>
          <TouchableOpacity 
            style={styles.LoginButton}
            onPress={()=> registerLogin()}
          >
            <Text style={{ color:'black' }}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> navigateToScreen('HelpScreen')}
          >
            <Text style={{ color:'black' }}>Need Help?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.LoginContainer}>
          <Text style={{ color:'black' }}>Already a member?</Text>
          <TouchableOpacity
            onPress={()=> navigateToScreen('Login')}
          >
            <Text style={{ color:'black' }}>Login.</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ImageContainer}>
        <ImageBackground
          style={styles.BackgroundImage}
          source={
            require('../assets/Images/registration/registration.png')
          }
        />
      </View>  
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: 80,
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
    color:'black'
  },
  Header: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 40,
    color:'black'
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
    padding: 20
  },
  BackgroundImage: {
    width: 300,
    height: 300,
  },
  LoginContainer: {
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

export default Register;
