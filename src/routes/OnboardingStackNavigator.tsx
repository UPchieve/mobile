import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { LoginScreen } from '../screens/onboarding/login/LoginScreen';
import { Colors } from '../../assets/Colors';
import { ResetPasswordStep1Screen, } from '../screens/onboarding/login/ResetPasswordStep1';
import { ResetPasswordStep2Screen } from '../screens/onboarding/login/ResetPasswordStep2';
import { ResetPasswordStep3Screen } from '../screens/onboarding/login/ResetPasswordStep3';
import { ResetPasswordStep4Screen } from '../screens/onboarding/login/ResetPasswordStep4';
import { RegisterScreen } from '../screens/onboarding/register/RegisterScreen';
import { EligibleResultScreen } from '../screens/onboarding/register/EligibleResultScreen';

export type OnboardingStackParamList = {
    Welcome: undefined;
    Login: undefined;
    ResetPasswordStep1: undefined;
    ResetPasswordStep2: { email: string };
    ResetPasswordStep3: { token: string };
    ResetPasswordStep4: undefined;
    Register: undefined;
    EligibleResult: { eligible: boolean };
};

export const OnboardingStackNavigator = () => {
    const Stack = createNativeStackNavigator<OnboardingStackParamList>();
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                contentStyle: {
                    backgroundColor: Colors.white
                }
            }}
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
            <Stack.Screen
                name="ResetPasswordStep1"
                options={{ headerTitle: 'Reset password' }}
                component={ResetPasswordStep1Screen}
            />
            <Stack.Screen
                name="ResetPasswordStep2"
                options={{ headerTitle: 'Reset password' }}
                component={ResetPasswordStep2Screen}
            />
            <Stack.Screen
                name="ResetPasswordStep3"
                options={{ headerTitle: 'Reset password' }}
                component={ResetPasswordStep3Screen}
            />
            <Stack.Screen
                name='ResetPasswordStep4'
                options={{ headerShown: false }}
                component={ResetPasswordStep4Screen}
            />
            <Stack.Screen
                name="Register"
                options={{ headerTitle: '' }}
                component={RegisterScreen}
            />
            <Stack.Screen
                name="EligibleResult"
                options={({route}) => ({ headerTitle: '', headerShown: !route.params.eligible})}
                component={EligibleResultScreen}
            />
        </Stack.Navigator>
    );
};
