import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import UserProfile from "./UserProfile"; // Adjust the path as necessary
import Settings from "./Settings"; // Adjust the path as necessary
import Logout from "./Logout"; // Adjust the path as necessary
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const UserProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserProfile" component={UserProfile} />
  </Stack.Navigator>
);

const SettingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Setting" component={Settings} />
  </Stack.Navigator>
);

const LogoutStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Logout" component={Logout} />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator backBehavior="firstRoute">
    <Drawer.Screen
      name="Profile"
      component={UserProfileStack}
      options={{
        drawerIcon: ({ color, size }) => <FontAwesome name="user" size={30} color="black" />,
        drawerLabelStyle: { fontSize: 18, fontWeight: "bold" },
      }}
    />
    <Drawer.Screen
      name="Settings"
      component={SettingStack}
      options={{
        drawerIcon: ({ color, size }) => <Ionicons name="settings" size={26} color="black" />,
        drawerLabelStyle: { fontSize: 18, fontWeight: "bold" },
      }}
    />
    <Drawer.Screen
      name="LogoutStack"
      component={LogoutStack}
      options={{
        drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="logout" size={28} color="black" />,
        drawerLabelStyle: { fontSize: 18, fontWeight: "bold" },
      }}
    />
  </Drawer.Navigator>
);

const MenuScreen = () => (
  <DrawerNavigator />
);

export default MenuScreen;
