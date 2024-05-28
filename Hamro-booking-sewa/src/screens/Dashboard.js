import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './tabs/HomeScreen';
import ListHotelsScreen from './tabs/ListHotelsScreen';
import BookedHotelsScreen from './tabs/BookedHotelsScreen';
import MenuScreen from './tabs/MenuScreen';
import UserProfile from './tabs/UserProfile'; // Adjust the path as necessary
import Settings from './tabs/Settings'; // Adjust the path as necessary
import Logout from './tabs/Logout'; // Adjust the path as necessary
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Booking from './tabs/Booking';

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
        <Tab.Navigator backBehavior='firstRoute' screenOptions={{headerShown:false}}>
          <Tab.Screen 
            name="Home" 
            component={HomeStack} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" color='black' size={35} />
              ),
            }} 
          />
          <Tab.Screen 
            name="List Hotels" 
            component={ListHotelsStack} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Entypo name="list" size={35} color="black" />
              ),
            }} 
          />
          <Tab.Screen 
            name="Booked Hotels" 
            component={BookedHotelsStack} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="hotel" size={30} color="black" />
              ),
            }} 
          />
          <Tab.Screen 
            name="Menu" 
            component={MenuStack} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="microsoft-xbox-controller-menu" size={35} color="black" />
              ),
            }} 
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Dashboard;
