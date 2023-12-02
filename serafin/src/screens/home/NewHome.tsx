import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Item from './Item';

import Icon6 from 'react-native-vector-icons/FontAwesome6';
import { COLORS } from '../../utils/C';

const data = [
  { id: '1', title: 'Segunda via', description: 'Detalhes da segunda via\ne outras informações', color: ['#00a95a', '#00984a'], icon: 'barcode' },
  { id: '2', title: 'Falar com o Serafin', description: 'Converse com nosso\nassistente virtual', color: ['#ffcc2b', '#efbc1b'], icon: 'wechat' },
  { id: '3', title: 'Outros', description: 'Mais serviços\ndisponíveis', color: ['#1a3495', '#001475'], icon: 'support' },
];

const Home = () => {
  const navigation = useNavigation();

  const navigateToOption = (routeName) => {
    navigation.navigate(routeName);
  };

  const renderItem = ({ item }) => {
    let screenName = '';
    switch (item.id) {
      case '1':
        screenName = 'Boleto';
        break;
      case '2':
        screenName = 'Serafin';
        break;
      case '3':
        screenName = 'Outros';
        break;
    }
    return (
      <Item
        title={item.title}
        description={item.description}
        color={item.color}
        icon={item.icon}
        onPress={() => navigateToOption(screenName)}
      />
    );
  };

  return (

    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      //outros
      />
      <Icon6 style={styles.footer} name="building-user" size={64} color={COLORS.lightGray} />
    </View>

  );
};

const styles = StyleSheet.create({
  footer: {
    alignSelf: 'center',
    paddingBottom: 32, // Ajuste conforme necessário para a margem desejada
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Home;
