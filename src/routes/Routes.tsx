import React, { useContext, useEffect, useState } from 'react'

import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { OnboardingStackNavigator } from "./OnboardingStackNavigator"
import * as Linking from 'expo-linking';
import { DrawerNavigator } from './DrawerNavigator';
import { AuthContext } from '../providers/AuthProvider';
import { AppLoading } from '../components/molecules/common/AppLoading';
import { useOrientation } from '../hooks/useOrientation';

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

    useEffect(() => {
        //set rotation
        lockAsync();
        refreshUser();
    }, [])

    useEffect(() => {
        if (!!user && !user?.verified && navigationReady) {
            console.log('entre aca', user.email);
            let redirectUrl = Linking.createURL(`verifyaccount/${user.email}`, {
                queryParams: {
                    userId: user._id,
                    firstName: user.firstname,
                },
            });
            Linking.openURL(redirectUrl);
        }
    }, [user, navigationReady]);

    if (loadingUser) {
        return <AppLoading />
    }

    return <NavigationContainer linking={linking} onReady={() => setNavigationReady(true)}>
        {!!user && user.verified ? <DrawerNavigator />
            : <OnboardingStackNavigator />}
    </NavigationContainer>
}


