import React, { useState} from 'react';
import { View,ActivityIndicator,StyleSheet,TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import { useApi } from '../hooks/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { request } = useApi();

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation =useNavigation()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setTimeout(() => {
        setError('');
      }, 3000);
      setError('Both fields are required');
      return;
    }

    setLoading(true); 

    try{
      const { status, data } = await request('/auth/login', 'POST', { email, password });

      if (status === 200) {
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        navigation.replace('Home');
      }else if (status === 400) {
        if (data.message === 'verification') {
          navigation.navigate('VerifyEmail', { email });
        } else if (data.message === 'questionnaire') {
          await AsyncStorage.setItem('user_id', data.user_id.toString());
          navigation.navigate('QuestionnaireScreen1');
        } else {
          setError(data.error || 'Login failed');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    }catch{
      setError('Something went wrong');
    } finally {
      setLoading(false); 
    }
  };

  return (
    
    <View style={styles.container} >
      <Text style={styles.loginText}>Login</Text>
      <Text style={styles.paragraph}>Welcome back please enter your details</Text>
      {error && <Text style={{
              color:'red',
              textAlign:'center'
            }}>{error}</Text>}
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        // error={error ? 'Please enter a valid email' : ''}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        // error={error ? 'Password is required' : ''}
      />

      <TouchableOpacity onPress={()=> navigation.navigate('EmailConfirmation')}>
          <Text style={styles.forgotPasswordText}>Forgot password</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator color="#DB3022" size={30} /> 
            ) : (
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        )}

      <View style={styles.accountLink}>
        <Text>Don't have an account </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '50%', // push content down from top instead of centering
    backgroundColor: '#FAF9F9',
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
    color:'#333333'
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
    textAlign:'right'
  }
});

export default LoginScreen;
