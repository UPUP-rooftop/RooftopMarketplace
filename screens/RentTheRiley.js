import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import Calendar from '../Components/Calendar';
import PaymentsUICompleteScreen from './PaymentsUICompleteScreen';
import PaymentScreen from '../Components/PaymentScreen';
import { API_URL } from '../Config';

const PricingTable = ({ navigation, title }) => {
  const [quantity, setQuantity] = useState('');
  const [packageOption, setPackageOption] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');
  const [price, setPrice] = useState();
  const [selectedUpgrades, setSelectedUpgrades] = useState([]); // State for multiple upgrades
  const [validationError, setValidationError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCostCalculated, setIsCostCalculated] = useState(false);
  
const PaymentsUICompleteScreen = () => {
    if (quantity && packageOption && numOfPeople) {
      console.log('Selected hours:', quantity);
      console.log('Selected number of people:', numOfPeople);
      console.log('Selected package:', packageOption);
      console.log('Selected upgrades:', selectedUpgrades);
    navigation.navigate('PaymentsUICompleteScreen', { price: price }); // Pass the price as a route parameter to the payment screen
  }  else {
      setIsModalVisible(true);
    }   
    
  };

  
  

  const calculatePrice = () => {
    const quantityValue = Number(quantity) || 0; // Convert quantity to a number, defaulting to 0 if empty or invalid
    const numOfPeopleValue = Number(numOfPeople) || 0; // Convert numOfPeople to a number, defaulting to 0 if empty or invalid
    console.log('Selected hours:', quantityValue);
    console.log('Selected number of people:', numOfPeopleValue);
    console.log('Selected package:', packageOption);
    console.log ('Selected upgrades', selectedUpgrades );

    let packagePrice = 0;

    // Calculate the price based on the selected package option
    switch (packageOption) {
      case 'penthouse':
        packagePrice = 55;
        break;
      case 'local':
        packagePrice = 50;
        break;
      case 'riley':
        packagePrice = 45;
        break;
      case 'beerWine':
        packagePrice = 34;
        break;
      case 'No Package':
        packagePrice = 0;
        break;
      default:
        packagePrice = 0;
    }

    let additionalFee = 0;
    if (packageOption !== 'No Package') {
      if (numOfPeopleValue > 75 && numOfPeopleValue <= 150) {
        additionalFee = 300;
      } else if (numOfPeopleValue > 150 && numOfPeopleValue <= 225) {
        additionalFee = 600;
      } else if (numOfPeopleValue > 225) {
        additionalFee = 900;
      }
    }

    if (quantityValue > 4 && packageOption !== 'No Package') {
      const additionalHours = quantityValue - 4;
      const additionalPricePerPerson = 5 * additionalHours;
      packagePrice += additionalPricePerPerson;
    }

    let upgradePrice = 0;
    selectedUpgrades.forEach((upgrade) => {
      switch (upgrade) {
        case 'special':
        case 'Wine':
        case 'Champagne':
          upgradePrice += 300;
          break;
        case 'bottle':
          upgradePrice += 150;
          break;
        case 'Margarita':
          upgradePrice += 300;
          break;
        default:
          break;
      }
    });

    // Calculate the total cost for the event
    const calculatedPrice =
      quantityValue * 500 + numOfPeopleValue * packagePrice + additionalFee + upgradePrice;
      
      
      setValidationError('');  
      setPrice(calculatedPrice);
      setIsCostCalculated(true);
  };

  


  useEffect(() => {
    calculatePrice();
  }, [quantity, packageOption, numOfPeople, selectedUpgrades]);

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const handleUpgradePress = (upgrade) => {
    // Check if the upgrade is already selected
    if (selectedUpgrades.includes(upgrade)) {
      // If selected, remove it from the array
      setSelectedUpgrades(selectedUpgrades.filter((item) => item !== upgrade));
    } else {
      // If not selected, add it to the array
      setSelectedUpgrades([...selectedUpgrades, upgrade]);
    }
  };

  

  


  return (
    
         <ScrollView contentContainerStyle={styles.container}>
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <View style={styles.container}> 
        <View style={styles.innerContainer}>
     
        <Text style={styles.errorText}>{validationError}</Text>
     
     <Calendar>
     </Calendar>
     
     
     <Modal visible={isModalVisible} animationType="fade" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.errorText}>Please fill out the all neccesary information!  {validationError}</Text>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Text style={styles.label}>How many hours is your event?</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            onBlur={handleKeyboardDismiss}
          />

          <Text style={styles.label}>How many people will be attending?</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numOfPeople}
            onChangeText={setNumOfPeople}
            onBlur={handleKeyboardDismiss}
          />

          <Text style={styles.label}>Select a package:</Text>
          <View style={styles.packageOptions}>
            <TouchableOpacity
              style={[styles.button, packageOption === 'penthouse' && styles.buttonPressed]}
              onPress={() => setPackageOption('penthouse')}
              activeOpacity={0.01}
            >
              <Text style={styles.buttonText}>Penthouse ($55 per person)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, packageOption === 'local' && styles.buttonPressed]}
              onPress={() => setPackageOption('local')}
              activeOpacity={0.01}
            >
              <Text style={styles.buttonText}>Local ($50 per person)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, packageOption === 'riley' && styles.buttonPressed]}
              onPress={() => setPackageOption('riley')}
              activeOpacity={0.01}
            >
              <Text style={styles.buttonText}>The Riley ($45 per person)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, packageOption === 'beerWine' && styles.buttonPressed]}
              onPress={() => setPackageOption('beerWine')}
              activeOpacity={0.01}
            >
              <Text style={styles.buttonText}>Beer and Wine ($34 per person)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, packageOption === 'No Package' && styles.buttonPressed]}
              onPress={() => setPackageOption('No Package')}
              activeOpacity={0.01}
            >
              <Text style={styles.buttonText}>No Package</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View>
              <Text> Upgrades </Text>
            </View>

            <ScrollView horizontal={true}>
              <TouchableOpacity
                style={[
                  styles.logoContainer,
                  selectedUpgrades.includes('special') && styles.buttonPressed,
                ]}
                onPress={() => handleUpgradePress('special')}
              >
                <Image
                  source={require('../assets/TheRileyBuildingLogo.png')}
                  style={styles.upgradelogo}
                />
                <Text style={styles.logoText}>The Riley Special</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.logoContainer,
                  selectedUpgrades.includes('Wine') && styles.buttonPressed,
                ]}
                onPress={() => handleUpgradePress('Wine')}
              >
                <Image
                  source={require('../assets/TableSideWineService.png')}
                  style={styles.upgradelogo}
                />
                <Text style={styles.logoText}>Tableside Wine Service</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.logoContainer,
                  selectedUpgrades.includes('Champagne') && styles.buttonPressed,
                ]}
                onPress={() => handleUpgradePress('Champagne')}
              >
                <Image
                  source={require('../assets/ChampagneToast.png')}
                  style={styles.upgradelogo}
                />
                <Text style={styles.logoText}>Champagne Toast</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.logoContainer,
                  selectedUpgrades.includes('bottle') && styles.buttonPressed,
                ]}
                onPress={() => handleUpgradePress('bottle')}
              >
                <Image
                  source={require('../assets/BottleService.png')}
                  style={styles.upgradelogo}
                />
                <Text style={styles.logoText}>Bottle Service</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.logoContainer,
                  selectedUpgrades.includes('Margarita') && styles.buttonPressed,
                ]}
                onPress={() => handleUpgradePress('Margarita')}
              >
                <Image
                  source={require('../assets/margarita.png')}
                  style={styles.upgradelogo}
                />
                <Text style={styles.logoText}>Margarita Machine</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View>
            <TouchableOpacity
              title="Cost for Event"
              onPress={calculatePrice}
              style={styles.costforeventButton}
            >
              <Text style={styles.CostForEvent}>Cost for Event = ${price}</Text>
            </TouchableOpacity>
            {/* {isCostCalculated && ( */}
            <Pressable
  style={styles.Pressable}
  onPress={() => PaymentsUICompleteScreen()}>
  <Text style={styles.FinalizeEvent}>Finalize Event!</Text>
</Pressable>
            {/* )} */}
          </View>
      </View>
      </View>
    </TouchableWithoutFeedback>
    </ScrollView>
  

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: "5%",
   
  },

  buttonPressed: {
    backgroundColor: '#87cefa',
  },

  innerContainer: {
    position: 'absolute',
    width: 300,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    zIndex: 2, width: "98%",
  },

  checkoutButton: {
    backgroundColor: '#87cefa',
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  checkoutText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  buttonTitle: {
    color: '#1e90ff', // Blue color
  },

  buttonText: {
    color: '#000', // Button text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  costforeventButton: {
    backgroundColor: '#000',
  
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: "5%",
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    flex: 1,
  },

  CostForEvent: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  FinalizeEvent: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',

  },
  Pressable: {
    backgroundColor: '#000',
    paddingVertical: 32,
    paddingHorizontal: 34,
    borderRadius: 25,
    marginTop: "5%",
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    flex: 1,
  },

  CostForEvent: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',

  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: "1%",
    padding: 8,
    fontSize: 16,
  },

  packageOptions: {
    marginBottom: 16,
  },

  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  upgradelogo: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },

  logoText: {
    fontSize: 12,
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalButton: {
    backgroundColor: '#87cefa',
    paddingVertical: 12,
    paddingHorizontal: 23,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'white',
  },

});

export default PricingTable;