import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './src/navigation/stacks/root.stack';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
