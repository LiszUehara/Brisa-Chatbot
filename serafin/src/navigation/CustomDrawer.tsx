import * as React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../utils/C';


export default function CustomDrawerContent(props) {

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userSection}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="account-circle" color={COLORS.blue} size={50} />
          </View>
          <View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text >Olá, seja bem vindo(a)!</Text>
          </View>
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
    flexDirection: 'row',
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
