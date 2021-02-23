import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { Appbar, Avatar, useTheme } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

//import { BottomTabs } from './bottomTabs';
import Dashboard from './../screens/Dashboard'
import { StackNavigatorParamlist } from './types'

const Stack = createStackNavigator<StackNavigatorParamlist>()

export const StackNavigator = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="FeedList"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name

          return (
            <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                  console.log('fffffffffffffffffff')
                  ;((navigation as any) as DrawerNavigationProp<{}>).openDrawer()
                }}>
                <Avatar.Icon size={40} icon="menu" />
              </TouchableOpacity>

              <Appbar.Content
                title={title}
                titleStyle={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                }}
              />
            </Appbar.Header>
          )
        },
      }}>
      {/*       <Stack.Screen
        name="FeedList"
        component={BottomTabs}
        options={({ route }) => {
          console.log('!@# options', { route });
          const routeName = route.state
            ? route.state.routes[route.state.index].name
            : 'Feed';
          return { headerTitle: routeName };
        }}
      /> */}
      <Stack.Screen name="Details" component={Dashboard} options={{ headerTitle: 'Dashboard!' }} />
    </Stack.Navigator>
  )
}
