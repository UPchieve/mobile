import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultScreen } from '../screens/DefaultScreen';
import { SessionScreen } from '../screens/SessionScreen';
import { PostSessionSurveyScreen } from '../screens/feedback/post-session/PostSessionSurveyScreen';
import { PostSessionSurveyCollegeScreen } from '../screens/feedback/post-session/PostSessionSurveyCollegeScreen';
import { PostSessionSurveySuccessScreen } from '../screens/feedback/post-session/PostSessionSurveySuccessScreen';
import { ReportSessionScreen } from '../screens/feedback/ReportSessionScreen';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { PreSessionQuestionScreen } from '../screens/feedback/pre-session/PreSessionQuestionScreen';
import {ImageIndex} from "../../assets/ImageIndex";
import {Colors} from "../../assets/Colors";


export type MainStackParamList = {
  Home: undefined;
  Session: { sessionId: string, }
  PostSessionSurvey: undefined,
  PostSessionSurveyCollege: undefined,
  PostSessionSurveySuccess: undefined,
  ReportSessionScreen: undefined,
  DashboardScreen: undefined,
  PreSessionQuestionScreen: {
    sessionType: string,
    sessionSubTopic: string,
  }
};

export const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        headerBackImageSource: ImageIndex.icons.goBack,
        headerTintColor: Colors.black,
        headerBackTitleVisible: false
  }}
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
        options={{ headerShown: false, contentStyle: {backgroundColor: 'white'} }}
      />
      <Stack.Screen
        name='PostSessionSurveyCollege'
        component={PostSessionSurveyCollegeScreen}
        options={{ headerShown: false, contentStyle: {backgroundColor: 'white'} }}
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
      <Stack.Screen
        name='DashboardScreen'
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PreSessionQuestionScreen'
        component={PreSessionQuestionScreen}
        options={{ headerShown: true, headerTitle: '' }}
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
