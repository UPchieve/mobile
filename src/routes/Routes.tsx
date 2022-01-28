import React from 'react'

import { NavigationContainer } from "@react-navigation/native"
import { OnboardingStackNavigator } from "./OnboardingStackNavigator"
import * as Linking from 'expo-linking';
import { MainStackNavigator } from './MainStackNavigator';
import {ContactUsScreen} from "../screens/contact/ContactUsScreen";
import {MessageSentScreen} from "../screens/onboarding/register/MessageSentScreen";

const prefix = Linking.createURL('/');

const linking = {
    prefixes: [prefix],
    config: {
        screens: {
            ResetPasswordStep3: 'setpassword/:token'
        }
    }
};

export const Routes = () => {
    return <NavigationContainer linking={linking}>
        {/* <MainStackNavigator /> */}
        <OnboardingStackNavigator />
    </NavigationContainer>
}
