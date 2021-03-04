import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from '../screens'
import { DrawerNavigator } from './Drawer'
import Examples from './Example'

const RootStack = createStackNavigator()

const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Dashboard" component={DrawerNavigator} />
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <RootStack.Screen name="Examples" component={Examples} />
    </RootStack.Navigator>
  )
}

export default RootStackScreen
