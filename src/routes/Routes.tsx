import React, { useContext, useEffect } from 'react'

import { NavigationContainer } from "@react-navigation/native"
import { OnboardingStackNavigator } from "./OnboardingStackNavigator"
import * as Linking from 'expo-linking';
import { MainStackNavigator } from './MainStackNavigator';
import { DrawerNavigator } from './DrawerNavigator';
import { PreSessionQuestionScreen } from '../screens/feedback/pre-session/PreSessionQuestionScreen';
import { AuthContext } from '../providers/AuthProvider';
import { View } from 'react-native';
import { AppLoading } from '../components/molecules/common/AppLoading';

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

    const { user, refreshUser, loadingUser } = useContext(AuthContext);

    useEffect(() => {
        refreshUser();
    }, [])

    if (loadingUser) {
        return <AppLoading />
    }

    return <NavigationContainer linking={linking}>
        {!!user ? <DrawerNavigator />
            : <OnboardingStackNavigator />}
    </NavigationContainer>
}
