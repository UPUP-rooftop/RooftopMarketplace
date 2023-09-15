import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, set, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const ProfileScreen = ({setUserData}) => {
  const [address, setAddress] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [user, setUser] = useState(null); // State to hold user object


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user object in the state
        fetchUserProfile(user.uid);
      } else {
        setUser(null); // Set user to null if not authenticated
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Fetch and display user profile data when the component mounts
  useEffect(() => {
    if (user) {
      fetchUserProfile(user.uid);
    }
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const saveUserProfile = () => {
    if (!user) {
      console.error('User is not authenticated.'); // Handle this case accordingly
      return;
    }

    const database = getDatabase();
    const userRef = ref(database, `users/${user.uid}`);

    const userData = {
      address,
      pricePerHour,
      imageUri,
      // Add any other user-specific data here
    };

    set(userRef, userData)
      .then(() => {
        console.log('User profile saved successfully.');
      })
      .catch((error) => {
        console.error('Error saving user profile:', error);
      });
      
      setUserData(userData);
  };

  const fetchUserProfile = (uid) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${uid}`);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setAddress(userData.address || ''); // Set default value if not available
          setPricePerHour(userData.pricePerHour || ''); // Set default value if not available
          setImageUri(userData.imageUri || null); // Set default value if not available
        } else {
          console.log('User profile data not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Profile</Text>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.profileImage} />}

      <Button title="Pick an image from gallery" onPress={pickImage} />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Price per Hour (Ex. $250)"
        value={pricePerHour}
        onChangeText={(text) => setPricePerHour(text)}
      />

      <Button title="Save" onPress={saveUserProfile} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
