import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/HomeScreen';
import ChatApp from '../screens/ChatScreen';
import Boleto from '../screens/BoletoScreen';
import Login from '../screens/Login';

const Drawer = createDrawerNavigator();
const screenOptions = {
  tabBarStyle: {
    backgroundColor: '#0000ff',
    height: 100,
  },
  tabBarItemStyle: {
    backgroundColor: '#00ff00',
    margin: 5,
    borderRadius: 10,
  }
};
export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Início" component={Home} />
      <Drawer.Screen name="ChatBot" component={ChatApp} />
      <Drawer.Screen name="Boleto" component={Boleto} />
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  );
}
