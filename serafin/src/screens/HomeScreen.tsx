import React from 'react';
import { Text, StatusBar, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../utils/C';
import { useAtom } from 'jotai';
import { useShowLogin } from '../repo/atom';
import { useNavigation } from '@react-navigation/native';

export default function HomeOld() {
  const navigation = useNavigation();
  const [showLogin] = useAtom(useShowLogin);

  const navigateToOption = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={COLORS.blue} hidden={false} />
      <View style={styles.centerContent}>
        <Text style={styles.chatbotText}>ChatBot</Text>
        <Text style={styles.chatbotWelcomeText}>
          Olá, sou um chatbot a serviço da Secretaria de Finanças de Juazeiro do Norte
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.option}>
          <TouchableOpacity onPress={() => navigateToOption('Boleto')}>
            <Text style={styles.optionText}>Emitir Boleto</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.option}>
          <TouchableOpacity onPress={() => navigateToOption('ChatBot')}>
            <Text style={styles.optionText}>Chat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.option}>
          <TouchableOpacity onPress={() => navigateToOption('Login')}>
            <Text style={styles.optionText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatbotText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chatbotWelcomeText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.blue,
    paddingVertical: 10,
  },
  option: {
    flex: 1,
    margin: 2,
  },
  optionText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
