import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import { theme } from '../../core/theme';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.content}>
        <Header>Hamro Booking Sewa</Header>
        <Paragraph>
          Start Booking Your Desired Hotel Rooms.
        </Paragraph>
      </View>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('LoginScreen')}
        style={styles.button}
      >
        Log in
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
        style={styles.button}
      >
        Create an account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Set background color to white
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center', // Center the logo horizontally
    marginBottom: 2, // Add some margin at the bottom of the logo
  },
  content: {
    alignItems: 'center', // Center the content horizontally
    marginBottom: 10, // Add some margin at the bottom of the content
  },
  button: {
    marginVertical: 5, // Add some vertical margin between buttons
  },
});
