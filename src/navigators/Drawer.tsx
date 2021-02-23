import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
//import {  DefaultTheme, DarkTheme} from '@react-navigation/native';
//import { useTheme } from 'react-native-paper';

import { DrawerContent } from './../screens/DrawerContent'
import { StackNavigator } from './Stack'

const Drawer = createDrawerNavigator()

export const DrawerNavigator = () => {
  /* const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  <NavigationContainer theme={navigationTheme}> */

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={StackNavigator} />
    </Drawer.Navigator>
  )
}
