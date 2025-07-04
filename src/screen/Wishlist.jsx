import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../hooks/useApi';

const { request } = useApi();

const WishlistScreen = () => {

  const [wishlistItems, setWishlistItems] = useState([
    { id: '1', name: 'PS5 Console', price: '$499', img: require('../assets/electronics-1.jpg') },
    { id: '2', name: 'iPhone 15', price: '$999', img: require('../assets/electronics-1.jpg') },
    { id: '3', name: 'AirPods Pro', price: '$249', img: require('../assets/electronics-1.jpg') },
  ]);
  const navigation= useNavigation();

  const handleRemoveItem = async (id) => {
    
    try {
      const { status, data } = await request('/product/wishlist/remove', 'POST', {
        id,
      });
      
      if (status === 200) {
        setWishlistItems((prevItems) => prevItems.filter(item => item.id !== id));
        Alert.alert('Success', 'Product removed from wishlist');
      } else {
        Alert.alert('Error', data.error || 'Failed to remove product');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong while removing from wishlist');
    }
  };

  const renderWishlistItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={ item.img } style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={() => handleRemoveItem(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Wishlist</Text>
      </View>
      {wishlistItems.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty.</Text>
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id}
          renderItem={renderWishlistItem}
        />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  removeButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8,
    width:70
  },
  removeButtonText: {
    color: 'red',
    fontWeight: '600',
  },
});

export default WishlistScreen;
