import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Input from '../components/Input';
import { useNavigation,useRoute } from '@react-navigation/native';
import { useApi } from '../hooks/useApi';

const { request } = useApi();

const ChangePasswordScreen = () => {
  const navigation=useNavigation()
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const {from,code} = route.params;
  console.log(code);
  
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword || !email) {
      setError('missing fields');
        setTimeout(() => {
            setError('');
          }, 3000);
        return;
      }
    if (newPassword !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    setLoading(true);
    
    try {
      const { status, data } = await request('/auth/password/passwordreset', 'POST', { reset_code: code, new_password:newPassword, email });
    
      if (status === 201) {
        navigation.navigate('VerificationSuccess', { from });
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
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Change Password</Text>
        </View>

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
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Enter your new password"
        secureTextEntry={true}
        />

        <Input
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your new password"
          secureTextEntry={true}
        />

      {loading ? (
        <ActivityIndicator color="#DB3022" size={30}  style={{ marginTop:25}}/> 
          ) : (
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F9',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    padding:15,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    marginTop:25,
    backgroundColor:'#DB3022'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
