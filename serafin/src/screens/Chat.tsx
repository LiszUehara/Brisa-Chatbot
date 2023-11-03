import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat,Send } from 'react-native-gifted-chat';
import { ActivityIndicator, Button,Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OptionsMenu from "react-native-options-menu";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import LoginScreen from './Login';
import iconSerafin from '../svg/iconSerafin.svg'; 
import { Bubble } from 'react-native-gifted-chat';

import { useNavigation } from '@react-navigation/native';


const MAX_MESSAGES = 50;


const Chat= () => {

    const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const navigateToOption = (routeName) => {
    navigation.navigate(routeName);
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
        <MenuOptions >


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

  const clearChat = () => {
    setMessages([]);
  };

  const renderFooter = () => {
    if (isTyping) {
      return (
        <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="small" />
          <Text>Digitando...</Text>
        </View>
      );
    }
    return null;
  };
  useEffect(() => {

    loadStoredMessages();
  }, []);

  const loadStoredMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem('messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error('Erro ao carregar mensagens armazenadas:', error);

    }finally{

    setMessages([
        {
          _id: 1,
          text: 'Olá! Sou o Serafin, a Inteligência artificial da Sefin. Como Posso te ajudar?\n\n É só digitar em poucas palavras o que precisa.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Serafin',
            avatar: iconSerafin,
          },
        },
      ]);

    }
  };

  const saveMessages = useCallback(async (messages) => {
    await AsyncStorage.setItem('messages', JSON.stringify(messages));
  }, []);

  const onSend = useCallback((messagesToSend = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messagesToSend));
    sendToAssistant(messagesToSend[messagesToSend.length - 1].text);
  }, []);

  const sendToAssistant = async (text) => {
    setIsTyping(true); // Indica que o assistente está "digitando"
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/messages',
        {
          model: 'gpt-3.5-turbo',
          input: text,
        },
        {
          headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.choices && response.data.choices.length > 0) {
        const reply = response.data.choices[0].message.content;
        const assistantMessage = {
          _id: messages.length + 1,
          text: reply,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Serafin',
            avatar: iconSerafin,
          },
        };

        setMessages(previousMessages => GiftedChat.append(previousMessages, [assistantMessage]));
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem para o assistente:', error);
    } finally {
      setIsTyping(false); // Indica que o assistente terminou de "digitar"
    }
  };

  return (
    <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: 1 }}
        placeholder="Digite sua mensagem aqui..." 
    />

  );
};

const styles = StyleSheet.create({
    menuTrigger: {
      padding: 10, 
    },
    menuIcon: {
      fontSize: 24,
      color: 'white',
    },
    menuOptions: {
      marginTop: 50, 
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