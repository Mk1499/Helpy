import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import { banner, chatbot } from '../../assets/images';
import { LinearGradient } from 'react-native-linear-gradient';
import { colors } from '../../utils/constants/colors';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../navigation/ScreenNames';

export default function HomeScreen() {
  const { navigate } = useNavigation<any>();

  function handleNavToChat() {
    navigate(ScreenNames.ChatScreen);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <Image style={styles.headLogo} source={chatbot} />
        <Text style={styles.headTitle}>Helpy AI</Text>
      </View>
      <View style={styles.bodyCont}>
        <Image style={styles.banner} source={banner} />
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.appName}>Helpy AI</Text>
        <Text style={styles.desc}>Start chatting with Helpy AI Today !</Text>
      </View>
      <TouchableOpacity style={styles.ctaBtn} onPress={handleNavToChat}>
        <LinearGradient
          style={styles.btnGredient}
          colors={[colors.primary, colors.gradient2]}
          angle={45}
        >
          <Text style={styles.ctaText}>Start Chat</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
