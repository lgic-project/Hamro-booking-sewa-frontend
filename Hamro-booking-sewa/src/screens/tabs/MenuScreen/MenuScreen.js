import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import LogoutScreen from '../../HotelSection/Logout/LogoutScreen';

const MenuScreen = ({ navigation }) => {
  const theme = useTheme();

  const handleLogout = () => {
    // Reset the navigation stack to StartScreen
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('UserProfile')}
          style={styles.button}
          labelStyle={styles.buttonText}
          buttonColor="#008080" // Teal color
        >
          Profile
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Settings')}
          style={styles.button}
          labelStyle={styles.buttonText}
          buttonColor="#008080" // Teal color
        >
          Settings
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Policies')}
          style={styles.button}
          labelStyle={styles.buttonText}
          buttonColor="#008080" // Teal color
        >
          Terms and Policies
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Logout')}
          style={styles.button}
          labelStyle={styles.buttonText}
          buttonColor="#008080" // Teal color
        >
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default MenuScreen;
