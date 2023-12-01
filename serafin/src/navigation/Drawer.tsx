import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/old/HomeScreen';
import ChatApp from '../screens/old/ChatScreen';
import Boleto from '../screens/BoletoScreen';
import Login from '../screens/Login';
import CustomDrawerContent from './CustomDrawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import NewChat from '../screens/chat/Chat';
import Chat from '../screens/chat/Chat';
import HomeNew from '../screens/home/NewHome';
import BoletoStack from './BoletoStack';
import SerafinFirstOptions from "../screens/chat/oldoptions/FirstOptions";
import ChatStack from "./ChatStack";
import { COLORS } from '../utils/C';

const Drawer = createDrawerNavigator();

const screenOptions = {
  tabBarStyle: {
    backgroundColor: COLORS.blue,
    height: 100,
  },
  tabBarItemStyle: {
    backgroundColor: COLORS.blue,
    margin: 5,
    borderRadius: 10,
  }
};
export default function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: "white",
        drawerActiveTintColor: COLORS.blue,
        headerStyle:{
          backgroundColor:"#1a3495"
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props}
      drawerContentOptions={{
      drawerActiveTintColor: COLORS.blue,}}/>
    }>
      <Drawer.Screen
        name="Início"
        component={HomeNew}
        options={{
          title: "Início",
          drawerIcon: ({focused, size}) => (
            <Icon2 name="home"
            size={size}
            color={focused ? COLORS.blue : 'gray'} />
          ),

      }}/>
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          drawerIcon: ({focused, size}) => (
            <Icon name="login-variant"
            size={size}
            color={focused ? COLORS.blue : 'gray'} />
          ),
      }}/>
      <Drawer.Screen
        name="Serafin"
        component={Chat}
        options={{
          title: "Serafin",
          drawerIcon: ({focused, size}) => (
            <Icon2 name="wechat"
            size={size}
            color={focused ? COLORS.blue : 'gray'} />
          ),
      }}/>
      <Drawer.Screen
        name="Boleto"
        component={BoletoStack}
        options={{
          title: "Boleto",
          drawerIcon: ({focused, size}) => (
            <Icon name="barcode"
            size={size}
            color={focused ? COLORS.blue : 'gray'} />
          ),
      }}/>

      <Drawer.Screen
        name="Sobre"
        component={HomeNew}
        options={{
          title: "Sobre & FAQ",
          drawerIcon: ({focused, size}) => (
            <Icon2 name="exclamation-circle"
            size={size}
            color={focused ? COLORS.blue : 'gray'} />
          ),

      }}/>

    </Drawer.Navigator>
  );
}
