import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [inputError, setInputError] = useState('');
  const [setLoginInputType] = useState('');

  const handleLogin = async () => {
    if (validateInput(registrationNumber)) {
      try {
        const token = await authenticateUser(registrationNumber);

        console.log('Token de autenticação:', token);
      } catch (error) {
        setInputError('Erro na autenticação: ' + error.message);
      }
    } else {
      setInputError(
        'Por favor, insira um número de inscrição, CPF ou CNPJ válido.',
      );
    }
  };

  const authenticateUser = async (input) => {
    try {
      // Substitua pela chamada real à API
      const apiUrl = 'http://hmgiss.speedgov.com.br/amontada/consulta/contribuites';
      const apiToken = '966988da19301ceec429f3a39649a696';

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });

      if (
        response.data.situacao === 'SUCESSO' &&
        response.data.contribuintes.length > 0
      ) {
        const user = response.data.contribuintes[0];
        return user; 
      } else {
        throw new Error('Nenhum usuário encontrado.');
      }
    } catch (error) {
      throw new Error('Erro ao consultar a API: ' + error.message);
    }
  };

  const validateInput = (input: string) => {
    //const reInscricao = /^\d{9}$/;
    const reCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const reCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    const reCPF_numbers = /^\d{11}$/;
    const reCPNJ_numbers = /^\d{14}$/;

    if (reInscricao.test(input)) {
      setLoginInputType('inscricao');
      return true;
    }
    if (reCPF_numbers.test(input) || reCPF.test(input)) {
      setLoginInputType('cpf');
      return true;
    }
    if (reCPNJ_numbers.test(input) || reCNPJ.test(input)) {
      setLoginInputType('cnpj');
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subTitle}>Acesse sua conta.</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de Inscrição, CPF ou CNPJ</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 123456789, 123.456.789-01, 12.345.678/0001-12"
          placeholderTextColor="#A5A5A5"
          value={registrationNumber}
          onChangeText={(text) => {
            setRegistrationNumber(text);
            setInputError('');
          }}
        />
        {inputError ? <Text style={styles.errorText}>{inputError}</Text> : null}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FAF9F6',
  },
  title: {
    paddingTop: 100,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  inputContainer: {
    paddingTop: 100,
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
    backgroundColor: '#0047FF',
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
});

export default LoginScreen;
