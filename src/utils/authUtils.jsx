// utils/authUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const checkUserAndNavigate = async (navigation,screen) => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      navigation.navigate(screen);
    } else {
      Alert.alert(
        'Account Required',
        'You need to create an account to access this feature.',
        [
            {
              text: 'OK',
            },
            {
              text: 'Login',
              onPress: () => navigation.navigate('Login'),
            },
          ]
      );
    }
  } catch (error) {
    console.error('Error checking user in AsyncStorage:', error);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }
};


export default checkUserAndNavigate