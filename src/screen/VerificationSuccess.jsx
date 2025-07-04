import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';

const EmailVerificationSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const from = route.params?.from;

const handleContinue = () => {
  if (from === 'login') {
    navigation.replace('Login');
  } 
};

  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.emoji}>👍</Text>
            <Text style={styles.title}>Verification Successful!</Text>
            <Text style={styles.subtitle}>Your password has been reset successfully.</Text>

            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default EmailVerificationSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
    textAlign:'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DB3022',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 10,
  },
  button:{
    padding:15,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    marginTop:25,
    backgroundColor:'#DB3022'
  },
  buttonText:{
    color:'white',
    fontWeight:'bold'
  },
});
