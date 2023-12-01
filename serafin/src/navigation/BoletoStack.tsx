import * as React from 'react';
import { Header, createStackNavigator } from '@react-navigation/stack';
import Boleto from '../screens/boleto/BoletoScreen';
import BoletoSucesso from '../screens/boleto/BoletoSucessoScreen';
import Bol from '../screens/boleto/BoletoScreen';

const Stack = createStackNavigator();

function BoletoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Boleto" component={Bol} />
      <Stack.Screen name="BoletoSucesso" component={BoletoSucesso} />
    </Stack.Navigator>
  );
}
export default BoletoStack;