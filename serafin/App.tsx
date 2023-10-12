import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Login';
import Home from './src/screens/HomeScreen';
import Route from './src/screens/Route';
import MyDrawer from './src/navigation/Drawer';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Go to Profile"
//         onPress={() => navigation.navigate('Profile')}
//       />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// export default function MyStack() {
//   return (
//     <NavigationContainer>
//     <Drawer.Navigator>
//       <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
//       <Stack.Screen name="Route" component={Route} options={{headerShown: false}}/>
//     </Stack.Navigator>
//     </NavigationContainer>

//   );
// }
export default function App(){
  return(
<NavigationContainer>
  <MyDrawer/>
</NavigationContainer>
  );
}