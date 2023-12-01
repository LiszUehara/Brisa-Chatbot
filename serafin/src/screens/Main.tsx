import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import MyDrawer from '../../src/navigation/Drawer';
import { COLORS } from '../utils/C';
import { MenuProvider } from 'react-native-popup-menu';

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

export default function Main(){
  return(
    <MenuProvider>
<StatusBar barStyle="light-content" backgroundColor={COLORS.blue}  />
  <MyDrawer/>
</MenuProvider>
  );
}