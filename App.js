import React from 'react';
import { StyleSheet, Text, View, Button, Pressable, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TheRileyVenue from './screens/TheRileyVenue';
import RentTheRiley from './screens/RentTheRiley';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useState, useEffect } from 'react';
import PaymentsUICompleteScreen from './screens/PaymentsUICompleteScreen';
import { colors } from './colors';
import WestviewRooftop from './screens/WestViewRooftop';
import PaymentScreenforWestView from './screens/PaymentScreenforWestView';
import SignIn from './screens/SignIn';
import ProfileScreen from './screens/ProfileScreen';



const Stack = createStackNavigator();



export default function App() {

  const [userData, setUserData] = useState(null);
  return (
       
       
<StripeProvider publishableKey= 'pk_test_51MpFulKKeFhzEyfn78Rv4CGBwpuYMx3othFCVTfBpN8qchlTYEEjIb2LixCbA9iigBOUt1xlqnQhIkey5g0OLexD00K4qAO53d'>
        <NavigationContainer>
       
        <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerTintColor: colors.white,
          headerStyle: {
            shadowOpacity: 0,
            backgroundColor: colors.dark_gray,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.slate,
          },
          headerTitleStyle: {
            color: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.white,
          },
        }}
        >
          
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }} />
           
            <Stack.Screen 
            name="SignIn" 
            component={SignIn}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="ProfileScreen"
            options={{ headerShown: false }}
            >
            {(props) => <ProfileScreen {...props} setUserData={setUserData} />}
          </Stack.Screen>
          
          <Stack.Screen
            name="Map"
            // options={{ headerShown: false }}
          >
            {(props) => <MapScreen {...props} userData={userData} />}
          </Stack.Screen>
            
           
        
            

           <Stack.Screen
           name="The Riley Venue"
           component={TheRileyVenue}
           initialParams={{price: '$500/hr'}}
           /> 

          <Stack.Screen
           name="Rent The Riley"
           component={RentTheRiley}
          //  options={{ headerShown: false }}
          />   


      
      <Stack.Screen
           name="PaymentsUICompleteScreen"
           component={PaymentsUICompleteScreen}
          //  options={{ headerShown: false }}
          />  

          <Stack.Screen
          name="Westview Rooftop"
          component={WestviewRooftop}
          initialParams={{price: '$250/hr'}}
          />

         <Stack.Screen
           name="PaymentScreenforWestView"
           component={PaymentScreenforWestView}
          //  options={{ headerShown: false }}
          />  
         
         
        
      </Stack.Navigator>


      </NavigationContainer>
      </StripeProvider>
 
  );
}
;