import { Navigation } from 'react-native-navigation';

import { SCREENS } from '../constants/screen';

export const initialize = () => {
	Navigation.setRoot({
		root: {
			component: { name: SCREENS.Initializing },
		},
	});
};

export const goToSignIn = () => {
	Navigation.setRoot({
		root: {
			component: {
				name: SCREENS.SignIn,
				options: {
					layout: {
						backgroundColor: '#fff',
					},
				},
			},
		},
	});
};

export const goToHome = () =>
	Navigation.setRoot({
		root: {
			stack: {
				id: 'AppRoot',
				children: [
					{
						component: {
							name: SCREENS.Home,
						},
					},
				],
				options: {
					layout: {
						backgroundColor: '#ededed',
					},
				},
			},
		},
	});

export const goToSession = () =>
	Navigation.setRoot({
		root: {
			stack: {
				id: 'Session',
				children: [
					{
						component: {
							name: SCREENS.Session,
						},
					},
				],
				options: {
					layout: {
						backgroundColor: '#fff',
					},
				},
			},
		},
	});

export const showRegisterModal = () =>
	Navigation.showOverlay({
		component: {
			name: 'RegisterModal',
			id: 'RegisterModal',
		},
	});
export const closeModal = (modal: string) => Navigation.dismissOverlay(`${modal}Modal`);

export default goToHome;
