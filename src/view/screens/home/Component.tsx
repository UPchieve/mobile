import * as React from 'react';
import { Button, Container } from '../../components';
import styles from './styles';
import { goToSignIn } from '../../../navigators/navigation';
import { Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export interface Props {
  name: string;
}

interface State {
  name: string;
}

class Home extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			name: props.name || 'RN + TS + RNN2',
		};
	}

	componentDidMount() {}

	handleLogOut = async () => {
    // Remove user data from async storage and go to sign in screen
		try {
			await AsyncStorage.multiRemove(['email', 'password']);
			await goToSignIn();
		} catch (e) {
			Toast.show({
				text: 'Sorry, please try again',
				type: 'danger',
				position: 'top',
			});
		}
	};

	render() {
		return (
			<Container marginHorizontal={20} marginVertical={20}>
				<Button onPress={this.handleLogOut}>Sign Out</Button>
			</Container>
		);
	}
}

export default Home;
