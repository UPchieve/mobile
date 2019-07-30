import { connect } from 'react-redux';
import Component from './Component';

// Make component aware of the selected topic
const mapStateToProps = state => {
	return { sessionId: state.session.sessionId, user: state.user.user };
};

const sessionContainer = connect(
	mapStateToProps,
	null
)(Component);

export default sessionContainer;
