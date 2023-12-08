import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Notifications from '../screens/notification/Notification';
import Home from '../screens/home/NewHome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/C';
import { useAtom } from 'jotai';
import {notification} from '../repo/atom'
import {contribuinte} from '../repo/atom'

const Stack = createStackNavigator();

function HomeStack({ navigation }) {
    const [notificacoes, setNotificacoes] = useAtom(notification);
    const [user, setUser] = useAtom(contribuinte);
    
    return (
        <Stack.Navigator >
            <Stack.Screen name="Inicio" component={Home}

                options={{
                    headerStyle: {
                        backgroundColor: COLORS.blue,
                    },
                    headerTitleStyle: {
                        color: COLORS.white,
                    },
                    headerTitle: 'Inicio',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" size={24} color="white" style={{ marginLeft: 15 }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen name="Notification"
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.blue,
                    },
                    headerTitleStyle: {
                        color: COLORS.white,
                    },
                    headerTintColor: COLORS.white,
                    headerTitle: 'Notificações',

                }}

                component={Notifications} />
        </Stack.Navigator>
    );
}
export default HomeStack;