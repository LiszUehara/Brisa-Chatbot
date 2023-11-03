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

import { useNavigation } from '@react-navigation/native';

const Chat= () => {

    const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState();

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
    const storedMessages = await AsyncStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  };

  const saveMessages = useCallback(async (messages) => {
    await AsyncStorage.setItem('messages', JSON.stringify(messages));
  }, []);

  const onSend = useCallback((messagesToSend = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messagesToSend));
    sendToAssistant(messagesToSend);
  }, []);

  const sendToAssistant = async (newMessages) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            ...newMessages,
            {role: 'assistant', content: 'Serafin está pensando...'},
          ],
        },
        {
          headers: {
            Authorization:
              'Bearer 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',
          },
        },
      );

      const assistantMessage = {
        role: 'assistant',
        content: response.data.choices[0]?.message?.content || 'Sem resposta',
      };
      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Erro ao enviar mensagem para o assistente:', error);
    } finally {

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
