import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Listings = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user profiles when the component mounts
    fetchUserProfiles();
  }, []);

  const fetchUserProfiles = () => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    // Attach an event listener to get data updates
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object of user profiles into an array
        const profilesArray = Object.values(data);
        // Update the component state with the fetched user profiles
        setUserProfiles(profilesArray);
      }
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>Listings</Text>
        <FlatList
          data={userProfiles}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.userInfoContainer}>
              <ScrollView>
                <View style={styles.userInfo}>
                  <Image source={{ uri: item.logoUri }} style={styles.userImage} />
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Venue Name:</Text>
                    <Text style={styles.venueName}>{item.VenueName}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Price Per Hour:</Text>
                    <Text style={styles.text}>${item.pricePerHour}</Text>
                  </View>
      
                  <Text style={styles.PictureText}>Pictures</Text>
                  <FlatList
                    data={item.images}
                    keyExtractor={(img, imgIndex) => imgIndex.toString()}
                    showsVerticalScrollIndicator
                    style={styles.additionalImagesContainer}
                    contentContainerStyle={styles.additionalImagesContent}
                    renderItem={({ item: img }) => {
                      // Log the image URL to the console
                      console.log("Image URL:", img);
                      
                      return (
                        <Image source={{ uri: img }} style={styles.additionalImage} />
                      );
                    }}
                  />
                </View>
               
              </ScrollView>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userInfoContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    marginRight: 20,
    width: 375,
  },
  userInfo: {
    flexDirection: 'column',
  },
  PictureText: {
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center"
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  additionalImagesContainer: {
    marginTop: 8,
    height: "41.5%",
  },
  additionalImagesContent: {
    paddingHorizontal: 8,
  },
  additionalImage: {
    width: "99%", // Adjust the width as needed
    height: 250,
    borderRadius: 8,
    marginBottom: 3,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    marginRight: 8,
    fontSize: 20,
  },
  venueName: {
    flex: 1,
    fontSize: 20,
  },
  EventInfo: {
    flex: 1,
    backgroundColor: 'gray',
  }
});

export default Listings;
