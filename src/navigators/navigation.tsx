import { Navigation } from 'react-native-navigation';

import { SCREENS } from '../constants/screen';

export const goToSignIn = () => {
	Navigation.setRoot({
		root: {
			component: { name: SCREENS.SignIn },
		},
	});
};

export const initialize = () => {
	Navigation.setRoot({
		root: {
			component: { name: SCREENS.Initializing },
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
							// TODO: Replace topbar with custom nav (To achieve curvy design thing)
							topBar: {
								visible: true,
								elevation: 0,
								title: {
									fontFamily: 'WorkSans',
									fontSize: 18,
								},
								background: {
									color: '#FFF',
								},
							},
						},
					},
				},
			});

export default goToHome;
