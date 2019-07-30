import * as React from 'react';
import { View, Image } from 'react-native';
import {} from 'native-base';
import { H1, Text } from '../../components/Text';
import TopBar from '../TopBar';
import socket from '../../../../shared/socket';

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

	componentDidMount() {
		// Join session
		// const user = {
		// 	foo: 'foo',
		// };
		// socket.emit('join', {
		// 	sessionId: this.props.sessionId,
		// 	user,
		// });
		// console.log(this.props.sessionId);
	}

	render() {
		return (
			<View>
				<TopBar color={'#fff'} chat />
				<View style={styles.container}>
					<Text>{this.props.sessionId}</Text>
					<View style={[styles.tip, { backgroundColor: '#16D2AA' }]} onPress={socket.emit('hello')}>
						<Image style={styles.image} source={require('../../assets/images/bulb.png')} />
						<H1 color={'#fff'}>We’re looking for a coach for you...</H1>
						<Text color={'#fff'} light>
							Thanks for requesting help with UPchieve! We’re looking for a coach to pair with you now.
							This process typically takes 5-10 minutes.
						</Text>
					</View>
					<View style={[styles.tip, { backgroundColor: '#1855D1' }]}>
						<H1 color={'#fff'}>While you wait...</H1>
						<Text color={'#fff'} light>
							While you’re waiting, you can write any problems you’re working on on the whiteboard. (Click
							on the pencil icon in the upper right corner of the screen to start.)
						</Text>
					</View>
					<View style={[styles.tip, { backgroundColor: '#FF8C5F' }]}>
						<H1 color={'#fff'}>A couple of reminders:</H1>
						<Text color={'#fff'} light>
							1. Practice online safety! Don’t share personal information like your phone number or email.
						</Text>
						<Text color={'#fff'} light>
							2. Click “End chat” when you’re done, and make sure to fill out the short feedback form that
							follows!
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = {
	container: {
		marginTop: 80,
		backgroundColor: '#fff',
		width: '100%',
	},
	image: {
		width: 32,
		height: 48,
		flex: 1,
		resizeMode: 'contain',
		// alignSelf: 'flex-start',
	},
	tip: {
		width: '90%',
		alignSelf: 'center',
		borderRadius: 8,
		margin: 8,
		padding: 16,
	},
};
