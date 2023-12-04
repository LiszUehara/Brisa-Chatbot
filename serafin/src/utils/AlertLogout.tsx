import { Alert } from 'react-native';

export const showLogoutAlert = (onConfirm: () => void) => {
  Alert.alert(
    'Sair da Conta',
    'Você tem certeza que deseja sair?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: onConfirm,
      },
    ],
    { cancelable: false }
  );
};
