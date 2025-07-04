import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import BannerCarousel from '../components/BannerCarousel';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

 const Home = () => {
  const navigation=useNavigation()
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:40}}>
     < Header />
      <BannerCarousel/>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for a product..."
          style={styles.input}
          placeholderTextColor="#888"
          // editable={false}
          onFocus={() => navigation.navigate('SearchScreen')}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Trending Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[ 
          { name: 'PS5 Console', price: '$499', img: 'https://via.placeholder.com/150' },
          { name: 'iPhone 15', price: '$999', img: 'https://via.placeholder.com/150' },
          { name: 'AirPods Pro', price: '$249', img: 'https://via.placeholder.com/150' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.productCard}>
            <Image source={{ uri: item.img }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Popular Categories</Text>
      <View style={styles.categoryGrid}>
        {[ 
          { name: 'Electronics', img: require( '../assets/electronics-1.jpg') },
          { name: 'Fashion', img: require( '../assets/fashion-1.jpg') },
          { name: 'Sports', img: require( '../assets/sport-1.jpg') },
          { name: 'Healths', img: require( '../assets/health-1.jpg') },
        ].map((cat, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}
          onPress={() =>
            navigation.navigate('SearchScreen', {searchWord:cat.name})
          }
          >
            <Image source={cat.img} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#FAF9F9',
    paddingHorizontal: 20,
    paddingVertical:50,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4A4A4A',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    color: '#1E1E1E',
    borderWidth:1,
    borderColor:'#E0E0E0'
  },
  button: {
    backgroundColor: '#DB3022',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginTop:30,
    color: '#4A4A4A',
    marginBottom: 10,
  },
  productCard: {
    width: 140,
    marginRight: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1E1E1E',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 12,
    color: '#888',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  categoryCard: {
    width: '47%',
    height:100,
    backgroundColor: '#ffff',
    marginBottom: 15,
    borderRadius: 12,
    position:'relative'
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryName: {
    fontWeight: '900',
    color: '#ffffff',
    position:'absolute',
    bottom:10,
    left:10
  },
  trackBox: {
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 40,
    alignItems: 'center',
  },
  trackText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  trackButton: {
    backgroundColor: '#DB3022',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  trackButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
