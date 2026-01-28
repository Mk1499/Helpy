import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/Home.screens';
import ScreenNames from '../ScreenNames';
import ChatScreen from '../../screens/Chat/Chat.screen';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ScreenNames.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={ScreenNames.ChatScreen} component={ChatScreen} />
    </Stack.Navigator>
  );
}
