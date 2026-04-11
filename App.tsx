import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './src/navigation/stacks/root.stack';

import { KeyboardProvider } from 'react-native-keyboard-controller';

function App(): React.JSX.Element {
  return (
    <KeyboardProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </KeyboardProvider>
  );
}

export default App;
