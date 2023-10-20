import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const apiUrl = 'http://hmgiss.speedgov.com.br/amontada/consulta/dams';
const authToken = '966988da19301ceec429f3a39649a696';

const Boleto = () => {
  const [boletoData, setBoletoData] = useState(null);
  const [numeroDAMS, setNumeroDAMS] = useState('');

  const fetchBoletoData = async () => {
    try {
      const response = await axios.post(
        apiUrl,
        {
          numero_dams: numeroDAMS,
          nome: '',
        },
        {
          headers: {
            'auth-token': authToken,
          },
        }
      );

      if (response.status === 200 && response.data.dams.length > 0) {
        const primeiroBoleto = response.data.dams[0];
        setBoletoData(primeiroBoleto.cod_boleto);
      } else {
        Alert.alert(
          'Erro',
          'Nenhum boleto encontrado ou a API retornou um erro.'
        );
        setBoletoData(null);
      }
    } catch (error) {
      console.error('Erro ao consultar a API:', error);
      Alert.alert(
        'Erro',
        'Houve um problema ao se conectar à API. Verifique sua conexão à Internet.'
      );
      setBoletoData(null);
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
      {boletoData !== null ? (
        <Text style={styles.resultText}>Número do DAMS: {boletoData}</Text>
      ) : null}
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
    fontSize: 18,
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
  resultText: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default Boleto;
