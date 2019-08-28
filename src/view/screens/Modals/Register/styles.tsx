import { StyleSheet, Dimensions } from 'react-native';

const maxWidth = Dimensions.get('window').width;
// Hard coded with aspect ratios, todo refactor
const contentDistanceFromTop = maxWidth * 0.54 * 0.4255 + 190;

const styles = StyleSheet.create({
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
	agreement: {
		flexDirection: 'row',
		width: '100%',
		marginTop: 20,
	},
	checkBox: {
		padding: 0,
		alignSelf: 'flex-start',
	},
	IHaventReadThis: {
		paddingLeft: 25,
	},
	button: {
		marginBottom: 40,
		width: '100%',
	},
});

export default styles;
