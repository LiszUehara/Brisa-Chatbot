import * as React from 'react';
import {Header, createStackNavigator} from '@react-navigation/stack';
import Boleto from '../screens/boleto/BoletoScreen';
import BoletoSucesso from '../screens/boleto/BoletoSucessoScreen';
import SecondOptions from "../screens/chat/oldoptions/SecondOptions";
import FirstOptions from "../screens/chat/oldoptions/FirstOptions";
import Chat from "../screens/chat/Chat";
import ThirdOptions from "../screens/chat/oldoptions/ThirdOptions";

const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FirstOptions" component={FirstOptions}/>
      <Stack.Screen name="SecondOptions" component={SecondOptions}/>
      <Stack.Screen name="ThirdOptions" component={ThirdOptions}/>
      <Stack.Screen name="ChatScreen" component={Chat}/>
    </Stack.Navigator>
  );
}

export default ChatStack;
