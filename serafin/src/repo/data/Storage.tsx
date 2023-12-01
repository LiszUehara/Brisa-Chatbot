import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Dados salvos com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Dados recuperados:', value);
      return value;
    } else {
      console.log('Nenhum dado encontrado para a chave:', key);
      return null;
    }
  } catch (error) {
    console.error('Erro ao recuperar dados:', error);
    return null;
  }
};
export const checkLoginStatus = async () => {
    try {
      const isLogged = await getData('isLogged');
      if (isLogged === 'true') {
        console.log('O usuário está logado!');
        return true
      } else {
        console.log('O usuário não está logado.');
        return false
      }
    } catch (error) {
      console.error('Erro ao verificar o status de login:', error);
    }
  };
export const getUsername= async () => {
    try {
      const username = await getData('userNome');
      return username
   
    } catch (error) {
      console.error('Erro ao verificar o status de login:', error);
    }
  };
