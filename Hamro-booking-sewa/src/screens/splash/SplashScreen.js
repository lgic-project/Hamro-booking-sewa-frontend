import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';

const SplashScreen = ({ navigation }) => {
  // State for controlling the logo animation
  const [logoAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Configure logo animation
    Animated.timing(logoAnimation, {
      toValue: 1,
      duration: 6000, // Adjusted to 6 seconds
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Navigate to the StartScreen after animation completes
      navigation.replace('StartScreen');
    });
  }, [logoAnimation, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              {
                scale: logoAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Logo />
      </Animated.View>
      <Header>Hamro Booking Sewa</Header>
      <Paragraph>Start Booking Your Desired Hotel Rooms.</Paragraph>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 20,
  },
});
