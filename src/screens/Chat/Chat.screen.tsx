import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  TextInput,
  Animated,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { Robot } from '../../assets/images';
import { Message, MessageRole, Model } from './types';
import { colors } from '../../utils/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useKeyboardAnimation } from 'react-native-keyboard-controller';
import BouncedWrapper from '../../components/BouncedWrapper/BouncedWrapper.comp';
import TypeWriter from 'react-native-typewriter';
import LoadingDots from 'react-native-loading-dots';
import useAIProvider from '../../utils/hooks/useAIProvider';

const mockMessage: Message = {
  id: '1',
  content:
    'Your name is Helpy, you are a helpful assistant that helps users with their queries and problems. Always be concise and clear in your answers.',
  timestamp: Date.now(),
  role: MessageRole.System,
};

export default function ChatScreen() {
  const { MODELS, callAIBotModel } = useAIProvider();

  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [activeMessage, setActiveMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([mockMessage]);
  const [isThinking, setIsThinking] = useState(false);

  const inputRef = React.useRef<TextInput>(null);
  const scrollRef = React.useRef<ScrollView>(null);

  const { goBack } = useNavigation();
  const { height } = useKeyboardAnimation();

  function renderModelSelector({ item }: { item: Model }) {
    return (
      <Pressable
        style={[
          styles.modelOption,
          selectedModel.code === item.code && styles.activeModelOption,
        ]}
        onPress={() => {
          setSelectedModel(item);
        }}
      >
        <Image style={styles.modelLogo} source={{ uri: item.logoURL }} />
        <Text style={styles.modelOptionText}>{item.name}</Text>
      </Pressable>
    );
  }

  function renderMessage(message: Message) {
    const contStyle =
      message?.role === MessageRole.User
        ? styles.userMsgCont
        : styles.aiMsgCont;

    const messageTextStyle =
      message?.role === MessageRole.User
        ? styles.userMsgText
        : styles.aiMsgText;

    if (message?.role === MessageRole.Assistant) {
      return (
        <View
          key={message?.id}
          style={contStyle}
          onLayout={() =>
            scrollRef.current?.scrollToEnd({
              animated: true,
            })
          }
        >
          <TypeWriter
            typing={1}
            maxDelay={50}
            minDelay={20}
            style={messageTextStyle}
          >
            {message?.content}
          </TypeWriter>
        </View>
      );
    }

    return (
      <View key={message?.id} style={contStyle}>
        <Text style={messageTextStyle}>{message?.content}</Text>
      </View>
    );
  }

  function renderMessages() {
    return (
      <ScrollView contentContainerStyle={styles.chatCont} ref={scrollRef}>
        {messages.slice(1).map(message => renderMessage(message))}
        {isThinking && (
          <View style={styles.loaderCont}>
            <LoadingDots size={10} />
          </View>
        )}
      </ScrollView>
    );
  }

  function renderWelcomeView() {
    return (
      <BouncedWrapper>
        <View style={styles.welcomeCont}>
          <Image style={styles.img} source={Robot} />
          <Text style={styles.welcomeText}>Welcome to Helpy AI</Text>
          <Text style={styles.welcomeDesc}>Your AI-powered assistant</Text>
        </View>
      </BouncedWrapper>
    );
  }

  function renderBody() {
    if (messages.length === 1) {
      return renderWelcomeView();
    } else {
      return renderMessages();
    }
  }

  async function handleSendMessage() {
    if (!activeMessage.trim()) {
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: activeMessage,
      timestamp: Date.now(),
      role: MessageRole.User,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    inputRef.current?.clear();
    setActiveMessage('');
    scrollRef.current?.scrollToEnd({ animated: true });
    await handleCallAIBotModel(updatedMessages);
  }

  async function handleCallAIBotModel(msgs: Message[]) {
    setIsThinking(true);
    callAIBotModel(messages, selectedModel.code)
      .then(({ response }) => {
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: response || 'Sorry, I could not generate a response.',
          timestamp: Date.now(),
          role: MessageRole.Assistant,
        };
        setMessages(prev => [...prev, aiMessage]);
      })
      ?.catch(err => {
        console.log('Error calling AI Bot Model: ', err);
        Alert.alert('Error', err);
      })
      .finally(() => {
        setIsThinking(false);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateY: height,
              },
            ],
          }}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={goBack}>
              <Text style={styles.backText}>{`< Back`}</Text>
            </TouchableOpacity>
            <Image style={styles.logo} source={Robot} />
            <Text style={styles.title}>
              Helpy
              <Text style={styles.focusedText}> AI </Text>
            </Text>
          </View>

          {renderBody()}

          <View style={styles.footerCont}>
            <FlatList
              data={MODELS}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.modelsList}
              renderItem={renderModelSelector}
            />

            <View style={styles.inputCont}>
              <TextInput
                style={styles.inputBox}
                placeholder="Type your message here..."
                placeholderTextColor={colors.subtitle}
                onChangeText={t => setActiveMessage(t)}
                multiline
                ref={inputRef}
              />
              <TouchableOpacity
                style={styles.sendBtn}
                onPress={handleSendMessage}
              >
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
