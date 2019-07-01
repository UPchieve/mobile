import React, { Component } from 'react';
import { View, Button, StyleSheet, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';

export default class AuthLoadingScreen extends React.Component {
	constructor() {
		super();
		this.fetchAuthState();
	}
	// Fetch the token from storage then navigate to our appropriate place
	fetchAuthState = async () => {
		const userToken = await AsyncStorage.getItem('userToken');

		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.
		this.props.navigation.navigate(userToken ? 'App' : 'Auth');
	};

	// Render any loading content that you like here
	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
