import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Keyboard,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { Robot } from '../../assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../utils/constants/colors';
import { useKeyboardAnimation } from 'react-native-keyboard-controller';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  const { height } = useKeyboardAnimation();

  function renderMessage(message) {
    return (
      <View>
        <Text>{message}</Text>
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
        <FlatList
          data={messages}
          renderItem={({ item }) => renderMessage(item)}
        />
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
              <Text style={styles.title}>
                <Text style={styles.focusedText}> Helpy </Text>
                AI
              </Text>
            </View>
            {renderBody()}
            <View style={styles.inputCont}>
              <TextInput
                style={styles.inputBox}
                placeholder="Type your message here"
                placeholderTextColor={colors.subtitle}
              />
              <TouchableOpacity style={styles.sendBtn}>
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
