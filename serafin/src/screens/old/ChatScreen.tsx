import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const MAX_MESSAGES = 50;

const AssistantIcon = require('../svg/iconSerafin.png');

const ChatMessage = ({role, content}) => (
  <View style={role === 'user' ? styles.userMessage : styles.assistantMessage}>
    {role === 'assistant' && (
      <Image source={AssistantIcon} style={styles.Icon} />
    )}
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
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
    maxWidth: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    gap: 10,
  },
  messageText: {
    color: '#FFF',
    flex: 1,
    fontSize: 16,
  },
  Icon: {
    width: 35,
    height: 35,
  },
  inputContainer: {
    height: 90,
    backgroundColor: '#C7C3C3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#FFF',
  },
  sendButton: {
    borderRadius: 5,
    padding: 10,
    position: 'absolute',
    right: 60,
    top: 20,
  },
  sendButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  clearButton: {
    borderRadius: 5,
    padding: 10,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 8,
    paddingLeft: -20,
    color: '#000',
  },
  loadingIndicator: {
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  headerIcon: {
    marginLeft: 20,
    width: 55,
    height: 55,
    zIndex: 10000,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: '#000',
  },
  loginButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    width: 80,
    color: 'blue',
    borderColor: 'blue',
    borderWidth: 2,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#00f',
    textAlign: 'center',
  },
  sendIcon: {
    width: 20,
    height: 20,
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
    const intervalId = setInterval(
      clearChatAfterInactivity,
      inactivityCheckInterval,
    );

    return () => clearInterval(intervalId);
  }, [messages]);

  const handleUserInteraction = () => {
    setLastUserInteractionTime(new Date());
  };

  const clearChatAfterInactivity = () => {
    const inactivityTimeout = 3600000; // 1 hora em milissegundos
    const currentTime = new Date();

    if (
      lastUserInteractionTime &&
      currentTime - lastUserInteractionTime >= inactivityTimeout
    ) {
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

    const userMessage = {role: 'user', content: inputText};
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
      setIsSending(false);
      // Rolando para a última mensagem adicionada
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({animated: true});
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../svg/iconSerafin.png')}
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>SERAFIN</Text>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ChatMessage role={item.role} content={item.content} />
        )}
        contentContainerStyle={styles.chatContainer}
        onTouchStart={handleUserInteraction}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="Digite sua mensagem..."
          editable={!isSending}
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          <Image
            source={require('../svg/Vector.png')}
            style={styles.sendIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearChatMessages}>
          <Image source={require('../svg/clear.png')} style={styles.sendIcon} />
          <Text style={styles.clearButtonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatApp;