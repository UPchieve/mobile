import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ContactUsScreen } from '../screens/contact/ContactUsScreen';
import { MessageSentScreen } from '../screens/onboarding/register/MessageSentScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ContactUsParamList = {
    DrawerContactUs: undefined,
    MessageSent: { nextRoute: string },
}

export const ContactUsStackNavigator = () => {
    const Stack = createNativeStackNavigator<ContactUsParamList>();
    return <Stack.Navigator initialRouteName='DrawerContactUs'>
        <Stack.Screen
            name='DrawerContactUs'
            options={{
                headerShown: false
            }}
            children={(props) => <SafeAreaView><ContactUsScreen {...props} /></SafeAreaView>} />
        <Stack.Screen
            name='MessageSent'
            component={MessageSentScreen}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
}