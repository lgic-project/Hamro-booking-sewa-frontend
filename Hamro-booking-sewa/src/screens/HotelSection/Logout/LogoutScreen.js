// LogoutScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { UserContext } from '../../UserContext/UserContext';

const LogoutScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    // Clear user context and navigate to login screen
    setUser(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logout Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default LogoutScreen;
