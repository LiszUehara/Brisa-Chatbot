
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key: string, data: any) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

export const retrieveData = async (key: string) => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    if (jsonData !== null) {
      return JSON.parse(jsonData);
    }
    return null;
  } catch (error) {
    console.error('Erro ao recuperar dados:', error);
    return null;
  }
};
