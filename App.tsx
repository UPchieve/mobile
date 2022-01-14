import React, { useEffect } from 'react';
import { AuthProvider } from './src/providers/AuthProvider';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';
import { SessionScreen } from './src/screens/SessionScreen';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/routes/MainStackNavigator';
import { AlertProvider } from './src/providers/AlertProvider';

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
    <AlertProvider>
      <AuthProvider>
        <NavigationContainer>
          <MainStackNavigator />
          {/* <FeedbackForm1Screen /> */}
          {/* <SessionScreen/> */}
        </NavigationContainer>
      </AuthProvider>
    </AlertProvider>
  );
}
