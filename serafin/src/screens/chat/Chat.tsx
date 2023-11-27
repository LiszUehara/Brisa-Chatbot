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
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

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
      // Trate o erro conforme necessário (exibindo uma mensagem ao usuário, etc.)
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
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        isTyping={isTyping}
        renderFooter={renderFooter}
      />
    </ImageBackground>
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
