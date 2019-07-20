/**
 * A custom drawer (TODO: move to components folder)
 * refs:
 *
 *
 */

import * as React from 'react';
import { View, Image, FlatList, Animated, Dimensions, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { goToSignIn } from '../../../navigators/navigation';
import { Content, ListItem, Toast } from 'native-base';
import { H1 } from '../../components/Text';

// Minor target for refactoring (icon links are a bit messy due to RequireJS constraints)
const links = [
	{
		key: 'Dashboard',
		route: 'Dashboard',
		icon: require('../../assets/images/drawer/dashboard.png'),
	},
	{
		key: 'Profile',
		route: 'Profile',
		icon: require('../../assets/images/drawer/profile.png'),
	},
	{
		key: 'Resources',
		route: 'Resources',
		icon: require('../../assets/images/drawer/resources.png'),
	},
	{
		key: 'Contact us',
		route: 'ContactUs',
		icon: require('../../assets/images/drawer/contact.png'),
	},
	{
		key: 'Legal policy',
		route: 'LegalPolicy',
		icon: require('../../assets/images/drawer/legal.png'),
	},
];

// Height of overlay
const maxHeight = Dimensions.get('window').height - 80;

export interface Props {}

interface State {}

export default class Overlay extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			animation: new Animated.Value(0),
			overlayShown: true,
		};
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

	toggleOverlay = () => {
		// Drawer toggle logic

		var toValue = 0;
		if (this.state.overlayShown) {
			toValue = -maxHeight;
		}

		Animated.timing(this.state.animation, {
			toValue,
			duration: 500,
		}).start();
	}
	

	render() {
		// Pass both animation state and external styles to overlay
		var animatedOverlayStyle = StyleSheet.flatten([
			styles.overlay,
			{
				translateY: this.state.animation,
			},
		]);
		// Dynamically renders route links
		return (
			<Animated.View style={animatedOverlayStyle}>
				<Content bounces={false} style={styles.content}>
					<FlatList
						data={links}
						renderItem={({ item }) => (
							<ListItem button noBorder onPress={() => this.travel()} style={styles.item}>
								<Image source={item.icon} style={styles.icon} />
								<H1 style={styles.link}>{item.key}</H1>
							</ListItem>
						)}
					/>
					<H1 style={styles.logout} onPress={this.handleLogOut}>
						Log out
					</H1>
				</Content>
			</Animated.View>
		);
	}
}

const styles = {
	overlay: {
		width: '100%',
		flex: 1,
		zIndex: 20,
		position: 'absolute',
		top: 80,
		height: maxHeight,
		// bottom: 0,
		backgroundColor: '#ffa',
	},
	content: {
		flex: 1,
		backgroundColor: '#fff',
		top: -1,
	},
	item: {
		marginBottom: -35,
	},
	link: {
		marginLeft: 20,
	},
	icon: {
		resizeMode: 'contain',
		width: 35,
		marginLeft: 5,
	},
	logout: {
		marginLeft: 25,
		marginTop: maxHeight - 430,
	},
};
