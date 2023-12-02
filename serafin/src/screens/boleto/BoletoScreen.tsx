import * as React from 'react';
import { useState } from 'react';
import {

  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Logo from "../../svg/boleto_guy.svg";
import { COLORS, URL } from '../../utils/C';
import { API } from '../../../env';


const fakeData = {
  cod_boleto: "12308379817231827",
  val_boleto: "1389,99",
  val_taxa: "20,99",
  dat_vencimento: "21/08/2023",
  nome: "Wanderley de Macêdo",
  ies_status: "ABERTO",
  url: "https://www.notacontrol.com.br/download/Gera%C3%A7%C3%A3o_boleto_bancario.pdf"
}

export const Bol = () => {

  const navigation = useNavigation();
  const [numeroDAMS, setNumeroDAMS] = useState('');

  const navigateToOption = (routeName, params) => {
    navigation.navigate(routeName, params);
  };

  const fetchBoletoData = async () => {
    try {
      const response = await axios.post(URL.urlDams, {
        numero_dams: numeroDAMS,
        nome: '',
      }, {
        headers: {
          'auth-token': API.KEY_SEFIN,
        },
      });

      if (response.data.situacao === 'SUCESSO' && response.data.dams.length > 0) {
        const primeiroBoleto = response.data.dams[0];
        navigateToOption('BoletoSucesso', { boletoData: primeiroBoleto });
      } else {
        //navigateToOption('BoletoSucesso', { boletoData: fakeData});
        Alert.alert('Erro', 'Nenhum boleto encontrado ou a API retornou um erro.');
      }
    } catch (error) {
      console.error('Erro ao consultar a API:', error);
      //navigateToOption('BoletoSucesso', { boletoData: fakeData});
      Alert.alert('Erro', 'Houve um problema ao se conectar à API. Verifique sua conexão à Internet.');
    }
  };

  return (

    <View style={styles.container}>
      <Logo width={200} height={200} />
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
    paddingBottom: 24,
    paddingTop: 24,
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
    backgroundColor: COLORS.blue,
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

export default Bol;
