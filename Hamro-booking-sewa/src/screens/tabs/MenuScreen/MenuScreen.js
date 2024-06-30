import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

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
          color="#008080" // Teal color
        >
          Profile
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Policies')}
          style={styles.button}
          labelStyle={styles.buttonText}
          color="#008080" // Teal color
        >
          Terms and Policies
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Logout')}
          style={[styles.button, styles.logoutButton]} // Additional style for logout button
          labelStyle={styles.buttonText}
          color="#FF6347" // Tomato color for logout button
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
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#008080', // Teal color
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoutButton: {
    backgroundColor: '#FF6347', // Tomato color
  },
});

export default MenuScreen;
