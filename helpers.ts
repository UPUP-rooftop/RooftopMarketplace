import { Alert } from 'react-native';
import { API_URL } from './Config';

export async function fetchPublishableKey(
  paymentMethod?: string
): Promise<string | null> {
  console.log( paymentMethod )
  
  try {
    const response = await fetch(
      `${API_URL}/stripe-key`
    
      );
console.log("response", response)
    
const { publishableKey } = await response.json();

    return publishableKey;
  } catch (e) {
    console.warn('Unable to fetch publishable key. Is your server running?', e);
    Alert.alert(
      'Error',
      'Unable to fetch publishable key. Is your server running?'
    );
    return null;
  }
}
