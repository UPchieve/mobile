import React, { useContext, useEffect, useRef, useState } from 'react'

import { LinkingOptions, NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { OnboardingStackNavigator } from "./OnboardingStackNavigator"
import * as Linking from 'expo-linking';
import { DrawerNavigator } from './DrawerNavigator';
import { AuthContext } from '../providers/AuthProvider';
import { AppLoading } from '../components/molecules/common/AppLoading';
import { useOrientation } from '../hooks/useOrientation';
import messaging from '@react-native-firebase/messaging';
import { useNotificationHandler } from '../hooks/useNotificationHandler';
import { NotificationScreen } from '../screens/dashboard/NotificationScreen';


const prefix = Linking.createURL('/');
const linking: LinkingOptions<any> | undefined = {
    prefixes: [prefix],
    config: {
        screens: {
            ResetPasswordStep3: 'setpassword/:token',
            VerifyAccount: 'verifyaccount/:email', //requires userId, firstName and email.
            Dashboard: {
                screens: {
                    Session: {
                        path: 'session/:sessionId',
                    }
                }
            },
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

    useNotificationHandler(navigationReady);

    useEffect(() => {
        //com.upchieve.app://contactus
        if (navigationReady) {
            if (!!user && !user?.verified) {
                navigationRef.current?.navigate('VerifyAccount', {
                    userId: user._id,
                    firstName: user.firstname,
                    email: user.email,
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


