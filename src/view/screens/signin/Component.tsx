import * as React from 'react';

import { tabbedNavigation } from '../../../navigators/navigation';
// import styles from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';
import { Container } from '../../components';
import { H1 } from '../../components/Text';
// import { withNativeBaseRoot } from '../../../../hocs';
import SignInForm from '../../forms/SignIn';
import axios from 'axios';


// For use after api testing

// import { USER_KEY, AUTH_ROOT } from '../../../../config';
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

	handleSubmit = () => {
		const ROOT = 'http://192.168.200.195:3000/auth';
		const credentials = {
			email: 'student1@upchieve.org',
			password: 'Password123',
		};

		axios
			.post(`${ROOT}/login`, credentials)
			.then(() => {
				tabbedNavigation();
			})
			.catch(error => {
				console.error(error);
			});
	};

	render() {
		return (
			<Container isCenter marginHorizontal={20}>
				<H1>Sign In</H1>
				<SignInForm onSubmit={this.handleSubmit} />
			</Container>
		);
	}
}

export default SignIn;
