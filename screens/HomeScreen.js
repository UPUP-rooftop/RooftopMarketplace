import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, Dimensions, Image } from 'react-native';
import MapScreen from './MapScreen';


const { height, width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/7078861/pexels-photo-7078861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image
          source={require('../assets/UPUP.png')}
          style={styles.logo}
        />
        <View style={styles.buttonContainer}>
  <View style={styles.buttonWrapper}>
    <Button
      title="Rooftop Venues Near You"
      onPress={() => navigation.navigate('Map', { latitude: 30.2672, longitude: -97.7431 })}
      color="white"
      style={styles.button}
    />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
  logo: {
    width: width / 1,
    height: width / 1.75,
    resizeMode: 'contain',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 150,
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingHorizontal: "10%",
    paddingVertical: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "105%",
  },
  buttonWrapper: {
    marginHorizontal: 10,
    backgroundColor: '#6ca6cd', // Example color, replace with your desired button color
    borderRadius: 30,
    paddingHorizontal: "10%",
    paddingVertical: "5%",
    shadowColor: 'rgba(0, 0, 0, 5)', // Example shadow color, customize as needed
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    color: '#FFFFFF', // Example text color, customize as needed
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});
