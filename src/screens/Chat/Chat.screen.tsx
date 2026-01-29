import {
  View,
  Text,
  Image,
  Pressable,
  Keyboard,
  TextInput,
  Animated,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useRef, useState } from 'react';
import styles from './styles';
import { Robot } from '../../assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../utils/constants/colors';
import { useKeyboardAnimation } from 'react-native-keyboard-controller';
import { Message } from './types';
import LoadingDots from 'react-native-loading-dots';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeMessage, setActiveMessage] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const inputRef = useRef<TextInput>(null);
  const { height } = useKeyboardAnimation();

  function handleSendMessage(content: string) {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setActiveMessage('');
    inputRef.current?.clear();
    handleAIRequest(content);
  }

  function handleAIRequest(content: string) {
    const botMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: 'bot',
      content: 'Thinking...',
      timestamp: new Date().toISOString(),
    };

    setIsThinking(true);
    setTimeout(() => {
      setMessages(prev => [...prev, botMsg]);
      setIsThinking(false);
    }, 1000);
  }

  function renderMessage(message: Message) {
    const { id, role, content } = message ?? {};
    const contStyle = role === 'user' ? styles.userMsgCont : styles.aiMsgCont;
    const messageStyle =
      role === 'user' ? styles.userMsgText : styles.aiMsgText;

    return (
      <View style={contStyle} key={id}>
        <Text style={messageStyle}>{content}</Text>
      </View>
    );
  }

  function renderBody() {
    if (messages.length === 0) {
      return (
        <View style={styles.welcomeCont}>
          <Image source={Robot} style={styles.img} />
          <Text style={styles.welcomeText}>Welcome to Helpy AI</Text>
          <Text style={styles.welcomDesc}>How can I help you?</Text>
        </View>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.chatCont}>
          {messages.map(message => renderMessage(message))}
          {isThinking && (
            <View style={styles.loaderCont}>
              <LoadingDots
                dots={4}
                colors={[
                  colors.primary,
                  colors.gradient2,
                  colors.primary,
                  colors.gradient2,
                ]}
                size={15}
                animationType="timing"
                animationOptions={{ tension: 100, friction: 15 }}
              />
            </View>
          )}
        </ScrollView>
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <Animated.View
            style={{ flex: 1, transform: [{ translateY: height }] }}
          >
            <View style={styles.header}>
              <Image source={Robot} style={styles.logo} />
              <Text style={styles.title}>
                <Text style={styles.focusedText}> Helpy </Text>
                AI
              </Text>
            </View>
            {renderBody()}
            <View style={styles.inputCont}>
              <TextInput
                ref={inputRef}
                style={styles.inputBox}
                placeholder="Type your message here"
                placeholderTextColor={colors.subtitle}
                onChangeText={t => setActiveMessage(t)}
                onSubmitEditing={t => handleSendMessage(t.nativeEvent.text)}
                multiline
              />
              <TouchableOpacity
                style={styles.sendBtn}
                onPress={() => handleSendMessage(activeMessage)}
                disabled={!activeMessage || isThinking}
              >
                {isThinking ? (
                  <ActivityIndicator color={'#fff'} />
                ) : (
                  <Text style={styles.sendText}>Send</Text>
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
