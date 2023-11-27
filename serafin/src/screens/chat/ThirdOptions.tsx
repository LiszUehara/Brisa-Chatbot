import React, { useState } from 'react';
import { Text, View, Linking, TouchableOpacity } from 'react-native';
import OptionsCard from "../../components/OptionsCard";
import { Card } from "react-native-elements";

const SerafinFirstOptions = ({ navigation, route }) => {
  const [help, setHelp] = useState<boolean>(null);

  const openLink = (url) => {
    Linking.openURL(url);
  };

  const openWhatsApp = () => {
    Linking.openURL('whatsapp://send?phone=558831990367');
  };

  const question =
    route.params.option == "3" ? "Sobre REFIS"
      : route.params.option == "4" ? "Agendamento Vapt Vupt"
        : route.params.option.includes("1-") ? "Dúvida sobre IPTU"
          : route.params.option.includes("2-") ? "Dúvida sobre ITBI"
          : "Outros";

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#1a3495', padding: 7 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>{question}</Text>
      </View>

      {route.params.option == "1-1" && (
        <OptionsCard
          onPress={() => openLink('https://servicos2.speedgov.com.br/juazeirodonorte/segunda_via/iptu')}
          text={'- Acesse o site da Prefeitura de Juazeiro do Norte, click na aba “Portal do Contribuinte”, depois\n' +
            'toque em "Segunda Via de Boleto", coloque a inscrição do imóvel ou o seu CPF, clique em\n' +
            'consultar. Você terá acesso aos débitos ativos e últimos lançamentos.\n' +
            'Se preferir, toque no botão abaixo.'}
        />
      )}

      {route.params.option == "1-2" && (
        <OptionsCard
          onPress={() => openLink('https://servicos2.speedgov.com.br/juazeirodonorte/segunda_via/iptu')}
          text={'- Acesse o site da Prefeitura de Juazeiro do Norte, click na aba “Portal do Contribuinte”, depois\n' +
            'toque em "Segunda Via de Boleto", coloque a inscrição do imóvel ou o seu CPF, clique em\n' +
            'consultar. Você terá acesso aos débitos ativos e últimos lançamentos.\n' +
            'Se preferir, toque no botão abaixo.'}
        />
      )}

      {route.params.option == "1-3" && (
        <>
          <OptionsCard
            onPress={() => openLink('https://meuvaptvupt.com.br/pagina/agendamento')}
            text={'- Estamos com o Programa de Recuperação Fiscal (Refis) até o dia 06/11/2023, possibilitando\n' +
              'descontos de até 100% dos juros e multas, além de parcelamentos.\n' +
              'Para fazer a adesão o contribuinte deve comparecer com documento oficial com foto, no Vapt\n' +
              'Vupt ou na sede da Secretaria de Finanças.\n' +
              'Se preferir, toque no botão abaixo para agendar seu atendimento.'}
          />
          <OptionsCard
            onPress={() => openLink('https://meuvaptvupt.com.br/pagina/agendamento')}
            text={'Agendar Atendimento'}
          />
        </>
      )}

      {/* ... Other options ... */}

      {help == null && (
        <View>
          <OptionsCard
            onPress={() => {
              // Handle the case when the user is helped
            }}
            text={"Te ajudei ?"}
          />
          <OptionsCard
            onPress={() => {
              setHelp(true);
            }}
            text={"1. Sim"}
          />
          <OptionsCard
            onPress={() => {
              setHelp(false);
            }}
            text={"2. Não"}
          />
        </View>
      )}

      {help == true ? (
        <View>
          <OptionsCard
            onPress={() => {
              // Handle the case when the user needs more help
            }}
            text={"- Quando precisar, é só falar."}
          />
          <OptionsCard
            onPress={() => {
              
              navigation.navigate('FirstOptions');
            }}
            text={"Voltar ao Menu Inicial"}
          />
        </View>
      ) : help == false ? (
        <View>
          <OptionsCard
            onPress={() => {
              
            }}
            text={
              "Poxa, tente perguntar de outra forma, pode dar certo. Caso precise, ligue para o fone\n" +
              "(88)3199-0367 ou nos contate através do WhatsApp."
            }
          />
          <TouchableOpacity onPress={openWhatsApp}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Fale conosco no WhatsApp</Text>
          </TouchableOpacity>
          <OptionsCard
            onPress={() => {
              
            }}
            text={" ou nos contate através do WhatsApp."}
          />
        </View>
      ) : null}
    </View>
  );
};

export default SerafinFirstOptions;
