import * as React from 'react';
import { View, Image, SafeAreaView } from 'react-native';

import { tabbedNavigation } from '../../../navigators/navigation';
import styles from './styles';
import axios from 'axios';
import { BUTTON_DEFAULT } from '../../elements/buttons';

export interface Props {}

interface State {}

class Splash extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	navigateToHome = () => {


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
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					<Image style={styles.image} resizeMode="contain" source={require('../../assets/images/rnn2.png')} />
					<Image resizeMode="center" source={require('../../assets/images/rn_ts.png')} />
					<BUTTON_DEFAULT title="Continue To App" onClick={this.navigateToHome} />
				</View>
			</SafeAreaView>
		);
	}
}

export default Splash;
