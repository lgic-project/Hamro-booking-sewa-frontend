import React, { useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { FontAwesome, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import BookingScreen from './Booking/BookingScreen';
import AddRoomsScreen from './AddRooms/AddRoomsScreen';
import ViewRoomsScreen from './ViewRooms/ViewRoomsScreen';
import LogoutScreen from './Menu/Menu';
import { UserContext } from '../UserContext/UserContext';
import BookingDetails from './Booking/BookingDetails';
import Menu from './Menu/Menu';
import Logout from '../Logout/Logout';
import HotelProfile from './Menu/HotelProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const BookingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true, headerStyle: { height: 55 }, headerTitleStyle: { fontSize: 22 }, cardStyle: { flex: 1 } }}>
    <Stack.Screen name="Booking List" component={BookingScreen} />
    <Stack.Screen name="BookingDetails" component={BookingDetails} />
  </Stack.Navigator>
);

// const AddRoomsStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: true, headerStyle: { height: 45 }, headerTitleStyle: { fontSize: 22 }, cardStyle: { flex: 1 } }}>
//     <Stack.Screen name="Add Room" component={AddRoomsScreen} />
//   </Stack.Navigator>
// );

const ViewRoomsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true, headerStyle: { height: 55 }, headerTitleStyle: { fontSize: 22 }, cardStyle: { flex: 1 } }}>
    <Stack.Screen name="Hotel Rooms" component={ViewRoomsScreen} />
  </Stack.Navigator>
);

const LogoutStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, headerStyle: { height: 55 }, headerTitleStyle: { fontSize: 22 }, cardStyle: { flex: 1 } }}>
    <Stack.Screen name="Menu-" component={Menu} />
    <Stack.Screen name="HotelProfile" component={HotelProfile} />
    <Stack.Screen name="Log-out" component={Logout} />
  </Stack.Navigator>
);

const HotelDashboard = () => {
    const {user} = useContext(UserContext)|| {};
    console.log(user);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        backBehavior='firstRoute'
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'darkgrey',
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabBarItemStyle: { paddingTop: 5 },
          tabBarStyle: styles.tabBarStyle
        }}
      >
        <Tab.Screen 
          name="Bookings" 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="list" size={25} color="white" />
            ),
          }}
        >
          {() => <BookingStack />}
        </Tab.Screen>
        {/* <Tab.Screen 
          name="Add Rooms" 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="squared-plus" size={25} color="white" />
            ),
          }}
        >
          {() => <AddRoomsStack />}
        </Tab.Screen> */}
        <Tab.Screen 
          name="View Rooms" 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="preview" size={25} color="white" />
            ),
          }}
        >
          {() => <ViewRoomsStack />}
        </Tab.Screen>
        <Tab.Screen 
          name="Menu" 
          options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="menu-book" size={24} color="white" />
            ),
          }}
        >
          {() => <LogoutStack />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 5,
    left: 10,
    right: 10,
    elevation: 5,
    backgroundColor: "#3134a4",
    borderRadius: 15,
    height: 50,
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
  },
  tabBarIconStyle: {
    marginBottom: 15,
  }
});

export default HotelDashboard;
