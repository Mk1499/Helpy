import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  TextInput,
  Animated,
} from 'react-native';
import React, { use, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { Robot } from '../../assets/images';
import { Model } from './types';
import { colors } from '../../utils/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useKeyboardAnimation } from 'react-native-keyboard-controller';

const MODELS = [
  {
    name: 'gpt-3.5-turbo',
    code: 'GPT-3.5 1',
    logoURL:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png',
  },

  {
    name: 'gpt-3.5-turbo',
    code: 'GPT-3.5 2',
    logoURL:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png',
  },
  {
    name: 'gpt-3.5-turbo',
    code: 'GPT-3.5 3',
    logoURL:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png',
  },
];
export default function ChatScreen() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [activeMessage, setActiveMessage] = useState<string>('');

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

          <View>
            <View style={styles.welcomeCont}>
              <Image style={styles.img} source={Robot} />
              <Text style={styles.welcomeText}>Welcome to Helpy AI</Text>
              <Text style={styles.welcomeDesc}>Your AI-powered assistant</Text>
            </View>
          </View>

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
              />
              <TouchableOpacity style={styles.sendBtn}>
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
