import * as React from 'react'
import { Appbar } from 'react-native-paper'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import ExampleList, { examples } from '../rnpex/ExampleList'

const Stack = createStackNavigator()

export default function Examples() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ navigation, scene, previous }) => (
          <Appbar.Header>
            {previous ? (
              <Appbar.BackAction onPress={() => navigation.goBack()} />
            ) : (navigation as any).openDrawer ? (
              <Appbar.Action
                icon="menu"
                onPress={() =>
                  ((navigation as any) as DrawerNavigationProp<Record<string, object>>).openDrawer()
                }
              />
            ) : null}
            <Appbar.Content title={scene.descriptor.options.title} />
          </Appbar.Header>
        ),
      }}>
      <Stack.Screen name="Home" component={ExampleList} options={{ title: 'Examples' }} />
      {(Object.keys(examples) as (keyof typeof examples)[]).map((id) => (
        <Stack.Screen
          key={id}
          name={id}
          component={examples[id]}
          options={{ title: examples[id].title }}
        />
      ))}
    </Stack.Navigator>
  )
}
