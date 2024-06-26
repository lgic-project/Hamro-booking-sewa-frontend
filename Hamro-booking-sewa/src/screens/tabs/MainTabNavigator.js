import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UserProfile from './MenuScreen/UserProfile/UserProfile'; 
import Settings from './MenuScreen/Settings/Settings'; 
import Logout from '../Logout/Logout'; 
import MenuScreen from './MenuScreen/MenuScreen'; 
import LoginScreen from '../Login/LoginScreen';
import Policies from '../TermsandPolicies/Policies';

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
      name="Policies"
      component={Policies} // Add the Policies screen
      options={{
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="file-document" size={28} color={color} />,
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
      options={{ tabBarButton: () => null }} // Hide the tab for LoginScreen
    />
  </Tab.Navigator>
);

export default MainTabNavigator;
