/* 
The 'loading screen' the user sees every time the app is reopened

logic:
-Checks to see if user has successfully logged on before
  -If so, verify credentials are still valid and redirect to home screen
  -If not, redirect to signin screen
*/

import React, { useEffect } from 'react';
import { Container, Spinner } from '../../components';
import styles from './styles';
import { Image, View } from 'react-native';
import { goToSignIn, goToHome, goToSession } from '../../../navigators/navigation';
import AsyncStorage from '@react-native-community/async-storage';

// Auth verification
import axios from 'axios';
import API from '../../../config/endpoints';

export interface Props {}

interface State {}

class Initializing extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.getStatus();
	}

	getStatus = async () => {
		// Check if user has already been authenticated
		const user = await AsyncStorage.multiGet(['email', 'password']);

		if (user.email && user.password) {
			const credentials = {
				email: user[0][1],
				password: user[1][1],
			};

			// Verify credentials are still valid
			axios
				.post(API.login, credentials)
				.then(() => {
					// If user is in session, direct to session. Otherwise, go to dashboard
					setTimeout(() => {
						if (this.props.sessionId) {
							goToSession();
						} else {
							goToHome();
						}
					}, 200);
				})
				.catch(() => {
					// Redirect to sign in
					setTimeout(() => {
						goToSignIn();
					}, 200);
				});
		} else {
			setTimeout(() => {
				goToSignIn();
			}, 200);
		}
	};

	render() {
		return (
			<Container isCenter>
				<View>
					<Image style={styles.image} source={require('../../assets/images/logo.png')} />
				</View>
			</Container>
		);
	}
}

export default Initializing;
