import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BoletoSucesso from './BoletoSucessoScreen';
import { createStackNavigator } from '@react-navigation/stack';

const apiUrl = 'http://hmgiss.speedgov.com.br/amontada/consulta/dams';
const authToken = '966988da19301ceec429f3a39649a696';

const fakeData = {
  cod_boleto : "12308379817231827",
  val_boleto: "1389,99",
  val_taxa : "20,99",
  dat_vencimento: "21/08/2023",
  nome: "Wanderley de Macêdo",
  ies_status: "ABERTO",
  url: "https://www.notacontrol.com.br/download/Gera%C3%A7%C3%A3o_boleto_bancario.pdf"
}

const Boleto = () => {

  const navigation = useNavigation();
  const [numeroDAMS, setNumeroDAMS] = useState('');

  const navigateToOption = (routeName,params) => {
    navigation.navigate(routeName,params);
  };

  const fetchBoletoData = async () => {
    try {
      const response = await axios.post(apiUrl, {
        numero_dams: numeroDAMS,
        nome: '',
      }, {
        headers: {
          'auth-token': authToken,
        },
      });

      if (response.data.situacao === 'SUCESSO' && response.data.dams.length > 0) {
        const primeiroBoleto = response.data.dams[0];
        navigateToOption('BoletoSucesso', { boletoData: primeiroBoleto});
      } else {
        navigateToOption('BoletoSucesso', { boletoData: fakeData});
        //Alert.alert('Erro','Nenhum boleto encontrado ou a API retornou um erro.');
      }
    } catch (error) {
      console.error('Erro ao consultar a API:', error);
        navigateToOption('BoletoSucesso', { boletoData: fakeData});
      //Alert.alert('Erro','Houve um problema ao se conectar à API. Verifique sua conexão à Internet.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulte seu boleto aqui</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o número de DAMS"
        value={numeroDAMS}
        onChangeText={(text) => setNumeroDAMS(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={fetchBoletoData}>
        <Text style={styles.searchButtonText}>Consultar Boleto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a3495',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#0047FF',
    borderRadius: 15,
    paddingVertical: 10,
    width: '80%',
    marginVertical: 10,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Boleto;
