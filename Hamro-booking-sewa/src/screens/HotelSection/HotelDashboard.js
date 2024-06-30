// HotelDashboard.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookingScreen from './Booking/BookingScreen';
import AddRoomsScreen from './AddRooms/AddRoomsScreen';
import ViewRoomsScreen from './ViewRooms/ViewRoomsScreen';
import LogoutScreen from './Logout/LogoutScreen';


const Tab = createBottomTabNavigator();

const HotelDashboard = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Bookings" component={BookingScreen} />
      <Tab.Screen name="Add Rooms" component={AddRoomsScreen} />
      <Tab.Screen name="View Rooms" component={ViewRoomsScreen} />
      <Tab.Screen name="Logout" component={LogoutScreen} />
    </Tab.Navigator>
  );
};

export default HotelDashboard;
