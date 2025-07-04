import React,{useRef, useEffect, useState} from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const banners = [
  { id: '1', image: require('../assets/electronics-1.jpg') },
  { id: '2', image: require('../assets/electronics-1.jpg') },
  { id: '3', image: require('../assets/electronics-1.jpg') },
  { id: '4', image: require('../assets/electronics-1.jpg') },
];

const BannerCarousel = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

//   INDICATOR
const renderIndicators = () => {
    return (
      <View style={styles.indicatorWrapper}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
    );
  };

//  CAROUSEL

  return (
    <View style={styles.carouselWrapper}>
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        snapToInterval={width}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <View style={styles.bannerWrapper}>
            <Image source={item.image} style={styles.bannerImage} />
          </View>
        )}
        scrollEventThrottle={16}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
       {renderIndicators()}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: {
    width: '100%',
    height: 150,
    marginTop:10,
    marginBottom:40,
    position: 'relative'
  },
  bannerWrapper: {
    width: width,
    height: 150,
  },
  bannerImage: {
    width: '90%',
    height: '100%',
    resizeMode: 'cover',
  },
  indicatorWrapper: {
    position: 'absolute',
    bottom: 10,
    left: '45%',
    flexDirection: 'row',
  },
  indicator: {
    width: 4,
    height:4,
    borderRadius: 4,
    marginRight: 3,
    backgroundColor: '#ffffff',
  },
  activeIndicator: {
    backgroundColor: '#ff6347',
  },
});

export default BannerCarousel;
