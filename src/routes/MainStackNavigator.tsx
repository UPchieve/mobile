import React from 'react';
import { WhiteBoardScreen } from '../screens/WhiteBoardScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DocEditorScreen } from '../screens/DocEditorScreen';
import { DefaultScreen } from '../screens/DefaultScreen';
import { ChatScreen } from '../screens/ChatScreen';

export type MainStackParamList = {
  Home: undefined;
  Whiteboard: undefined;
  DocEditor: undefined;
  Chat: undefined;
};

export const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={DefaultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Whiteboard"
        component={WhiteBoardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DocEditor"
        component={DocEditorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
};
