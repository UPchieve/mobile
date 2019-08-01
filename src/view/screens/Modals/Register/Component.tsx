/**
 * Full screen subject select
 *  Should be merged into single modal component
 */

import * as React from 'react';
import { ScrollView, View, Animated, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Toast, Root, Item } from 'native-base';
import { H1, Text } from '../../../components/Text';
import { Button, Container, Input, FormItem } from '../../../components';
import StepIndicator from 'react-native-step-indicator';
import RNPickerSelect from 'react-native-picker-select';
// Navigation
import { goToHome, closeModal } from '../../../../navigators/navigation';
import { Navigation } from 'react-native-navigation';
import axios from 'axios';
import API from '../../../../config/endpoints';
export interface Props {
	menuOpen: boolean;
}

interface State {
	email: string;
	password: string;
}

const maxHeight = Dimensions.get('window').height / 4;
const maxWidth = Dimensions.get('window').width;
// Hard derived from aspect ratio of logo and padding (better way to do this?)
const contentDistanceFromTop = maxWidth * 0.54 * 0.4255 + 190;

export default class RegisterModal extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			fadeAnimation: new Animated.Value(0),
			slideAnimation: new Animated.Value(maxHeight),
			email: null,
			password: null,
			step1: new Animated.Value(0),
			step2: new Animated.Value(maxWidth),
			stepperPosition: 0,
		};
	}

	componentDidMount() {
		Animated.timing(this.state.fadeAnimation, {
			toValue: 1,
			duration: 250,
		}).start();
		Animated.timing(this.state.slideAnimation, {
			toValue: 0,
			duration: 300,
		}).start();
	}

	register = () => {
		// Make sure a subject has been selected
		// Animate out the overlay, then dismiss it
		// Animated.timing(this.state.fadeAnimation, {
		// 	toValue: 0,
		// 	duration: 400,
		// }).start();
		// setTimeout(() => {
		// 	Navigation.dismissOverlay('MathModal');
		// }, 600);
	};

	exit = () => {
		closeModal('Register');
	};

	continue = () => {
		// Make sure inputs are filled
		if (!this.state.email && !this.state.password) {
			return Toast.show({
				text: 'Please enter an email and password',
				type: 'danger',
				position: 'bottom',
			});
		} else if (!this.state.email) {
			return Toast.show({
				text: 'Please enter an email',
				type: 'danger',
				position: 'bottom',
			});
		} else if (!this.state.password) {
			return Toast.show({
				text: 'Please enter a password',
				type: 'danger',
				position: 'bottom',
			});
		}

		const credentials = {
			email: this.state.email,
			password: this.state.password,
		};
		axios
			.post(API.checkCred, credentials)
			.then(res => {
				// Move to second step in registration
				this.setState({ stepperPosition: 1 });
				Animated.timing(this.state.step1, {
					toValue: -maxWidth,
					duration: 400,
				}).start();
				Animated.timing(this.state.step2, {
					toValue: 0,
					duration: 400,
				}).start();
			})
			.catch(error => {
				return Toast.show({
					text: error,
					type: 'danger',
					position: 'top',
				});
			});
	};

	nextStep = () => {
		this.setState({ stepperPosition: 1 });
	};

	render() {
		const stepIndicatorStyles = {
			stepIndicatorSize: 40,
			stepIndicatorCurrentColor: '#16D2AA',
			stepIndicatorUnFinishedColor: '#FFF',
			stepIndicatorFinishedColor: '#FFF',
			stepIndicatorLabelCurrentColor: '#FFF',
			currentStepStrokeWidth: 0,
			stepStrokeWidth: 1,
			separatorStrokeWidth: 1,
			separatorUnFinishedColor: '#c1cad9',
			separatorFinishedColor: '#16D2AA',
			stepStrokeUnFinishedColor: '#c1cad9',
			stepStrokeFinishedColor: '#16D2AA',
			stepIndicatorLabelUnFinishedColor: '#c1cad9',
			stepIndicatorLabelFinishedColor: '#16D2AA',
		};
		let data = [
			{
				value: 'Teacher',
			},
			{
				value: 'School',
			},
			{
				value: 'Social media',
			},
			{
				value: 'Internet search',
			},
			{
				value: 'Friend',
			},
			{
				value: 'Family member',
			},
			{
				value: 'Other',
			},
		];
		return (
			<Root>
				<Animated.ScrollView
					style={[
						styles.container,
						{ opacity: this.state.fadeAnimation, translateY: this.state.slideAnimation },
					]}
				>
					<TouchableOpacity
						style={styles.exit}
						onPress={this.exit}
						hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}
					>
						<Image style={styles.exitIcon} source={require('../../../assets/images/exit.png')} />
					</TouchableOpacity>
					<Image style={styles.logo} source={require('../../../assets/images/logo2.png')} />

					<View style={styles.stepIndicator}>
						<StepIndicator
							customStyles={stepIndicatorStyles}
							currentPosition={this.state.stepperPosition}
							stepCount={2}
						/>
					</View>

					<Animated.View style={[styles.step1, { translateX: this.state.step1 }]}>
						<Text fontSize={18}>Email</Text>
						<Text light style={styles.text}>
							We will only use your email to contact you about your account. See our Privacy Policy for
							more info.
						</Text>
						<FormItem style={styles.input}>
							<Input
								placeholder="example@email.com"
								onChangeText={text => this.setState({ email: text })}
								value={this.state.email}
								autoCapitalize="none"
								autoCorrect={false}
							/>
						</FormItem>

						<Text fontSize={18}>Password</Text>
						<Text light style={styles.text}>
							Keep your account safe by choosing a password with one number, one uppercase letter, and one
							lowercase letter
						</Text>
						<FormItem style={styles.input}>
							<Input
								placeholder="Enter password"
								onChangeText={text => this.setState({ password: text })}
								value={this.state.password}
								autoCapitalize="none"
								autoCorrect={false}
								secureTextEntry
							/>
						</FormItem>
						<Button
							style={styles.button}
							block
							onPress={this.continue}
							hitSlop={{ top: 30, left: 50, bottom: 50, right: 50 }}
						>
							Continue
						</Button>
					</Animated.View>

					<Animated.View style={[styles.step2, { translateX: this.state.step2 }]}>
						<Text fontSize={18} style={{ marginBottom: 20 }}>
							Tell us about yourself!
						</Text>
						<View style={{ flexDirection: 'row' }}>
							<FormItem style={styles.firstName}>
								<Input
									placeholder="First Name"
									onChangeText={text => this.setState({ email: text })}
									// value={this.state.email}
									autoCapitalize="none"
									autoCorrect={false}
								/>
							</FormItem>
							<FormItem style={styles.lastName}>
								<Input
									placeholder="Last Name"
									onChangeText={text => this.setState({ email: text })}
									// value={this.state.email}
									autoCapitalize="none"
									autoCorrect={false}
								/>
							</FormItem>
						</View>
						<FormItem style={styles.info}>
							<Input
								placeholder="High School"
								onChangeText={text => this.setState({ email: text })}
								// value={this.state.email}
								autoCapitalize="none"
								autoCorrect={false}
							/>
						</FormItem>
						<RNPickerSelect
							onValueChange={value => console.log(value)}
							items={[
								{ label: 'Football', value: 'football' },
								{ label: 'Baseball', value: 'baseball' },
								{ label: 'Hockey', value: 'hockey' },
							]}
						/>
						<Button
							style={[styles.button, { marginTop: 20 }]}
							block
							onPress={this.register}
							hitSlop={{ top: 30, left: 50, bottom: 50, right: 50 }}
						>
							Register
						</Button>
					</Animated.View>
				</Animated.ScrollView>
			</Root>
		);
	}
}

const styles = {
	container: {
		backgroundColor: '#FFF',
		width: '100%',
		height: '100%',
	},
	logo: {
		width: '54%',
		alignSelf: 'center',
		resizeMode: 'contain',
		marginTop: 30,
		marginBottom: 10,
	},
	exit: {
		position: 'absolute',
		top: 20,
		left: 20,
	},
	exitIcon: {
		width: 25,
		resizeMode: 'contain',
	},
	stepIndicator: {
		marginBottom: 40,
		width: '80%',
		marginLeft: '-10%',
	},
	step1: {
		paddingHorizontal: '5%',
	},
	step2: {
		paddingHorizontal: '5%',
		width: '100%',
		position: 'absolute',
		top: contentDistanceFromTop,
	},
	text: {
		lineHeight: 22,
		marginTop: 10,
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
	input: {
		marginBottom: 40,
	},
	info: {
		marginBottom: 20,
	},
	firstName: {
		marginBottom: 20,
		width: '46%',
		alignSelf: 'flex-start',
		marginRight: '8%',
	},
	lastName: {
		marginBottom: 20,
		width: '45%',
	},

	button: {
		marginBottom: 40,
		width: '100%',
	},
};
