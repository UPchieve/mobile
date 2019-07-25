/**
 * Full screen subject select
 *  Should be merged into single modal component
 */

import * as React from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { Root, Toast } from 'native-base';
import { H1, Text } from '../../../components/Text';
import { Button } from '../../../components';
import TopBar from '../../TopBar';
import ModalSelector from 'react-native-modal-selector';

export interface Props {
	menuOpen: boolean;
}

interface State {
	selectorValue: string;
}

const maxHeight = Dimensions.get('window').height - 80;

export default class MathModal extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			selectorValue: null,
			fadeAnimation: new Animated.Value(0),
			slideAnimation: new Animated.Value(maxHeight),
		};
	}

	componentDidMount() {
		Animated.timing(this.state.fadeAnimation, {
			toValue: 1,
			duration: 200,
		}).start();
		Animated.timing(this.state.slideAnimation, {
			toValue: 0,
			duration: 400,
		}).start();
	}

	startChat = () => {
		// Make sure a subject has been selected
		if (!this.state.selectorValue) {
			return Toast.show({
				text: 'Please select a subject first',
				type: 'danger',
				position: 'bottom',
			});
		}
	};

	render() {
		let index = 0;
		const data = [
			{ key: index++, label: 'Algebra' },
			{ key: index++, label: 'Geometry' },
			{ key: index++, label: 'Precalculus' },
			{ key: index++, label: 'Calculus' },
			{ key: index++, label: 'Trigonometry' },
		];
		const selectorColor = this.state.selectorValue ? '#16D2AA' : '#77778B';

		return (
			<Root>
				<Animated.View style={[styles.container, { opacity: this.state.fadeAnimation }]}>
					<TopBar backButton color={'#1855D1'} />
					<Animated.View style={[styles.content, { translateY: this.state.slideAnimation }]}>
						<H1 style={styles.header}>Choose a math subject</H1>
						<Text color="#77778B" light style={styles.description}>
							Select the topic you would like to request help with below to get started with a new chat
						</Text>
						<ModalSelector
							data={data}
							onChange={option => {
								this.setState({ selectorValue: option.label });
							}}
							initValue="Select a subject"
							selectTextStyle={[styles.selectionText, { color: selectorColor }]}
							selectStyle={[styles.selectInput, { borderColor: selectorColor }]}
							selectedItemTextStyle={styles.selected}
							optionTextStyle={styles.optionsText}
							optionStyle={styles.options}
							optionContainerStyle={styles.optionsContainer}
							animationType="fade"
							cancelTextStyle={styles.cancelText}
							cancelStyle={styles.cancel}
							cancelText="Cancel"
						/>
						<Button width="75%" onPress={this.startChat} block>
							Start a new chat &#8594;
						</Button>
					</Animated.View>
				</Animated.View>
			</Root>
		);
	}
}

const styles = {
	container: {
		backgroundColor: '#1855D1',
		width: '100%',
		height: '100%',
	},
	content: {
		marginTop: 80,
		borderTopLeftRadius: 40,
		borderTopEndRadius: 40,
		paddingTop: 30,
		flex: 1,
		backgroundColor: '#fff',
	},
	pickerInput: {
		borderWidth: 1,
		textAlign: 'center',
		alignSelf: 'center',
		width: '90%',
		padding: 10,
		height: 100,
	},
	header: {
		width: '100%',
		textAlign: 'center',
	},
	description: {
		width: '75%',
		textAlign: 'center',
		alignSelf: 'center',
		lineHeight: 24,
		marginBottom: 40,
	},
	selectInput: {
		padding: 40,
		marginBottom: 40,
		alignSelf: 'center',
		width: '90%',
		borderRadius: 8,
	},
	selectionText: {
		fontFamily: 'WorkSans-Medium',
	},
	selected: {
		color: '#16D2AA',
	},
	optionsText: {
		fontFamily: 'WorkSans',
		color: '#77778B',
		fontSize: 18,
	},
	options: {
		padding: 25,
	},
	optionsContainer: {
		backgroundColor: '#fff',
		borderRadius: 8,
	},
	cancelText: {
		fontFamily: 'WorkSans-Medium',
		color: '#F44747',
		fontSize: 18,
	},
	cancel: {
		padding: 15,
		marginTop: 5,
		backgroundColor: '#eee',
		borderRadius: 8,
	},
};
