/**
 * Full screen subject select
 *  Should be merged into single modal component
 */

import * as React from 'react';
import TopBar from '../../TopBar';
import ModalSelector from 'react-native-modal-selector';
import { goToSession } from '../../../../navigators/navigation';
import { Navigation } from 'react-native-navigation';
import { Animated, Dimensions } from 'react-native';
import { Root, Toast } from 'native-base';
import { H1, Text } from '../../../components/Text';
import { Button } from '../../../components';

import styles from './styles';
import pickerStyles from '../styles/subjectPicker';

export interface Props {
	menuOpen: boolean;
}

interface State {
	selectorValue: string;
}

const maxHeight = Dimensions.get('window').height - 80;

class MathModal extends React.Component<Props, State> {
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

		// Get session
		const topic = {
			type: 'math',
			subTopic: this.state.selectorValue,
		};
		this.props.getSession(topic).then(() => {
			goToSession();
		});

		// Animate out the overlay, then dismiss it
		Animated.timing(this.state.fadeAnimation, {
			toValue: 0,
			duration: 400,
		}).start();
		Animated.timing(this.state.slideAnimation, {
			toValue: maxHeight,
			duration: 600,
		}).start();
		setTimeout(() => {
			Navigation.dismissOverlay('MathModal');
		}, 600);
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
					<Animated.View style={[styles.content, { transform: [{ translateY: this.state.slideAnimation }] }]}>
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
							selectTextStyle={[pickerStyles.selectionText, { color: selectorColor }]}
							selectStyle={[pickerStyles.selectInput, { borderColor: selectorColor }]}
							selectedItemTextStyle={pickerStyles.selected}
							optionTextStyle={pickerStyles.optionsText}
							optionStyle={pickerStyles.options}
							optionContainerStyle={pickerStyles.optionsContainer}
							animationType="fade"
							cancelTextStyle={pickerStyles.cancelText}
							cancelStyle={pickerStyles.cancel}
							cancelText="Cancel"
							backdropPressToClose
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

export default MathModal;
