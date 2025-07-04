import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import Slider from 'react-native-simple-slider';
import ImageSearchIcon from './ImageSearchIcon';
import VoiceSearchIcon from './VoiceSearchIcon';

const FilterModal = ({ isVisible, toggleModal, applyFilters }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [rating, setRating] = useState(0);
  const [imageUri, setImageUri] = useState(null);

  const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour', 'New Balance', 'Asics', 'Converse', 'Vans'];

  const toggleBrandSelection = (brand) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand]
    );
  };

  const handleApplyFilters = () => {
    applyFilters({ selectedBrands, priceRange, rating });
    toggleModal();
  };



  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleModal} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Filter Options</Text>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Brand</Text>
          <ScrollView contentContainerStyle={styles.checkboxGridContainer}>
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand}
                style={[styles.checkboxItem, selectedBrands.includes(brand) && styles.checkedItem]}
                onPress={() => toggleBrandSelection(brand)}
              >
                <View style={[styles.checkbox, selectedBrands.includes(brand) && styles.checked]}>
                  {selectedBrands.includes(brand) && <Text style={styles.checkmark}>✔</Text>}
                </View>
                <Text style={styles.checkboxLabel}>{brand}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Price Range</Text>
          <View style={styles.rangeContainer}>

          <Slider
          minimumValue={0}
          maximumValue={1000}
          step={5}
          value={priceRange[0]}
          onValueChange={(value) => setPriceRange([value, priceRange[1]])}
          minimumTrackTintColor="#DB3022"
          maximumTrackTintColor="#ddd" 
          thumbTintColor="#DB3022" 
        />
          </View>
          <Text style={styles.priceText}>₹ {priceRange[0]}</Text>

        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Rating</Text>
          <Slider
          minimumValue={0}
          maximumValue={5}
          step={.5}
          value={rating}
          onValueChange={(value) => setRating(value)}
          minimumTrackTintColor="#DB3022"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#DB3022"
         />

          <Text>{rating} star</Text>
        </View>

        <View style={styles.iconContainer}>
          <ImageSearchIcon onImageSelected={(uri) => {
              setImageUri(uri);
              console.log('Selected Image URI:', uri);
            }} />

            
          <VoiceSearchIcon />
        </View>

        <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 15,
  },
  checkboxGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkboxItem: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#FF6F61',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  rangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText:{
    marginTop:10
  },
  applyButton: {
    padding:15,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    backgroundColor:'#DB3022'
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
  },
  icon: {
    marginRight: 8,
  },
  searchText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

});

export default FilterModal;
