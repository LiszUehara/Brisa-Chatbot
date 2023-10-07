import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './src/navigation/Drawer';


export default function App() {
  
  return (
    
    <NavigationContainer >
      <MyDrawer/>
    </NavigationContainer>
  );
}
