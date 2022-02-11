import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ContactUsScreen } from '../screens/contact/ContactUsScreen';
import { MessageSentScreen } from '../screens/onboarding/register/MessageSentScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { Colors } from '../../assets/Colors';
import { DeleteAccountScreen } from '../screens/profile/DeleteAccountScreen';
import { TellUsMoreScreen } from '../screens/profile/TellUsMoreScreen';
import { ImageIndex } from '../../assets/ImageIndex';

export type ProfileParamList = {
    ProfileIndex: undefined,
    ProfileSettings: undefined,
    ProfileDeleteAccount: undefined,
    ProfileTellUsMore: undefined,
}

export const ProfileStackNavigator = () => {
    const Stack = createNativeStackNavigator<ProfileParamList>();
    return <Stack.Navigator initialRouteName='ProfileIndex'
        screenOptions={{
            contentStyle: {
                backgroundColor: Colors.white
            },
            // headerStyle: { backgroundColor: 'transparent' },
            headerBackTitleVisible: false,
            headerBackImageSource: ImageIndex.icons.goBack,
            headerTintColor: Colors.black,
        }}
    >
        <Stack.Screen
            name='ProfileIndex'
            component={ProfileScreen}
            options={{
                headerShown: false
            }} />
        <Stack.Screen
            name='ProfileSettings'
            component={SettingsScreen}
        />
        <Stack.Screen
            name='ProfileDeleteAccount'
            component={DeleteAccountScreen}
            options={{
                headerTitle: '',
                headerStyle: {backgroundColor: 'transparent'}
            }}
        />
        <Stack.Screen
            name='ProfileTellUsMore'
            component={TellUsMoreScreen}
            options={{
                headerTitle: ''
            }}
        />
    </Stack.Navigator>
}