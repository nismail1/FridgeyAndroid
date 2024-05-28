import React, {useState} from 'react';
import { 
  SafeAreaView, 
  View, 
  TextInput,
  StyleSheet, 
  Text,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
import DatePicker from 'react-native-datepicker';

const TopBar = ({navigation}) => (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Home')}}>
        <Text>Back</Text>
        </TouchableOpacity>
      <Text style={styles.title}>Edit Item</Text>
    </View>
  );

const Edit = ({navigation}) => {
  
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const [text, onChangeText] = React.useState("Rename Item");
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation}/>
      <Text style={styles.heading}>Item Name:</Text>
      <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={text}
    />
    <Text style={styles.heading}>Expiration on:</Text>
        <DatePicker
        style={styles.datePickerStyle}
        date={date} // Initial date from state
        mode="date" // The enum of date, datetime and time
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate= {new Date()}
      //   maxDate="01-01-2019"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            //display: 'none',
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={(date) => {
          setDate(date);
        }}
      />
      <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Home')}}>
      <Text>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Home')}}>
      <Text>Save</Text>
      </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    topBar: {
        flexDirection: 'row',
      },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 50,
    },
      title: {
        color: '#165916',
        fontSize: 32,
        marginLeft: 50,
        marginTop: 10
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
    datePickerStyle: {
        width: 300,
        marginTop: 20,
        alignSelf: 'center',
      },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        borderRadius: 3,
        textAlign: 'center',
        color: 	'#505050'
    },
    heading: {
        alignSelf: 'center',
        marginTop: 30,
    }
});


export default Edit;