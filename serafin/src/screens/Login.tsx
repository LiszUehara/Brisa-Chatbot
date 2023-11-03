import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
  const [inscricao, setInscricao] = useState('');
  const [inputError, setInputError] = useState('');
  const [contribuinte, setContribuinte] = useState(null);

  const apiToken = '966988da19301ceec429f3a39649a696';

  const handleLogin = async () => {
    if (validateInput(inscricao)) {
      try {
        const user = await authenticateUser(inscricao, apiToken);

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
      const apiUrl = 'http://hmgiss.speedgov.com.br/amontada/consulta/contribuintes';

      const response = await axios.post(
        apiUrl,
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
    // Valide a inscrição conforme necessário
    // ...

    return true; // Altere essa lógica de validação de acordo com suas necessidades
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subTitle}>Acesse sua conta.</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de Inscrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 123456789"
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
          {/* Adicione outros campos conforme necessário */}
        </View>
      )}
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
  contribuinteContainer: {
    marginTop: 20,
  },
  contribuinteLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default LoginScreen;
