import React, { useEffect,useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    const [isOnboarding, setIsOnboarding] = useState(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const onboarding = await AsyncStorage.getItem('onboarding');
        setIsOnboarding(onboarding === 'true');
      } catch (error) {
        console.error('Error fetching onboarding status:', error);
        setIsOnboarding(false);
      }
    };

    checkOnboarding();

    const timer = setTimeout(() => {
      if (isOnboarding === true) {
        navigation.replace('Home');
      } else if (isOnboarding === false) {
        navigation.replace('OnboardingScreen');
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOnboarding]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pricepeeps-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
