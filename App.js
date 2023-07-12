import React from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TheRileyVenue from './screens/TheRileyVenue';
import RentTheRiley from './screens/RentTheRiley';
import { StripeProvider } from '@stripe/stripe-react-native';
import Payment from './screens/Payment';


const Stack = createStackNavigator();


export default function App() {
  return (
       
<StripeProvider publishableKey= 'pk_test_51MpFulKKeFhzEyfn78Rv4CGBwpuYMx3othFCVTfBpN8qchlTYEEjIb2LixCbA9iigBOUt1xlqnQhIkey5g0OLexD00K4qAO53d'>
        <NavigationContainer >
       
        <Stack.Navigator initialRouteName="Home">
          
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }} />
          
          <Stack.Screen 
            name="Map" 
            component={MapScreen}
            // options={{ headerShown: false }}
        
            
            />

           <Stack.Screen
           name="The Riley Venue"
           component={TheRileyVenue}
           initialParams={{price: '$250/hr'}}
           /> 

          <Stack.Screen
           name="Rent The Riley"
           component={RentTheRiley}
          //  options={{ headerShown: false }}
          />   

<Stack.Screen
           name="Payment"
           component={Payment}
          //  options={{ headerShown: false }}
          />   
          
         
        
      </Stack.Navigator>


      </NavigationContainer>
      </StripeProvider>
   
  );
}
;