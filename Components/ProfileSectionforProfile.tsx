// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as ImagePicker from 'expo-image-picker';
// import { TextInput } from 'react-native-gesture-handler';
// import { getDatabase, ref, set, get } from 'firebase/database';


// const ProfileSection = () => {
//   const [profileImageUri, setProfileImageUri] = useState(null);


//   const pickProfileImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1], // You can set the aspect ratio as needed
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfileImageUri(result.uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
     

//       {/* <View style={styles.imageContainer}> */}
//         <TouchableOpacity onPress={pickProfileImage}>
//           {profileImageUri ? (
//             <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
//           ) : (
//             <Image
//               source={require('../assets/profileuser.png')} // Provide a default profile image
//               style={styles.profileImage}
//             />
//           )}
//         </TouchableOpacity> 
        
//         <View>
//         <TextInput 
//             style={styles.Name}  
//             placeholder="Name"
//         />
//        <TextInput 
//             style={styles.Name}  
//             placeholder="Address"
//         />
//       </View>
      
//       </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 45,
//     alignItems: 'center',
//     width: "100%",
//     marginTop: "10%",

//   },
//   Name: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: "1%",
//     padding: 8,
//     fontSize: 16,
//   },
//   imageContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 'auto',
    
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginRight: 10,
   
//   },
//   trustedpartner: {
//     width: 20,
//     height: 20,
//     borderRadius: 0,
//     marginLeft: 100,
//     aspectRatio: 1,
//   },
//   profileInfo: {
//     flexDirection: 'column',
//   },
//   profileName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   profileLocation: {
//     fontSize: 16,
//   },
//   profileRating: {
//     fontSize: 15,
//     color: 'gray',
//   },
 
// });

// export default ProfileSection;
