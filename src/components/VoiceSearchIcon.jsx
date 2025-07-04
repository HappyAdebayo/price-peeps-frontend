import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const VoiceSearchIcon = () => {
  const handleVoiceSearch = () => {
    console.log('Voice search button clicked');
  };

  return (
    <TouchableOpacity style={styles.searchButton} onPress={handleVoiceSearch}>
      <MaterialIcons name="keyboard-voice" size={22} color="#DB3022" style={styles.icon} />
      <Text style={styles.searchText}>Voice Search</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
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

export default VoiceSearchIcon;
