import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useShowLogin } from '../../repo/atom';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import Item from './Item';

const data = [
  { id: '1', title: 'Segunda via', description: 'Detalhes da segunda via', color: ['#00a95a', '#00b105'] },
  { id: '2', title: 'Falar com o Serafin', description: 'Converse com nosso assistente virtual', color: ['#ffcc2b', '#ffdd55'] },
  { id: '3', title: 'Outros', description: 'Mais serviços disponíveis', color: ['#1a3495', '#2a45a5'] },
];
  
const Home= () => {
  const navigation = useNavigation();
  const [showLogin] = useAtom(useShowLogin);
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
        screenName = 'ChatBot';
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
        onPress={() => navigateToOption(screenName)}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      // outros props que você pode precisar
    />
  );
};

const styles = StyleSheet.create({
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
