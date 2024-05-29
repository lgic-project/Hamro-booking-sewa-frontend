import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../tabs/HomeScreen/HomeScreen';
import ListHotelsScreen from '../tabs/ListHotelsScreen/ListHotelsScreen';
import BookedHotelsScreen from '../tabs/BookedHotelScreen/BookedHotelsScreen';
import MenuScreen from '../tabs/MenuScreen/MenuScreen';
import UserProfile from '../tabs/MenuScreen/UserProfile/UserProfile';
import Settings from '../tabs/MenuScreen/Settings/Settings'; 
// import Logout from './Logout/Logout';
import Logout from '../Logout/Logout';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Booking from '../tabs/Booking';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false , cardStyle: { flex: 1 },}} >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="Booking" component={Booking} />
  </Stack.Navigator>
);

const ListHotelsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { flex: 1 }, }}>
    <Stack.Screen name="ListHotels" component={ListHotelsScreen} />
  </Stack.Navigator>
);

const BookedHotelsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { flex: 1 }, }}>
    <Stack.Screen name="BookedHotels" component={BookedHotelsScreen} />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { flex: 1 }, }}>
    <Stack.Screen name="MenuScreen" component={MenuScreen} />
    <Stack.Screen name="UserProfile" component={UserProfile} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="Logout" component={Logout} />
  </Stack.Navigator>
);

const Dashboard = () => {
  return (
    <NavigationContainer independent={true}>
      <SafeAreaView style={{flex: 1}}>
        <Tab.Navigator
          backBehavior='firstRoute'
          screenOptions={{
            headerShown:false,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
            tabBarItemStyle: { paddingTop: 5 },
            tabBarStyle: [{ display: 'flex' }, null]
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeStack} 
            options={{
              headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={25} color={color} />
              ),
            }} 
          />
          <Tab.Screen 
            name="List Hotels" 
            component={ListHotelsStack} 
            options={{
              headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <Entypo name="list" size={25} color={color} />
              ),
            }} 
          />
          <Tab.Screen 
            name="Booked Hotels" 
            component={BookedHotelsStack} 
            options={{
              headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="hotel" size={25} color={color} />
              ),
            }} 
          />
          <Tab.Screen 
            name="Menu" 
            component={MenuStack} 
            options={{
              headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="menu" size={25} color={color} />
              ),
            }} 
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Dashboard;
