import React from 'react';
import { View, Text, StyleSheet, Image,  } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const ProfileSection = () => {

  
  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/AlecProfile.png')} style={styles.profileImage} />
        
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Alec Lewis</Text>
          <Text style={styles.profileLocation}>Austin, TX</Text>
          <Text style={styles.profileRating}>5 Stars</Text>
        </View>

        <Image source={require('../assets/trustedpartner.png')} style={styles.trustedpartner} />
      </View>
      
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={{
          latitude: 30.267109369404295 ,
          longitude: -97.74266027293052 ,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }} >  
        <Marker
        coordinate={{ latitude: 30.267109369404295, longitude: -97.74266027293052 }}
        title={"SPACES"}
        description={"501 Congress Avenue, Suite 150, Austin, TX 78701"}
      />
      </MapView>
      </View>

      <Text style={styles.addresslabel}>Address:</Text>
      <Text style={styles.address}>315 Lavaca St</Text>
      <Text style={styles.address}>Austin</Text>
      <Text style={styles.address}>TX 78701</Text>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 45,
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: '20%',
    height: '110%',
    borderRadius: 40,
    marginRight: 20,
    aspectRatio: 1,
  },
  trustedpartner: {
    width: '20%',
    borderRadius: 0,
    marginLeft: 100,
    aspectRatio: 1,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileLocation: {
    fontSize: 16,
  },
  profileRating: {
    fontSize: 15,
    color: 'gray',
  },
  mapContainer: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addresslabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProfileSection;
