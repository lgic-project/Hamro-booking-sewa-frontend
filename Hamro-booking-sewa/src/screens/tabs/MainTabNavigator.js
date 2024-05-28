import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UserProfile from './UserProfile'; // Adjust the path as necessary
import Settings from './Settings'; // Adjust the path as necessary
import Logout from './Logout'; // Adjust the path as necessary
import MenuScreen from './MenuScreen'; // Adjust the path as necessary
import LoginScreen from '../LoginScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Menu"
      component={MenuScreen}
      options={{
        tabBarIcon: ({ color, size }) => <FontAwesome name="bars" size={30} color={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={UserProfile}
      options={{
        tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={30} color={color} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={26} color={color} />,
      }}
    />
    <Tab.Screen
      name="Logout"
      component={Logout}
      options={{
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="logout" size={28} color={color} />,
      }}
    />
    <Tab.Screen
      name="LoginScreen"
      component={LoginScreen}
    />
  </Tab.Navigator>
);

export default MainTabNavigator;
