import React from 'react';
import { AuthProvider } from './src/providers/AuthProvider';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';
import { AlertProvider } from './src/providers/AlertProvider';
import { Routes } from './src/routes/Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications


export default function App() {

  const [fontsLoaded] = useFonts({
    WorkSans: require('./assets/fonts/work-sans/WorkSans-Regular.ttf'),
    WorkSansBold: require('./assets/fonts/work-sans/WorkSans-Bold.ttf'),
    WorkSansMedium: require('./assets/fonts/work-sans/WorkSans-Medium.ttf')
  });

  if (!fontsLoaded) {
    return <View>
      <Text>Loading..</Text>
    </View>
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
