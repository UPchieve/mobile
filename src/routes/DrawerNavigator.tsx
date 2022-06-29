import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { OnboardingStackNavigator } from './OnboardingStackNavigator'
import { UserInfo } from '../components/molecules/dashboard/UserInfo'
import { MainStackNavigator } from './MainStackNavigator'
import { ContactUsStackNavigator } from './ContactUsStackNavigator'
import { ProfileStackNavigator } from './ProfileStackNavigator'

export type DrawerParamList = {
  Home: undefined
  Dashboard: undefined
  Profile: undefined
  ContactUs: undefined
}

const Drawer = createDrawerNavigator<DrawerParamList>()
export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        swipeEnabled: false,
        drawerStyle: {
          width: '100%',
        },
      }}
      // drawerContent={({navigation}) => <UserInfo dismiss={() => navigation.closeDrawer()}  />}
      drawerContent={({ navigation }) => {
        return (
          <UserInfo
            dismiss={() => navigation.closeDrawer()}
            navigation={navigation}
          />
        )
      }}
    >
      <Drawer.Screen name="Home" component={OnboardingStackNavigator} />
      <Drawer.Screen name="Dashboard" component={MainStackNavigator} />
      <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
      <Drawer.Screen name="ContactUs" component={ContactUsStackNavigator} />
    </Drawer.Navigator>
  )
}
