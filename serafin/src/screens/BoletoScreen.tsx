import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, } from "react-native";
//import Clipboard from '@react-native-clipboard/clipboard';
import { COLORS } from "../utils/C";
import Home from "../svg/house.svg";

const buttonOne = () => {
  //Clipboard.setString('mail@mail.com')
  Alert.alert(
    'Código de barras',
    'Código de barras copiado com sucesso para a área de transferência!',
    [
      {
        text: 'OK'
      }
    ],
  );
};
const buttonTwo = () => {

};

export default function Boleto() {
  const price = 19.99;
  return (
    <View style={styles.container}>

      <View style={styles.mainContent}>
        <View style={styles.addressBox}>
          <View>
            <Home
              width={90}
              height={70}
              fill={COLORS.blue}
            />
          </View>
          <View style={styles.addressTextBox}>
            <Text style={styles.address}>{ }, { }</Text>
            <Text style={styles.address}>Vencimento: { }</Text>
          </View>
        </View>
        <Text style={styles.priceText} >R${price}</Text>
      </View >
      <TouchableOpacity style={styles.primaryButton} onPress={buttonOne}>
        <Text style={styles.primaryButtonText}>Copiar cód. de barras </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={buttonTwo}>
        <Text style={styles.secondaryButtonText}>Baixar boleto</Text>
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 0.7,
    marginVertical: "20%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.blue,
    borderRadius: 15,
    paddingVertical: "4%",
    width: '80%',
    marginVertical: "1.5%",
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center"
  },
  secondaryButton: {
    borderColor: COLORS.blue,
    borderRadius: 15,
    borderWidth: 1.5,
    width: '80%',
    paddingVertical: "4%",
    marginVertical: "1.5%",
  },
  secondaryButtonText: {
    color: COLORS.blue,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center"
  },
  priceText: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: "14%"
  },
  address: {
    color: 'white',
    fontSize: 20,
  },
  addressTextBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
  },
  addressBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
  },
  mainContent: {
    paddingHorizontal: "5%",
    borderRadius: 15,
    width: "90%",
    paddingVertical: "10%",
    marginBottom: "15%",
    backgroundColor: COLORS.blue,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 19,
    elevation: 20,
  }
});
