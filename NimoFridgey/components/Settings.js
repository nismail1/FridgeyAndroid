// import React, { useEffect } from 'react';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import React, { useState } from 'react';

// import { ToggleButton } from 'toggle-switch-react-native';
import { 
  SafeAreaView, 
  View, 
  FlatList, 
  StyleSheet, 
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
  Linking,
  Alert
} from 'react-native';
import { render } from 'react-dom';
import * as firebase from 'firebase';
const TopBar = ({navigation}) => (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Home')}}>
        <Text>Back</Text>
        </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
    </View>
  );
  const Separator = () => (
    <View style={styles.separator} />
  );
  export default ({navigation})=>{

  const [isEnabled, setIsEnabled] = useState("checked");
  let message ;
  
  const what = isEnabled;

  if (isEnabled =="checked") {
    message = true
} else {
    message = false
}

    return(
      <SafeAreaView style={styles.container}>
          <TopBar navigation={navigation}/>
          <Text style={styles.title2} >Please Enable Push Notifications</Text>
          <Separator />
           <Button style = {styles.button2}
          title="Click here to receive personalized updates"
           
          onPress={toggleNotification}
          accessibilityLabel="Enable push notifications"
          color = 'rgb(230,126,34)'
          
        />
        <Separator />
      
        </SafeAreaView>
     
    )
  }

  async function toggleNotification(){
    let message = "checked";
      const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        console.log('status: '+status);
        finalStatus = status;
      
            if (finalStatus !== "granted") {
              Alert.alert(
                "No Notification Permission",
                "please goto setting and on notification permission manual",
                [
                  { text: "cancel", onPress: () => console.log("cancel") },
                  { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
                ],
                { cancelable: false }
              )
              message = "unchecked"
      return message;
              ;
}

return message;}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    topBar: {
      flexDirection: 'row',
    },
    title: {
      color: '#165916',
      fontSize: 32,
      marginLeft: 50,
      marginTop: 10
    },
    title2: {
      color: '#e67e22',
      fontSize: 32,
      marginLeft: 50,
      marginTop: 10
    },
    button2: {
      color : '#e67e22'
    },
    button: {
      alignItems: 'center',
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: '#165916',
      borderRadius: 10,
      width: 80,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }
    

});


async function registerForPushNotificationsAsync (){


  let token;
    token = (await Notifications.getExpoPushTokenAsync());
    //Add token to firebase
    let uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(uid).update({
    expoPushToken:token
  });

   return message;
}
