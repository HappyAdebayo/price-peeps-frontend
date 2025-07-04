import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import { useApi } from '../hooks/useApi';

const { request } = useApi();

const VerifyEmail = () => {

  const route = useRoute();
  const { email } = route.params;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputs = useRef([]);
  const navigation=useNavigation()
  const [loading, setLoading] = useState(false);
  const [loadingResendPasswordRequest, setLoadingResendPasswordRequest] = useState(false);


  const handleChange = (text, index) => {
    if (/^[0-9]?$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
    //   setError(false); 

      if (text && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit =  async() => {

      if(!email){
         setError('Email is Empty')
         return;
      }

      if (code.some((digit) => digit === '')) {
          setError('Enter all 6 digits');
          return;
        } 
        
        setLoading(true); 
        
        const fullCode = code.join('');
    try {
        const { status, data } = await request('/auth/verification/verify', 'POST', { email, verification_code:fullCode });
      
        if (status === 201) {
            navigation.replace('Login')
        } else {
          setError(data.error);
        }
      } catch (err) {
        console.log(err);
        
        setError('Something went wrong');
      } finally {
        setLoading(false); 
      }
  };

  const handleResendCode =  async() => {

    if(!email){
       setError('Email is Empty')
       return;
    }
 
    setLoadingResendPasswordRequest(true)
  try {
      const { status, data } = await request('/auth/verification/resend_verification_code', 'POST', { email});
    
      if (status === 201) {
          setError('')
          setSuccess('Verification code sent successfully');
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.log(err);
      
      setError('Something went wrong');
    } finally {
      setLoadingResendPasswordRequest(false); 
    }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            maxLength={1}
            keyboardType="numeric"
            style={[
              styles.input,
              error && digit === '' && styles.inputError, 
            ]}
            returnKeyType="next"
          />
        ))}
      </View>

      <View style={styles.linkCont}>
       <Text>Click to resend code</Text>
       {loadingResendPasswordRequest ? (
        <ActivityIndicator color="#DB3022" size={10} style={{marginRight:10,}}/> 
        ) : (
       <TouchableOpacity onPress={handleResendCode}>
          <Text style={styles.resendLink}>Click me!</Text>
       </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      {success && (
        <Text style={styles.successText}>{success}</Text>
      )}

     {loading ? (
        <ActivityIndicator color="#DB3022" size={30} style={{marginTop:'auto'}}/> 
        ) : (
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop:65,
    paddingBottom: 65,
    backgroundColor:'#FAF9F9'
    },
  input: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 10,
    backgroundColor:'#ffffff'
  },
  inputContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  button:{
    marginTop:'auto',
    justifyContent:'center',
    alignItems:'center',
    padding:15,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    backgroundColor:'#DB3022'
  },
  buttonText:{
    color:'white',
    fontWeight:'bold'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  linkCont:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:10,
    gap:6
  },
  resendLink:{
    color:'#DB3022'
  }
});

export default VerifyEmail;
