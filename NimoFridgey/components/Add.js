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
      <Text style={styles.title}>Add Item</Text>
    </View>
  );

const Add = ({navigation, route}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [expiration, setExpiration] = useState(route.params.expiration || new Date());
  const [name, setName] = useState(route.params.name || "");
  const [color, setColor] = useState(route.params.color || "red");

  return (
      <SafeAreaView style={styles.container}>
        <TopBar navigation={navigation}/>
        <Text style={styles.heading}>Item Name:</Text>
        <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => {
          setName(text);
          }}
        placeholder = {"New List name"}
      />
      <Text style={styles.heading}>Expiration on:</Text>
      {/* <DateTimePicker
          testID="dateTimePicker"
          value={expiration}
          mode={mode}
          is24Hour={true}
          display="spinner"
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setExpiration(selectedDate)
          }}
          style={styles.datePickerStyle}
        /> */}
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
          setExpiration(date);
        }}
      />
        <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Home')}}>
        <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          route.params.saveChanges({name, color, expiration})
          navigation.navigate('Home')}}>
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

  export default Add;