import React, { Component } from 'react';
import { View, Button, StyleSheet, TextInput, ScrollView, TouchableOpacity, Text } from 'react-native';

// import AuthService from 'src/services/AuthService';

export default class LoginScreen extends Component {
	constructor(props) {
		super(props);
		// this.onLogin = this.onLogin.bind(this);
		this.state = {
			email: '',
			password: '',
		};
	}

	async login() {
		// await login();
		// this.props.navigation.navigate('Dashboard');
	}

	render() {
		return (
			<View style={styles.base}>
				<TextInput
					style={styles.input}
					placeholder="Username"
					onChangeText={email => this.setState({ email })}
					value={this.state.text}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					onChangeText={password => this.setState({ password })}
					value={this.state.text}
				/>
				<TouchableOpacity style={styles.button} title="Login" onPress={this.login}>
					<Text style={styles.text}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		height: 60,
		width: '85%',
		padding: 15,
		paddingLeft: 25,
		margin: 10,
		borderRadius: 30,
		borderColor: 'gray',
		borderWidth: 1,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '85%',
		height: 60,
		margin: 20,
		borderRadius: 30,
		backgroundColor: '#16D2AA',
	},
	text: {
		color: '#FFF',
	},
	base: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
