import React from 'react';
import {
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../utils/C';
import {useAtom} from 'jotai';
import {useShowLogin} from '../repo/atom';
import LoginScreen from './Login';
import Boleto from './BoletoScreen';

export default function Home() {
  const [showLogin] = useAtom(useShowLogin);

  // Lista de opções
  const options = [
    {title: 'Emitir Boleto', component: <Boleto />},
    // Adicione outras opções aqui
  ];

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1}}>
      <StatusBar animated={true} backgroundColor={COLORS.blue} hidden={false} />
      <Text style={styles.header}>Início</Text>

      {showLogin ? (
        <LoginScreen />
      ) : (
        <FlatList
          data={options}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigateToOption(item.component)}>
              <Text style={styles.optionText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

// Função para navegar para a opção selecionada
const navigateToOption = () => {
  // Implemente a navegação para a tela desejada aqui
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  optionText: {
    fontSize: 18,
  },
});
