import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import axios from 'axios';
import { COLORS, URL } from '../utils/C';

import Logo from "../svg/pessoas.svg";
import { useAtom } from 'jotai';
import { user } from '../repo/atom';
import { API } from '../../env';


const LoginScreen = () => {
  const [inscricao, setInscricao] = useState('');
  const [inputError, setInputError] = useState('');
  const [contribuinte, setContribuinte] = useAtom(user);

  const handleLogin = async () => {
    if (validateInput(inscricao)) {
      try {
        const user = await authenticateUser(inscricao, API.KEY_SEFIN);

        if (user) {
          setContribuinte(user);
        } else {
          setInputError('Nenhum usuário encontrado.');
        }
      } catch (error) {
        setInputError('Erro na autenticação: ' + error.message);
      }
    } else {
      setInputError('Por favor, insira uma inscrição válida.');
    }
  };

  const authenticateUser = async (inscricao, authToken) => {
    try {
      const response = await axios.post(
        URL.urlContribuintes,
        {
          inscricoes: inscricao,
          nome: '',
          cpf: '',
          cnpj: '',
        },
        {
          headers: {
            'auth-token': authToken,
          },
        }
      );

      if (response.data.situacao === 'SUCESSO' && response.data.contribuintes.length > 0) {
        const user = response.data.contribuintes[0];
        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Erro ao consultar a API: ' + error.message);
    }
  };

  const validateInput = (input) => {
    return true;
  };

  return (
    <View style={styles.container}>
      <Image style={styles.imagem} source={require('../svg/prefeitura-juazeiro.png')}></Image>
      <Logo width={200} height={200} />
      <View style={styles.inputContainer}>
        <Text style={{ color: COLORS.blue, paddingBottom: 12, marginTop: 24, fontSize: 24, fontWeight: 'bold' }}>Evite filas! Nossos serviços na palma de sua mão!</Text>
        <Text style={{ color: COLORS.gray, paddingBottom: 24, fontSize: 16, marginBottom: 24 }}>Faça login e acesse ainda mais serviços da Secretaria de Finanças sem precisar sair de casa</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de inscrição '123456789'"
          placeholderTextColor="#A5A5A5"
          value={inscricao}
          onChangeText={(text) => setInscricao(text)}
        />
        {inputError ? <Text style={styles.errorText}>{inputError}</Text> : null}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {contribuinte && (
        <View style={styles.contribuinteContainer}>
          <Text style={styles.contribuinteLabel}>Informações do Contribuinte:</Text>
          <Text>Nome: {contribuinte.pes_nome}</Text>
          <Text>CPF/CNPJ: {contribuinte.pes_cpfcnpj}</Text>
          <Text>Endereço: {contribuinte.pes_logradouro}, {contribuinte.pes_numero}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },

  inputContainer: {
    width: 362,
    marginBottom: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: 362,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    elevation: 3,
    padding: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: 362,
    height: 60,
    backgroundColor: COLORS.blue,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 8,
  },
  contribuinteContainer: {
    marginTop: 20,
  },
  contribuinteLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagem: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
