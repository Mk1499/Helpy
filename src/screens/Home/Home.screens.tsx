import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import styles from './styles';
import { banner, chatbot } from '../../assets/images';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <TouchableOpacity style={styles.ctaBtn}>
        <Text style={styles.ctaText}>Start Chat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
