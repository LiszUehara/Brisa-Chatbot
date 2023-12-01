import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";

export const isLoggedAtom = atom(async (get) => {
    try {
      const value = await AsyncStorage.getItem('isLogged');
      return value === 'true';
    } catch (error) {
      console.error('Erro ao verificar o status de login:', error);
      return false;
    }
  });
  
  export const inscricaoAtom = atom(async (get) => {
    try {
      const value = await AsyncStorage.getItem('userInscricao');
      return value;
    } catch (error) {
      console.error('Erro ao obter a inscrição do usuário:', error);
      return '';
    }
  });
  
  export const userNameAtom = atom(async (get) => {
    try {
      const value = await AsyncStorage.getItem('userName');
      return value;
    } catch (error) {
      console.error('Erro ao obter o nome do usuário:', error);
      return '';
    }
  });
  
  export const userLogradouroAtom = atom(async (get) => {
    try {
      const value = await AsyncStorage.getItem('userLogradouro');
      return value;
    } catch (error) {
      console.error('Erro ao obter o logradouro do usuário:', error);
      return '';
    }
  });
  
  export const userCPFCNPJAtom = atom(async (get) => {
    try {
      const value = await AsyncStorage.getItem('userCPFCNPJ');
      return value;
    } catch (error) {
      console.error('Erro ao obter o CPF/CNPJ do usuário:', error);
      return '';
    }
  });
  
  export const saveDataAtom = atom(
    (get, set, { key, value }) => {
      set(key, value);
      try {
        AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error(`Erro ao salvar ${key}:`, error);
      }
    }
  );