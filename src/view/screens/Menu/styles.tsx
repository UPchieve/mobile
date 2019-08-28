import { StyleSheet, Dimensions } from 'react-native';

const maxHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	overlay: {
		width: '100%',
		flex: 1,
		zIndex: 20,
		position: 'absolute',
		bottom: 0,
		height: maxHeight - 80,
		backgroundColor: '#fff',
	},
	content: {
		marginTop: 20,
	},
	item: {
		height: 80,
	},
	link: {
		marginLeft: 20,
		alignSelf: 'center',
	},
	icon: {
		resizeMode: 'contain',
		width: 35,
		marginLeft: 5,
		alignSelf: 'center',
	},
	logout: {
		position: 'absolute',
		left: 25,
		bottom: 25,
	},
});

export default styles;
