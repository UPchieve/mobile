import * as React from 'react';
import * as EmailValidator from 'email-validator';
import ModalSelector from 'react-native-modal-selector';
import StepIndicator from 'react-native-step-indicator';
import { goToSignIn, closeModal, showLegalModal } from '../../../../navigators/navigation';
import { Navigation } from 'react-native-navigation';
import { View, Animated, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Toast, Root, CheckBox } from 'native-base';
import { Text } from '../../../components/Text';
import { Button, Input, FormItem } from '../../../components';
import axios from 'axios';
import API from '../../../../config/endpoints';

import styles from './styles';
import pickerStyles from '../styles/registerPicker';

export interface Props {
	menuOpen: boolean;
}

interface State {
	email: string;
	password: string;
	stepperPosition: number;
	highSchool: string;
	firstName: string;
	lastName: string;
	agreementChecked: boolean;
}

const maxHeight = Dimensions.get('window').height / 4;
const maxWidth = Dimensions.get('window').width;

class RegisterModal extends React.Component<Props, State> {
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
			highSchool: null,
			firstName: null,
			lastName: null,
			referenceSelectorValue: null,
			helpSelectorValue: null,
			agreementChecked: false,
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
		// Make sure all fields are filled
		if (
			!(
				this.state.firstName &&
				this.state.lastName &&
				this.state.highSchool &&
				this.state.referenceSelectorValue &&
				this.state.helpSelectorValue
			)
		) {
			return Toast.show({
				text: 'Please fill out all the fields',
				type: 'danger',
				position: 'bottom',
			});
		}

		if (!this.state.agreementChecked) {
			return Toast.show({
				text: 'Please read and check the terms',
				type: 'danger',
				position: 'bottom',
			});
		}

		// Make register api call
		const data = {
			code: undefined,
			email: this.state.email,
			password: this.state.password,
			highSchool: this.state.highSchool,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			terms: true,
		};
		axios
			.post(API.register, data)
			.then(res => {
				Toast.show({
					text: 'Successfully registered! Redirecting to login...',
					type: 'success',
					position: 'top',
				});
				setTimeout(() => {
					goToSignIn();
					Animated.timing(this.state.fadeAnimation, {
						toValue: 0,
						duration: 400,
					}).start();
					Animated.timing(this.state.slideAnimation, {
						toValue: maxHeight,
						duration: 600,
					}).start();
					setTimeout(() => {
						Navigation.dismissOverlay('RegisterModal');
					}, 600);
				}, 500);
			})
			.catch(error => {
				return Toast.show({
					text: 'There was a connection issue. Please try again',
					type: 'danger',
					position: 'bottom',
				});
			});
	};

	toggleCheckBox = () => {
		this.setState({
			agreementChecked: !this.state.agreementChecked,
		});
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

		// Make sure email is valid
		if (!EmailValidator.validate(this.state.email)) {
			return Toast.show({
				text: 'Please enter a valid email',
				type: 'danger',
				position: 'bottom',
			});
		}

		// Call checkcred api to check credentials
		const credentials = {
			email: this.state.email,
			password: this.state.password,
		};
		axios
			.post(API.checkCred, credentials)
			.then(res => {
				// If there was an error, display it
				if (res.data.err) {
					return Toast.show({
						text: res.data.err,
						type: 'danger',
						position: 'top',
					});
				}
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
					text: 'There was a connection issue. Please try again',
					type: 'danger',
					position: 'top',
				});
			});
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
		let index = 0;

		const referenceData = [
			{ key: index++, label: 'Teacher' },
			{ key: index++, label: 'School' },
			{ key: index++, label: 'Social Media' },
			{ key: index++, label: 'Internet search' },
			{ key: index++, label: 'Friend' },
			{ key: index++, label: 'Family member' },
			{ key: index++, label: 'Other' },
		];
		const helpData = [
			{ key: index++, label: 'Big Brothers Big Sisters of NYC' },
			{ key: index++, label: 'Breakthrough New York' },
			{ key: index++, label: 'East Harlem Tutorial Program' },
			{ key: index++, label: 'First Graduate' },
			{ key: index++, label: 'NYC Mission Society' },
			{ key: index++, label: 'None of the above' },
		];

		return (
			<Root>
				<View style={{ flex: 1 }}>
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

						<Animated.View style={[styles.step1, { transform: [{ translateX: this.state.step1 }] }]}>
							<Text fontSize={18}>Email</Text>
							<Text light style={styles.text}>
								We will only use your email to contact you about your account. See our Privacy Policy
								for more info.
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
								Keep your account safe by choosing a password with one number, one uppercase letter, and
								one lowercase letter
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

						<Animated.View style={[styles.step2, { transform: [{ translateX: this.state.step2 }] }]}>
							<Text fontSize={18} style={{ marginBottom: 20 }}>
								Tell us about yourself!
							</Text>
							<View style={{ flexDirection: 'row' }}>
								<FormItem style={styles.firstName}>
									<Input
										placeholder="First Name"
										onChangeText={text => this.setState({ firstName: text })}
										value={this.state.firstName}
										autoCapitalize="none"
										autoCorrect={false}
									/>
								</FormItem>
								<FormItem style={styles.lastName}>
									<Input
										placeholder="Last Name"
										onChangeText={text => this.setState({ lastName: text })}
										value={this.state.lastName}
										autoCapitalize="none"
										autoCorrect={false}
									/>
								</FormItem>
							</View>
							<FormItem style={styles.info}>
								<Input
									placeholder="High School"
									onChangeText={text => this.setState({ highSchool: text })}
									value={this.state.highSchool}
									autoCapitalize="none"
									autoCorrect={false}
								/>
							</FormItem>

							<ModalSelector
								data={referenceData}
								onChange={option => {
									this.setState({ referenceSelectorValue: option.label });
								}}
								selectedItemTextStyle={pickerStyles.selected}
								optionTextStyle={pickerStyles.optionsText}
								optionStyle={pickerStyles.options}
								optionContainerStyle={pickerStyles.optionsContainer}
								animationType="fade"
								cancelTextStyle={pickerStyles.cancelText}
								cancelStyle={pickerStyles.cancel}
								cancelText="Cancel"
								backdropPressToClose
							>
								<FormItem>
									<Input
										placeholder="How did you hear about us?"
										onChangeText={text => this.setState({ email: text })}
										value={this.state.referenceSelectorValue}
										autoCapitalize="none"
										autoCorrect={false}
									/>
									<Text style={pickerStyles.arrow}>&#9660;</Text>
								</FormItem>
							</ModalSelector>
							<ModalSelector
								data={helpData}
								onChange={option => {
									this.setState({ helpSelectorValue: option.label });
								}}
								selectedItemTextStyle={pickerStyles.selected}
								optionTextStyle={pickerStyles.optionsText}
								optionStyle={pickerStyles.options}
								optionContainerStyle={pickerStyles.optionsContainer}
								animationType="fade"
								cancelTextStyle={pickerStyles.cancelText}
								cancelStyle={pickerStyles.cancel}
								cancelText="Cancel"
								backdropPressToClose
							>
								<FormItem>
									<Input
										placeholder="Help organizations"
										onChangeText={text => this.setState({ email: text })}
										value={this.state.helpSelectorValue}
										autoCapitalize="none"
										autoCorrect={false}
									/>
									<Text style={pickerStyles.arrow}>&#9660;</Text>
								</FormItem>
							</ModalSelector>
							<View style={styles.agreement}>
								<CheckBox
									checked={this.state.agreementChecked}
									onPress={this.toggleCheckBox}
									color={'#16D2AA'}
									hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
									style={styles.checkBox}
								/>
								<Text style={styles.IHaventReadThis}>
									I have read and agree to the{' '}
									<Text color={'#16D2AA'} onPress={showLegalModal}>
										user agreement
									</Text>
								</Text>
							</View>

							<Button style={[styles.button, { marginTop: 20 }]} block onPress={this.register}>
								Register
							</Button>
						</Animated.View>
					</Animated.ScrollView>
				</View>
			</Root>
		);
	}
}

export default RegisterModal;
