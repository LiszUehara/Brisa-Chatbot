import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../screens/Login';
import CustomDrawerContent from './CustomDrawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Chat from '../screens/chat/Chat';
import HomeNew from '../screens/home/NewHome';
import BoletoStack from './BoletoStack';
import { COLORS } from '../utils/C';
import AboutScreen from '../screens/about/About';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Drawer = createDrawerNavigator();
import {contribuinte} from '../repo/atom'
import { useAtom } from 'jotai';

export default function MyDrawer() {
  const [user, setUser] = useAtom(contribuinte);
  

  const routes = {
    Home: {
      name: 'Início',
      component: HomeNew,
      options: {
        title: "Início",
        drawerIcon: ({ focused, size }) => (
          <Icon2 name="home" size={size} color={focused ? COLORS.blue : 'gray'} />
        ),
      },
    },
    Login: {
      name: 'Login',
      component: Login,
      options: {
        title: 'Login',
        drawerIcon: ({ focused, size }) => (
          <Icon name="login-variant" size={size} color={focused ? COLORS.blue : 'gray'} />
        ),
      },
    },
    Serafin: {
      name: 'Serafin',
      component: Chat,
      options: {
        title: 'Serafin',
        drawerIcon: ({ focused, size }) => (
          <Icon2 name="wechat" size={size} color={focused ? COLORS.blue : 'gray'} />
        ),
      },
    },
    Boleto: {
      name: 'Boleto',
      component: BoletoStack,
      options: {
        title: 'Boleto',
        drawerIcon: ({ focused, size }) => (
          <Icon name="barcode" size={size} color={focused ? COLORS.blue : 'gray'} />
        ),
      },
    },
    About: {
      name: 'About',
      component: AboutScreen,
      options: {
        title: 'Sobre & FAQ',
        drawerIcon: ({ focused, size }) => (
          <Icon2 name="exclamation-circle" size={size} color={focused ? COLORS.blue : 'gray'} />
        ),
      },
    },
  };
  if(user!=null){
    delete routes.Login
  }

  return (
    <Drawer.Navigator
    
      screenOptions={{
        headerTintColor: 'white',
        drawerActiveTintColor: COLORS.blue,
        headerStyle: {
          backgroundColor: '#1a3495',
        },
      }}

      drawerContent={(props) => (
        <CustomDrawerContent {...props} drawerContentOptions={{ drawerActiveTintColor: COLORS.blue }} />
      )}>
      {Object.entries(routes).map(([name, options]) => (
        <Drawer.Screen key={name} name={name} component={options.component} options={options.options} />
      ))}
    </Drawer.Navigator>
  );
};
