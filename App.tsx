import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/routes/MainStackNavigator';
import { LoginScreen } from './src/screens/LoginScreen';
import { DeviceMotion } from "expo-sensors";
import * as ScreenOrientation from 'expo-screen-orientation';
import { SocketProvider } from './src/providers/SocketProvider';
import axios from 'axios';
import { authService } from './src/services/authService';
import { FeedbackForm1Screen } from './src/screens/FeedbackForm1Screen';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';
import { ChatScreen } from './src/screens/ChatScreen';

export default function App() {


  useEffect(() => {
    // axios.get('https://demo.upchieve.org/auth/logout').then(() => console.log('logged out'));
    // axios.get('https://demo.upchieve.org/api/user').then((us) => console.log(us));
    // authService.login().then(() => console.log('logged'));
  }, []);

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
    <SocketProvider>
      <NavigationContainer>
      <MainStackNavigator />
       {/* <FeedbackForm1Screen /> */}
      </NavigationContainer>
    </SocketProvider>
  );
}
