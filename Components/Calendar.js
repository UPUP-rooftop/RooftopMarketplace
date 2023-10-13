import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Calendar = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    console.log('Selected day:', currentDate.toLocaleDateString());
    console.log('Selected time:', currentDate.toLocaleTimeString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button onPress={showDatepicker} title="What Day?" color={'#87cefa'}/>
        <Button onPress={showTimepicker} title="What time?" color={'#87cefa'}/>
      </View>
      <Text style={styles.selectedText}> {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={styles.dateTimePicker}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maringTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 1,
  },
  selectedText: {
    fontSize: 20,
    marginBottom: '3%',
    fontWeight: 'bold',
  },
  dateTimePicker: {
    width: '100%',
  },
});

export default Calendar;
