import { StyleSheet, Dimensions } from 'react-native';

const maxHeight = Dimensions.get('window').height - 80;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1855D1',
		width: '100%',
		height: '100%',
	},
	content: {
		backgroundColor: '#fff',
		marginTop: 80,
		borderTopLeftRadius: 40,
		borderTopEndRadius: 40,
		paddingTop: 30,
		height: maxHeight,
		flex: 1,
		opacity: 10400,
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
});

export default styles;
