import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		marginTop: 80,
		backgroundColor: '#fff',
		width: '100%',
	},
	image: {
		width: 32,
		height: 48,
		flex: 1,
		resizeMode: 'contain',
	},
	tip: {
		width: '90%',
		alignSelf: 'center',
		borderRadius: 8,
		margin: 8,
		padding: 16,
	},
});

export default styles;
