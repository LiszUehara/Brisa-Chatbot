import * as React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/splash/Splash';
import Main from './src/screens/Main';


import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import ProfileScreen from './src/screens/perfil/ProfileScreen';
import { retrieveData, saveData } from './src/repo/store/Dao';
import { useAtom } from 'jotai';
import {contribuinte} from './src/repo/atom'
import {notification} from './src/repo/atom'
import { downloadAndReadCSV } from './src/repo/api/GetNotifications';

const stack = createStackNavigator();

export default function App() {

  const [contribuintes, setContribuintes] = useState([]);
  const [user, setUser] = useAtom(contribuinte);
  const [notificacoes, setNotificacoes] = useAtom(notification);
  

  useEffect(() => {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTZheCihd3HonqHHSwA7rQlfd1WMdJIRlT21xnU1IPXtn3VaeA1Jtwqx19GHws9sNhyFeU6mqibaYm2/pub?output=csv';

    const fetchData = async () => {
      try {
        const data = await downloadAndReadCSV(url);
        await saveData("notificacao",data);
        await setNotificacoes(data);

        //console.log('Dados do CSV:', data);
      } catch (error) {
        const data = await retrieveData("notificacao");
        await setNotificacoes(data)
        //await setNotificacoes(retrieveData("notificacao"));
        //console.error('Erro no componente:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const loadContribuintes = async () => {
      const savedContribuintes = await retrieveData('contribuintes');
      if (savedContribuintes) {
        setContribuintes(savedContribuintes);
        setUser(savedContribuintes)
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