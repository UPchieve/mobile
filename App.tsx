import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/routes/MainStackNavigator';
import { LoginScreen } from './src/screens/LoginScreen';
import {DeviceMotion} from "expo-sensors";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {




  return (
    <NavigationContainer>
      <MainStackNavigator />
      {/* <LoginScreen/> */}
    </NavigationContainer>
  );
}
