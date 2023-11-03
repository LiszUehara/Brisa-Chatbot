import React, { useState, useCallback } from 'react';
import { GiftedChat,Send, Day } from 'react-native-gifted-chat';
import { Text, View, StyleSheet, ImageBackground} from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import iconSerafin from '../../svg/iconSerafin.svg'; 
import { useNavigation } from '@react-navigation/native';
import API_KEY from '../../config';

const MAX_MESSAGES = 50;

const Chat= () => {

  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showDate, setShowDate] = useState(true);

const renderDay = (props) => {
  if (showDate) {
    setShowDate(false); 
    return (
      <View style={styles.dayContainer}>
        <Text style={styles.dayText}>
          {props.currentMessage.createdAt.toLocaleDateString()}
        </Text>
      </View>
    );
  }
};

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
    setIsTyping(true)
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{role: 'user', content: text}],
        },
        {
          headers: {
            'Authorization': API_KEY,
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
    }finally{
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
      renderDay={renderDay}
    />
        </ImageBackground>
  );
};

const styles = StyleSheet.create({

  digitando: {
    color: '#FF0000',
  },
  dayContainer: {
    backgroundColor: '#e6e6e6',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center', 
    marginTop: 20, 
    marginBottom: 10,
  },
  dayText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageBackground: {
    flex: 1,
    width: '100%', 
    height: '100%',
  },
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
