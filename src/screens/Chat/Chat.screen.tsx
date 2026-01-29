import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Keyboard,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { Robot } from '../../assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../utils/constants/colors';
import { useKeyboardAnimation } from 'react-native-keyboard-controller';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  const { height, progress } = useKeyboardAnimation();

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

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
          <View style={styles.header}>
            <Text style={styles.title}>Helpy AI</Text>
          </View>
          {renderBody()}
          <View style={styles.inputCont}>
            <TextInput
              style={styles.inputBox}
              placeholder="Type your message here"
              placeholderTextColor={colors.subtitle}
            />
            <Pressable style={styles.sendBtn}>
              <Text style={styles.sendText}>Send</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
