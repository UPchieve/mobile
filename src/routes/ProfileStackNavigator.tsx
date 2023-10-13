import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileScreen } from '../screens/profile/ProfileScreen'
import { SettingsScreen } from '../screens/profile/SettingsScreen'
import { Colors } from '../../assets/Colors'
import { DeleteAccountScreen } from '../screens/profile/DeleteAccountScreen'
import { TellUsMoreScreen } from '../screens/profile/TellUsMoreScreen'
import { ImageIndex } from '../../assets/ImageIndex'
import { RequestDeleteAccountScreen } from '../screens/profile/RequestDeleteAccountScreen'
import { ResetPasswordStep1Screen } from '../screens/onboarding/login/ResetPasswordStep1'
import { ResetPasswordStep2Screen } from '../screens/onboarding/login/ResetPasswordStep2'

export type ProfileParamList = {
  ProfileIndex: undefined
  Settings: undefined
  ProfileDeleteAccount: undefined
  ProfileTellUsMore: undefined
  ProfileDeleteReceived: undefined
  ResetPasswordStep1: undefined
  ResetPasswordStep2: undefined
}

export const ProfileStackNavigator = () => {
  const Stack = createNativeStackNavigator<ProfileParamList>()
  return (
    <Stack.Navigator
      initialRouteName="ProfileIndex"
      defaultScreenOptions={{
        contentStyle: {
          backgroundColor: Colors.white,
        },
        // headerStyle: { backgroundColor: 'transparent' },
        headerBackTitleVisible: false,
        headerBackImageSource: {
          uri: ImageIndex.icons.goBack,
          width: 15,
          height: 15,
        },
        headerTintColor: Colors.black,
      }}
      screenOptions={{
        contentStyle: {
          backgroundColor: Colors.white,
        },
        // headerStyle: { backgroundColor: 'transparent' },
        headerBackTitleVisible: false,
        headerTintColor: Colors.black,
      }}
    >
      <Stack.Screen
        name="ProfileIndex"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="ProfileDeleteAccount"
        component={DeleteAccountScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ProfileTellUsMore"
        component={TellUsMoreScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="ProfileDeleteReceived"
        component={RequestDeleteAccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPasswordStep1"
        options={{ headerTitle: '' }}
        component={ResetPasswordStep1Screen}
      />
      <Stack.Screen
        name="ResetPasswordStep2"
        options={{ headerTitle: '' }}
        component={ResetPasswordStep2Screen}
      />
    </Stack.Navigator>
  )
}
