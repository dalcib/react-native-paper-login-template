import * as React from 'react'
import { View, StyleSheet, ViewStyle, Text, ScrollView } from 'react-native'
import { IconButton, Colors, useTheme } from 'react-native-paper'

const ButtonExample = () => {
  const { colors } = useTheme()

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[{ backgroundColor: colors.background }]}>
      <View style={styles.row}>
        <IconButton icon="camera" size={24} onPress={() => {}}></IconButton>
        <Text style={{ padding: 10 }}>Camera</Text>
      </View>
      <IconButton icon="lock" size={24} color={Colors.green500} onPress={() => {}} />
      <IconButton icon="camera" size={36} onPress={() => {}} />
      <IconButton
        icon="lock"
        size={36}
        onPress={() => {}}
        style={{ backgroundColor: Colors.lightGreen200 }}
      />
      <IconButton icon="heart" size={60} onPress={() => {}} />
      <View>
        {icons.map((name) => (
          <LigthIcon name={name} key={name} />
        ))}
      </View>
    </ScrollView>
  )
}

const LigthIcon = ({ name }) => (
  <View style={styles.row}>
    <IconButton icon={name} size={24} onPress={() => {}}></IconButton>
    <Text style={{ padding: 10 }}>{name}</Text>
  </View>
)

ButtonExample.title = 'Icon Button'

interface Style {
  container: ViewStyle
  row: ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    //flex: 1,
    //flexDirection: 'column',
    padding: 8,
  },
  row: {
    //flex: 1,
    flexDirection: 'row',
  },
})

export default ButtonExample

const icons = [
  ...new Set([
    'camera',
    'menu',
    'account-outline',
    'tune',
    'bookmark-outline',
    'pause',
    'arrow-left',
    'archive',
    'email',
    'label',
    'delete',
    'reply',
    'magnify',
    'dots-vertical',
    'folder',
    'eye',
    'image-album',
    'inbox',
    'heart',
    'shopping-music',
    'camera',
    'chevron-down',
    'city',
    'checkbox-marked',
    'minus-box',
    'checkbox-blank-outline',
    'check',
    'close-circle',
    'arrow-up',
    'chevron-left',
    'chevron-right',
    'eye-off',
    'cancel',
    'format-letter-case',
    'plus',
    'star',
    'bell',
    'lock',
    'chevron-up',
    'calendar',
    'wallet-giftcard',
    'equal',
    'information',
    'star-outline',
    'file-pdf',
    'undo',
    'redo',
    'content-cut',
    'content-copy',
    'content-paste',
    'close',
    'menu',
    'android',
    'format-italic',
    'format-bold',
    'format-underline',
    'format-color-text',
    'heart-outline',
  ]),
]
