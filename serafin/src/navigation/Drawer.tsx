import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/old/HomeScreen';
import ChatApp from '../screens/old/ChatScreen';
import Boleto from '../screens/BoletoScreen';
import Login from '../screens/Login';
import CustomDrawerContent from './CustomDrawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NewChat from '../screens/chat/Chat';
import Chat from '../screens/chat/Chat';
import HomeNew from '../screens/home/NewHome';


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
    <Drawer.Navigator 
      screenOptions={{
        headerTintColor: "white",
        drawerActiveTintColor: "#0000ff",
        headerStyle:{
          backgroundColor:"#1a3495"
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} 
      drawerContentOptions={{
      drawerActiveTintColor: '#0000ff',}}/>
    }>
      <Drawer.Screen 
        name="Início" 
        component={HomeNew} 
        options={{
          title: "Início",
          drawerIcon: ({focused, size}) => ( 
            <Icon name="home" 
            size={size} 
            color={focused ? '#0000ff' : 'gray'} />
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
            color={focused ? '#0000ff' : 'gray'} />
          ),
      }}/>
      <Drawer.Screen 
        name="ChatBot" 
        component={Chat} 
        options={{
          title: "ChatBot",
          drawerIcon: ({focused, size}) => ( 
            <Icon name="message-text" 
            size={size} 
            color={focused ? '#0000ff' : 'gray'} />
          ),
      }}/>
      <Drawer.Screen 
        name="Boleto" 
        component={Boleto} 
        options={{
          title: "Boleto",
          drawerIcon: ({focused, size}) => ( 
            <Icon name="barcode" 
            size={size} 
            color={focused ? '#0000ff' : 'gray'} />
          ),
      }}/>
    </Drawer.Navigator>
  );
}
