import * as React from 'react';

import { goToHome, showRegisterModal } from '../../../navigators/navigation';
import { Image, TouchableOpacity } from 'react-native';
import { Root, Toast } from 'native-base';
import { Container } from '../../components';
import { Text } from '../../components/Text';
import SignInForm from '../../forms/SignIn';
import axios from 'axios';
import { SignInFormValues } from '../../forms/SignIn/types';
import { FormikActions } from 'formik';

import API from '../../../config/endpoints';

export interface Props {
	saveUser: Function;
}

interface State {}

export default class SignIn extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	handleSubmit = ({ email, password }: SignInFormValues, { resetForm }: FormikActions<SignInFormValues>) => {
		const credentials = { email, password };

		// Call authentication endpoint with inputted credentials
		axios
			.post(API.login, credentials)
			.then(res => {
				const user = {
					credentials,
					user: res.data,
				};
				this.props.saveUser(user);
				goToHome();
			})
			.catch(error => {
				// Reset form and return failed login popup
				resetForm();
				return Toast.show({
					text: 'Could not login. Please try again',
					type: 'danger',
					position: 'top',
				});
			});
	};

	render() {
		return (
			<Root>
				<Container style={styles.container} isCenter>
					<Image style={styles.image} source={require('../../assets/images/logo2.png')} />
					<SignInForm onSubmit={this.handleSubmit} />
					<TouchableOpacity
						onPress={showRegisterModal}
						hitSlop={{ top: 10, left: 40, bottom: 40, right: 40 }}
					>
						<Text light fontSize={15}>
							Don't have an account? <Text style={styles.emphasized}>Sign up</Text>
						</Text>
					</TouchableOpacity>
				</Container>
			</Root>
		);
	}
}

const styles = {
	container: {
		width: '90%',
		alignSelf: 'center',
		marginBottom: 70,
		backgroundColor: '#FFF',
	},
	image: {
		width: '60%',
		alignSelf: 'center',
		resizeMode: 'contain',
		marginBottom: 20,
	},
	header: {
		alignSelf: 'flex-start',
	},
	emphasized: {},
};
