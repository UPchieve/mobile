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
import { StackRouter } from '@react-navigation/native';
import { RequestDeleteAccountScreen } from '../screens/profile/RequestDeleteAccountScreen';

export type ProfileParamList = {
    ProfileIndex: undefined,
    Settings: undefined,
    ProfileDeleteAccount: undefined,
    ProfileTellUsMore: undefined,
    ProfileDeleteReceived: undefined;
}

export const ProfileStackNavigator = () => {
    const Stack = createNativeStackNavigator<ProfileParamList>();
    return <Stack.Navigator initialRouteName='ProfileIndex'
        defaultScreenOptions={{
            contentStyle: {
                backgroundColor: Colors.white
            },
            // headerStyle: { backgroundColor: 'transparent' },
            headerBackTitleVisible: false,
            headerBackImageSource: ImageIndex.icons.goBack,
            headerTintColor: Colors.black,
        }}
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
            name='Settings'
            component={SettingsScreen}
        />
        <Stack.Screen
            name='ProfileDeleteAccount'
            component={DeleteAccountScreen}
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
            }}
        />
        <Stack.Screen
            name='ProfileTellUsMore'
            component={TellUsMoreScreen}
            options={{
                headerTitle: ''
            }}
        />
        <Stack.Screen
            name='ProfileDeleteReceived'
            component={RequestDeleteAccountScreen}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>
}
