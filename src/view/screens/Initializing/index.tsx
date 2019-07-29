import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = state => ({
	sessionId: state.session.sessionId,
});

const actionCreators = {};

const initializingContainer = connect(
	mapStateToProps,
	actionCreators
)(Component);

export default initializingContainer;
