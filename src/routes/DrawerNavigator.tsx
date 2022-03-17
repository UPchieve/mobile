import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { OnboardingStackNavigator } from "./OnboardingStackNavigator";
import { Dimensions, View } from 'react-native';
import { UserInfo } from '../components/molecules/dashboard/UserInfo';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { MainStackNavigator } from './MainStackNavigator';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { ContactUsScreen } from "../screens/contact/ContactUsScreen";
import { ImageIndex } from "../../assets/ImageIndex";
import { Colors } from "../../assets/Colors";
import { ContactUsStackNavigator } from './ContactUsStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';



export type DrawerParamList = {
    Home: undefined;
    Dashboard: undefined;
    Profile: undefined;
    ContactUs: undefined;
}

const Drawer = createDrawerNavigator<DrawerParamList>();
export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName='Dashboard'

            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                swipeEnabled: false,
                drawerStyle: {
                    width: '100%',
                }
            }}
            // drawerContent={({navigation}) => <UserInfo dismiss={() => navigation.closeDrawer()}  />}
            drawerContent={({ navigation }) => {
                return <UserInfo dismiss={() => navigation.closeDrawer()} navigation={navigation} />
            }}
        >
            <Drawer.Screen name="Home" component={OnboardingStackNavigator} />
            <Drawer.Screen name="Dashboard" component={MainStackNavigator} />
            <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
            <Drawer.Screen name="ContactUs" component={ContactUsStackNavigator} />
        </Drawer.Navigator>
    );
}
