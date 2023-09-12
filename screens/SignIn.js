import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';


const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorState, setErrorState] = useState(null);

  const handleSignUp = () => {
  const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigation.navigate("ProfileScreen");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  };

  const handleSignIn = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('ProfileScreen');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle the error, if needed
        setErrorState(errorMessage);
      });
  };
  



  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior='padding'
    >
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput 
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style ={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handleSignIn}
        style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        </View> 
    </KeyboardAvoidingView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%', // Adjust this as needed
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: "5%",
    marginBottom: "3%",
    backgroundColor: 'white',

  },
  buttonContainer:{
    width: '60%',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 40,
  },
  
  button:{
    backgroundColor: '#6ca6cd',
    width: 300,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  
  buttonOutline:{
    backgroundColor: 'white',
    width: 300,
    marginTop: 5,
    borderColor: '#6ca6cd',
    borderWidth: 2,
    
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  
  buttonOutlineText:{
    color: '#6ca6cd',
    fontWeight: '700',
    fontSize: 16,
},

})
