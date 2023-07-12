import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { CardField, StripeProvider } from '@stripe/stripe-react-native';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

export default function Payment() {
  const route = useRoute();
  const price = route.params?.price;

  return (
    <StripeProvider publishableKey="pk_test_51MpFulKKeFhzEyfn78Rv4CGBwpuYMx3othFCVTfBpN8qchlTYEEjIb2LixCbA9iigBOUt1xlqnQhIkey5g0OLexD00K4qAO53d">
      <View style={styles.container}>
        <Text style={styles.title}>Enter Card Details</Text>
        <Text style={styles.price}>Amount: ${price}</Text>
        <PaymentScreen price={price} />
      </View>
    </StripeProvider>
  );
}

function PaymentScreen({ price }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const { confirmPayment, initPaymentSheet } = useStripe();

  const handleCardChange = (cardDetails) => {
    console.log('cardDetails', cardDetails);
  };

  const handleFocus = (focusedField) => {
    console.log('focusField', focusedField);
  };

  const handlePayment = async () => {
    try {
      // Call your backend API to create a PaymentIntent
      const response = await fetch('https://righteous-cuboid-anemone.glitch.me/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price }),
      });

      if (!response.ok) {
        throw new Error('Checkout request failed.');
      }

      const { clientSecret } = await response.json();

      // Confirm the payment on the client-side using the PaymentIntent client secret
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        type: 'Card',
        billingDetails: {
          name: name,
          email: email,
          address: {
            line1: address,
          },
        },
      });

      if (error) {
        console.log('Payment error:', error);
      } else if (paymentIntent) {
        console.log('Payment successful with payment method ID:', paymentIntent.id);

        // Log the name, number, email, and address information
        console.log('Name:', name);
        console.log('Number:', number);
        console.log('Email:', email);
        console.log('Address:', address);
      }
    } catch (error) {
      console.log('Payment error:', error);
    }
  };

  useEffect(() => {
    const initPayment = async () => {
      const customAppearance = {
        font: {
          family: Platform.OS === 'android' ? 'avenirnextregular' : 'AvenirNext-Regular',
        },
        shapes: {
          borderRadius: 12,
          borderWidth: 0.5,
        },
        primaryButton: {
          shapes: {
            borderRadius: 20,
          },
        },
        colors: {
          primary: '#fcfdff',
          background: '#ffffff',
          componentBackground: '#f3f8fa',
          componentBorder: '#f3f8fa',
          componentDivider: '#000000',
          primaryText: '#000000',
          secondaryText: '#000000',
          componentText: '#000000',
          placeholderText: '#73757b',
        },
      };

      const { error } = await initPaymentSheet({
        // other configuration options...
        appearance: customAppearance,
      });

      if (error) {
        console.log('Payment sheet initialization error:', error);
      }
    };

    initPayment();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Alec Lewis"
      />

      <Text style={styles.label}>Number:</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        placeholder="(214) 557-3831"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="johndoe@example.com"
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Street, City, State and Zip"
      />

      <CardField
        postalCodeEnabled={true}
        style={styles.cardField}
        onCardChange={handleCardChange}
        onFocus={handleFocus}
      />

      <Button title="Reserve!" onPress={handlePayment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
  },
});
