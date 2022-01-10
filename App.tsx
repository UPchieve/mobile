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

export default function App() {


  useEffect(() => {
    // axios.get('https://demo.upchieve.org/auth/logout').then(() => console.log('logged out'));
    // axios.get('https://demo.upchieve.org/api/user').then((us) => console.log(us));
    // authService.login().then(() => console.log('logged'));
  }, []);

  return (
    <SocketProvider>
      {/* <NavigationContainer> */}
        {/* <MainStackNavigator /> */}
        <FeedbackForm1Screen/>
      {/* </NavigationContainer> */}
    </SocketProvider>
  );
}
