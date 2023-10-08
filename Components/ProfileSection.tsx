import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';

const ProfileSection = () => {
  const [userData, setUserData] = useState({
    name: '',
    location: '',
    rating: '',
    address: '',
  });
  const [authError, setAuthError] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        setUserData(userDocSnapshot.data());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/AlecProfile.png')} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileLocation}>{userData.location}</Text>
          <Text style={styles.profileRating}>{userData.rating}</Text>
        </View>
        <Image source={require('../assets/trustedpartner.png')} style={styles.trustedpartner} />
      </View>
      <View style={styles.mapContainer}>
        {/* Display user's location on a map */}
      </View>
      <Text style={styles.addresslabel}>Address:</Text>
      <Text style={styles.address}>{userData.address}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      {authError && <Text style={styles.authError}>{authError}</Text>}
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
  addresslabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
  },
  signOutButton: {
    marginTop: 20,
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 10,
  },
  signOutText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  authError: {
    color: 'red',
    marginTop: 10,
  },
});

export default ProfileSection;
