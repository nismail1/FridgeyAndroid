import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Colors from '../constants/colors';
import firebase from 'firebase';

const createAccount = (email, password) => {
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
            firebase.firestore().collection('users').doc(user.uid).set({})
        })
}

const login = (email, password) => {
    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        
    })
}
export default () => {
    const [isCreateMode, setCreateMode] = useState(false);
    const [emailField, setEmailField] = useState({
        text: "" , errorMessage:""

    })
    const [passwordField, setPasswordField] = useState({
        text: "" , errorMessage:""

    })
    const [passwordReentryField, setPasswordReentryField] = useState({
        text: "" , errorMessage:""

    })
    return (
    <View style={styles.container}>
    <View style={{flex:1}}>
        <Text> Email:</Text>
        <TextInput 
        label="Email"
        text ={emailField.text}
        onChangeText = {(text) => {
            setEmailField({text})}}
        errorMessage = {emailField.errorMessage}
        autoCompleteType = "email"
        />
        <Text> Password</Text>
        <TextInput 
        label="Password"
        text ={passwordField.text}
        onChangeText = {(text) => {
            setPasswordField({text})}}
        errorMessage = {passwordField.errorMessage}
        autoCompleteType = "password"
        secureTextEntry = {true}
        />
        <Text>
            {isCreateMode && <Text> Confirm Password</Text>}
        </Text>
        
        {/* <Text>
        {isCreateMode && (
        <TextInput 
        label="Re-enter Password"
        text ={passwordReentryField.text}
        onChangeText = {(text) => {
            setPasswordReentryField({text})}}
        errorMessage = {passwordReentryField.errorMessage}
        secureTextEntry = {true}
        />
        )}
        </Text> */}
        
        <TouchableOpacity onPress= {() => {setCreateMode(!isCreateMode)}}>
            <Text> {isCreateMode ? "Already have an account?": "Create a new account"} </Text>
        </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={() => {
        <Text>
            {isCreateMode ? createAccount(emailField.text, passwordField.text) : login(emailField.text, passwordField.text)}
        </Text>
        
    }}>
    <Text>{isCreateMode ? "Create Account": "Login"}</Text>
   
    </TouchableOpacity>
    </View>
    
)
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }
  });
  