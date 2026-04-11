import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import { banner, chatbot } from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../navigation/ScreenNames';

export default function HomeScreen() {
  const { navigate } = useNavigation();

  function gotoChat() {
    navigate(ScreenNames.ChatScreen);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <Image style={styles.headLogo} source={chatbot} />
        <Text style={styles.headerTitle}>Helpy AI</Text>
      </View>

      <View style={styles.bodyCont}>
        <Image style={styles.banner} source={banner} />
        <Text style={styles.title}>Welcome To</Text>
        <Text style={styles.appName}>Helpy AI</Text>
        <Text style={styles.desc}>Your AI-powered assistant</Text>
      </View>

      <TouchableOpacity style={styles.ctaBtn} onPress={gotoChat}>
        <LinearGradient
          colors={['#14bb49', '#32b35a']}
          style={styles.btnGredient}
          angle={45}
        >
          <Text style={styles.ctaText}>Start Chat</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
