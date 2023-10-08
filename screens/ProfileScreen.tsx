import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, ScrollView, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, set, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';



const ProfileScreen = ({ setUserData, navigation }) => {
  const [logoUri, setLogoUri] = useState('');
  const [VenueName, setVenueName] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserProfile(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserProfile(user.uid);
    }
  }, [user]);

  const pickImage = async () => {
    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImages([...images, result.uri]);
    }
  };
 
  const removeImage = (imageUriToRemove) => {
    const updatedImages = images.filter((imageUri) => imageUri !== imageUriToRemove);
    setImages(updatedImages);
  };
  

  const pickLogo = async () => {
    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setLogoUri(result.uri);
    }
  };

  const saveUserProfile = () => {
    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    const database = getDatabase();
    const userRef = ref(database, `users/${user.uid}`);

    const userData = {
      logoUri,
      pricePerHour,
      images,
      VenueName
    };

    set(userRef, userData)
      .then(() => {
        console.log('User profile saved successfully.');
      })
      .catch((error) => {
        console.error('Error saving user profile:', error);
      });
  };

  const fetchUserProfile = (uid) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${uid}`);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setLogoUri(userData.logoUri || '');
          setPricePerHour(userData.pricePerHour || '');
          setVenueName(userData.VenueName || '');

          setImages(userData.images || []);
        } else {
          console.log('User profile data not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  };

  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.galleryImage} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeImage(item)} // Pass the item (image URI) here
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <SafeAreaView>
    <ScrollView>
      <View style={styles.container}>
 
        <Text style={styles.header}>Your Profile</Text>
        <Image source={{ uri: logoUri }} style={styles.logoImage} />
        <Button title="Add Logo" onPress={pickLogo} />
        <View style={styles.VenuePictureContainer}>
          <FlatList
            data={images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderImageItem}
            horizontal
          />
          <Button title="Add Pictures" onPress={pickImage} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Venue Name"
          value={VenueName}
          onChangeText={(text) => setVenueName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price per Hour (Ex. $250)"
          value={pricePerHour}
          onChangeText={(text) => setPricePerHour(text)}
          keyboardType="numeric" 

        />
        <Button title="Save" onPress={saveUserProfile} />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 75,
    backgroundColor: 'whitesmoke',
    marginRight: "5%",
    marginLeft: "5%",
    marginTop: "15%",

  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 8,
  },
  VenuePictureContainer: {
    flex: 1,
    width: '100%',
    height: 250,
    marginBottom: 16,
    borderRadius: 8,
  },
  galleryImage: {
    width: 300,
    height: 200,
    marginRight: 8,
    borderRadius: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 3,
    marginRight: 8,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 8,
    borderRadius: 8,
  },
});

export default ProfileScreen;
