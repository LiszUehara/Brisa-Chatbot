import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import axios from 'axios';

const apiUrl = 'http://hmgiss.speedgov.com.br/amontada/consulta/dams';
const apiToken = '966988da19301ceec429f3a39649a696';

const Boleto = () => {
  const [boletoData, setBoletoData] = useState(null);
  const [dams, setDams] = useState(''); // Estado para armazenar o valor de DAMS
  const [contribuinte, setContribuinte] = useState(''); // Estado para armazenar o nome do contribuinte

  useEffect(() => {
    fetchBoletoData();
  }, []);

  const fetchBoletoData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        params: {
          dams, // Adicione o valor de DAMS aos parâmetros da consulta
          nome: contribuinte, // Adicione o nome do contribuinte aos parâmetros da consulta
        },
      });

      if (
        response.data.situacao === 'SUCESSO' &&
        response.data.dams.length > 0
      ) {
        const boleto = response.data.dams[0];

        if (boleto.ies_status === 'ABERTO') {
          setBoletoData(boleto);
        }
      }
    } catch (error) {
      console.error('Erro ao consultar a API:', error);
    }
  };

  const downloadBoleto = () => {
    if (boletoData && boletoData.url) {
      Linking.openURL(boletoData.url);
    } else {
      Alert.alert(
        'Erro',
        'Não foi possível obter a URL de download do boleto.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulte seu boleto aqui</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o valor de DAMS"
        value={dams}
        onChangeText={(text) => setDams(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Insira o nome do contribuinte"
        value={contribuinte}
        onChangeText={(text) => setContribuinte(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={fetchBoletoData}>
        <Text style={styles.searchButtonText}>Consultar Boleto</Text>
      </TouchableOpacity>
      {boletoData && (
        <>
          <Text style={styles.priceText}>
            Valor: R${boletoData.val_boleto.toFixed(2)}
          </Text>
          <Text style={styles.dateText}>
            Vencimento: {boletoData.dat_vencimento}
          </Text>
          <TouchableOpacity style={styles.downloadButton} onPress={downloadBoleto}>
            <Text style={styles.downloadButtonText}>Baixar Boleto</Text>
          </TouchableOpacity>
        </>
      )}
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
    paddingVertical: '4%',
    width: '80%',
    marginVertical: 2,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  priceText: {
    color: 'black',
    fontSize: 20,
  },
  dateText: {
    color: 'black',
    fontSize: 20,
  },
  downloadButton: {
    backgroundColor: '#0047FF', 
    borderRadius: 15,
    paddingVertical: '4%',
    width: '80%',
    marginVertical: 2,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Boleto;
