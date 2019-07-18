import * as React from 'react';
import { View } from 'react-native';
import { Text } from '../../components/Text';
import { Component } from 'react';
import { connect } from 'react-redux';



class TopBar extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View width={120} height={40} style={styles.container}>
				<Text>Hello</Text>
			</View>
		);
	}
}

const styles = {
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#aaa',
	},
};


const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export const topContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(topContainer);
