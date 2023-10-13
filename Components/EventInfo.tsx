import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Button } from 'react-native';

const EventInfo = () => {
  const [attendees, setAttendees] = useState('');
  const [includeBarTab, setIncludeBarTab] = useState(false);
  const [hours, setHours] = useState('');

  const handleSave = () => {
    // Handle saving the event information (e.g., sending to server)
    console.log('Attendees:', attendees);
    console.log('Include Bar Tab:', includeBarTab);
    console.log('Hours:', hours);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Number of Attendees:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={attendees}
        onChangeText={(text) => setAttendees(text)}
      />

      <View style={styles.barTabContainer}>
        <Text style={styles.label}>Include Bar Tab:</Text>
        <Switch
          value={includeBarTab}
          onValueChange={(value) => setIncludeBarTab(value)}
        />
      </View>

      <Text style={styles.label}>Number of Hours:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={hours}
        onChangeText={(text) => setHours(text)}
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
},
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  barTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default EventInfo;
