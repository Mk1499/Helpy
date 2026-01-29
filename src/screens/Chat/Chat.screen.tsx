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
import { Message, MessageRole } from './types';
import LoadingDots from 'react-native-loading-dots';
import useAIProvider from '../../utils/hooks/AIProvider.hook';
import BounceView from '../../components/BounceView.comp';

const mockMessages: Message[] = [
  {
    id: '1',
    role: MessageRole.SYSTEM,
    content: 'You are Helpy, a helpful AI assistant.',
    timestamp: new Date().toISOString(),
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [activeMessage, setActiveMessage] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);
  const { height } = useKeyboardAnimation();
  const { callAIBot } = useAIProvider();

  function handleSendMessage(content: string) {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: MessageRole.USER,
      content,
      timestamp: new Date().toISOString(),
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    handleAIRequest(newMessages);
    setActiveMessage('');
    inputRef.current?.clear();
    Keyboard.dismiss();
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 300);
  }

  async function handleAIRequest(msgs: Message[]) {
    setIsThinking(true);
    callAIBot(msgs)
      .then(({ response }) => {
        const botMsg: Message = {
          id: Math.random().toString(36).substring(7),
          role: MessageRole.ASSISTANT,
          content: response,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, botMsg]);
        setTimeout(() => {
          scrollRef.current?.scrollToEnd({ animated: true });
        }, 300);
      })
      .catch(() => {
        // console.log('ERR : ', err);
        // alert(err);
      })
      .finally(() => {
        setIsThinking(false);
      });
  }

  function renderMessage(message: Message) {
    const { id, role, content } = message ?? {};
    const contStyle =
      role === MessageRole.USER ? styles.userMsgCont : styles.aiMsgCont;
    const messageStyle =
      role === MessageRole.USER ? styles.userMsgText : styles.aiMsgText;

    return (
      <View style={contStyle} key={id}>
        <Text style={messageStyle}>{content}</Text>
      </View>
    );
  }

  function renderBody() {
    if (messages.length === 1) {
      return (
        <BounceView>
          <View style={styles.welcomeCont}>
            <Image source={Robot} style={styles.img} />
            <Text style={styles.welcomeText}>Welcome to Helpy AI</Text>
            <Text style={styles.welcomDesc}>How can I help you?</Text>
          </View>
        </BounceView>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.chatCont} ref={scrollRef}>
          {messages.slice(1).map(message => renderMessage(message))}
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
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.content]}>
        <Animated.View style={{ flex: 1, transform: [{ translateY: height }] }}>
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
    </SafeAreaView>
  );
}
