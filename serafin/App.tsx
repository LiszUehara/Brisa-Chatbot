import * as React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/splash/Splash';
import Main from './src/screens/Main';


import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import ProfileScreen from './src/screens/perfil/ProfileScreen';
import { retrieveData } from './src/repo/store/Dao';
import { useAtom } from 'jotai';
import {contribuinte} from './src/repo/atom'

const stack = createStackNavigator();

export default function App() {

  const [contribuintes, setContribuintes] = useState([]);
  const [user, setUser] = useAtom(contribuinte);
  
  useEffect(() => {
    const loadContribuintes = async () => {
      const savedContribuintes = await retrieveData('contribuintes');
      if (savedContribuintes) {
        setContribuintes(savedContribuintes.contribuintes[0]);
        setUser(savedContribuintes.contribuintes[0])
      }
    };

    loadContribuintes();
  }, []);

  useEffect(() => Appearance.setColorScheme('light'),
    [])
    
  return (

    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <stack.Screen name="Splash" component={SplashScreen} />
        <stack.Screen name="Main" component={Main} />
        <stack.Screen name="Profile" component={ProfileScreen} />
      </stack.Navigator>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
    </NavigationContainer>

  );
}