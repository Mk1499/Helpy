import { View, Text, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import { Robot } from '../../assets/images';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.bannerCont}>
        <Image style={styles.img} source={Robot} />
        <Text style={styles.title}>AI Assistant</Text>
        <Text style={styles.subTitle}>Your intelligent companion</Text>
      </View>
    </View>
  );
}
