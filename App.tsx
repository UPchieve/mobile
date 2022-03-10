import React, { useEffect } from 'react';
import { AuthProvider } from './src/providers/AuthProvider';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';
import { AlertProvider } from './src/providers/AlertProvider';
import { Routes } from './src/routes/Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { config } from './config';
import { useAutoUpdateAppHandler } from './src/hooks/useAutoUpdateAppHandler';

export default function App() {
  useAutoUpdateAppHandler({
    versionUrl: config.versionUrl,
    versionRelease: config.versionRelease,
    appName: 'UPchieve',
  });

  const [fontsLoaded] = useFonts({
    WorkSans: require('./assets/fonts/work-sans/WorkSans-Regular.ttf'),
    WorkSansBold: require('./assets/fonts/work-sans/WorkSans-Bold.ttf'),
    WorkSansMedium: require('./assets/fonts/work-sans/WorkSans-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AlertProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </AlertProvider>
    </SafeAreaProvider>
  );
}
function getVersionApp() {
  throw new Error('Function not implemented.');
}
