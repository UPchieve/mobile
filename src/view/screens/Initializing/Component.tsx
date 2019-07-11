import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Spinner } from '../../components';
import { goToSignIn, goToHome } from '../../../navigators/navigation';

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
		const user = await AsyncStorage.getItem('USER_KEY');
		if (user) {
			await goToHome();
		} else {
			await goToSignIn();
		}
	};

	render() {
		return (
			<Container isCenter>
				<Spinner />
			</Container>
		);
	}
}

export default Initializing;
