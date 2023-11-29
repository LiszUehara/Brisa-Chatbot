import React, { useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import iconSerafin from '../../svg/iconSerafin.svg';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {

  const atendimentoFalas = `
  1. Atendimento sobre IPTU
  2. Atendimento sobre ITBI
  3. Atendimento sobre REFIS
  4. Agendar atendimento no Vapt Vupt
  5. Consultar Boleto
  6. Outros`

  const navigation = useNavigation();

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

  const [isTyping, setIsTyping] = useState(false);

const simulateSendToAssistant = async (text) => {
    setIsTyping(true);
    try {
      const reply = text
      setpreMessages(previousMessages => GiftedChat.append(previousMessages, [{
        _id: previousMessages.length+1,
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
    setMessages([]);
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

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    sendToAssistant(newMessages[0].text);
  }, []);

  const onSendPreMessages = useCallback((newMessages = []) => {

    const simulateSendToAssistantWithDelay = (message, delay) => {
      setTimeout(() => {
        simulateSendToAssistant(message);
      }, delay);
    };

    setpreMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    if(firstTime){
    switch (newMessages[0].text) {
      case '1':
        // lógica para a opção 1
        setIsTyping(true)
        simulateSendToAssistantWithDelay("Opção 1 selecionada: Atendimento sobre IPTU",1000)
        break;
      case '2':
        // lógica para a opção 2
        simulateSendToAssistantWithDelay("Opção 2 selecionada: Atendimento sobre ITBI",1000)
        break;
      case '3':
        // lógica para a opçasão 3
        simulateSendToAssistantWithDelay("Opção 3 selecionada: Atendimento sobre REFIS",1000)
        break;
      case '4':
        // lógica para a opçãoo 4 
        simulateSendToAssistantWithDelay("Opção 4 selecionada: Agendar atendimento no Vapt Vupt",1000)
        break;

      case '5':
        setIsTyping(true)
        simulateSendToAssistant("Certo, iremos te direcionar para aba de consultar seus dados e consultas de boleto tudo bem? Um segundo ...")
        setTimeout(() => {
          navigateToOption('Boleto')
        }, 6000);

        break;
      case '6. Outros':
        // lógica para a opção 6
        simulateSendToAssistant("Opção 6 selecionada: Outros")
        break;
      default:
        // lógica para lidar com outra s coisinhas
        console.log('Opção não reconhecida');
    }
  }else{
  }

  }, []);


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
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json',
          },
        },
      );
      const reply = response.data.choices[0].message.content;
      setMessages(previousMessages => GiftedChat.append(previousMessages, [{
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

  const firstTime = true
  if (firstTime) {
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
        />
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        source={require('../../svg/background.jpg')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          isTyping={isTyping}
          renderFooter={renderFooter}
          placeholder='Digite sua dúvida...'
        />
      </ImageBackground>
    );

  }

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
