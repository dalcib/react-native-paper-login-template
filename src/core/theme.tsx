import React, { createContext, useState, useCallback, useMemo } from 'react'
import {
  Theme,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'

declare global {
  namespace ReactNativePaper {
    interface ThemeFonts {
      superLight: ThemeFont
    }
    interface ThemeColors {
      customColor: string
      secondary?: string
    }
    interface ThemeAnimation {
      customProperty: number
    }
    interface Theme {
      userDefinedThemeProperty: string
    }
  }
}

const CustomDefaultTheme: ReactNativePaper.Theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    customColor: '#BADA55', //
    // login-template
    primary: '#600EE6',
    secondary: '#414757',
    error: '#f13a59',
  },
  // Default example
  fonts: {
    ...PaperDefaultTheme.fonts,
    superLight: { ...PaperDefaultTheme.fonts['light'] },
  },
  userDefinedThemeProperty: '',
  animation: {
    ...PaperDefaultTheme.animation,
    customProperty: 1,
  },
}
const CustomDarkTheme: ReactNativePaper.Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    //@ts-ignore
    customColor: '#BADA55', //
  },
  // Dark example
  fonts: {
    ...PaperDarkTheme.fonts,
    superLight: { ...PaperDarkTheme.fonts['light'] },
  },
  userDefinedThemeProperty: '',
  animation: {
    ...PaperDarkTheme.animation,
    customProperty: 1,
  },
}

export const theme = CustomDefaultTheme

export const ThemeContext = createContext({
  toggleTheme: () => {},
  isThemeDark: false,
  theme: CustomDefaultTheme,
})

export const ThemeProvider = ({ children }) => {
  const [isThemeDark, setIsThemeDark] = useState(false)

  const theme = isThemeDark ? CustomDarkTheme : CustomDefaultTheme

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark)
  }, [isThemeDark])

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      theme,
    }),
    [toggleTheme, isThemeDark, theme]
  )

  /////@ts-ignore
  return <ThemeContext.Provider value={preferences}>{children}</ThemeContext.Provider>
}
