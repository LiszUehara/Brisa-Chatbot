import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import { COLORS, URL } from '../utils/C';

import Logo from "../svg/pessoas.svg";
import { useAtom } from 'jotai';
import { user } from '../repo/atom';
import { API } from '../../env';
import { saveData } from '../repo/store/Dao';


import {contribuinte} from '../repo/atom'

const LoginScreen = ({navigation}) => {
  const [inscricao, setInscricao] = useState('');
  const [inputError, setInputError] = useState('');
  const [repo, setRepo] = useState(null);
  const [user, setUser] = useAtom(contribuinte);
  const handleLogin = async () => {
    if (validateInput(inscricao)) {
      try {
        const user = await authenticateUser(inscricao, API.KEY_SEFIN);

        if (user) {
          setRepo(user);
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
        //console.log(response.data.contribuintes[0]);
        saveData('contribuintes', user);
        setUser(user);
        //navigation.navigate("Home");

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

        {repo && (
          <View style={styles.contribuinteContainer}>
            <Text style={styles.contribuinteLabel}>Informações do Contribuinte:</Text>
            <Text>Nome: {user.pes_nome}</Text>
            <Text>CPF/CNPJ: {user.pes_cpfcnpj}</Text>
            <Text>Endereço: {user.pes_logradouro}, {user.pes_numero}</Text>
          </View>
        )}

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF9F6',
  },
  inputContainer: {
    width: 362,
    marginBottom: 16,
    tintColor: COLORS.blue,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  input: {
    width: 362,
    height: 60,
    color: COLORS.black,
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
