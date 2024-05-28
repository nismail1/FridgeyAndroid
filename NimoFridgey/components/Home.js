import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import firebase from 'firebase';
import {onSnapshot, addDoc, removeDoc, updateDoc} from '../services/collections'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ml from '@react-native-firebase/ml';
  const TopBar = ({navigation, addItemToLists}) => (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Settings')}}>
        <Text>Settings</Text>
        </TouchableOpacity>
    <TouchableOpacity  style={styles.button}
      onPress={() => {navigation.navigate('Add', {saveChanges: addItemToLists})}}>
        <Text>Add</Text>
      </TouchableOpacity>

    </View>
  );

  const Item = ({ name, expiration }) => (
    <Swipeable renderRightActions={RightActions}>
    <View style={[styles.item, {flexDirection: "row"}]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.expiration}>{expiration}</Text>
    </View>
    </Swipeable>
  );

  const RightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0]
    })
    return (
      <>
      <TouchableOpacity style={styles.delete} >
        <View >
            <Animated.Text
              style={{
                color: 'white',
                paddingHorizontal: 10,
                fontWeight: '600',
                transform: [{ scale }]
              }}>
              Delete
            </Animated.Text>

        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigationCopy.navigate('Edit')}} style={styles.edit}>
        <View >

            <Animated.Text
              style={{
                color: 'white',
                paddingHorizontal: 10,
                fontWeight: '600',
                transform: [{ scale }]
              }}>
              Edit
            </Animated.Text>
        </View>
        </TouchableOpacity>
      </>
    )
   }


  let navigationCopy;

  const Home = ({navigation}) => {
    const onTakePhoto = () => launchCamera({ mediaType: 'image' }, onImageSelect);

    const onSelectImagePress = () => launchImageLibrary({ mediaType: 'image' }, onImageSelect);
    const [result, setResult] = useState({});
    const onImageSelect = async (media) => {
  if (!media.didCancel) {
    setImage(media.uri);
    const processingResult = await ml().cloudDocumentTextRecognizerProcessImage(media.uri);
    console.log(processingResult);
    setResult(processingResult);
  }
};
    const [image, setImage] = useState();
    const [lists, setLists] = useState([]);
    const listsRef = firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .collection('lists')

    useEffect(() => {
      onSnapshot(listsRef,
        (newLists) => {
        setLists(newLists);
      }, {
        sort: (a, b) => {
          if(a.index < b.index) {
            return -1;
          }

          if (a.index > b.index) {
            return 1;
          }

          return 0;
        }
      })
    }, [])

    const addItemToLists = ({name, expiration}) => {
      const index = lists.length > 1 ? lists[lists.length-1].index + 1 : 0;
      addDoc(listsRef, {name, expiration, index});
  }

    navigationCopy = navigation;
    const renderItem = ({ item }) => (
      <Item name={item.name} expiration={item.expiration}  />
    );

    console.log(lists);
    return (
      <SafeAreaView style={styles.container}>
        <TopBar navigation={navigation} addItemToLists = {addItemToLists} />
        <FlatList
          data={lists}
          renderItem={renderItem}
          keyExtractor={item => item.index}
        />
        <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        <Image source={{uri: image}} style={styles.image} resizeMode="contain" />
         <Text style={{fontSize: 30}}>{result.text}</Text>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    image: {
  height: 300,
  width: 300,
  marginTop: 30,
  borderRadius: 10,
},
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      color: '#165916',
      fontSize: 32,
      marginTop: 10,
    },
    item: {
      backgroundColor: '#90EE90',
      padding: 20,
      marginVertical: 1,
      marginHorizontal: 16,
      justifyContent: 'space-between'
    },
    name: {
      fontSize: 24,
      padding: 10,
    },
    expiration: {
      fontSize: 32,
      fontWeight: 'bold',
      padding: 10,
      alignSelf: 'flex-end',
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
    camera: {
      width: 60,
      height: 60,
      margin: 5,
      alignSelf: 'center'
    },
    edit: {
      backgroundColor: 'green',
      justifyContent: 'center'
    },
    delete: {
      backgroundColor: 'red',
      justifyContent: 'center'
    }
  });



  export default Home;

  /*
     <Text style={styles.title}>Fridgey</Text>
     */
     /*
 <TouchableOpacity>
<Image source={require("../img/camera.png")} style={styles.camera}/>

 </TouchableOpacity>
 */
