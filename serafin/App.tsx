import * as React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/splash/Splash';
import Main from './src/screens/Main';


import { useEffect } from 'react';
import { Appearance } from 'react-native';


const stack = createStackNavigator();

export default function App() {
  useEffect(() => Appearance.setColorScheme('light'),
    [])
  return (

    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="Splash" component={SplashScreen} />
        <stack.Screen name="Main" component={Main} />
      </stack.Navigator>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    </NavigationContainer>

  );
}