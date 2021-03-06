import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import 'setimmediate'
import App from './navigators/Root'
import { ThemeProvider, ThemeContext } from './core/theme'

const Main = () => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ toggleTheme, isThemeDark, theme }) => (
          <PaperProvider theme={theme}>
            <NavigationContainer
              linking={{ enabled: true, prefixes: ['http://127.0.0.1:5501/public'] }}
              //@ts-ignore
              theme={theme}>
              <App />
            </NavigationContainer>
          </PaperProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  )
}

export default Main
