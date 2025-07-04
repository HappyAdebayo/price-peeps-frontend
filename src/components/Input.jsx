import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, error, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    // fontSize: 16,
    marginBottom: 5,
    color:'#1E1E1E'

  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor:'#ffffff'
  },
  inputError: {
    borderColor: 'red', 
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Input;
