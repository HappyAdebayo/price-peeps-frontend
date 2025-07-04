import React from 'react';
import { Modal, View, Text, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const WishlistModal = ({ visible, itemName }) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            <AntDesign name="heart" size={30} color="#DB3022" />
          </View>
          <Text style={styles.text}>“{itemName}” has been added to your wishlist!</Text>
        </View>
      </View>
    </Modal>
  );
};

export default WishlistModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.8,
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  iconWrapper: {
    backgroundColor: '#fff0f0',
    padding: 12,
    borderRadius: 50,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
});
