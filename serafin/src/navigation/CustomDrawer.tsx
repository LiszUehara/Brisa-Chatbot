import * as React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../utils/C';
import { useEffect } from 'react';
import {contribuinte} from '../repo/atom'
import { useAtom } from 'jotai';


export default function CustomDrawerContent(props) {
  const { navigation } = props;
  const [user, setUser] = useAtom(contribuinte);
  const navigateToProfile = () => {
    //navigation.push('Profile')
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userSection}>
          <TouchableOpacity onPress={navigateToProfile} style={{ flexDirection: 'row', alignItems: 'center' ,paddingBottom:16}}>
            <Icon name="account-circle" color={COLORS.blue} size={50} />
            <Text style={{ marginLeft: 15, color: COLORS.black ,fontSize:16}}>Olá, seja bem-vindo(a)!</Text>
           
          </TouchableOpacity>
          <Text style={{ alignSelf:'flex-start', color: COLORS.blue ,fontSize:14, fontWeight:'bold',paddingBottom:4}}>{user.pes_nome}</Text>
        <Text style={{ alignSelf:'flex-start', color: COLORS.darkGray ,fontSize:14,fontWeight:'bold'}}>{user.pes_cpfcnpj}</Text>
        </View>
        
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userSection: {
    paddingLeft: 20,
    marginTop: 15,
    flexDirection: 'column',
    paddingBottom: 20,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,

  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
