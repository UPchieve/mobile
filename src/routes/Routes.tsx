import React, { useContext, useEffect, useRef, useState } from 'react'

import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { OnboardingStackNavigator } from "./OnboardingStackNavigator"
import * as Linking from 'expo-linking';
import { DrawerNavigator } from './DrawerNavigator';
import { AuthContext } from '../providers/AuthProvider';
import { AppLoading } from '../components/molecules/common/AppLoading';
import { useOrientation } from '../hooks/useOrientation';
import { PostSessionSurveySuccessScreen } from '../screens/feedback/post-session/PostSessionSurveySuccessScreen';

const prefix = Linking.createURL('/');

const linking = {
    prefixes: [prefix],
    config: {
        screens: {
            ResetPasswordStep3: 'setpassword/:token',
            VerifyAccount: 'verifyaccount/:email', //requires userId, firstName and email.
        }
    }
};

export const Routes = () => {

    const { user, refreshUser, loadingUser } = useContext(AuthContext);
    const { lockAsync } = useOrientation();
    const [navigationReady, setNavigationReady] = useState<boolean>(false);
    const navigationRef = useRef<NavigationContainerRef<{
        ResetPasswordStep3: unknown;
        VerifyAccount: unknown;
    }>>(null);

    useEffect(() => {
        //set rotation
        lockAsync('PORTRAIT');
        refreshUser();
    }, [])

    useEffect(() => {
        if (navigationReady) {
            if (!!user && !user?.verified) {
                navigationRef.current?.navigate('VerifyAccount', {
                    userId: user._id,
                    firstName: user.firstname
                });
            }
        }
    }, [user, navigationReady]);

    if (loadingUser) {
        return <AppLoading />
    }

    return <NavigationContainer ref={navigationRef} linking={linking} onReady={() => setNavigationReady(true)}>
        {!!user && user.verified ? <DrawerNavigator />
            : <OnboardingStackNavigator />}
    </NavigationContainer>
}


