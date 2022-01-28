import React from 'react'

import { NavigationContainer } from "@react-navigation/native"
import { OnboardingStackNavigator } from "./OnboardingStackNavigator"
import * as Linking from 'expo-linking';
import { MainStackNavigator } from './MainStackNavigator';

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
