import { Navigation } from 'react-native-navigation';
import { SCREENS } from '../constants/screen';

// Navigation actions

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

// Modals

export const showRegisterModal = () =>
	Navigation.showOverlay({
		component: {
			name: 'RegisterModal',
			id: 'RegisterModal',
		},
	});

export const showLegalModal = () =>
	Navigation.showOverlay({
		component: {
			name: 'LegalModal',
			id: 'LegalModal',
		},
	});

export const closeModal = (modal: string) => Navigation.dismissOverlay(`${modal}Modal`);

export default goToHome;
