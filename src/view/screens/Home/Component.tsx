import * as React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Container } from '../../components';
import { H1, H2, Text } from '../../components/Text';
import { Navigation } from 'react-native-navigation';

import styles from './styles';

// Custom components
import TopBar from '../TopBar';
import Menu from '../Menu';

interface Props {
	name: string;
	modalLaunched: Function;
}

class Home extends React.PureComponent<Props> {
	/*
	 * Full screen subject selects (Separate functions due to RNNv2 modal issue)
	 */
	showMathModal = () => {
		// Dispatch the modal to store
		this.props.modalLaunched('Math');
		// Launch the overlay
		Navigation.showOverlay({
			component: {
				name: 'MathModal',
				id: 'MathModal',
				options: {
					overlay: {
						interceptTouchOutside: true,
					},
				},
			},
		});
	};
	showCollegeModal = () => {
		this.props.modalLaunched('College');
		Navigation.showOverlay({
			component: {
				name: 'CollegeModal',
				id: 'CollegeModal',
				options: {
					overlay: {
						interceptTouchOutside: true,
					},
				},
			},
		});
	};
	render() {
		return (
			<View style={styles.wrap}>
				<ScrollView style={styles.container}>
					<Container marginHorizontal={20} marginVertical={20}>
						<H1>Hello, {this.props.user.user.firstname}!</H1>
						<Image style={styles.image} source={require('../../assets/images/illo.png')} />
						<H2 style={{ marginBottom: 15 }}>Explore our subjects</H2>
						<TouchableOpacity style={styles.buttonContainer} onPress={this.showMathModal}>
							<Image style={styles.icon} source={require('../../assets/images/math-icon.png')} />
							<Container style={styles.buttonRight}>
								<H2>Math Tutoring</H2>
								<Text color={'#16D2AA'}>Start a chat &#8594;</Text>
							</Container>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonContainer} onPress={this.showCollegeModal}>
							<Image style={styles.icon} source={require('../../assets/images/college-icon.png')} />
							<Container style={styles.buttonRight}>
								<H2>College Counseling</H2>
								<Text color={'#16D2AA'}>Start a chat &#8594;</Text>
							</Container>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonContainer}>
							<Image style={styles.icon} source={require('../../assets/images/science-icon.png')} />
							<Container style={styles.buttonRight}>
								<H2>Coming Soon</H2>
								<Text color={'#16D2AA'}>Suggest a help topic &#8594;</Text>
							</Container>
						</TouchableOpacity>
					</Container>
				</ScrollView>
				<Menu />
				<TopBar dashboard />
			</View>
		);
	}
}

export default Home;
