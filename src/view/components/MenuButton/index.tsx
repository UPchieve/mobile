import React, { Component } from 'react';
import { View } from 'react-native';
import Hamburger from 'react-native-hamburger';

export default class MenuButton extends Component {
	render() {
		return <Hamburger type="cross" />;
	}
}
