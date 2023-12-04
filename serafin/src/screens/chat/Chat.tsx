import React, { useState, useEffect } from 'react';
import { Day, GiftedChat } from 'react-native-gifted-chat';
import { Text, View, StyleSheet, ImageBackground, Linking } from 'react-native';
import axios from 'axios';
import iconSerafin from '../../svg/iconSerafin.svg';
import { useNavigation } from '@react-navigation/native';
import { isFirstTime } from '../../repo/atom';
import { opt } from '../../repo/atom';
import { useAtom } from 'jotai';
import { API } from '../../../env';
import { COLORS, whatsappUrl } from '../../utils/C';

const Chat = () => {
  const navigation = useNavigation();
  const [time, setTime] = useAtom(isFirstTime);
  const [context, setContext] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const initialText = "Escolha uma opção:\n1. Atendimento sobre IPTU\n2. Atendimento sobre ITBI\n3. Atendimento sobre REFIS\n4. Agendar atendimento no Vapt Vupt\n5. Consultar Boleto\n6. Outros"
  

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: initialText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Serafin',
          avatar: iconSerafin,
        },
      },
      {
        _id: 2,
        text: 'Bem-vindo! Como posso ajudar você?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Serafin',
          avatar: iconSerafin,
        },
      },
    ]);
  }, []);

  const onSend = async (newMessages = []) => {
    const userMessage = newMessages[0].text;

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: previousMessages.length + 1,
          text: userMessage,
          createdAt: new Date(),
          user: {
            _id: 1,
          },
        },
      ])
    );

    //MAIN LOGIC AND CONDITION HERE!!

    if (time) {
      await handlePredefinedOptions(userMessage);
    } else {
      await sendToAssistant(userMessage);
      //await simulateSendToAssistant(userMessage);
    }

  };

  const handlePredefinedOptions = async (userMessage) => {
    setIsTyping(true);
    if (context == null) {
      switch (userMessage) {
        case '1':
          await simulateSendToAssistant("Opção 1 selecionada: Atendimento sobre IPTU\n1. Consultar débitos\n2. Segunda via de boletos\n3. Renegociação\n0. Voltar");
          setContext('1');
          setIsTyping(false);
          break;
        case '2':
          await simulateSendToAssistant("Opção 2 selecionada: Atendimento sobre ITBI\n1. ITBI Compra e venda\n2. ITBI Financiado\n3. ITBI Não financiado\n0. Voltar");
          setContext('2');
          setIsTyping(false);
          break;
        case '3':
          await simulateSendToAssistant("Estamos com o Programa de Recuperação Fiscal (Refis) até o dia 06/11/2023, possibilitando descontos de até 100% dos juros e multas, além de parcelamentos.");
          await simulateSendToAssistant("Segue abaixo o link para agendar seu atendimento\n\nhttps://meuvaptvupt.com.br/pagina/agendamento\nTe aguardamos por lá. Até breve!");
          await simulateSendToAssistant("Voltando ao menu principal");
          simulateSendToAssistant(initialText);
          setContext(null);
          setIsTyping(false);
          break;
        case '4':
          await simulateSendToAssistant("Tornamos o nosso atendimento no Vapt Vupt mais ágil e prático. Para melhor atendê-lo\realize seu agendamento no dia e horário que melhor desejar.");
          await simulateSendToAssistant("Segue abaixo o link para agendar seu atendimento:\n\nhttps://meuvaptvupt.com.br/pagina/agendamento\n\nTe aguardamos por lá. Até breve!");
          await simulateSendToAssistant("Voltando ao menu principal");
          simulateSendToAssistant(initialText);
          setContext(null);
          setIsTyping(false);
          break;
        case '5':
          setContext(null);
          setIsTyping(false);
          await simulateSendToAssistant("Certo, iremos te direcionar para a aba de consultar seus dados e consultas de boleto. Um momento...");
          setTimeout(() => {
            navigateToOption('Boleto');
          }, 3000);
          break;
        case '6':
          setTime(false);
          await simulateSendToAssistant("Opção 6 selecionada: Outros");
          setContext(null);
          setIsTyping(false);
          break;
        default:
          setIsTyping(false);
          await simulateSendToAssistant("Desculpe, não entendi. Pode reformular sua pergunta?");
          break;
      }
    } else {
      await handleSubOption(userMessage);
    }
  };

  const handleSubOption = async (userMessage) => {
    switch (context) {
      case '1':
        switch (userMessage) {
          case '0':
            await simulateSendToAssistant("Tudo bem");
            await simulateSendToAssistant(initialText);
            setContext(null);
            setIsTyping(false);
            break;
          case '1':
            await simulateSendToAssistant("Consultar débitos selecionado");
            await simulateSendToAssistant(`Acesse o site da Prefeitura de Juazeiro do Norte, click na aba “Portal do Contribuinte”, depois\ntoque em "Segunda Via de Boleto", coloque a inscrição do imóvel ou o seu CPF, clique em\nconsultar. Você terá acesso aos débitos ativos e últimos lançamentos.\nSe preferir, toque no link abaixo. https://servicos2.speedgov.com.br/juazeirodonorte/segunda_via/iptu`);
            await simulateSendToAssistant("Voltando ao menu principal");
            simulateSendToAssistant(initialText);
            setContext(null);
            setIsTyping(false);
            break;
          case '2':
            await simulateSendToAssistant("Segunda via de boletos selecionado");
            await simulateSendToAssistant(`Acesse o site da Prefeitura de Juazeiro do Norte, click na aba “Portal do Contribuinte”, depois\ntoque em "Segunda Via de Boleto", coloque a inscrição do imóvel ou o seu CPF, clique em\nconsultar. Você terá acesso aos débitos ativos e últimos lançamentos.\nSe preferir, toque no link abaixo. https://servicos2.speedgov.com.br/juazeirodonorte/segunda_via/iptu`);
            await simulateSendToAssistant("Voltando ao menu principal");
            simulateSendToAssistant(initialText);
            setContext(null);
            setIsTyping(false);
            break;
          case '3':
            await simulateSendToAssistant(`Renegociação selecionada, Estamos com o Programa de Recuperação Fiscal (Refis) até o dia 06/11/2023, possibilitando descontos de até 100% dos juros e multas, além de parcelamentos.\nPara fazer a adesão o contribuinte deve comparecer com documento oficial com foto, no Vapt\nVupt ou na sede da Secretaria de Finanças.\nSe preferir, toque no link abaixo para agendar seu atendimento\n https://meuvaptvupt.com.br/pagina/agendamento.`);
            await simulateSendToAssistant("Voltando ao menu principal");
            simulateSendToAssistant(initialText);
            setContext(null);
            setIsTyping(false);
            break;
          default:
            setIsTyping(false);
            await simulateSendToAssistant("Desculpe, não entendi. Pode reformular sua pergunta?");
            break;
            
        }
        break;
      case '2':
        switch (userMessage) {
          case '0':
            await simulateSendToAssistant("Tudo bem");
            await simulateSendToAssistant(initialText);
            setContext(null);
            setIsTyping(false);
            break;
          case '1':
            await simulateSendToAssistant("ITBI Compra e venda selecionado");
            await simulateSendToAssistant("Acesse o site da Prefeitura de Juazeiro do Norte, click na aba “Portal do Contribuinte”, e entre com o seu cadastro, caso ainda não tenha, realize o cadastro para prosseguir. Após isso, clique em “Nova requisição” e escolha a finalidade “ITBI COMPRA E VENDA");
            await simulateSendToAssistant("Ah, atente-se às documentações obrigatórias. Na opção de arquivos, clique na aba “escolher arquivo”, depois na aba “+Adicionar arquivo”, caso tenha mais de um documento a enviar. Por fim, clique em “Abrir Requisição”. E é só acompanhar! Prático, não?!");
            await simulateSendToAssistant("Se preferir, toque no link abaixo que te levo até lá:\n\nhttps://servicos2.speedgov.com.br/juazeirodonorte/sessao/login");
            await simulateSendToAssistant("Voltando ao menu principal");
            simulateSendToAssistant(initialText);
            setContext(null);
            setIsTyping(false);
            setIsTyping(false);
            break;
          case '2':
            await simulateSendToAssistant("ITBI Financiado selecionado");
            await simulateSendToAssistant("Acesse o site da Prefeitura de Juazeiro do Norte, click na aba “Portal do Contribuinte”, e entre com o seu cadastro, caso ainda não tenha, realize o cadastro para prosseguir. Após isso, clique em “Nova requisição” e escolha a finalidade “ITBI COMPRA E VENDA”.");
            await simulateSendToAssistant("Ah, atente-se às documentações obrigatórias. Na opção de arquivos, clique na aba “escolher arquivo”, depois na aba “+Adicionar arquivo”, caso tenha mais de um documento a enviar. Por fim, clique em “Abrir Requisição”. E é só acompanhar! Prático, não?!");
            await simulateSendToAssistant("Se preferir, toque no link abaixo que te levo até lá:\n\nhttps://servicos2.speedgov.com.br/juazeirodonorte/sessao/login");
            await simulateSendToAssistant("Voltando ao menu principal");
            simulateSendToAssistant(initialText);
            setContext(null);
            setIsTyping(false);
            setIsTyping(false);
            break;
          case '3':
            await simulateSendToAssistant("ITBI Não financiado selecionado");
            await simulateSendToAssistant("Voltando ao menu principal");
            await simulateSendToAssistant("Acesse o site da Prefeitura de Juazeiro do Norte, click na aba “Portal do Contribuinte”, e entre com o seu cadastro, caso ainda não tenha, realize o cadastro para prosseguir. Após isso, clique em “Nova requisição” e escolha a finalidade “ITBI COMPRA E VENDA”.");
            await simulateSendToAssistant("Ah, atente-se às documentações obrigatórias. Na opção de arquivos, clique na aba “escolher arquivo”, depois na aba “+Adicionar arquivo”, caso tenha mais de um documento a enviar. Por fim, clique em “Abrir Requisição”. E é só acompanhar! Prático, não?!");
            await simulateSendToAssistant("Se preferir, toque no link abaixo que te levo até lá:\n\nhttps://servicos2.speedgov.com.br/juazeirodonorte/sessao/login");
            await simulateSendToAssistant("Voltando ao menu principal");
            simulateSendToAssistant(initialText);
            setContext(null);
            setIsTyping(false);
            setIsTyping(false);
            break;
          default:
            setIsTyping(false);
            await simulateSendToAssistant("Desculpe, não entendi. Pode reformular sua pergunta?");
            break;
        }
        break;
      case '3':
        break;
      default:
        setIsTyping(false);
        await simulateSendToAssistant("Desculpe, não entendi. Pode reformular sua pergunta?");
        break;
    }
  };


  const openWhatsApp = () => {
    Linking.openURL(whatsappUrl)
      .then((data) => {
        console.log('WhatsApp aberto com sucesso:', data);
      })
      .catch((error) => {
        console.error('Erro ao abrir o WhatsApp:', error);
      });
  };

  const simulateSendToAssistant = async (text) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: previousMessages.length + 1,
          text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Serafin',
            avatar: iconSerafin,
          },
        },
      ])
    );
  };

  const sendToAssistant = async (text) => {
    setIsTyping(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'ft:gpt-3.5-turbo-1106:personal::8OHQ3bAb',
          messages: [{ role: 'user', content: text }],
        },
        {
          headers: {
            'Authorization': 'Bearer ' + API.KEY_GPT,
            'Content-Type': 'application/json',
          },
        },
      );

      const reply = response.data.choices[0].message.content;

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
          {
            _id: previousMessages.length + 1,
            text: reply,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Serafin',
              avatar: iconSerafin,
            },
          },
        ])
      );
    } catch (error) {
      console.error('Erro ao enviar mensagem para o assistente:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const navigateToOption = (routeName) => {
    navigation.navigate(routeName);
  };


  return (
    <ImageBackground
      source={require('../../svg/background.jpg')}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
        isTyping={isTyping}
        renderFooter={renderFooter}
        placeholder="Digite sua mensagem..."
        renderDay={(props) => <CustomDay {...props} />}
      />
    </ImageBackground>
  );
};


const CustomDay = (props) => {
  return (
    <Day
      {...props}
      textStyle={{
        color: COLORS.white, 
      }}
    />
  );
};

const renderFooter = ({ isTyping }) => {
  if (isTyping) {
    return (
      <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.digitando}>Serafin está digitando...</Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  digitando: {
    color: '#ffffff',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Chat;