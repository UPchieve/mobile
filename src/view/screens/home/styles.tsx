import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		backgroundColor: '#ededed',
	},
	image: {
		width: '100%',
		borderRadius: 8,
		marginBottom: 35,
	},
	buttonContainer: {
		width: '100%',
		borderRadius: 8,
		marginBottom: 16,
		height: 110,
		backgroundColor: '#FFF',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	buttonRight: {
		marginLeft: 10,
		marginTop: 32
	},
	icon: {
		width: 80,
		alignItems: 'flex-start',
		margin: 15,
	},
});

export default styles;
