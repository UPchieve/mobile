import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { OnboardingStackNavigator } from "./OnboardingStackNavigator";
import { Dimensions, View } from 'react-native';
import { UserInfo } from '../components/molecules/dashboard/UserInfo';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { MainStackNavigator } from './MainStackNavigator';



export type DrawerParamList = {
    Home: undefined;
    Dashboard: undefined;
}

const Drawer = createDrawerNavigator<DrawerParamList>();
export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName='Dashboard'
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                drawerStyle: {
                    width: '100%',
                }
            }}
            drawerContent={({navigation}) => <UserInfo dismiss={() => navigation.closeDrawer()} />}
        >
            <Drawer.Screen name="Home" component={OnboardingStackNavigator} />
            <Drawer.Screen name="Dashboard" component={MainStackNavigator} />
        </Drawer.Navigator>
    );
}