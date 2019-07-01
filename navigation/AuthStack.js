import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/auth/LoginScreen';

const AuthStack = createStackNavigator({
	Login: {
		screen: LoginScreen,
	},
});

export default AuthStack;
