import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './tabs/HomeScreen';
import ListHotelsScreen from './tabs/ListHotelsScreen';
import BookedHotelsScreen from './tabs/BookedHotelsScreen';
import MenuScreen from './tabs/MenuScreen';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>
);

const ListHotelsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ListHotels" component={ListHotelsScreen} />
  </Stack.Navigator>
);

const BookedHotelsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BookedHotels" component={BookedHotelsScreen} />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MenuScreen" component={MenuScreen} />
  </Stack.Navigator>
);

const Dashboard = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color='black' size={30} />
            ),
          }} />
        <Tab.Screen name="List Hotels" component={ListHotelsStack} options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="list" size={24} color="black" />
            ),
          }} />
        <Tab.Screen name="Booked Hotels" component={BookedHotelsStack} options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="hotel" size={24} color="black" />
            ),
          }} />
        <Tab.Screen name="Menu" component={MenuStack} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="microsoft-xbox-controller-menu" size={24} color="black" />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Dashboard;
