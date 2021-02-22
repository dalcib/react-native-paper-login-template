import React from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import 'setimmediate';
import App from './navigators/Root';
import { theme } from './core/theme';

const Main = () => (
  <Provider theme={theme}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>
);

export default Main;
