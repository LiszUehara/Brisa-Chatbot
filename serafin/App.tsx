import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from './src/utils/C';
import SplashScreen from './src/screens/splash/Splash';
import Main from './src/screens/Main';
import { checkLoginStatus, getData, saveData } from './src/repo/data/Storage';
import { useEffect } from 'react';

const stack = createStackNavigator();

export default function App(){
  return(
<NavigationContainer>
  <stack.Navigator screenOptions={{headerShown:false}}>
    <stack.Screen name="Splash" component={SplashScreen}/>
    <stack.Screen name="Main" component={Main}/>
  </stack.Navigator>
<StatusBar barStyle="dark-content" backgroundColor="#ffffff"  />
</NavigationContainer>
  );
}