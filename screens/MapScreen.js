import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';



export default function MapScreen({ route, navigation }) {
  const { latitude, longitude } = route.params;
  const [showListings, setShowListings] = useState(false);
  const [listings, setListings] = useState([
    { id: 1, name: 'The Riley Venue', latitude: 30.26641608319125, longitude: -97.74588169546644, image: require('../assets/TheRileyRooftop.jpeg') },
    { id: 2, name: 'Westview Rooftop',  latitude: 30.275073990283648, longitude: -97.74343697790991, image: require('../assets/WestviewRooftop.jpg') },
    { id: 3, name: 'Bar Rooftop', latitude: 30.269929212459166, longitude: -97.74271174311792, image: require('../assets/TheRileyFront.png') },
  ]); // Add some dummy data for the property listings

  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const toggleListings = () => {
    setShowListings(!showListings);
  };
  

  const renderListingItem = ({ item }) => {

    let price;
    if (item.name === 'The Riley Venue') {
      price = '$500/hr';
    } else if (item.name === 'WestView Rooftop') {
      price = '$250/hr';
    }
    else if (item.name === 'Bar Rooftop') {
      price = '$500/hr'; 
    }
    
    return (
     
      <TouchableOpacity style={styles.listingItem} onPress={() => {
        if (item.name === 'The Riley Venue') {
          navigation.navigate('The Riley Venue');
        } 

        if (item.name === 'Westview Rooftop') {
          navigation.navigate('Westview Rooftop');
        } 
        
        else {
          console.log(`Viewing property listing ${item.id}`);
        }
      }}
    > 
   
        {item.image && <Image source={item.image} style={styles.listingImage} />}
        <View style={styles.priceBox}>
        <Text style={styles.price}>{price}</Text>
        
        </View>
      </TouchableOpacity>
      
    );
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {listings.map((listing) => (
          <Marker key={listing.id} coordinate={{ latitude: listing.latitude, longitude: listing.longitude }} />
        ))}
      </MapView>
      <View>
      </View>
      {showListings && (
        <View style={styles.listingsContainer}>
          <FlatList
            style={styles.listingsList}
            horizontal
            data={listings}
            renderItem={renderListingItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
      {!showListings && (
        <TouchableOpacity style={styles.toggleListingsButton} onPress={toggleListings}>
          <Text>View Listings</Text>
        </TouchableOpacity>
      )}
      {showListings && (
        <TouchableOpacity style={styles.toggleListingsButton} onPress={toggleListings}>
          <Text>Hide Listings</Text>
        </TouchableOpacity>
      )}
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  toggleListingsButton: {
    position: 'absolute',
    top: "3%",
    right: "5%",
    backgroundColor: 'white',
    padding: 20,
    borderRadius: "30%",
  },
  listingsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  listingsList: {
    marginTop: 1,
    marginBottom: 2,
  },
  priceBox: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 15,
  },
  price: {
    fontWeight: 'bold',
  },
  listingItem: {
    width: 300,
    height: 300,
    marginRight: 16,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listingImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
