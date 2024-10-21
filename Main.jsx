import { StyleSheet, Text, View } from 'react-native'
import { Screen } from './components/Screen'
import { StatusBar } from 'expo-status-bar'

export function Main() {
  return (
    <Screen>
      <View>
        <StatusBar style="light" />
      </View>
    </Screen>
  )
}
