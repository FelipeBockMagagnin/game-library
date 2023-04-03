import { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Pages
import DiscoverScreen from '../screens/DiscoverScreen'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SignInScreen from '../screens/SignInScreen'

import AuthContext from "../contexts/auth";

export default function AppRoutes() {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const { signed, user } = useContext(AuthContext);

  console.log('dados appjs', signed, user);

  function HomeTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {signed ? (
            <>
              <Stack.Screen name="Home" component={HomeTabs} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
            </>
          )}
        </Stack.Navigator>
    </NavigationContainer>
  );
}