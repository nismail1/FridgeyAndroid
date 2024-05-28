/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
   } from 'react-native';
import Home from './components/Home';
import Settings from './components/Settings';
import Edit from './components/Edit';
import Add from './components/Add';
import firebase from 'firebase';
import Login from './components/Login';
import Colors from './constants/colors';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login}/>
    </AuthStack.Navigator>
  )
}

const Screens = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="Add" component={Add} />
    <Stack.Screen name="Edit" component={Edit} />
  </Stack.Navigator>
  )

}
  const App = () => {

    const [isAuthenticated, setAuthenticated] = useState(false);
    useEffect (() => {
      if(firebase.auth().currentUser)
      {
        setAuthenticated(true)
      }
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          setAuthenticated(true)
        }
        else {
          setAuthenticated(false)
        }
      })
    }, [])
    return (
      <NavigationContainer>

      {isAuthenticated ? <Screens/> : <AuthScreens/>}
      </NavigationContainer>

    );
  }

  const firebaseConfig = {
    apiKey: "AIzaSyDRXs9YGrbIbP1bNk5X879CW6EvPFyLPYs",
    authDomain: "instagram-dev-3ad54.firebaseapp.com",
    projectId: "instagram-dev-3ad54",
    storageBucket: "instagram-dev-3ad54.appspot.com",
    messagingSenderId: "537797696780",
    appId: "1:537797696780:web:26dccd971ea162eee5bd29",
    measurementId: "G-V4PH52GMXF"
  };


firebase.initializeApp(firebaseConfig)


export default App;
