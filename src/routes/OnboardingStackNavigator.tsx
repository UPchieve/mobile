import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { LoginScreen } from '../screens/onboarding/login/LoginScreen';

export type OnboardingStackParamList = {
    Welcome: undefined;
    Login: undefined;
};

export const OnboardingStackNavigator = () => {
    const Stack = createNativeStackNavigator<OnboardingStackParamList>();
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
        >
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
        </Stack.Navigator>
    );
};
