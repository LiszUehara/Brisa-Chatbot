import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
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
    backgroundColor: '#4CAF50',
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
  loadingIndicator: {
    marginRight: 10,
  },
});

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [lastUserInteractionTime, setLastUserInteractionTime] = useState(null);

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
    const inactivityTimeout = 2 * 60 * 1000; // 2 minutos em milissegundos
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
        content: 'Serafin: ' + (response.data.choices[0]?.message?.content || 'Sem resposta'),
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Erro ao enviar mensagem para o assistente:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat com Serafin</Text>
        <Button title="Limpar Chat" onPress={clearChatMessages} />
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ChatMessage role={item.role} content={item.content} />}
        contentContainerStyle={styles.chatContainer}
        ref={(ref) => (this.flatListRef = ref)}
        onContentSizeChange={() => this.flatListRef.scrollToEnd({ animated: true })}
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
        {isSending ? (
          <View style={styles.loadingIndicator}>
            <Text>Enviando...</Text>
          </View>
        ) : null}
        <Button title="Enviar" onPress={onSend} disabled={isSending} />
      </View>
    </View>
  );
};

export default ChatApp;
