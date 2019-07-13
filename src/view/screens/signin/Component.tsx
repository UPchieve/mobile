import * as React from 'react';

import { goToHome } from '../../../navigators/navigation';
// import styles from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import { Root, Toast } from 'native-base';
import { Container } from '../../components';
import { H1 } from '../../components/Text';
// import { withNativeBaseRoot } from '../../../../hocs';
import SignInForm from '../../forms/SignIn';
import axios from 'axios';
import { SignInFormValues } from '../../forms/SignIn/types';
import { FormikActions } from 'formik';

// For use after api testing

import API from '../../../config/index';

// import { ISignInFormValues } from '../../../../forms/SignIn/types';
// import { FormikActions } from 'formik';

export interface Props {}

interface State {}

class SignIn extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	handleSubmit = ({ email, password }: SignInFormValues, { resetForm }: FormikActions<SignInFormValues>) => {
		const credentials = { email, password };

		axios
			.post(API.login, credentials)
			.then(() => {
				AsyncStorage.setItem('user', email)
					.then(() => {
						goToHome();
					})
					.catch(() => {
						resetForm();
						return Toast.show({
							text: "Sorry, it looks like there's an issue",
							type: 'danger',
							position: 'top',
						});
					});
			})
			.catch(error => {
				resetForm();
				// console.error(error);
				return Toast.show({
					text: 'Incorrect Details',
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
