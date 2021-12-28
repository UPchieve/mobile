import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/routes/MainStackNavigator';
import { LoginScreen } from './src/screens/LoginScreen';

export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
      {/* <LoginScreen/> */}
    </NavigationContainer>
  );
}
