import * as React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Form, Button, Container } from '../../components';
import { H1, H2, Text } from '../../components/Text';
import styles from './styles';
import { Navigation } from 'react-native-navigation';

// Custom components
import TopBar from '../TopBar';
import Menu from '../Menu';


interface Props {
	name: string;
}

class Home extends React.PureComponent<Props> {
	render() {
		return (
			<View style={styles.wrap}>
				<ScrollView style={styles.container}>
					<Container marginHorizontal={20} marginVertical={20}>
						<H1>Hello, {this.props.name}!</H1>
						<Image style={styles.image} source={require('../../assets/images/illo.png')} />
						<H2 style={{ marginBottom: 15 }}>Explore our subjects</H2>

						<Container style={styles.buttonContainer}>
							<Image style={styles.icon} source={require('../../assets/images/math-icon.png')} />
							<Container style={styles.buttonRight}>
								<H2>Math Tutoring</H2>
								<Text color={'#16D2AA'}>Start a chat &#10140;</Text>
							</Container>
						</Container>
						<Container style={styles.buttonContainer}>
							<Image style={styles.icon} source={require('../../assets/images/college-icon.png')} />
							<Container style={styles.buttonRight}>
								<H2>Math Tutoring</H2>
								<Text color={'#16D2AA'}>Start a chat &#10140;</Text>
							</Container>
						</Container>
						<Container style={styles.buttonContainer}>
							<Image style={styles.icon} source={require('../../assets/images/science-icon.png')} />
							<Container style={styles.buttonRight}>
								<H2>Math Tutoring</H2>
								<Text color={'#16D2AA'}>Start a chat &#10140;</Text>
							</Container>
						</Container>
					</Container>
				</ScrollView>
				<Menu />
				<TopBar />
			</View>
		);
	}
}

export default Home;
