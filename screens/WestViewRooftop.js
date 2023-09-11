import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native'
import React from 'react'

import ProfileSection from '../Components/ProfileSectionforWestViewRooftop';

export default function TheRileyVenue({route, navigation}) {
  const { price } = route.params;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ScrollView horizontal={true}>            
          <Image source={require('../assets/WestViewRooftop4.jpg')} style={styles.image} />
          <Image source={require('../assets/WestviewRooftop.jpg')} style={styles.image} />
          <Image source={require('../assets/WestViewRooftop1.jpg')} style={styles.image} />
          <Image source={require('../assets/WestViewRooftop2.jpg')} style={styles.image} />
          <Image source={require('../assets/WestViewRooftop3.jpg')} style={styles.image} />
          <Image source={require('../assets/WestviewRooftop.jpg')} style={styles.image} />


          </ScrollView>
        </View>
        <View style={styles.descriptionContainer}>
          <Image source={require('../assets/PrescottGroup.png')} style={styles.Prescottlogo}/>

          <ScrollView horizontal={true}>

    <View style={styles.logoContainer}>
      <Image source={require('../assets/hand.png')} style={styles.logo} />
      <Text style={styles.logoText}>{price}</Text>
    </View>
    <View style={styles.logoContainer}>
      <Image source={require('../assets/people.png')} style={styles.logo} />
      <Text style={styles.logoText}>Capacity: 250 People </Text>
    </View>
    <View style={styles.logoContainer}>
      <Image source={require('../assets/FoodandDrinks.png')} style={styles.logo} />
      <Text style={styles.logoText}>Bar Tab Not Included</Text>
    </View>
    <View style={styles.logoContainer}>
      <Image source={require('../assets/measure.png')} style={styles.logo} />
      <Text style={styles.logoText}>1,000 sq. ft.</Text>
      </View>
      <View style={styles.logoContainer}>
      <Image source={require('../assets/disability.png')} style={styles.logo} />
      <Text style={styles.logoText}>Friendly</Text>
    </View>
    <View style={styles.logoContainer}>
      <Image source={require('../assets/cancelled.png')} style={styles.logo} />
      <Text style={styles.logoText}>2-Week Notice</Text>
    </View>
    <View style={styles.logoContainer}>
      <Image source={require('../assets/rain.png')} style={styles.logo} />
      <Text style={styles.logoText}>Rain or Shine</Text>
    </View>
    
      </ScrollView>

      <View>
        <ProfileSection name="Aracely Negrete" rating={5} city="Austin, TX" />
      </View> 
        </View>


      </View>
      <View style={styles.buttonContainer}>
      <View style={styles.buttonWrapper} >
      <Button style={styles.button}
              onPress={() => navigation.navigate('PaymentScreenforWestView')}
              title="Let's Rent this Space out!"
              color="white"
            />
       </View>
       </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  Prescottlogo: {
    width: "100%",
    height: 130,
    alignSelf: 'center',
    justifyContent: 'center',
    
  }
,  
  
  buttonWrapper: {
    marginHorizontal: "3%", // Decrease the marginHorizontal to reduce overall width
    backgroundColor: "black",
    borderColor: 'black',
    borderWidth: 2, // Decrease the borderWidth to make the button thinner
    borderRadius: 20, 
    alignContent: 'center',
    alignItems: "center",
    justifyContent: 'center', 
    height: 60, // Decrease the height of the button to fit better in the available space
  },
  buttonContainer: {
    marginHorizontal: "10%",
    marginTop: "2%",
    position: 'sticky',
    backgroundColor: 'black',
    borderRadius: 50, 
    alignContent: 'center',
    alignItems: 'center',
    bottom: "1%",
    justifyContent: 'center',
    height: 60, // Match the height of buttonWrapper
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    fontWeight: 'bold', 
    fontSize: 20, 
    color: 'white' 
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 200,
    marginRight: 8,
    borderRadius: 8,
  },
  descriptionContainer: {
    width: '100%',
   
  },
  address: {
    fontSize: 16,
    marginBottom: 16,
    top: "2%",
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginRight: 16,
    marginTop: 10,
  },
  
  logo: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
})
