import { connect } from 'react-redux';
import Component from './Component';

// Make component aware of the selected topic
const mapStateToProps = state => {
	return { sessionId: state.session.sessionId, topic: state.session.topic };
};

const sessionContainer = connect(
	mapStateToProps,
	null
)(Component);

export default sessionContainer;
