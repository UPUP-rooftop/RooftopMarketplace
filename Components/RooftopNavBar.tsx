import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';

const RooftopNavBar = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.navBar}>
        <View style={styles.icons}>
          <Image source={require('../assets/calendar.png')} style={styles.NavImage} />
          <Text style={styles.navBarItem}>Calandar</Text>
        </View>
        <View style={styles.icons}>
          <Image source={require('../assets/money-bag.png')} style={styles.NavImage} />
          <Text style={styles.navBarItem}>Pay-Outs</Text>
        </View>
        <View style={styles.icons}>
          <Image source={require('../assets/settings.png')} style={styles.NavImage} />
          <Text style={styles.navBarItem}>Settings</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? (Platform.isPad ? 100 : 100) : 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: "15%",
    paddingHorizontal: "5%",
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  navBarItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: "3%",
  },
  icons: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: "5%",
  },
  NavImage: {
    height: 50,
    width: 50,
  },
});

  



export default RooftopNavBar;
