import React from 'react';
import { View, Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import checkUserAndNavigate from '../utils/authUtils';

const Header = () => {
    const navigation=useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => checkUserAndNavigate(navigation, 'WishlistScreen')}>
        <Ionicons name="heart-outline" size={25} color="#1E1E1E" />
      </TouchableOpacity>
      <Text style={styles.brandName}>PricePeeps</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={() => checkUserAndNavigate(navigation, 'ProfileSettings')}>
        <Ionicons name="person-circle-outline" size={25} color="#1E1E1E" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:10
  },
  iconContainer:{
    borderRadius:100,
    padding:10,
    backgroundColor:'rgba(219, 48, 34, 0.1)'
  },
  brandName:{
    fontWeight:'900',
    color:'#DB3022',
  }
});

export default Header;
