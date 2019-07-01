import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthStack from './AuthStack';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen.js';

export default createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading: AuthLoadingScreen,
			Auth: AuthStack,
			Main: MainTabNavigator,
		},
		{
			initialRouteName: 'AuthLoading',
		}
	)
);
