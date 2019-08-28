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
import Hamburger from 'react-native-hamburger';
import { View, Image, TouchableOpacity } from 'react-native';
import { H2, Text } from '../../components/Text';
import { Navigation } from 'react-native-navigation';

import styles from './styles';

export interface Props {
	toggleMenu: Function;
	color: string;
	dashboard: boolean;
	backButton: boolean;
}

interface State {
	active: boolean;
}

class TopBar extends React.Component<Props, State> {
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
						<Text light color={this.props.color ? '#fff' : '#343440'} style={{ zIndex: 500 }}>
							&#8592; Back
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

export default TopBar;
