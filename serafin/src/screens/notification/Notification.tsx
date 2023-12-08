import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../utils/C';
import { notification } from '../../repo/atom';
import { useAtom } from 'jotai';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Icon name='envelope-open' size={24} color={COLORS.gray}></Icon>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.textoNovidade}</Text>
      <Text style={styles.data}>{item.dataNovidade}</Text>
    </View>
  </View>
);

const Notification = () => {
  const [not, setNot] = useAtom(notification);

  return (
    <FlatList
      data={not}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <NotificationItem item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 16,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginStart:16
  },
  data: {
    color: COLORS.darkGray,
    marginStart:16
  },
});

export default Notification;
