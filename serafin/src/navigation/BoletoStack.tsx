import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BoletoSucesso from '../screens/boleto/BoletoSucessoScreen';
import Bol from '../screens/boleto/BoletoScreen';

const Stack = createStackNavigator();

function BoletoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bol" component={Bol} />
      <Stack.Screen name="BoletoSucesso" component={BoletoSucesso} />
    </Stack.Navigator>
  );
}
export default BoletoStack;