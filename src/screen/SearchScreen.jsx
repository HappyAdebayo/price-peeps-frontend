import React, { useState} from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image, Keyboard, Alert } from 'react-native';
import { Ionicons,MaterialIcons,AntDesign } from '@expo/vector-icons'; 
import FilterModal from '../components/FilterModal';
import WishlistModal from '../components/WishlistModal';
import { useApi } from '../hooks/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { request } = useApi();

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filters, setFilters] = useState({});
  const [allProducts, setAllProducts] = useState([
    { id: '1', name: 'iPhone 15', price: '$999', img: require('../assets/electronics-1.jpg'), rating: 4.5,storeLogo: require('../assets/aliexpress-logo.png'), },
    { id: '2', name: 'PS5 Console', price: '$499', img: require('../assets/fashion-1.jpg'), rating: 4.8,storeLogo: require('../assets/aliexpress-logo.png'), },
    { id: '3', name: 'AirPods Pro', price: '$249', img: require('../assets/health-1.jpg'), rating: 4.2,storeLogo: require('../assets/aliexpress-logo.png'), },
  ]);
  const [wishlistModalVisible, setWishlistModalVisible] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState('');

  const handleAddToWishlist = async (item) => {
    setSelectedItemName(item.name);
    
    const cleanPrice = item.price.replace('$', '')

    try {
      const userData = await AsyncStorage.getItem('user');

      if (!userData) {
        Alert.alert('Error', 'User not found');
        return;
      }

      const user = JSON.parse(userData);
      
      const userId = user.id;

      
    const { status, data } = await request('/product/wishlist', 'POST', {
      user_id: userId,
      product_name: item.name,
      product_link: "https://your-product-link.com",
      product_price: cleanPrice,
      product_image_link: "https://your-product-image-link.com",
    });
      
      if (status === 201) {
        setWishlistModalVisible(true);
        setTimeout(() => setWishlistModalVisible(false), 1500); 
      } else {
        Alert.alert('Error', data.error || 'Failed to add to wishlist');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong while adding to wishlist');
    }
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const handleApplyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    toggleFilterModal();
    console.log('Applied filters:', selectedFilters);
  };


  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredResults([]);
      return;
    }
    const results = allProducts.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredResults(results);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.heartIcon} onPress={() => handleAddToWishlist(item)}>
      <AntDesign name="hearto" size={20} color="#DB3022" />
    </TouchableOpacity>
      <Image source={item.storeLogo} style={styles.logo} />
      <Image source={item.img} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.contentContainer}>
      <Text style={styles.price}>{item.price}</Text>
        <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus
          returnKeyType="search"
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableOpacity onPress={toggleFilterModal}>
          <Ionicons name="filter-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {searchQuery.length > 0 ? (
  filteredResults.length === 0 ? (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="search-off" size={80} color="#999" />
      <Text style={styles.emptyText}>No products found</Text>
    </View>
      ) : (
        <FlatList
          data={filteredResults.length > 0 ? filteredResults : allProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
    )
) :  (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={80} color="#999" />
      <Text style={styles.emptyText}>Search for your products</Text>
    </View>
  )}

<FilterModal
        isVisible={isFilterModalVisible}
        toggleModal={toggleFilterModal}
        applyFilters={handleApplyFilters}
      />
      <WishlistModal visible={wishlistModalVisible} itemName={selectedItemName} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F9',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor:'#E0E0E0'
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    position:'relative',
    borderColor: '#eee',
  },
  image: {
    width: '100%',
    height:120,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '900',
    color: '#333',
    paddingLeft:10
  },
  price: {
    fontSize: 13,
    color: '#888',
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 50,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  ratingText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 4,
    fontWeight: '600',
  },
  contentContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:10,
    marginTop:5
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    position:'absolute',
    zIndex:1,
    bottom:62,
    left:5
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    elevation: 3,
  },
  
});

export default SearchScreen;
