import React, { useState } from 'react';
import { View, SafeAreaView,ActivityIndicator, StyleSheet,TouchableOpacity,Text } from 'react-native';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../hooks/useApi';

const { request } = useApi();

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation=useNavigation()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords must match");
      return;
    }
  
    setLoading(true); 

    try {
    const { status, data } = await request('/auth/signup', 'POST', { email, password });
  
    if (status === 201) {
      navigation.navigate('VerifyEmail',{ email });
    } else {
      setError(data.error || 'Signup failed');
    }
  } catch (err) {
    setError('Something went wrong');
  } finally {
    setLoading(false); 
  }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginText}>Signup</Text>
      <Text style={styles.paragraph}>Create an account to get started</Text>
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
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
       <Input
        label="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        secureTextEntry={true}
      />

       {loading ? (
        <ActivityIndicator color="#DB3022" size={30} /> 
           ) : (
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
          )}

      <View style={styles.accountLink}>
        <Text>Already have an account </Text>
        
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.registerLink}>Login</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:'50%',
    paddingHorizontal: 20,
     backgroundColor:'#FAF9F9'
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
    color:'#FFFFFF',
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
    
  }
});

export default SignupScreen;
