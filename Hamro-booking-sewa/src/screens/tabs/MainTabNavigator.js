import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuScreen from './MenuScreen'; // Your drawer navigator
import ListHotelsScreen from './ListHotelsScreen';
import HomeScreen from './HomeScreen';
import BookedHotelsScreen from './BookedHotelsScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ListHotel" component={ListHotelsScreen} />
      <Tab.Screen name="BookedHotels" component={BookedHotelsScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
