/**
 * Full screen subject select
 *  Should be merged into single modal component
 */

import * as React from 'react';
import TopBar from '../../TopBar';
import { Animated, Dimensions } from 'react-native';
import { Root } from 'native-base';
import { H1, Text } from '../../../components/Text';
import { Button } from '../../../components';
import { goToHome } from '../../../../navigators/navigation';
import { Navigation } from 'react-native-navigation';

import styles from './styles';

export interface Props {}

interface State {}

const maxHeight = Dimensions.get('window').height - 80;

class ConfirmationModal extends React.Component<Props, State> {
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

	confirm = () => {
		this.props.endSession();
		goToHome();

		Animated.timing(this.state.fadeAnimation, {
			toValue: 0,
			duration: 400,
		}).start();
		Animated.timing(this.state.slideAnimation, {
			toValue: maxHeight,
			duration: 600,
		}).start();
		setTimeout(() => {
			Navigation.dismissOverlay('ConfirmationModal');
		}, 600);
	};
	cancel = () => {
		Animated.timing(this.state.fadeAnimation, {
			toValue: 0,
			duration: 400,
		}).start();
		Animated.timing(this.state.slideAnimation, {
			toValue: maxHeight,
			duration: 600,
		}).start();
		setTimeout(() => {
			Navigation.dismissOverlay('ConfirmationModal');
		}, 600);
	};

	render() {
		return (
			<Root>
				<Animated.View style={[styles.container, { opacity: this.state.fadeAnimation }]}>
					<TopBar backButton color={'#FF8C5F'} />
					<Animated.View style={[styles.content, { translateY: this.state.slideAnimation }]}>
						<H1 style={styles.header}>End chat?</H1>
						<Text color="#77778B" light style={styles.description}>
							Are you sure you want to end your chat with your tutor? You won’t be able to return to this
							chat again
						</Text>

						<Button width="75%" onPress={this.confirm} block>
							End chat &#8594;
						</Button>
						<Button
							width="75%"
							onPress={this.cancel}
							block
							backgroundColor={'#fff'}
							color={'#343440'}
							border
						>
							Cancel
						</Button>
					</Animated.View>
				</Animated.View>
			</Root>
		);
	}
}

export default ConfirmationModal;
