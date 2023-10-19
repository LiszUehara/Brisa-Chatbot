import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const MAX_MESSAGES = 50;

const ChatMessage = ({ role, content }) => (
  <View style={role === 'user' ? styles.userMessage : styles.assistantMessage}>
    <Text style={styles.messageText}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    marginTop: 20,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  assistantMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    color: '#FFF',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#FFF',
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
  },
  sendButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingIndicator: {
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#000',
    textAlign: 'center',
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [lastUserInteractionTime, setLastUserInteractionTime] = useState(null);
  const flatListRef = useRef(null);

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
    }
  };

  const saveMessages = useCallback(async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.error('Erro ao salvar mensagens:', error);
    }
  }, [messages]);

  useEffect(() => {
    saveMessages();
    const inactivityCheckInterval = 10000; // Verificar a cada 10 segundos
    const intervalId = setInterval(clearChatAfterInactivity, inactivityCheckInterval);

    return () => clearInterval(intervalId);
  }, [messages]);

  const handleUserInteraction = () => {
    setLastUserInteractionTime(new Date());
  };

  const clearChatAfterInactivity = () => {
    const inactivityTimeout = 3600000; // 1 hora em milissegundos
    const currentTime = new Date();

    if (lastUserInteractionTime && currentTime - lastUserInteractionTime >= inactivityTimeout) {
      clearChatMessages();
    }
  };

  const clearChatMessages = () => {
    setMessages([]);
  };

  const onSend = () => {
    if (inputText.trim() === '') {
      return;
    }

    const userMessage = { role: 'user', content: inputText };
    const newMessages = [...messages, userMessage];
    setInputText('');
    setIsSending(true);
    sendToAssistant(inputText, newMessages);
    handleUserInteraction();
  };

  const sendToAssistant = async (userMessage, newMessages) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            ...newMessages,
            { role: 'assistant', content: 'Serafin está pensando...' },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer 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',
          },
        }
      );

      const assistantMessage = {
        role: 'assistant',
        content:
          'Serafin: ' +
          (response.data.choices[0]?.message?.content || 'Sem resposta'),
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Erro ao enviar mensagem para o assistente:', error);
    } finally {
      setIsSending(false);
      // Rolando para a última mensagem adicionada
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // Referência para o FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ChatMessage role={item.role} content={item.content} />
        )}
        contentContainerStyle={styles.chatContainer}
        onTouchStart={handleUserInteraction}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholder="Digite sua mensagem..."
          editable={!isSending}
        />
        {isSending && (
          <Spinner
            visible={isSending}
            textContent={'Enviando...'}
            textStyle={{ color: '#FFF' }}
          />
        )}
        <Button title="Enviar" onPress={onSend} disabled={isSending} />
        <TouchableOpacity style={styles.clearButton} onPress={clearChatMessages}>
          <Text style={styles.clearButtonText}>L</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatApp;
