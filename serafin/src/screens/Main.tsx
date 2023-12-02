import * as React from 'react';
import { StatusBar } from 'react-native';
import MyDrawer from '../../src/navigation/Drawer';
import { COLORS } from '../utils/C';
import { MenuProvider } from 'react-native-popup-menu';


export default function Main() {

  return (
    <MenuProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />
      <MyDrawer />
    </MenuProvider>
  );
}