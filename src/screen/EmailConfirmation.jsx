import React, { useState} from 'react';
import {SafeAreaView,ActivityIndicator, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import {useApi} from '../hooks/useApi';

const { request } = useApi();

const EmailConfirmationScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation =useNavigation()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true); 
    
    try {
      const { status, data } = await request('/auth/password/passwordrequest', 'POST', { email });
    
      if (status === 201) {
        navigation.navigate('VerifyCode')
      } else {
        setError(data.error || 'Failed to send verification code');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false); 
    }

      };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginText}>Forgot Password</Text>
      <Text style={styles.paragraph}>Enter your email to receive a verification code</Text>

      {error && <Text style={{
        color:'red',
        textAlign:'center'
      }}>{error}</Text>}

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

        {loading ? (
        <ActivityIndicator color="#DB3022" size={30}  style={{ marginTop:25}}/> 
           ) : (
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Request code</Text>
        </TouchableOpacity>
           )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical:45,
     backgroundColor:'#FAF9F9',
     paddingTop:'50%'
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
  loginText:{
    fontWeight:'900',
    color:'#1E1E1E',
    fontSize:30,
  },
  paragraph:{
    marginBottom:40, 
    color:'#1E1E1E'
  },
  accountLink:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
    justifyContent:'center'
  },
  registerLink:{
    color:'#DB3022',
    textDecorationLine:'underline',
  },
  forgotPasswordText:{
    color:'#1E1E1E',
    fontWeight:'900',
    textDecorationLine:'underline',
  }
});

export default EmailConfirmationScreen;
