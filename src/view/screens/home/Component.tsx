import * as React from 'react';

import { View, ScrollView, Image } from 'react-native';
import { Form, Button, Container } from '../../components';
import { H1, H2, Text } from '../../components/Text';
import styles from './styles';
import { goToSignIn } from '../../../navigators/navigation';
import { Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Drawer from 'react-native-drawer';
import { Navigation } from 'react-native-navigation';
import Menu from '../Menu/Component';

export interface Props {
	name: string;
}

interface State {
	name: string;
}

// const Menu = () => {
// 	return <H1>Hello World!</H1>;
// };
class Home extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		Navigation.events().bindComponent(this);
	}

	closeMenu = () => {
		this._drawer.close();
	};
	openMenu = () => {
		this._drawer.open();
	};
	static options(passProps) {
		return {
			topBar: {
				title: {
					text: 'Dashboard',
				},
				rightButtons: [
					{
						// id: 'buttonOne',
						// height: 80,
						// icon: require('../../assets/images/menu-icon.png'),
						component: {
							name: 'MenuButton',
							passProps: {
								onClick: () => this.openMenu(),
							},
						},
					},
				],
			},
		};
	}
	// Open menu when nav button pressed
	navigationButtonPressed({ buttonId }) {
		this.openMenu();
	}

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
			<Drawer ref={ref => (this._drawer = ref)} content={<Menu />} side={'top'}>
				<ScrollView>
					<Container marginHorizontal={20} marginVertical={20}>
						<H1>Hello, Student!</H1>
						<Image style={styles.image} source={require('../../assets/images/illo.png')} />
						<H2 style={{ marginBottom: 15 }}>Explore our subjects</H2>

						<Container style={styles.buttonContainer}>
							<Image style={styles.icon} source={require('../../assets/images/math-icon.png')} />
							<Container style={styles.buttonRight}>
								<H2>Math Tutoring</H2>
								<Text color={'#16D2AA'}>Start a chat &#10140;</Text>
							</Container>
						</Container>
						<Container style={styles.buttonContainer}>
							<Image
								style={styles.icon}
								source={require('../../assets/images/college-icon.png')}
							/>
							<Container style={styles.buttonRight}>
								<H2>Math Tutoring</H2>
								<Text color={'#16D2AA'}>Start a chat &#10140;</Text>
							</Container>
						</Container>
						<Container style={styles.buttonContainer}>
							<Image
								style={styles.icon}
								source={require('../../assets/images/science-icon.png')}
							/>
							<Container style={styles.buttonRight}>
								<H2>Math Tutoring</H2>
								<Text color={'#16D2AA'}>Start a chat &#10140;</Text>
							</Container>
						</Container>
						<Button onPress={this.openMenu} block>
							Sign Out
						</Button>
					</Container>
				</ScrollView>
			</Drawer>
		);
	}
}

export default Home;
