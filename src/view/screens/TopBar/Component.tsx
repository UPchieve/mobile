/**
 * Custom Topbar Component
 * -----------------------
 * Props:
 *  -dashboard: Adds avatar, name, menu buttton
 *  -backButton: Adds button to go back
 *  -color (string): Background color, white if not provided
 *
 */

import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { H2, Text } from '../../components/Text';
import Hamburger from 'react-native-hamburger';
import { Navigation } from 'react-native-navigation';

export interface Props {
	toggleMenu: Function;
	color: string;
	dashboard: boolean;
	backButton: boolean;
}

interface State {
	active: boolean;
}

export default class TopBar extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
		};
	}

	goBack = () => {
		Navigation.dismissOverlay(`${this.props.modal}Modal`);
	};

	endChat = () => {
		this.props.modalLaunched('Confirmation');
		// Launch the overlay
		Navigation.showOverlay({
			component: {
				name: 'ConfirmationModal',
				id: 'ConfirmationModal',
			},
		});
	};

	render() {
		return (
			<View style={[styles.container, { backgroundColor: this.props.color ? this.props.color : '#fff' }]}>
				{this.props.dashboard && (
					<View style={styles.container}>
						<View style={styles.avatarWrapper}>
							<Image style={styles.avatar} source={require('../../assets/images/student-avatar.png')} />
						</View>
						<H2 style={styles.text}>{this.props.user.user.firstname}</H2>
						<View style={styles.button}>
							<Hamburger
								active={this.state.active}
								onPress={() => {
									this.setState({ active: !this.state.active });
									this.props.toggleMenu();
								}}
								type="cross"
							/>
						</View>
					</View>
				)}
				{this.props.backButton && (
					<TouchableOpacity style={styles.backButton} onPress={this.goBack}>
						<Text light color={'#fff'} style={{ zIndex: 500 }}>
							&#8592; Dashboard
						</Text>
					</TouchableOpacity>
				)}
				{this.props.chat && (
					<TouchableOpacity style={styles.backButton} onPress={this.endChat}>
						<Text light color={'#343440'}>
							&#8592; End chat
						</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}

const styles = {
	container: {
		width: '100%',
		height: 80,
		position: 'absolute',
		top: 0,
		zIndex: 30,
		alignItems: 'center',
		flexDirection: 'row',
	},
	avatarWrapper: {
		width: 40,
		height: 40,
		marginLeft: 20,
	},
	avatar: {
		alignItems: 'flex-start',
		width: null,
		height: null,
		flex: 1,
		resizeMode: 'contain',
	},
	text: {
		marginLeft: 10,
	},
	button: {
		marginLeft: 'auto',
		padding: 20,
	},
	backButton: {
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		paddingVertical: 40,
		position: 'absolute',
	},
};
