import React from "react";
import { View, Text, StatusBar} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../utils/C";


export default function Home({navigation}) {
  //colocar uma lista de opcoes (emitir boleto e outros)

    return (
      <SafeAreaView>
        <StatusBar
            animated={true}
            backgroundColor= {COLORS.blue}
            hidden={false}
          />
        <Text>Início</Text>
      </SafeAreaView>

    );
  }
