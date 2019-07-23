import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { H2 } from '../../components/Text';
import Hamburger from 'react-native-hamburger';

export interface Props {
	toggleMenu: Function;
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

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.avatarWrapper}>
					<Image style={styles.avatar} source={require('../../assets/images/student-avatar.png')} />
				</View>
				<H2 style={styles.text}>{this.props.name}</H2>
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
		);
	}
}

const styles = {
	container: {
		width: '100%',
		height: 80,
		position: 'absolute',
		top: 0,
		zIndex: 10,
		alignItems: 'center',
		backgroundColor: '#fff',
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
};
