import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
