import React from "react";
import {
  View,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserProfile from "./UserProfile";
import Settings from "./Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const UserProfileStack = () => {
  return(
<Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="User-Profile" component={UserProfile} />
      </Stack.Navigator>
  );
};

const SettingStack = () => {
  return(
  <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
          name="Setting"
          component={Settings}
        />
        </Stack.Navigator>
  );
};

const LogoutStack = () => {
  return(
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Logoutpage"
    component={Logout} />
  </Stack.Navigator>
  );
}

const MenuScreen = () => {
  return (
    
    <NavigationContainer independent={true}>
      <View style={{flex: 1}}>
      <Drawer.Navigator backBehavior="firstRoute">
      <Drawer.Screen name="Profile" component={UserProfileStack} options={{drawerIcon: ({ color, size }) => (
              <FontAwesome name="user" size={30} color="black" />
            ), drawerLabelStyle: {fontSize: 18, fontWeight:"bold"}}} />
      <Drawer.Screen name="Settings" component={SettingStack} options={{drawerIcon: ({ color, size }) => (
              <Ionicons name="settings" size={26} color="black" />
            ), drawerLabelStyle: {fontSize: 18, fontWeight:"bold"}}} />
      <Drawer.Screen name="Logout" component={LogoutStack} options={{drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="logout" size={28} color="black" />
            ), drawerLabelStyle: {fontSize: 18, fontWeight:"bold"}}} />

    </Drawer.Navigator>
        </View>
    </NavigationContainer>

  );
};


export default MenuScreen;
