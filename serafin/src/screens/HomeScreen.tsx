import React, { useState } from "react";
import { View, Text, StatusBar} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../utils/C";
import { NavigationContainer } from "@react-navigation/native";
import { ScreenStack } from "react-native-screens";
import LoginScreen from "./Login";
import Route from "./Route";
import { Atom, atom, useAtom } from "jotai";
import { useShowLogin } from "../repo/atom";
import Boleto from "./BoletoScreen";



export default function Home({navigation}) {
  const [num, setNum] = useAtom(useShowLogin); 
  //colocar uma lista de opcoes (emitir boleto e outros)
  if(num){
    return (
      <LoginScreen/>
);
  }
  else{
    return(
    <Boleto/>
    );
  }
    
  }
