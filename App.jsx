import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import LoginScreen from './src/screen/Login';
import SignupScreen from './src/screen/Signup';
import EmailConfirmationScreen from './src/screen/EmailConfirmation';
import VerifyCode from './src/screen/VerifyCode';
import EmailVerificationSuccessScreen from './src/screen/VerificationSuccess';
import OnboardingScreen from './src/screen/Onboarding';
import Home from './src/screen/Home';
import QuestionnaireScreen1 from './src/screen/Questionaire-1';
import QuestionnaireScreen2 from './src/screen/Questionaire-2';
import ProfileSettings from './src/screen/ProfileSetting';
import WishlistScreen from './src/screen/Wishlist';
import ChangePasswordScreen from './src/screen/ChangePassword';
import SplashScreen from './src/screen/SplashScreen';
import SearchScreen from './src/screen/SearchScreen';
import VerifyEmail from './src/screen/VerifyEmail';


import { RegisterForPushNotificationsAsync } from './src/pushnotification/Notification';
const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    console.log('Attempting to register for push notifications...');
    RegisterForPushNotificationsAsync().then(token => {
      console.log('Received Expo Token:', token);
    }).catch((error) => {
      console.error('Error while registering for push notifications:', error);
    });

  }, []);
  

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="EmailConfirmation" 
        component={EmailConfirmationScreen} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="VerifyCode" 
        component={VerifyCode} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="VerificationSuccess" 
        component={EmailVerificationSuccessScreen} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="OnboardingScreen" 
        component={OnboardingScreen} 
        options={{ headerShown: false }}
        />
         <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }}
        />
         <Stack.Screen 
        name="QuestionnaireScreen1" 
        component={QuestionnaireScreen1} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="QuestionnaireScreen2" 
        component={QuestionnaireScreen2} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="ProfileSettings" 
        component={ProfileSettings} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="WishlistScreen" 
        component={WishlistScreen} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="ChangePasswordScreen" 
        component={ChangePasswordScreen} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="SplashScreen" 
        component={SplashScreen} 
        options={{ headerShown: false }}
        />
         <Stack.Screen 
        name="SearchScreen" 
        component={SearchScreen} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="VerifyEmail" 
        component={VerifyEmail} 
        options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
