import React from 'react';
import {Text, View} from 'react-native';
import OptionsCard from "../../../components/OptionsCard";
import {Card} from "react-native-elements";

const SerafinFirstOptions = ({navigation, route}) => {


  const question =
    route.params.option == 1 ? "Qual sua dúvida sobre IPTU ?"
      : route.params.option == 2 ? "Qual sua dúvida sobre ITBI ?"
        : "Outros"

  const option4 = "Voltar"

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: '#1a3495', padding: 7}}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>{question}</Text>
      </View>
      {
        route.params.option == 1 && (
          <><OptionsCard onPress={() => navigation.navigate("ThirdOptions",{option: "1-1"})} text={'1. Consultar débitos'}/>
            <OptionsCard onPress={() => navigation.navigate("ThirdOptions",{option: "1-2"})} text={'2. Segunda via de boletos'}/>
            <OptionsCard onPress={() => navigation.navigate("ThirdOptions",{option: "1-3"})} text={'3. Renegociação'}/></>
        )
      }
      {
        route.params.option == 2 && (
          <><OptionsCard onPress={() => navigation.navigate("ThirdOptions",{option: "2-1"})} text={'ITBI Compra e venda'}/>
            <OptionsCard onPress={() => navigation.navigate("ThirdOptions",{option: "2-2"})} text={'ITBI Financiado'}/>
            <OptionsCard onPress={() => navigation.navigate("ThirdOptions",{option: "2-3"})} text={'ITBI Não financiado'}/></>
        )
      }

      <OptionsCard onPress={() => navigation.goBack()} text={option4}/>
    </View>
  )
    ;
};

export default SerafinFirstOptions;
