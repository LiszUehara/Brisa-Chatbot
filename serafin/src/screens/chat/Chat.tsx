import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import iconSerafin from '../../svg/iconSerafin.svg';
import { useNavigation } from '@react-navigation/native';
import { isFirstTime } from '../../repo/atom';
import { useAtom } from 'jotai';
import { API } from '../../../env';

const Chat = () => {
  const atendimentoFalas = `
  1. Atendimento sobre IPTU
  2. Atendimento sobre ITBI
  3. Atendimento sobre REFIS
  4. Agendar atendimento no Vapt Vupt
  5. Consultar Boleto
  6. Outros`

  const navigation = useNavigation();
  //const [isFirstTime, setIsFirstTime] = useState(true);
  const [time, setTime] = useAtom(isFirstTime);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [preMessages, setpreMessages] = useState([
    {
      _id: 1,
      text: atendimentoFalas,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Serafin',
        avatar: iconSerafin,
      },
    },
    {
      _id: 2,
      text: "Olá, eu sou SERAFIN, a inteligência artificial da Secretaria de Finanças, e estou aqui para te ajudar com dúvidas sobre diversos assuntos fiscais, como IPTU, ITBI, ISS, renegociação e prazo.\n\n Qual a sua dúvida?\n\n Porfavor insira alguma das opções abaixo:",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Serafin',
        avatar: iconSerafin,
      },
    },
  ]);

  const simulateSendToAssistant = async (text) => {
    setIsTyping(true);
    try {
      const reply = text
      setpreMessages(previousMessages => GiftedChat.append(previousMessages, [{
        _id: previousMessages.length + 1,
        text: reply,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Serafin',
          avatar: iconSerafin,
        },
      }]));

    } catch (error) {
      console.error('Erro ao enviar mensagem para o assistente:', error);
    } finally {
      setIsTyping(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu>
          <MenuTrigger>
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Text style={{ fontSize: 24, color: 'white' }}>⋮</Text>
            </TouchableOpacity>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => navigateToOption('Login')} >
              <View style={styles.menuOptionStyle}>
                <Icon name="login" size={16} color="#000" />
                <Text style={styles.menuOptionText}>Fazer Login</Text>
              </View>
            </MenuOption>
            <MenuOption onSelect={() => clearChat()} >
              <View style={styles.menuOptionStyle}>
                <Icon name="delete" size={16} color="#000" />
                <Text style={styles.menuOptionText}>Limpar Chat</Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      ),
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, [navigation]);

  const navigateToOption = (routeName) => {
    navigation.navigate(routeName);
  };

  const clearChat = () => {
    setpreMessages([]);
    time(true);
  };

  const renderFooter = () => {
    if (isTyping) {
      return (
        <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.digitando}>Serafin está digitando...</Text>
        </View>
      );
    }
    return null;
  };

  const onSendPreMessages = (newMessages = []) => {

    const simulateSendToAssistantWithDelay = (message, delay) => {
      setTimeout(() => {
        simulateSendToAssistant(message);
      }, delay);
    };

    setpreMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    if (time) {
      if (newMessages[0].text == '1') {
        setIsTyping(true)
        simulateSendToAssistant("Opção 1 selecionada: Atendimento sobre IPTU")
        setIsTyping(false)
        return
        //simulateSendToAssistantWithDelay("Opção 1 selecionada: Atendimento sobre IPTU", 1000)

      }
      if (newMessages[0].text == '2') {
        setIsTyping(true)
        simulateSendToAssistant("Opção 2 selecionada: Atendimento sobre ITBI")
        setIsTyping(false)
        return
        // lógica para a opção 2
      }
      if (newMessages[0].text == '3') {
        setIsTyping(true)
        simulateSendToAssistant("Opção 3 selecionada: Atendimento sobre REFIS")
        return
        // lógica para a opçasão 3
      }
      if (newMessages[0].text == '4') {
        setIsTyping(true)
        simulateSendToAssistant("Opção 4 selecionada: Agendar atendimento no Vapt Vupt")
        return
        // lógica para a opçãoo 4 
      }
      if (newMessages[0].text == '5') {
        setIsTyping(true)
        simulateSendToAssistant("Certo, iremos te direcionar para aba de consultar seus dados e consultas de boleto tudo bem? Um segundo ...")
        setTimeout(() => {
          navigateToOption('Boleto')
        }, 6000);
      }
    }
    if (newMessages[0].text == '6') {
      setTime(false);
      console.log(time);
      simulateSendToAssistant("Opção 6 selecionada: Outros")
    }
    if (time == false) {
      sendToAssistant(newMessages[0].text);
    }

  }

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
      console.log(API.KEY_GPT)

      setpreMessages(previousMessages => GiftedChat.append(previousMessages, [{

        _id: previousMessages.length + 1,
        text: reply,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Serafin',
          avatar: iconSerafin,
        },
      }]));
    } catch (error) {
      console.error('Erro ao enviar mensagem para o assistente:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../svg/background.jpg')}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <GiftedChat
        messages={preMessages}
        onSend={preMessages => onSendPreMessages(preMessages)}
        user={{
          _id: 1,
        }}
        isTyping={isTyping}
        renderFooter={renderFooter}
        placeholder="Digite sua mensagem..."
      />
    </ImageBackground>
  );

}

const renderSend = props => {
  return (
    <Send {...props} containerStyle={{ position: 'absolute', bottom: '10%', right: 0 }}>
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity onPress={() => props.onSend({ text: props.text.trim() }, true)}>
          <Text style={{ color: '#007AFF' }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </Send>
  );
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
  menuOptionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuOptionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default Chat;
