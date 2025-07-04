import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const inputs = useRef([]);
  const navigation=useNavigation()

  const handleChange = (text, index) => {
    if (/^[0-9]?$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      setError(false); 

      if (text && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = () => {
    if (code.some((digit) => digit === '')) {
      setError(true);
    } else {
      setError(false);
      const fullCode = code.join('');
      navigation.navigate('ChangePasswordScreen',{ from: 'login', code:fullCode })
      console.log('Code submitted:', fullCode);
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

      {error && (
        <Text style={styles.errorText}>Enter all 6 digits</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
  inputError: {
    borderColor: 'red',
  },
});

export default VerifyCode;
