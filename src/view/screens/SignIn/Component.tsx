import * as React from 'react';

import { goToHome } from '../../../navigators/navigation';
import styles from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import { Root, Toast } from 'native-base';
import { Container } from '../../components';
import { H1 } from '../../components/Text';
import SignInForm from '../../forms/SignIn';
import axios from 'axios';
import { SignInFormValues } from '../../forms/SignIn/types';
import { FormikActions } from 'formik';

import API from '../../../config/endpoints';

export interface Props {
	saveUser: Function;
}

interface State {}

class SignIn extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	handleSubmit = ({ email, password }: SignInFormValues, { resetForm }: FormikActions<SignInFormValues>) => {
		const credentials = { email, password };

		// Call authentication endpoint with inputted credentials
		axios
			.post(API.login, credentials)
			.then(res => {
				const user = {
					credentials,
					name: res.data.user.firstname,
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
				<Container isCenter marginHorizontal={20}>
					<H1>Sign In</H1>
					<SignInForm onSubmit={this.handleSubmit} />
				</Container>
			</Root>
		);
	}
}

export default SignIn;
