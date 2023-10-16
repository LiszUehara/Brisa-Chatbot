import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/HomeScreen";
import Chat from "../screens/ChatScreen";
import Boleto from "../screens/BoletoScreen";
import App from "../../App";
import MyStack from "../screens/Route";

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
      <Drawer.Screen name="Fale com serafim" component={Chat} />

    </Drawer.Navigator>
  );
}
