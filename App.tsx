import React from 'react'
import { AuthProvider } from './src/providers/AuthProvider'
import { useFonts } from 'expo-font'
import { Text, View } from 'react-native'
import { AlertProvider } from './src/providers/AlertProvider'
import { Routes } from './src/routes/Routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { config, gleapConfig } from './config'
import { useAutoUpdateAppHandler } from './src/hooks/useAutoUpdateAppHandler'
import Gleap from 'react-native-gleapsdk'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'

export default function App() {
  useAutoUpdateAppHandler({
    versionUrl: config.versionUrl,
    versionRelease: config.versionRelease,
    appName: 'UPchieve',
  })

  Gleap.initialize(gleapConfig.token)

  const [fontsLoaded] = useFonts({
    WorkSans: require('./assets/fonts/work-sans/WorkSans-Regular.ttf'),
    WorkSansBold: require('./assets/fonts/work-sans/WorkSans-Bold.ttf'),
    WorkSansMedium: require('./assets/fonts/work-sans/WorkSans-Medium.ttf'),
  })

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <AlertProvider>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </AlertProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  )
}
function getVersionApp() {
  throw new Error('Function not implemented.')
}
