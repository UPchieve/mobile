import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 80,
		position: 'absolute',
		top: 0,
		zIndex: 30,
		alignItems: 'center',
		flexDirection: 'row',
	},
	avatarWrapper: {
		width: 40,
		height: 40,
		marginLeft: 20,
	},
	avatar: {
		alignItems: 'flex-start',
		width: null,
		height: null,
		flex: 1,
		resizeMode: 'contain',
	},
	text: {
		marginLeft: 10,
	},
	button: {
		marginLeft: 'auto',
		padding: 20,
	},
	backButton: {
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		paddingVertical: 40,
		position: 'absolute',
	},
});

export default styles;
