import * as React from 'react';
import { View } from 'react-native';
import {} from 'native-base';
import { H1, Text } from '../../components/Text';
import TopBar from '../TopBar';

export interface Props {
	menuOpen: boolean;
}

interface State {
	overlayShown: boolean;
}

export default class Session extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
				<TopBar color={'#FF8C5F'} chat />
				<View style={styles.container}>
					<Text>{this.props.sessionId}</Text>
				</View>
			</View>
		);
	}
}

const styles = {
	container: {
		marginTop: 80,
		backgroundColor: '#fff',
		flex: 1,
		width: '100%',
	},
};
