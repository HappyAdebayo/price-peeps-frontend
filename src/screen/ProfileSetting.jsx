import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApi } from '../hooks/useApi';

const { request } = useApi();

const ProfileSettings = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      Alert.alert('Logged out', 'You have been logged out successfully!');
      navigation.replace('Login');
    } catch (e) {
      console.error('Failed to clear AsyncStorage:', e);
      Alert.alert('Error', 'Something went wrong while logging out.');
    }
  };

  const toggleNotifications = async () => {
    console.log('sttarted');
    
    const newNotificationState = !isNotificationsEnabled; 
    setIsNotificationsEnabled(newNotificationState);

    try {
      const userData = await AsyncStorage.getItem('user');
  
      if (!userData) {
        Alert.alert('Error', 'User not found');
        return;
      }
  
      const user = JSON.parse(userData);
      
      const userId = user.id;
  
      const { status, data } = await request('/setting/notifications', 'POST', { 
      user_id: userId, 
      notification: newNotificationState  
    });
  
      if (status === 200) {
        Alert.alert('Success', 'Updated successfully.');
      } else {
        Alert.alert('Error', data.error || 'Failed to delete account');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while updating settings');
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: deleteAccount,
        },
      ],
      { cancelable: true }
    );
  };


  const deleteAccount = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');

      if (!userData) {
        Alert.alert('Error', 'User not found');
        return;
      }

      const user = JSON.parse(userData);
      
      const userId = user.id;

      const { status, data } = await request('/auth/delete_account', 'POST', { id: userId });

      if (status === 201) {
        await AsyncStorage.removeItem('user');
        Alert.alert('Account Deleted', 'Your account has been permanently deleted.');
        navigation.replace('Login');
      } else {
        Alert.alert('Error', data.error || 'Failed to delete account');
      }
    } catch (error) {
      console.log('Delete Account Error:', error);
      Alert.alert('Error', 'Something went wrong while deleting account');
    }
  };

  const fetchNotificationSetting = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');

      if (!userData) {
        Alert.alert('Error', 'User not found');
        return;
      }

      const user = JSON.parse(userData);
      
      const userId = user.id;

      const { status, data } = await request(`/setting/notifications?id=${userId}`, 'GET');

      if (status === 200) {
        setIsNotificationsEnabled(data.notification)
      } else {
        Alert.alert('Error', data.error || 'Failed to get user setting');
      }
    } catch (error) {
      console.log('Notification error:', error);
      Alert.alert('Error', 'Something went wrong while getting user settings');
    }
  };

  useEffect(() => {
    fetchNotificationSetting();
  }, []);
  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      {/* <View style={styles.section}>
        <Text style={styles.label}>Profile Information</Text>
        
        <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate('ChangePasswordScreen')}>
          <Text>Change Password</Text>
        </TouchableOpacity>
      </View> */}
      
      <View style={styles.section}>
        <Text style={styles.label}>App Settings</Text>

        <View style={styles.option}>
          <Text>Enable Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#ddd', true: '#DB3022' }}
            thumbColor={isNotificationsEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={[styles.option, styles.deleteButton]} onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  }
});

export default ProfileSettings;
