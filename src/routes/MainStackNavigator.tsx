import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultScreen } from '../screens/DefaultScreen';
import { SessionScreen } from '../screens/SessionScreen';
import { PostSessionSurveyScreen } from '../screens/feedback/PostSessionSurveyScreen';
import { PostSessionSurveyCollegeScreen } from '../screens/feedback/PostSessionSurveyCollegeScreen';
import { PostSessionSurveySuccessScreen } from '../screens/feedback/PostSessionSurveySuccessScreen';
import { ReportSessionScreen } from '../screens/feedback/ReportSessionScreen';


export type MainStackParamList = {
  Home: undefined;
  Session: { sessionId: string, }
  PostSessionSurvey: undefined,
  PostSessionSurveyCollege: undefined,
  PostSessionSurveySuccess: undefined,
  ReportSessionScreen: undefined,
  // Whiteboard: { sessionId: string, };
  // DocEditor: { sessionId: string, };
  // Chat: { sessionId: string, };
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
        name='Session'
        component={SessionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PostSessionSurvey'
        component={PostSessionSurveyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PostSessionSurveyCollege'
        component={PostSessionSurveyCollegeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PostSessionSurveySuccess'
        component={PostSessionSurveySuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ReportSessionScreen'
        component={ReportSessionScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Whiteboard"
        component={WhiteBoardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DocEditor"
        component={DocEditorScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
      /> */}
    </Stack.Navigator>
  );
};
