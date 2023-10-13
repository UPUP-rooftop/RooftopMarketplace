import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, ScrollView, FlatList } from 'react-native';
import { getDatabase, ref, set, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import RooftopNavBar from '../Components/RooftopNavBar';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = ({ setUserData, navigation }) => {
  const [logoUri, setLogoUri] = useState('');
  const [VenueName, setVenueName] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [email, setEmail] = useState('');
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);
  const storage = getStorage();
  const [imgURI, setImageURI] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remoteURL, setRemoteURL] = useState('');
  const [error, setError] = useState(null);

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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];

        if (user) {
          const storage = getStorage();
          const metadata = {
            contentType: 'image/jpeg',
          };

          fetch(selectedAsset.uri)
            .then((response) => response.blob())
            .then((blob) => {
              const storageRef = sRef(storage, `Venue Pictures/${user.uid}/${result.uri}`);
              const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                },
                (error) => {
                  // Handle upload error
                  console.error('Error uploading image:', error);
                },
                () => {
                  // Upload completed successfully, get the download URL
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImages([...images, downloadURL]);
                  });
                }
              );
            })
            .catch((error) => {
              console.error('Error fetching image:', error);
            });
        } else {
          console.error('User is not authenticated.');
        }
      }
    }
  };

  const removeImage = (imageUriToRemove) => {
    const updatedImages = images.filter((imageUri) => imageUri !== imageUriToRemove);
    setImages(updatedImages);
  };

  const pickLogo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
  
        if (user) {
          const storage = getStorage();
          const metadata = {
            contentType: 'image/jpeg',
          };
  
          fetch(selectedAsset.uri)
            .then((response) => response.blob())
            .then((blob) => {
              const storageRef = sRef(storage, `Venue Logos/${user.uid}/${result.uri}`);
              const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
  
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                },
                (error) => {
                  // Handle upload error
                  console.error('Error uploading logo:', error);
                },
                () => {
                  // Upload completed successfully, get the download URL
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('Logo available at', downloadURL);
                    setLogoUri(downloadURL); // Set the logo URI in the state
                  });
                }
              );
            })
            .catch((error) => {
              console.error('Error fetching logo:', error);
            });
        } else {
          console.error('User is not authenticated.');
        }
      }
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
      VenueName,
      email,
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
          setEmail(userData.email || '');
          setImages(userData.images || []);
        } else {
          console.log('User profile data not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  };

  const handleLocalImageUpload = async () => {
    const fileURI = await uplodImageFromDevice();

    if (fileURI) {
      setImageURI(fileURI);
    }
  };

  const onStart = () => {
    setIsUploading(true);
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const onComplete = (fileUrl) => {
    setRemoteURL(fileUrl);
    setIsUploading(false);
    setImageURI(null);
  };

  const onFail = (error) => {
    setError(error);
    setIsUploading(false);
  };

  const handleCloudImageUpload = async () => {
    if (!imgURI) return;

    let fileToUpload = null;

    const blob = await getBlobFromUri(imgURI);

    await manageFileUpload(blob, { onStart, onProgress, onComplete, onFail });
  };

  const renderImageItem = ({ item }) => {
    console.log("Rendering image item with URI:", item);
    return (
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
};

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
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Button title="Save" onPress={saveUserProfile} />
      </View>
    </ScrollView>
    <RooftopNavBar></RooftopNavBar>
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
  marginRight: '5%',
  marginLeft: '5%',
  marginTop: '5%',
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
