import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat,Send } from 'react-native-gifted-chat';
import { ActivityIndicator, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Chat= () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState();

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
  placeholder="Digite sua mensagem aqui..." // Customiza o placeholder do input
  textInputProps={{
    // Aqui você pode adicionar quaisquer outras props do TextInput nativo
  }}

/>
  );
};

export default Chat;
