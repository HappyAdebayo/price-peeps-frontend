import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome to PricePeeps',
    description: 'Discover and compare prices from multiple vendors near you.',
    image: require('../assets/onboarding_image.png'),
  },
  {
    key: '2',
    title: 'Smart Shopping',
    description: 'Make smart buying decisions with real-time price updates.',
    image: require('../assets/onboarding-1.png'),
  },
  {
    key: '3',
    title: 'Track Your Deals',
    description: 'Stay updated on discounts and favorite items.',
    image: require('../assets/onboarding-2.png'),
  },
];

const OnboardingScreen = () => {
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

    //   SETTING ONBOARADIGN STATUS TRUE

    useEffect(() => {
        const markOnboardingComplete = async () => {
        try {
            await AsyncStorage.setItem('onboarding', 'true');
        } catch (error) {
            console.log('Error saving onboarding status:', error);
        }
        };

        markOnboardingComplete();
    }, []);


  const floatAnims = Array.from({ length: 5 }).map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    floatAnims.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -10,
            duration: 3000 + index * 300,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.quad),
          }),
          Animated.timing(anim, {
            toValue: 10,
            duration: 3000 + index * 300,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.quad),
          }),
        ])
      ).start();
    });
  }, []);

  useEffect(()=>{

  },[])
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* Floating Circles */}
            <Animated.View style={[styles.circle, { top: 80, left: 40, transform: [{ translateY: floatAnims[0] }] }]} />
            <Animated.View style={[styles.circle, { top: 150, right: 50, transform: [{ translateY: floatAnims[1] }] }]} />
            <Animated.View style={[styles.circle, { bottom: 200, left: 20, transform: [{ translateY: floatAnims[2] }] }]} />
            <Animated.View style={[styles.circle, { bottom: 100, right: 30, transform: [{ translateY: floatAnims[3] }] }]} />
            <Animated.View style={[styles.circle, { top: 300, left: width / 2 - 30, transform: [{ translateY: floatAnims[4] }] }]} />

            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentIndex === i && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F9',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    color: '#1E1E1E',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: '#1E1E1E',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#DB3022',
  },
  button: {
    backgroundColor: '#DB3022',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  circle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DB302230',
    zIndex: -1,
  },
});
