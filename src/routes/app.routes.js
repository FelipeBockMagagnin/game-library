import { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

//Pages
import DiscoverScreen from '../screens/DiscoverScreen'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SignInScreen from '../screens/SignInScreen'
import GameScreen from '../screens/GameScreen'

import AuthContext from "../contexts/auth";

import colors from '../styles/Colors'

export default function AppRoutes() {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const { signed, user } = useContext(AuthContext);

  function HomeTabs() {
    return (
      <Tab.Navigator 
        screenOptions = {({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.yellow
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Discover') {
              iconName = 'search';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={32} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: colors.dark_green,
          tabBarShowLabel: false,
        })}
        
        sceneContainerStyle={{
          backgroundColor: colors.dark_green
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.dark_green }
      }}>
        {signed ? (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Game" component={GameScreen} />

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