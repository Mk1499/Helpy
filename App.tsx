/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './src/navigation/stacks/root.stack';
import { KeyboardProvider } from 'react-native-keyboard-controller';

LogBox.ignoreAllLogs();

function App() {
  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <StatusBar />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}

export default App;
