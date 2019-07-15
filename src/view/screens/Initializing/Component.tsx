/* 
The 'loading screen' the user sees every time the app is reopened

logic:
-Checks to see if user has successfully logged on before
  -If so, verify credentials are still valid and redirect to home screen
  -If not, redirect to signin screen
*/

import React, { useEffect } from 'react';
import { Container, Spinner } from '../../components';
import styles from './styles'
import { Image, View } from 'react-native';
import { goToSignIn, goToHome } from '../../../navigators/navigation';
import AsyncStorage from '@react-native-community/async-storage';

// Auth verification
import axios from 'axios';
import API from '../../../config/index';

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

		if (user) {
			const credentials = {
				email: user[0][1],
				password: user[1][1],
			};

			// Verify credentials are still valid
			axios
				.post(API.login, credentials)
				.then(() => {
					// Redirect to home
					setTimeout(() => {
						goToHome();
					}, 1500);
				})
				.catch(() => {
					// Redirect to sign in
					setTimeout(() => {
						goToSignIn();
					}, 1500);
				});
		} else {
			setTimeout(() => {
				goToSignIn();
			}, 1500);
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
