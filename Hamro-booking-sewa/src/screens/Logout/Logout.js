// LogoutScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { UserContext } from '../UserContext/UserContext';

const Logout = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    // Clear user context and navigate to login screen
    setUser(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const confirmLogout = () => {
    setShowConfirmation(true);
  };

  const cancelLogout = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
          <Text style={styles.confirmationText}>Are you sure you want to logout?</Text>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={cancelLogout} />
            <Button title="Logout" onPress={handleLogout} />
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  confirmationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
});

export default Logout;
