import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/Home.screen';
import ScreenNames from '../ScreenNames';
import ChatScreen from '../../screens/Chat/Chat.screen';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Stack.Screen name={ScreenNames.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={ScreenNames.ChatScreen} component={ChatScreen} />
    </Stack.Navigator>
  );
}
