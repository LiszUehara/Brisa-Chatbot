import React from 'react';
import { View } from 'react-native';
import OptionsCard from '../../../components/OptionsCard';
import { useNavigation } from "@react-navigation/native";
import SecondOptions from "./SecondOptions";
import BoletoStack from "../../../navigation/BoletoStack";

const SerafinFirstOptions = () => {
  const navigation = useNavigation();
  const question = `Oi, eu sou a SERAFIN, a inteligência artificial da Secretaria de Finanças, e estou aqui para te ajudar com dúvidas sobre diversos assuntos fiscais, como IPTU, ITBI, ISS, renegociação e prazo.
Qual a sua dúvida?

Por favor, escolha uma das opções abaixo:`

  const option1 = '1. Atendimento sobre IPTU';
  const option2 = "2. Atendimento sobre ITBI"
  const option3 = "3. Atendimento sobre REFIS"
  const option4 = "4. Agendar atendimento no Vapt Vupt"
  const option5 = "5. Consultar Boleto"
  const option6 = "6. Outros"

  return (
    <View style={{ flex: 1 }}>
      <OptionsCard onPress={() => { }} text={question} />
      <OptionsCard onPress={() => navigation.navigate("SecondOptions", { option: 1 })} text={option1} />
      <OptionsCard onPress={() => navigation.navigate("SecondOptions", { option: 2 })} text={option2} />
      <OptionsCard onPress={() => navigation.navigate("ThirdOptions", { option: "3" })} text={option3} />
      <OptionsCard onPress={() => navigation.navigate("ThirdOptions", { option: "4" })} text={option4} />
      <OptionsCard onPress={() => navigation.navigate('Boleto', { screen: 'Boleto' })} text={option5} />
      <OptionsCard onPress={() => navigation.navigate("ChatScreen")} text={option6} />
    </View>
  );
};

export default SerafinFirstOptions;
