import React from 'react';
import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ImageSearchIcon = ({ onImageSelected }) => {
  const handleImageSelect = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      alert('Permission to access camera and media library is required!');
      return;
    }

    Alert.alert('Image Source', 'Choose where to pick the image from:', [
      {
        text: 'Camera',
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.canceled && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            onImageSelected(uri);
          }
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.canceled && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            onImageSelected(uri);
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <TouchableOpacity style={styles.searchButton} onPress={handleImageSelect}>
      <Ionicons name="camera" size={22} color="#DB3022" style={styles.icon} />
      <Text style={styles.searchText}>Image Search</Text>
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

export default ImageSearchIcon;
