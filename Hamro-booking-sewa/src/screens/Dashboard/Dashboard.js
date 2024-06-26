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
import Logout from '../Logout/Logout';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import Booking from '../tabs/Booking';
import Policies from '../TermsandPolicies/Policies';
import HotelRooms from '../tabs/HotelRooms/HotelRooms';
import HotelDetailsScreen from '../tabs/ListHotelsScreen/HotelDetails/HotelDetailsScreen';
import RoomDetailsScreen from '../tabs/ListHotelsScreen/HotelDetails/RoomDetailsScreen';
import StartScreen from '../StartScreen/StartScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false , cardStyle: { flex: 1 },}} >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>
);

const ListHotelsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { flex: 1 }, }}>
    <Stack.Screen name="ListHotels" component={ListHotelsScreen} />
    <Stack.Screen name="HotelDetails" component={HotelDetailsScreen} />
    <Stack.Screen name="RoomDetails" component={RoomDetailsScreen} />
    <Stack.Screen name="Booking" component={Booking} />
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
    <Stack.Screen name="Policies" component={Policies} />
    <Stack.Screen name="StartScreen" component={StartScreen} />
    {/* <Stack.Screen name="Logout" component={Logout} /> */}
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
            tabBarInactiveTintColor: 'darkgrey',
            tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
            tabBarItemStyle: { paddingTop: 5 },
            tabBarStyle: [styles.tabBarStyle, { display: 'flex' }]
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeStack} 
            options={{
              headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={25} color="white" />
              ),
            }} 
          />
          <Tab.Screen 
            name="List Hotels" 
            component={ListHotelsStack} 
            options={{
              headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <Entypo name="list" size={25} color="white" />
              ),
            }} 
          />
          <Tab.Screen 
            name="Booked Hotels" 
            component={BookedHotelsStack} 
            options={{
              headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="hotel" size={25} color="white" />
              ),
            }} 
          />
          <Tab.Screen 
            name="Menu" 
            component={MenuStack} 
            options={{
              headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="menu" size={25} color="white" />
              ),
            }} 
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 30,
    right: 30,
    elevation: 0,
    backgroundColor: "#3134a4",
    borderRadius: 15,
    height: 70,
    shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 5.84,
        elevation: 35,
  },
  tabBarIconStyle:{
    marginBottom:15,
  }
});

export default Dashboard;
