import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ImageBackground} from 'react-native';
import Courses from './Courses';
import Login from './Login';
import HelpScreen from './HelpScreen'

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const checkPasswordMatch = () => {
    // check if input matches state password, show warning otherwise
  }

   const navigateToScreen = (screenName, params) => {
      navigation.navigate(screenName, params);
   };

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
            onChangeText={checkPasswordMatch}
          />
        </View>
        <View style={styles.InputContainer}>
          <TouchableOpacity 
            style={styles.LoginButton}
            onPress={()=> navigateToScreen('Courses')}
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
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0
  },
  LoginContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    paddingTop: 10
  }
});

export default Register;
