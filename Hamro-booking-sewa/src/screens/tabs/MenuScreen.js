import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserProfile from "./UserProfile";
import Settings from "./Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MenuScreen = () => {
  
  const handleProfilePress = () => {
    
    console.log("Profile pressed");
    
  };

  const handleSettingsPress = () => {
    console.log("Settings pressed");
  };

  const handleLogoutPress = () => {
    // Handle logout press action
    console.log("Logout pressed");
  };
  
  

  return (
    
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handleProfilePress}>
        <Text style={styles.text}>
          <FontAwesome name="user" size={28} color="black" /> Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={handleSettingsPress}>
        <Text style={styles.text}>
          <Ionicons name="settings" size={21} color="black" /> Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={handleLogoutPress}>
        <Text style={styles.text}>
          <MaterialCommunityIcons name="logout" size={28} color="black" />{" "}
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    width: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    // flex:1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'center',
    // flexDirection: 'row',
    // alignItems: 'center',
  },
});

export default MenuScreen;
